'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Leaf, Shield } from 'lucide-react';

const notes = [
  {
    title: 'Evidence informed',
    description: 'Ingredient-first recommendations rooted in practical wellness support.',
    icon: Shield,
  },
  {
    title: 'Daily rituals',
    description: 'Minimal routines that are easy to maintain and easy to trust.',
    icon: Leaf,
  },
  {
    title: 'Personal health context',
    description: 'A smarter way to align goals, product support and wellness habits.',
    icon: BrainCircuit,
  },
];

export function ScienceSection() {
  return (
    <section className="mt-10 rounded-[32px] border border-[var(--line)] bg-[var(--paper)] p-6 sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--slate)]">Science-backed</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.06em] text-[var(--near-black)] sm:text-4xl">
            Thoughtful wellness, grounded in clarity.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
            Forestheals focuses on clean daily essentials, transparent ingredients, and practical routines that work in real life. We pair modern wellness support with educational guidance so the system feels confident, calm, and useful.
          </p>
          <Link href="/ai" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--near-black)]">
            Meet the wellness guide
            <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid gap-4">
          {notes.map((note, index) => {
            const Icon = note.icon;

            return (
              <motion.div
                key={note.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-[24px] border border-[var(--line)] bg-white p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--cream)] text-[var(--near-black)]">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--near-black)]">{note.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{note.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
