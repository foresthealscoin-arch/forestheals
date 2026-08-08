'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Daily Energy',
    description: 'Support a steady, resilient rhythm from morning to evening.',
    accent: 'from-[#e5d7c8] to-[#f3efe8]',
  },
  {
    name: 'Skin & Glow',
    description: 'Nourish collagen, hydration and visible radiance from within.',
    accent: 'from-[#d8e3e0] to-[#f3efe8]',
  },
  {
    name: 'Gut Balance',
    description: 'Gentle daily support for digestion, comfort and consistency.',
    accent: 'from-[#dfe1d5] to-[#f3efe8]',
  },
  {
    name: 'Recovery',
    description: 'Sleep, calm and recovery rituals designed for modern routines.',
    accent: 'from-[#d9dfe5] to-[#f3efe8]',
  },
];

export function CategoriesSection() {
  return (
    <section className="mt-10 rounded-[32px] border border-[var(--line)] bg-[var(--paper)] p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--slate)]">Curated routines</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--near-black)] sm:text-4xl">
            Designed around how you live.
          </h2>
        </div>

        <Link href="/collections" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--near-black)]">
          Browse all collections
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category, index) => (
          <motion.article
            key={category.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            className="group overflow-hidden rounded-[28px] border border-[var(--line)] bg-white"
          >
            <div className={`h-40 bg-gradient-to-br ${category.accent} p-5`}>
              <div className="flex h-full items-end justify-between">
                <div className="h-16 w-16 rounded-full border border-[var(--charcoal)]/10 bg-[rgba(255,255,255,0.5)] backdrop-blur-sm" />
                <div className="h-10 w-20 rounded-full bg-[rgba(31,32,40,0.05)]" />
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-[var(--near-black)]">{category.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{category.description}</p>
              <Link href="/shop" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--near-black)]">
                Shop this range
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
