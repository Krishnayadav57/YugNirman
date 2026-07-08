# YugNirman — Production Website + Admin Panel

A full Next.js 14 (App Router) web application for **YugNirman**, a Nepal-based technology company — public marketing site, service booking system, customer accounts, contact form, legal pages, and a complete admin panel.

## Stack

- **Next.js 14** (App Router, Server Actions, Middleware)
- **Tailwind CSS** for styling
- **Supabase Auth** for both admin login and customer accounts (email/password, session cookies refreshed by middleware)
- **Supabase Postgres** for all site content (services, portfolio, bookings, messages, testimonials, settings) — same free-tier project as auth, accessed server-only via a service-role client
- **Resend** for email notifications on new bookings/messages (optional — degrades gracefully if not configured)
- In-memory rate limiting on public form endpoints
- Custom cursor glow/ring, scroll reveals, magnetic buttons, aurora background
- Cookie consent banner, Privacy Policy, Terms of Service, Cookie Policy, Refund & Cancellation Policy
- Dynamic OG image generation (`next/og`), `sitemap.xml`, `robots.txt`, custom 404

## 1. Set up Supabase (required — free tier is enough, no paid plan needed)

1. Create a project at [supabase.com](https://supabase.com) (free tier).
2. Go to **Settings → API** and copy: the Project URL, the `anon`/publishable key, and the `service_role` key (keep this one secret).
3. Go to **SQL Editor → New query**, paste the entire contents of `supabase/schema.sql`, and run it. This creates:
   - A `profiles` table (with a `role` column) for admin/user distinction, plus an auto-create trigger on signup
   - All site content tables — `settings`, `services`, `portfolio`, `testimonials`, `bookings`, `messages` — pre-seeded with the same starting content as before
4. Go to **Authentication → Providers** and make sure Email is enabled. For local testing, you can disable "Confirm email" under **Authentication → Settings** so signups work instantly without needing a real inbox.

Site content (services, bookings, messages, portfolio, testimonials, settings) now lives in this same Supabase Postgres database — there's no separate JSON file to manage, and no separate database/host to pay for.

## 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_SERVICE_ROLE_KEY` — all three from step 1
- `RESEND_API_KEY` / `NOTIFY_EMAIL` — optional, for email notifications (see below)

## 3. Install and run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public site.

## 4. Create your admin account

1. Go to `http://localhost:3000/signup` and create an account with your real email.
2. In the Supabase SQL Editor, run:
   ```sql
   update public.profiles set role = 'admin' where email = 'you@yugnirman.com';
   ```
3. Sign in at `http://localhost:3000/admin/login` with that same email/password.

Customers who sign up normally keep the default `user` role and can only access `/account` (their own bookings) — they never see `/admin`.

## What's included

**Public site**
- Home, Services (listing + individual detail pages), Portfolio, About, Contact, Book a Service
- Customer accounts: sign up, log in, `/account` shows a user's own booking requests
- Booking form (prefilled if logged in) → stored as a lead in the admin panel, tied to a service
- Contact form → stored as a message in the admin panel
- Legal pages: Privacy Policy, Terms of Service, Cookie Policy, Refund & Cancellation Policy — pre-written and pulling your live company details, but **must be reviewed by a lawyer** before you rely on them
- Cookie consent banner (accept/decline, remembered via `localStorage`)
- Social media links pulled from live settings
- No fake "trusted by" logos — an honest placeholder on the homepage and empty state on Portfolio, both auto-hide once you add real projects

**Admin panel** (`/admin`, protected by Supabase auth + `role = admin`)
- Dashboard with live counts
- Services, Portfolio, Testimonials: full create/edit/delete
- Bookings: pipeline status (new/contacted/in-progress/completed/declined), delete
- Messages: inbox, mark read/unread, delete
- Settings: company info, **legal & registration details (registration no., PAN, VAT, registered address)**, social media links, Google Maps embed, and password change (via Supabase)

## Email notifications

Without any setup, new bookings/messages still save correctly — you just won't get an email, and a line is logged to the server console instead. To turn on real email notifications:

1. Sign up at [resend.com](https://resend.com), verify a sending domain (or use their test domain while developing).
2. Set `RESEND_API_KEY` and `NOTIFY_EMAIL` (the inbox that should receive alerts) in `.env.local`.

## Rate limiting

`/api/booking` and `/api/contact` are limited to 5 requests/minute per IP using an in-memory limiter (`lib/rateLimit.js`). This works well for a single server instance. If you deploy across multiple instances or serverless functions, switch to a shared store like Upstash Redis (`@upstash/ratelimit`) — the function signature is designed to make that swap simple.

## Branding assets

- `public/logo-mark.svg` — icon-only logo (also the favicon via `app/icon.svg`)
- `public/logo-wordmark.svg` — full logo used in the navbar/footer
- `app/opengraph-image.jsx` — social share banner, generated on-the-fly as a PNG

Swap in your final designed logos by replacing these two SVG files with the same names.

## Site content database

Services, portfolio, testimonials, bookings, messages, and settings all live in Postgres (the same Supabase project as your auth), accessed only through `lib/db.js` via a server-only service-role client (`utils/supabase/admin.js`). Nothing in the UI or Server Actions talks to the database directly — they only ever call functions like `getServices()`, `addBooking()`, etc., so the storage layer can change again later (e.g. splitting into a separate database) without touching any page or component.

The `service_role` key bypasses Row Level Security and must stay server-only — it's never prefixed `NEXT_PUBLIC_` and is never imported into any client component.

## Deployment

```bash
npm run build
npm run start
```

Set all variables from `.env.example` in your hosting provider's environment settings (Vercel, Render, Railway, or any Node host all work — the database now lives in Supabase, not on local disk, so there's no persistence concern with serverless platforms anymore).

## Security notes before going fully live

- Supabase applies its own rate limiting to auth endpoints (signup/login) by default — no extra setup needed there.
- Have a lawyer review the legal pages (`/privacy`, `/terms`, `/cookies`, `/refund-policy`) and fill in your real registration/PAN/VAT numbers via Admin → Settings.
- Review `metadataBase` in `app/layout.jsx` and the base URL in `app/sitemap.js`/`app/robots.js` once you have your real domain.
- Consider adding error tracking (Sentry) and uptime monitoring once live.
