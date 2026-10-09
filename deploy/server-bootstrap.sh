#!/usr/bin/env bash
#
# JMSWORLD website — one-time server bootstrap. Run ONCE as root on the server:
#
#     sudo bash /tmp/jmsworld-bootstrap.sh
#
# Idempotent. What it does:
#   1. Installs Node.js 24 LTS from the official nodejs.org tarball (SHA-256 verified) into /usr/local
#   2. Installs Nginx and configures it as a reverse proxy to the app on 127.0.0.1:3000
#   3. Creates /srv/jmsworld/app (owned by the deploy user) and /etc/jmsworld/jmsworld.env
#      (environment + secrets; root-owned, readable by the deploy user only)
#   4. Installs the systemd unit jmsworld.service (runs `next start` as the deploy user)
#   5. Allows the deploy user to restart/stop/start/status *this service only* without a
#      password, so deployments do not need an interactive sudo prompt
#   6. Opens HTTP/HTTPS in ufw or firewalld if one of them is active
#
# Overrides: DEPLOY_USER (default: the user who ran sudo), NODE_VERSION, SITE_URL
set -euo pipefail

DEPLOY_USER="${DEPLOY_USER:-${SUDO_USER:-admin}}"
NODE_VERSION="${NODE_VERSION:-24.21.0}"
APP_ROOT=/srv/jmsworld
APP_DIR=$APP_ROOT/app
ENV_DIR=/etc/jmsworld
ENV_FILE=$ENV_DIR/jmsworld.env
SERVICE=jmsworld.service

log() { printf '\n==> %s\n' "$*"; }

[ "$(id -u)" -eq 0 ] || { echo "Please run with sudo." >&2; exit 1; }
id "$DEPLOY_USER" >/dev/null 2>&1 || { echo "Deploy user '$DEPLOY_USER' does not exist." >&2; exit 1; }

PRIMARY_IP=$(hostname -I 2>/dev/null | awk '{print $1}' || true)
SITE_URL="${SITE_URL:-http://${PRIMARY_IP:-localhost}}"

# ---------------------------------------------------------------- packages
log "Installing packages (curl, xz, nginx)"
if command -v apt-get >/dev/null 2>&1; then
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq
  apt-get install -y -qq curl ca-certificates xz-utils nginx >/dev/null
  NGINX_SITE=/etc/nginx/sites-available/jmsworld.conf
elif command -v dnf >/dev/null 2>&1; then
  dnf install -y -q curl ca-certificates xz nginx
  NGINX_SITE=/etc/nginx/conf.d/jmsworld.conf
else
  echo "Unsupported distribution: need apt-get (Debian/Ubuntu) or dnf (RHEL family)." >&2
  exit 1
fi

# ---------------------------------------------------------------- Node.js
case "$(uname -m)" in
  x86_64) NODE_ARCH=x64 ;;
  aarch64 | arm64) NODE_ARCH=arm64 ;;
  *) echo "Unsupported CPU architecture: $(uname -m)" >&2; exit 1 ;;
esac

if ! command -v node >/dev/null 2>&1 || [ "$(node -v 2>/dev/null)" != "v$NODE_VERSION" ]; then
  log "Installing Node.js v$NODE_VERSION ($NODE_ARCH)"
  TMP=$(mktemp -d)
  trap 'rm -rf "$TMP"' EXIT
  TARBALL="node-v$NODE_VERSION-linux-$NODE_ARCH.tar.xz"
  curl -fsSL -o "$TMP/$TARBALL" "https://nodejs.org/dist/v$NODE_VERSION/$TARBALL"
  curl -fsSL -o "$TMP/SHASUMS256.txt" "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt"
  (cd "$TMP" && grep " $TARBALL\$" SHASUMS256.txt | sha256sum -c - >/dev/null) || { echo "Checksum mismatch for $TARBALL" >&2; exit 1; }
  mkdir -p /usr/local/lib/nodejs
  rm -rf "/usr/local/lib/nodejs/node-v$NODE_VERSION"
  tar -xJf "$TMP/$TARBALL" -C /usr/local/lib/nodejs
  mv "/usr/local/lib/nodejs/node-v$NODE_VERSION-linux-$NODE_ARCH" "/usr/local/lib/nodejs/node-v$NODE_VERSION"
  for bin in node npm npx; do
    ln -sfn "/usr/local/lib/nodejs/node-v$NODE_VERSION/bin/$bin" "/usr/local/bin/$bin"
  done
fi
log "Node $(node -v), npm $(npm -v)"

# ---------------------------------------------------------------- directories & environment
log "Preparing $APP_DIR and $ENV_FILE"
mkdir -p "$APP_DIR"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_ROOT"
mkdir -p "$ENV_DIR"
if [ ! -f "$ENV_FILE" ]; then
  cat > "$ENV_FILE" <<EOF
# JMSWORLD website environment. Loaded by systemd ($SERVICE) and by the build.
# After editing: sudo systemctl restart $SERVICE   (NEXT_PUBLIC_* values need a redeploy/rebuild)
NODE_ENV=production
PORT=3000
HOSTNAME=127.0.0.1

# Public origin, no trailing slash. Change to https://www.yourdomain.com once DNS/TLS are set up.
NEXT_PUBLIC_SITE_URL=$SITE_URL

# Inquiry email delivery (Resend). Forms show a "please call" error until these are set.
RESEND_API_KEY=
INQUIRY_TO_EMAIL=
INQUIRY_FROM_EMAIL=

# Optional Google Maps embed on /contact
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY=
EOF
fi
chown "root:$DEPLOY_USER" "$ENV_FILE"
chmod 640 "$ENV_FILE"

# ---------------------------------------------------------------- systemd unit
log "Installing $SERVICE"
cat > "/etc/systemd/system/$SERVICE" <<EOF
[Unit]
Description=JMSWORLD TRANSPORT website (Next.js)
After=network.target

[Service]
Type=simple
User=$DEPLOY_USER
Group=$DEPLOY_USER
WorkingDirectory=$APP_DIR
EnvironmentFile=$ENV_FILE
ExecStart=$APP_DIR/node_modules/.bin/next start -H 127.0.0.1
Restart=always
RestartSec=5
SuccessExitStatus=143
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=read-only

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable "$SERVICE" >/dev/null 2>&1 || true

# ---------------------------------------------------------------- nginx
log "Configuring Nginx ($NGINX_SITE)"
cat > "$NGINX_SITE" <<'EOF'
# JMSWORLD website — reverse proxy to the Next.js app.
# For HTTPS with a public domain: set server_name, then run
#   sudo apt-get install -y certbot python3-certbot-nginx && sudo certbot --nginx -d www.yourdomain.com
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    client_max_body_size 1m;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript application/xml image/svg+xml;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   Upgrade           $http_upgrade;
        proxy_set_header   Connection        "upgrade";
        proxy_read_timeout 60s;
    }
}
EOF
if [ -d /etc/nginx/sites-enabled ]; then
  rm -f /etc/nginx/sites-enabled/default
  ln -sfn "$NGINX_SITE" /etc/nginx/sites-enabled/jmsworld.conf
else
  # RHEL-style layout: the stock nginx.conf carries its own default server block; disable it.
  sed -i 's/^\(\s*\)listen\s\+80 default_server;/\1listen 80;/; s/^\(\s*\)listen\s\+\[::\]:80 default_server;/\1listen [::]:80;/' /etc/nginx/nginx.conf || true
fi
if command -v getenforce >/dev/null 2>&1 && [ "$(getenforce)" != "Disabled" ]; then
  setsebool -P httpd_can_network_connect 1 || true
fi
nginx -t
systemctl enable --now nginx >/dev/null 2>&1 || true
systemctl reload nginx

# ---------------------------------------------------------------- deploy permissions
log "Granting $DEPLOY_USER password-less control of $SERVICE only"
SYSTEMCTL=$(command -v systemctl)
cat > /etc/sudoers.d/jmsworld-deploy <<EOF
$DEPLOY_USER ALL=(root) NOPASSWD: $SYSTEMCTL restart $SERVICE, $SYSTEMCTL start $SERVICE, $SYSTEMCTL stop $SERVICE, $SYSTEMCTL status $SERVICE
EOF
chmod 440 /etc/sudoers.d/jmsworld-deploy
visudo -cf /etc/sudoers.d/jmsworld-deploy >/dev/null
getent group systemd-journal >/dev/null && usermod -aG systemd-journal "$DEPLOY_USER" || true

# ---------------------------------------------------------------- firewall
if command -v ufw >/dev/null 2>&1 && ufw status 2>/dev/null | grep -q "Status: active"; then
  log "Opening HTTP/HTTPS in ufw"
  ufw allow 80/tcp >/dev/null; ufw allow 443/tcp >/dev/null
fi
if command -v firewall-cmd >/dev/null 2>&1 && firewall-cmd --state >/dev/null 2>&1; then
  log "Opening HTTP/HTTPS in firewalld"
  firewall-cmd --permanent --add-service=http --add-service=https >/dev/null
  firewall-cmd --reload >/dev/null
fi

log "Bootstrap complete."
echo "    Deploy user : $DEPLOY_USER"
echo "    App dir     : $APP_DIR"
echo "    Environment : $ENV_FILE   (edit to add Resend keys)"
echo "    Site URL    : $SITE_URL"
echo "    Next step   : run deploy/deploy.sh from the project to upload, build and start the site."
