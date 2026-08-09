import {
  bigint,
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
});

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  categoryId: uuid('category_id').references(() => categories.id),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const variants = pgTable('variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id),
  sku: text('sku').notNull().unique(),
  name: text('name').notNull(),
  priceCents: integer('price_cents').notNull(),
  stock: integer('stock').notNull().default(0),
  active: boolean('active').notNull().default(true),
});

export const productImages = pgTable('product_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id),
  url: text('url').notNull(),
  alt: text('alt'),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const siteImages = pgTable(
  'site_images',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    filename: text('filename').notNull(),
    slug: text('slug')
      .notNull()
      .generatedAlwaysAs(
        sql`btrim(regexp_replace(lower(regexp_replace(filename, '\\.[^.]+$', '')), '[^a-z0-9]+', '-', 'g'), '-')`,
      ),
    category: text('category').notNull(),
    storagePath: text('storage_path').notNull().unique(),
    publicUrl: text('public_url').notNull(),
    altText: text('alt_text').notNull(),
    entityType: text('entity_type').notNull(),
    entitySlug: text('entity_slug').notNull(),
    variant: text('variant'),
    slot: text('slot').notNull().default('primary'),
    page: text('page').notNull(),
    position: text('position').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
    isActive: boolean('is_active').notNull().default(true),
    needsReview: boolean('needs_review').notNull().default(false),
    width: integer('width'),
    height: integer('height'),
    mimeType: text('mime_type'),
    fileSize: bigint('file_size', { mode: 'number' }),
    contentHash: text('content_hash'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('idx_site_images_entity_type').on(table.entityType),
    index('idx_site_images_entity_slug').on(table.entitySlug),
    index('idx_site_images_page').on(table.page),
    index('idx_site_images_slot').on(table.slot),
    index('idx_site_images_active_entity_slot_sort_order').on(
      table.isActive,
      table.entityType,
      table.entitySlug,
      table.slot,
      table.sortOrder,
    ),
    index('idx_site_images_active_page_slot_sort_order').on(
      table.isActive,
      table.page,
      table.slot,
      table.sortOrder,
    ),
  ],
);

export type SiteImage = typeof siteImages.$inferSelect;
export type NewSiteImage = typeof siteImages.$inferInsert;

export const customers = pgTable('customers', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').references(() => customers.id),
  status: text('status').notNull().default('pending'),
  totalCents: integer('total_cents').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id),
  variantId: uuid('variant_id')
    .notNull()
    .references(() => variants.id),
  quantity: integer('quantity').notNull(),
  priceCents: integer('price_cents').notNull(),
});

export const ingredients = pgTable('ingredients', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
});

export const productIngredients = pgTable('product_ingredients', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id),
  ingredientId: uuid('ingredient_id')
    .notNull()
    .references(() => ingredients.id),
  amount: text('amount'),
});

export const productBenefits = pgTable('product_benefits', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id),
  benefit: text('benefit').notNull(),
});

export const evidenceSources = pgTable('evidence_sources', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  sourceType: text('source_type').notNull(),
  url: text('url'),
  doi: text('doi'),
  evidenceLevel: text('evidence_level'),
  publishedAt: timestamp('published_at'),
});

export const productEvidence = pgTable('product_evidence', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id),
  evidenceSourceId: uuid('evidence_source_id')
    .notNull()
    .references(() => evidenceSources.id),
  claim: text('claim').notNull(),
});

export const analyticsEvents = pgTable('analytics_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').references(() => customers.id),
  event: text('event').notNull(),
  path: text('path'),
  metadata: text('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
