-- Run this in the Supabase SQL Editor (Project → SQL Editor → New query) once,
-- before using the site. It creates a `profiles` table that stores each user's
-- role ("user" or "admin"), which the app uses to decide who can access /admin.

-- 1. Table
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now()
);

-- 2. Row Level Security
alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 3. Auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Promote your admin account
-- After you sign up once through /signup (or create a user in Supabase Auth →
-- Users), run this to make that account an admin. Replace the email:

-- update public.profiles set role = 'admin' where email = 'you@yugnirman.com';


-- =====================================================================
-- SITE CONTENT TABLES
-- These replace the old data/db.json file. The app talks to them using
-- the Supabase SERVICE ROLE key on the server only (lib/db.js), which
-- bypasses Row Level Security entirely — so these tables intentionally
-- have RLS enabled with NO public policies. Only server-side code with
-- the service role key can read/write them; the browser (anon key) never
-- touches these tables directly.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------- Settings (single row) ----------
create table if not exists public.settings (
  id text primary key default 'main',
  company_name text default 'YugNirman',
  tagline text,
  mission text,
  vision text,
  email text,
  phone text,
  whatsapp text,
  address text,
  map_embed_url text,
  legal jsonb default '{}'::jsonb,
  socials jsonb default '{}'::jsonb
);
alter table public.settings enable row level security;

insert into public.settings (id, company_name, tagline, mission, vision, email, phone, whatsapp, address, map_embed_url, legal, socials)
values (
  'main',
  'YugNirman',
  'Building the Next Era Through Technology',
  'Empower businesses with intelligent digital solutions.',
  'Build Nepal''s most innovative technology company while serving clients globally.',
  'hello@yugnirman.com',
  '+977-1-4123456',
  '+9779800000000',
  'Sanepa, Lalitpur, Kathmandu Valley, Nepal',
  'https://www.google.com/maps?q=Kathmandu,Nepal&output=embed',
  '{"registrationNo": "", "panNo": "", "vatNo": "", "registeredAddress": ""}',
  '{"facebook": "https://facebook.com/yugnirman", "instagram": "https://instagram.com/yugnirman", "linkedin": "https://linkedin.com/company/yugnirman", "x": "https://x.com/yugnirman", "youtube": "https://youtube.com/@yugnirman", "github": "https://github.com/yugnirman", "tiktok": "https://tiktok.com/@yugnirman"}'
)
on conflict (id) do nothing;

-- ---------- Services ----------
create table if not exists public.services (
  id text primary key,
  title text not null,
  slug text unique not null,
  icon text,
  short_desc text,
  description text,
  features text[] default '{}',
  starting_price text,
  created_at timestamptz default now()
);
alter table public.services enable row level security;

insert into public.services (id, title, slug, icon, short_desc, description, features, starting_price) values
('svc_ai', 'AI Solutions', 'ai-solutions', 'brain-circuit', 'Custom LLM integrations, intelligent agents, and ML pipelines built for real business outcomes.', 'We design and ship production AI systems — from customer-facing chatbots and internal copilots to document intelligence and predictive models — integrated directly into your existing workflows.', array['LLM & RAG integration','Custom AI agents','Predictive analytics','Computer vision','MLOps & monitoring'], 'Custom quote'),
('svc_web', 'Web Development', 'web-development', 'globe', 'High-performance web platforms engineered for speed, SEO, and conversion.', 'From marketing sites to complex web applications, we build with modern frameworks for performance, accessibility, and long-term maintainability.', array['Next.js / React apps','E-commerce platforms','CMS-driven websites','Performance optimization','SEO architecture'], 'From NPR 150,000'),
('svc_mobile', 'Mobile App Development', 'mobile-app-development', 'smartphone', 'Cross-platform apps that feel native, shipped fast without compromising quality.', 'We build iOS and Android apps from a single codebase using Flutter and React Native, backed by robust APIs and CI/CD pipelines.', array['iOS & Android','Flutter / React Native','Push notifications','Offline-first architecture','App Store deployment'], 'From NPR 250,000'),
('svc_cloud', 'Cloud Solutions', 'cloud-solutions', 'cloud', 'Scalable, secure cloud architecture built to handle real traffic.', 'We architect and manage cloud infrastructure on AWS, GCP, and Cloudflare — built for resilience, security, and cost efficiency at scale.', array['Cloud architecture design','Migration & modernization','Auto-scaling infrastructure','Cost optimization','24/7 monitoring'], 'Custom quote'),
('svc_automation', 'Business Automation', 'business-automation', 'workflow', 'Workflow automation that eliminates manual work and connects your stack.', 'We identify repetitive operational bottlenecks and automate them — connecting your tools, data, and teams into one seamless system.', array['Workflow automation','System integrations','Custom internal tools','Data pipelines','Reporting dashboards'], 'From NPR 100,000'),
('svc_enterprise', 'Enterprise Software', 'enterprise-software', 'building-2', 'Mission-critical internal systems built with security and compliance first.', 'We build ERPs, CRMs, and custom internal platforms for organizations that need reliability, access control, and long-term support.', array['Custom ERP / CRM','Role-based access control','Audit logging','Legacy system integration','Compliance-ready architecture'], 'Custom quote'),
('svc_uiux', 'UI/UX Design', 'ui-ux-design', 'palette', 'Interfaces designed with intention — every pixel earns its place.', 'From product strategy to high-fidelity prototypes, our design process is rooted in research, usability, and brand identity.', array['Product design','Design systems','User research','Prototyping','Brand identity'], 'From NPR 60,000'),
('svc_devops', 'DevOps', 'devops', 'settings-2', 'CI/CD pipelines, infrastructure as code, and zero-downtime deployments.', 'We set up the infrastructure discipline behind reliable software — automated pipelines, observability, and infrastructure as code.', array['CI/CD pipelines','Infrastructure as code','Container orchestration','Observability & alerting','Zero-downtime deployments'], 'From NPR 80,000'),
('svc_saas', 'SaaS Development', 'saas-development', 'layers', 'Full-cycle SaaS builds — from MVP to multi-tenant platform.', 'We take SaaS products from idea to scale: multi-tenancy, billing, authentication, and the operational tooling needed to grow.', array['Multi-tenant architecture','Subscription billing','Authentication & RBAC','Admin dashboards','API-first design'], 'Custom quote')
on conflict (id) do nothing;

-- ---------- Portfolio ----------
create table if not exists public.portfolio (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tags text[] default '{}',
  live_url text,
  github_url text,
  created_at timestamptz default now()
);
alter table public.portfolio enable row level security;

-- ---------- Testimonials ----------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text not null,
  rating int default 5,
  created_at timestamptz default now()
);
alter table public.testimonials enable row level security;

-- ---------- Bookings ----------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  service_id text references public.services(id),
  budget text,
  timeline text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);
alter table public.bookings enable row level security;

-- ---------- Messages ----------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);
alter table public.messages enable row level security;
