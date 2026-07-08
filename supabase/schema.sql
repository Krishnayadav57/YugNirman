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
