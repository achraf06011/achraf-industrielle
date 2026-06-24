-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Projects table
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  title_fr text not null,
  title_en text,
  title_ar text,
  description_fr text,
  description_en text,
  description_ar text,
  category text not null check (category in ('metallic', 'maintenance', 'electrical', 'agro', 'textile')),
  location text,
  year text not null,
  image_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_projects_updated
  before update on public.projects
  for each row execute function public.handle_updated_at();

-- Row Level Security
alter table public.projects enable row level security;

-- Public can read all projects
create policy "Public read access"
  on public.projects for select
  using (true);

-- Only authenticated users (admin) can insert/update/delete
create policy "Authenticated insert"
  on public.projects for insert
  to authenticated
  with check (true);

create policy "Authenticated update"
  on public.projects for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated delete"
  on public.projects for delete
  to authenticated
  using (true);

-- Storage bucket for project images
insert into storage.buckets (id, name, public)
  values ('projects', 'projects', true)
  on conflict (id) do nothing;

-- Storage RLS: anyone can read
create policy "Public read storage"
  on storage.objects for select
  using (bucket_id = 'projects');

-- Storage RLS: authenticated users can upload
create policy "Authenticated upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'projects');

-- Storage RLS: authenticated users can delete
create policy "Authenticated delete storage"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'projects');

-- Sample projects (optional - remove if you want to start empty)
insert into public.projects (title_fr, title_en, category, year, featured, description_fr) values
  ('Structure métallique industrielle', 'Industrial metal structure', 'metallic', '2024', true, 'Conception et réalisation d''une charpente métallique pour entrepôt industriel de 2000m².'),
  ('Maintenance usine agroalimentaire', 'Agri-food plant maintenance', 'maintenance', '2023', false, 'Maintenance préventive et corrective d''une ligne de production alimentaire.'),
  ('Installation électrique industrielle', 'Industrial electrical installation', 'electrical', '2024', true, 'Câblage et tableau électrique pour unité de production textile.');
