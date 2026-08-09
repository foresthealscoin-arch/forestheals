create table if not exists public.site_images (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  slug text generated always as (
    btrim(
      regexp_replace(
        lower(regexp_replace(filename, '\.[^.]+$', '')),
        '[^a-z0-9]+',
        '-',
        'g'
      ),
      '-'
    )
  ) stored not null,
  category text not null check (category in ('products', 'brand')),
  storage_path text not null unique,
  public_url text not null,
  alt_text text not null,
  entity_type text not null,
  entity_slug text not null,
  variant text,
  slot text not null default 'primary',
  page text not null,
  position text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  needs_review boolean not null default false,
  width integer,
  height integer,
  mime_type text,
  file_size bigint,
  content_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_site_images_entity_type
  on public.site_images(entity_type);
create index if not exists idx_site_images_entity_slug
  on public.site_images(entity_slug);
create index if not exists idx_site_images_page
  on public.site_images(page);
create index if not exists idx_site_images_slot
  on public.site_images(slot);
create index if not exists idx_site_images_active_entity_slot_sort_order
  on public.site_images(is_active, entity_type, entity_slug, slot, sort_order);
create index if not exists idx_site_images_active_page_slot_sort_order
  on public.site_images(is_active, page, slot, sort_order);

create or replace function public.set_site_images_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_images_set_updated_at on public.site_images;
create trigger site_images_set_updated_at
before update on public.site_images
for each row execute function public.set_site_images_updated_at();

alter table public.site_images enable row level security;

drop policy if exists "site_images_select_active_public" on public.site_images;
create policy "site_images_select_active_public" on public.site_images
for select
to anon, authenticated
using (is_active = true);

insert into storage.buckets (id, name, public)
values ('website-images', 'website-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "website_images_select_public" on storage.objects;
create policy "website_images_select_public" on storage.objects
for select
to anon, authenticated
using (bucket_id = 'website-images');
