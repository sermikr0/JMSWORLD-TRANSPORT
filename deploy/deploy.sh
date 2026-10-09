#!/usr/bin/env bash
#
# Deploys the site to the server: uploads the sources, installs dependencies,
# builds, restarts jmsworld.service and runs a health check.
#
#   deploy/deploy.sh                  # uses DEPLOY_HOST or admin@10.15.1.233
#   deploy/deploy.sh user@host
#
# Requires: the server bootstrapped once with deploy/server-bootstrap.sh, and the
# deploy key (~/.ssh/jmsworld_deploy by default, override with DEPLOY_KEY) installed
# in the deploy user's ~/.ssh/authorized_keys. Works from Git Bash on Windows.
set -euo pipefail
cd "$(dirname "$0")/.."

TARGET="${1:-${DEPLOY_HOST:-admin@10.15.1.233}}"
KEY="${DEPLOY_KEY:-$HOME/.ssh/jmsworld_deploy}"
SSH_OPTS=(-i "$KEY" -o IdentitiesOnly=yes -o BatchMode=yes -o StrictHostKeyChecking=accept-new)
export MSYS_NO_PATHCONV=1

echo "==> Packing sources"
ARCHIVE="$(mktemp -t jmsworld-release-XXXXXX).tgz"
tar -czf "$ARCHIVE" \
  --exclude=./node_modules --exclude=./.next --exclude=./.git \
  --exclude='./.env.local' --exclude='./.env.production' --exclude='./.env.development' \
  --exclude='*.log' --exclude='*.tsbuildinfo' .

echo "==> Uploading to $TARGET"
scp "${SSH_OPTS[@]}" -q "$ARCHIVE" "$TARGET:/tmp/jmsworld-release.tgz"
rm -f "$ARCHIVE"

echo "==> Installing, building and restarting on the server"
ssh "${SSH_OPTS[@]}" "$TARGET" bash -s <<'REMOTE'
set -euo pipefail
APP_DIR=/srv/jmsworld/app
ENV_FILE=/etc/jmsworld/jmsworld.env
[ -f "$ENV_FILE" ] || { echo "Missing $ENV_FILE — run server-bootstrap.sh first." >&2; exit 1; }

mkdir -p "$APP_DIR"
# Keep node_modules and the build cache between deploys; replace everything else.
find "$APP_DIR" -mindepth 1 -maxdepth 1 ! -name node_modules ! -name .next -exec rm -rf {} +
tar -xzf /tmp/jmsworld-release.tgz -C "$APP_DIR"
rm -f /tmp/jmsworld-release.tgz
cd "$APP_DIR"

# NEXT_PUBLIC_* values are inlined at build time, so the build sees the same env as the service.
set -a; . "$ENV_FILE"; set +a

# --include=dev: the build needs Tailwind/TypeScript even though NODE_ENV=production.
echo "    npm ci"
npm ci --include=dev --no-audit --no-fund --loglevel=error
echo "    next build"
npm run build --silent 2>&1 | tail -n 20

echo "    restarting jmsworld.service"
sudo -n systemctl restart jmsworld.service
for i in 1 2 3 4 5 6 7 8 9 10; do
  sleep 1
  if curl -fsS -o /dev/null http://127.0.0.1:3000/; then break; fi
  [ "$i" -eq 10 ] && { echo "App did not answer on :3000" >&2; sudo -n systemctl status jmsworld.service --no-pager | tail -n 20; exit 1; }
done
echo "    app answered on 127.0.0.1:3000"
curl -fsS -o /dev/null -w '    nginx answered: HTTP %{http_code}\n' http://127.0.0.1/
REMOTE

echo "==> Deployed. Open http://${TARGET#*@}/"
