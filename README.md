# YugNirman — Production Website + Admin Panel

A full Next.js 14 (App Router) web application for **YugNirman**, a Nepal-based technology company — public marketing site, service booking system, contact form, and a complete admin panel to manage everything.

## Stack

- **Next.js 14** (App Router, Server Actions, Middleware)
- **Tailwind CSS** for styling
- **JWT session auth** (`jose`) for the admin panel, passwords hashed with `bcryptjs`
- **JSON file data layer** (`data/db.json`) — zero external database required to run. Swappable for Postgres/Prisma later (see below).
- Custom cursor glow/ring, scroll reveals, magnetic buttons, aurora background — all hand-rolled CSS/JS, no heavy animation library required.
- Dynamic OG image generation (`next/og`), `sitemap.xml`, `robots.txt`, custom 404.

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit SESSION_SECRET
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the admin panel.

### Default admin login

```
Username: admin
Password: YugNirman@2026
```

**Change this password immediately** after first login via Admin → Settings → Change admin password. Also set a strong, random `SESSION_SECRET` in `.env.local` before deploying (e.g. `openssl rand -base64 48`).

## What's included

**Public site**
- Home, Services (listing + individual detail pages), Portfolio, About, Contact, Book a Service
- Booking form → stored as a lead in the admin panel, tied to a specific service
- Contact form → stored as a message in the admin panel
- Social media links pulled from live settings (edit in Admin → Settings)
- No fake "trusted by" logos — there's an honest placeholder section on the homepage and an empty state on the Portfolio page, both of which disappear automatically once you add real projects in the admin panel

**Admin panel** (`/admin`, protected by login)
- Dashboard with live counts (bookings, messages, services, etc.)
- Services: create/edit/delete
- Portfolio: add real projects as you complete them (title, description, tags, live/GitHub links)
- Testimonials: add real client testimonials
- Bookings: view submitted requests, update status (new/contacted/in-progress/completed/declined), delete
- Messages: inbox for contact form submissions, mark read/unread, delete
- Settings: company info, contact details, all social media links, Google Maps embed URL, and admin password change

## Branding assets

- `public/logo-mark.svg` — icon-only logo (also used as the favicon via `app/icon.svg`)
- `public/logo-wordmark.svg` — full logo used in the navbar/footer
- `app/opengraph-image.jsx` — social share banner, generated on-the-fly as a PNG (no static image file needed, always in sync with brand colors)

To swap in real designed logos later, just replace the two SVG files with the same names (or update the `<Image>` paths in `components/Navbar.jsx` and `components/Footer.jsx`).

## Moving to a real database (recommended before heavy production traffic)

The JSON file store in `lib/db.js` is intentionally isolated behind simple functions (`getServices`, `addBooking`, etc.) so it can be swapped for Postgres + Prisma (or any DB) without touching UI code:

1. Add `prisma`, define a schema mirroring the shapes in `data/db.json`.
2. Reimplement each exported function in `lib/db.js` using Prisma Client instead of `fs`.
3. Nothing else in the app needs to change.

The JSON approach works fine for low-to-moderate traffic and is simplest to self-host, but a single JSON file is not safe for concurrent writes at scale — migrate before you have real production load.

## Deployment

Works on Vercel, or any Node host:

```bash
npm run build
npm run start
```

Set `SESSION_SECRET` as an environment variable in your hosting provider. If deploying to a serverless/read-only filesystem (like Vercel's default), you'll need to move `data/db.json` to a persistent store (a database, or a volume) since serverless functions can't durably write to the local filesystem — this is the main reason to complete the Postgres migration above before deploying to Vercel.

## Security notes before going fully live

- This ships with a working but minimal auth setup (single admin account, JWT cookie). Add rate-limiting on `/admin/login` and the public API routes (`/api/booking`, `/api/contact`) before production.
- Add a proper email service (Resend, SendGrid, etc.) to notify you when a booking/message comes in — currently they only appear in the admin panel.
- Review and update `metadataBase` URL in `app/layout.jsx` and the `sitemap.js`/`robots.js` base URL once you have a real domain.
