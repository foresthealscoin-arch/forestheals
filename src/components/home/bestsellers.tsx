'use client';

import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductImage } from '@/components/images/site-image';
import { formatINR } from '@/lib/commerce/money';
import type { Product } from '@/types/product';

export function BestsellersSection({ products }: { products: Product[] }) {
  return (
    <section className="mt-10 rounded-[32px] border border-[var(--line)] bg-[var(--paper)] p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--slate)]">Best sellers</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--near-black)] sm:text-4xl">
            The daily essentials people return to.
          </h2>
        </div>

        <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--near-black)]">
          Shop best sellers
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.article
            key={product.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-white"
          >
            <div className="relative h-64 overflow-hidden bg-[linear-gradient(135deg,#e8dfd1_0%,#dfe4de_100%)]">
              <ProductImage
                productSlug={product.slug}
                slot="primary"
                src={product.image}
                fallbackSrc={product.imageFallback}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
                placeholderClassName="block h-full w-full bg-[linear-gradient(135deg,#e8dfd1_0%,#dfe4de_100%)]"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--slate)]">Featured</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--cream)] px-2 py-1 text-[10px] font-medium text-[var(--charcoal)]">
                  <Star size={10} className="fill-current" />
                  {product.rating ?? 'New'}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.06em] text-[var(--near-black)]">{product.name}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{product.subtitle}</p>
              <div className="mt-5 flex items-center justify-between">
                <p className="text-xl font-semibold text-[var(--near-black)]">{formatINR(product.priceCents)}</p>
                <Link href={`/shop/${product.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--near-black)]">
                  View
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
