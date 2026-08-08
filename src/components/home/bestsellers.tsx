'use client';

import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const products = [
  {
    name: 'Collagen Coffee',
    subtitle: 'Hair • Skin • Nails',
    rating: 4.9,
    price: '₹999',
    accent: 'from-[#e8dfd1] to-[#dfe4de]',
  },
  {
    name: 'Hydration + Electrolytes',
    subtitle: 'Daily balance',
    rating: 4.8,
    price: '₹799',
    accent: 'from-[#dfe7eb] to-[#f3efe8]',
  },
  {
    name: 'Sleep Restore',
    subtitle: 'Night reset',
    rating: 4.8,
    price: '₹949',
    accent: 'from-[#e1dae4] to-[#f3efe8]',
  },
];

export function BestsellersSection() {
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
            <div className={`h-64 bg-gradient-to-br ${product.accent} p-5`}>
              <div className="flex h-full items-end justify-between">
                <div className="h-20 w-16 rounded-[18px] border border-[var(--charcoal)]/10 bg-white/40 shadow-[0_12px_32px_rgba(31,32,40,0.08)]" />
                <div className="h-24 w-24 rounded-full bg-white/55 blur-[1px]" />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--slate)]">Featured</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--cream)] px-2 py-1 text-[10px] font-medium text-[var(--charcoal)]">
                  <Star size={10} className="fill-current" />
                  {product.rating}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.06em] text-[var(--near-black)]">{product.name}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{product.subtitle}</p>
              <div className="mt-5 flex items-center justify-between">
                <p className="text-xl font-semibold text-[var(--near-black)]">{product.price}</p>
                <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--near-black)]">
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
