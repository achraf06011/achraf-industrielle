-- Run this in Supabase SQL Editor to add new features

-- 1. Add gallery_images to projects
alter table public.projects
  add column if not exists gallery_images text[] not null default '{}';

-- 2. Create clients table
create table if not exists public.clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  logo_url text,
  description_fr text,
  description_en text,
  description_ar text,
  website text,
  order_index integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- RLS for clients
alter table public.clients enable row level security;

create policy "Public read clients"
  on public.clients for select
  using (true);

create policy "Authenticated insert clients"
  on public.clients for insert
  to authenticated
  with check (true);

create policy "Authenticated update clients"
  on public.clients for update
  to authenticated
  using (true) with check (true);

create policy "Authenticated delete clients"
  on public.clients for delete
  to authenticated
  using (true);

-- Sample clients (optional)
insert into public.clients (name, description_fr, order_index) values
  ('Groupe OCP', 'Maintenance industrielle et installations électriques', 1),
  ('Cosumar', 'Construction métallique et maintenance préventive', 2),
  ('Sonacos', 'Usinage de précision et équipements industriels', 3);
