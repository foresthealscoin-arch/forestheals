'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Gauge, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

const pillars = [
  {
    title: 'Purposeful formulas',
    description: 'Wellness essentials built around simple, functional routines—not noise.',
    icon: Leaf,
  },
  {
    title: 'Evidence-led choices',
    description: 'Clear ingredient logic and transparent support for everyday wellbeing.',
    icon: ShieldCheck,
  },
  {
    title: 'Measured energy',
    description: 'Support that helps you feel more grounded, focused and ready for the day.',
    icon: Gauge,
  },
  {
    title: 'Calm confidence',
    description: 'A modern experience that feels premium, clinical and easy to trust.',
    icon: Sparkles,
  },
];

export function WhyForesthealsSection() {
  return (
    <section className="mt-10 rounded-[32px] border border-[var(--line)] bg-[var(--charcoal)] p-6 text-[var(--cream)] sm:p-8 lg:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--cream)]/70">Why Forestheals</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">
            A wellness brand for people who want fewer decisions and better outcomes.
          </h2>
        </div>

        <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--cream)]/90">
          More about us
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;

          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-[26px] border border-[var(--cream)]/10 bg-[rgba(255,255,255,0.02)] p-5"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--charcoal)]">
                <Icon size={18} />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-[var(--cream)]">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--cream)]/75">{pillar.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
