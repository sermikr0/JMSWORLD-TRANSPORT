# JMSWORLD TRANSPORT LLC — website

Production website for JMSWORLD TRANSPORT LLC, a transportation company in
Norwood, Ohio (USDOT 3642835 · MC 1252524).

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript ·
Tailwind CSS 4 · react-hook-form + zod · Resend (email) · Lucide icons.

## Pages

| Route         | Purpose                                                              |
| ------------- | -------------------------------------------------------------------- |
| `/`           | Hero, company introduction, services overview, why JMSWORLD, quote CTA, contact strip |
| `/about`      | Company overview, mission, operating principles, safety & communication |
| `/services`   | Service catalog (FTL, LTL, regional, long-haul, dedicated)           |
| `/quote`      | Freight inquiry form (server-validated, emailed to the office)       |
| `/contact`    | Phone, address, business inquiry form, map                           |
| `/compliance` | USDOT / MC identifiers with links to the official FMCSA records      |
| `/privacy`    | Plain-language privacy notice for the forms                          |
| `404`         | Custom not-found page; `error.tsx` handles runtime errors            |

Also generated: `/sitemap.xml`, `/robots.txt`, an Open Graph image, PNG favicon
and Apple touch icon, and LocalBusiness JSON-LD (name, address, phone, USDOT/MC
only — no ratings or unverified claims).

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Quality checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Environment variables

See [`.env.example`](.env.example). Nothing is hard-coded; without the email
variables the forms show a genuine "not available, please call" error rather
than a fake success.

| Variable                              | Required | Purpose                                                     |
| ------------------------------------- | -------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                | yes      | Public origin, e.g. `https://www.jmsworldtransport.com`. Used for canonical URLs, sitemap, robots and Open Graph. |
| `RESEND_API_KEY`                      | yes      | API key from [resend.com](https://resend.com)                |
| `INQUIRY_TO_EMAIL`                    | yes      | Inbox(es) that receive inquiries, comma-separated           |
| `INQUIRY_FROM_EMAIL`                  | yes      | Sender on a domain verified in Resend, e.g. `JMSWORLD Website <website@yourdomain.com>` |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY` | no     | Shows an embedded Google Map on `/contact`. Restrict the key to your domain. Without it, an address panel with a directions link is shown. |

## Motion and the hero video

- The homepage hero plays a muted, looping clip over a still poster
  (`src/components/home/hero-media.tsx`). The poster is the LCP image and is
  always rendered; the video fades in only once it is really playing, pauses
  when scrolled out of view, dissolves back to the poster just before each
  loop point, and is skipped entirely on screens under 768px, with
  `prefers-reduced-motion`, or when the browser's data saver is on.
- Clip and poster are configured in `src/lib/images.ts` (`heroVideo`).
  Currently they are hotlinked from Pexels (free license). To self-host or use
  the company's own footage, put `hero-loop.mp4` (H.264, 1080p, 8–12 MB,
  8–20 s) in `public/videos/`, a JPEG of its first frame in `public/images/`,
  point `heroVideo` at them and drop `videos.pexels.com` / `images.pexels.com`
  from the CSP in `next.config.ts`.
- Section reveals use CSS scroll-driven animations (`reveal`, `reveal-zoom`,
  `reveal-line` utilities in `globals.css`) with no JavaScript; browsers
  without support simply show the content. Keep revealed elements out of
  `overflow-hidden` ancestors (use `overflow-clip`), or the view timeline
  attaches to the wrong scroller.
- Other motion: staggered hero text, a slow drift zoom on hero photos, a
  lightweight scroll parallax, the "within a day's drive" ticker
  (`Marquee`), page-enter fade (`app/template.tsx`) and the sticky section nav
  on `/services`. Everything respects `prefers-reduced-motion`.

## Before launch — things to confirm with the company

1. **Services.** `src/content/services.ts` lists five *proposed* categories
   (FTL, LTL, regional, long-haul, dedicated). Remove or edit any the company
   does not actually offer; every services section reads from that file.
2. **Photography.** Images are hotlinked from Unsplash (free for commercial use).
   Replace them with the company's own truck and facility photos: put files in
   `public/images/` and change the `src` values in `src/lib/images.ts` to local
   paths (e.g. `/images/hero.jpg`). The `<Photo>` component then uses the
   built-in Next.js optimizer automatically.
3. **Copy.** All text lives in the page files under `src/app/` and in
   `src/content/`. It deliberately avoids fleet sizes, years in business,
   certifications, testimonials and statistics — add those only once verified.
4. **Business hours.** Not published because they were not provided. Add them
   to `src/lib/site.ts` and surface them on `/contact` when known.
5. **Domain.** Set `NEXT_PUBLIC_SITE_URL`, verify the sending domain in Resend,
   and submit `/sitemap.xml` in Google Search Console.

## How the forms work

- Client validation with react-hook-form + zod; the **same zod schema runs
  again on the server** in `src/server/actions.ts` (a Server Action), so
  nothing is trusted from the browser.
- Spam protection: a hidden honeypot field, a minimum fill time of 3 seconds,
  and an in-memory sliding-window rate limit (5 submissions / 15 min per IP;
  `src/server/rate-limit.ts`). The limiter is per Node.js process — fine for a
  single server; swap in Redis/Upstash if you ever run several instances.
- Delivery via Resend (`src/server/mail.ts`). User input is HTML-escaped; the
  visitor's email is set as `Reply-To` so the office can reply directly.
- Every failure path (not configured, provider error, network error, rate
  limited) returns a clear error with the phone number. Success is only shown
  when Resend accepted the message.

To test delivery: set the three email variables, submit the quote form, and
check the inbox. To see the failure state: leave them unset.

## Security

- Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy, X-Frame-Options) are set in `next.config.ts`.
  The CSP allows inline scripts/styles because pages are statically
  prerendered (no per-request nonce). Only `images.unsplash.com` (images) and
  `www.google.com` (map iframe) are allowed as external origins.
  HSTS and `upgrade-insecure-requests` switch on automatically when
  `NEXT_PUBLIC_SITE_URL` starts with `https://` (they would break a plain-HTTP
  deployment), so set that value and redeploy once TLS is in place.
- Secrets are read only in server code (`src/server/*`); nothing under
  `NEXT_PUBLIC_` is secret. The Maps Embed key is public by design — restrict
  it by HTTP referrer in Google Cloud Console.
- The rate limiter reads the client IP from `X-Forwarded-For` / `X-Real-IP`.
  Make sure your reverse proxy sets them (see below); without them all visitors
  share one bucket with a higher limit.
- Keep dependencies current: `npm audit` and `npm outdated`.

## Deployment (self-hosted on a Linux server)

Two scripts in `deploy/` handle the whole thing:

1. **Once per server** — upload and run the bootstrap as root. It installs
   Node 24 (checksum-verified tarball), Nginx as a reverse proxy, the
   `jmsworld.service` systemd unit, `/etc/jmsworld/jmsworld.env` for secrets,
   and a sudoers rule that lets the deploy user restart *only* that service:

   ```bash
   scp deploy/server-bootstrap.sh admin@SERVER:/tmp/jmsworld-bootstrap.sh
   ssh -t admin@SERVER "sudo bash /tmp/jmsworld-bootstrap.sh"
   ```

2. **Every release** — from the project folder (Git Bash on Windows works):

   ```bash
   deploy/deploy.sh admin@SERVER
   ```

   It uploads the sources, runs `npm ci` and `next build` on the server,
   restarts the service and checks that both the app (`:3000`) and Nginx
   (`:80`) answer. Authentication uses the SSH key `~/.ssh/jmsworld_deploy`
   (override with `DEPLOY_KEY`); no passwords are stored anywhere.

Secrets live in `/etc/jmsworld/jmsworld.env` on the server (root-owned,
readable by the deploy user). Edit it, then `sudo systemctl restart jmsworld`;
`NEXT_PUBLIC_*` values are baked in at build time, so change those and redeploy.

Manual equivalent, if you prefer your own process manager:

```bash
npm ci
npm run build
npm run start -- --port 3000
```

The generated Nginx site forwards the client address, which the rate limiter
needs. For HTTPS, point a domain at the server and run
`sudo certbot --nginx -d www.yourdomain.com`; a reference config:

```nginx
server {
    listen 443 ssl http2;
    server_name www.example.com;
    # ssl_certificate / ssl_certificate_key from certbot

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

Use SSH key authentication for the server and keep sudo access limited to the
deploy user. The site also deploys unchanged to Vercel or any Node.js host.

## Project structure

```
src/
  app/               routes, metadata, sitemap/robots, OG image, icons, 404, error
  components/
    brand/           logo mark and wordmark
    layout/          header (responsive nav), footer, skip link
    forms/           quote form, contact form, shared field components
    sections/        page hero, CTA band, contact strip, map embed
    home/            homepage sections
    ui/              container, button, section heading, photo
  content/           services catalog, principles (edit copy here)
  lib/               site constants, images, validation schemas, helpers
  server/            server action, email delivery, rate limiter (server only)
```

## Brand

The logo is the JMS monogram over a North America globe, framed by red and
black orbit swooshes, above the "JMSWORLD Transport LLC" wordmark. Files live in
`src/assets/brand/` (transparent PNGs cut from the company's artwork):

- `logo.png` — original colours, for light backgrounds.
- `logo-on-dark.png` — reversed (black parts in white, red slightly lifted), used
  in the header, footer and Open Graph image on brand navy.

`<Logo tone="dark" | "light" height={…} />` in `src/components/brand/logo.tsx`
picks the right file. The favicon (`src/app/icon.png`) and Apple touch icon
(`src/app/apple-icon.png`) use the monogram and globe without the wordmark, on
white. Site UI colours are still navy `#0a1730` with accent blue `#5f8ff7`.
Typography: Manrope (display) and Inter (text), self-hosted through `next/font`.
