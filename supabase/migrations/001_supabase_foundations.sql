create extension if not exists pgcrypto;

-- profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

-- addresses
create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  full_name text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

-- products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  price_inr integer not null,
  compare_at_price integer,
  category text,
  tags text[] not null default '{}',
  stock_qty integer not null default 0,
  images text[] not null default '{}',
  rating numeric(3,2) not null default 0,
  is_bestseller boolean not null default false,
  is_subscription boolean not null default false,
  created_at timestamptz not null default now()
);

-- orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending',
  subtotal integer not null default 0,
  shipping_fee integer not null default 0,
  total integer not null default 0,
  payment_id text,
  payment_status text not null default 'pending',
  shipping_address jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- order_items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  qty integer not null check (qty > 0),
  price_at_purchase integer not null,
  created_at timestamptz not null default now()
);

-- carts
create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  session_token text,
  items jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  unique (user_id),
  unique (session_token)
);

-- reviews
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.addresses enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.carts enable row level security;
alter table public.reviews enable row level security;

-- profiles
create policy "profiles_select_own" on public.profiles
for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
for update using (auth.uid() = id) with check (auth.uid() = id);

-- addresses
create policy "addresses_select_own" on public.addresses
for select using (auth.uid() = user_id);

create policy "addresses_insert_own" on public.addresses
for insert with check (auth.uid() = user_id);

create policy "addresses_update_own" on public.addresses
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- orders
create policy "orders_select_own" on public.orders
for select using (auth.uid() = user_id);

create policy "orders_insert_own" on public.orders
for insert with check (auth.uid() = user_id);

create policy "orders_update_own" on public.orders
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- order_items (linked to orders; read only through order ownership)
create policy "order_items_select_own" on public.order_items
for select using (
  exists (
    select 1 from public.orders o
    where o.id = order_items.order_id and o.user_id = auth.uid()
  )
);

create policy "order_items_insert_own" on public.order_items
for insert with check (
  exists (
    select 1 from public.orders o
    where o.id = order_items.order_id and o.user_id = auth.uid()
  )
);

-- products: public read, writes only via service role
create policy "products_select_public" on public.products
for select using (true);

create policy "products_write_service_role_only" on public.products
for all using (false) with check (false);

-- reviews: public read, writes only via service role
create policy "reviews_select_public" on public.reviews
for select using (true);

create policy "reviews_write_service_role_only" on public.reviews
for all using (false) with check (false);

-- carts: signed-in user or matching guest session token
create policy "carts_select_access" on public.carts
for select using (
  auth.uid() = user_id
  or (
    session_token is not null
    and session_token = coalesce(current_setting('request.headers', true)::jsonb ->> 'x-forestheals-session', '')
  )
);

create policy "carts_insert_access" on public.carts
for insert with check (
  auth.uid() = user_id
  or (
    session_token is not null
    and session_token = coalesce(current_setting('request.headers', true)::jsonb ->> 'x-forestheals-session', '')
  )
);

create policy "carts_update_access" on public.carts
for update using (
  auth.uid() = user_id
  or (
    session_token is not null
    and session_token = coalesce(current_setting('request.headers', true)::jsonb ->> 'x-forestheals-session', '')
  )
) with check (
  auth.uid() = user_id
  or (
    session_token is not null
    and session_token = coalesce(current_setting('request.headers', true)::jsonb ->> 'x-forestheals-session', '')
  )
);

-- indexes
create index if not exists idx_profiles_full_name on public.profiles(full_name);
create index if not exists idx_addresses_user_id on public.addresses(user_id);
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_carts_user_id on public.carts(user_id);
create index if not exists idx_carts_session_token on public.carts(session_token);
create index if not exists idx_reviews_product_id on public.reviews(product_id);
