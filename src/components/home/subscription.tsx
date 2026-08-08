'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function SubscriptionSection() {
  return (
    <section className="mt-10 mb-10 rounded-[32px] border border-[var(--line)] bg-[var(--paper)] p-6 sm:p-8 lg:p-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 rounded-[28px] border border-[var(--line)] bg-[linear-gradient(135deg,#f5f0ea_0%,#e1e9e8_100%)] p-6 md:grid-cols-[1.05fr_0.95fr] md:p-8"
      >
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--slate)]">Forestheals essentials</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--near-black)] sm:text-4xl">
            Build a routine that feels good every day.
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-[var(--muted)]">
            {['Smart product recommendations', 'Flexible wellness subscriptions', 'Priority support & education'].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--charcoal)] text-[var(--cream)]">
                  <Check size={14} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.38)] p-5 shadow-[0_18px_50px_rgba(31,32,40,0.06)]">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--slate)]">Routine plan</p>
          <div className="mt-5 flex items-end gap-3">
            <span className="text-4xl font-semibold tracking-[-0.06em] text-[var(--near-black)]">₹1,499</span>
            <span className="pb-1 text-sm text-[var(--slate)]">/ month</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            Build a personalized wellness shelf with a starter mix of daily essentials and science-led support.
          </p>

          <Link href="/shop" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--charcoal)] px-5 py-3 text-sm font-semibold text-[var(--cream)] transition hover:bg-[var(--blue-gray)]">
            Shop routine essentials
            <ArrowRight size={15} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
