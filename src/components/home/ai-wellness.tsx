'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, MessageSquareText, Sparkles } from 'lucide-react';

export function AiWellnessSection() {
  return (
    <section className="mt-10 rounded-[32px] border border-[var(--line)] bg-[var(--paper)] p-6 sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-[28px] border border-[var(--line)] bg-[var(--charcoal)] p-6 text-[var(--cream)]"
        >
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-[var(--cream)]/70">
            <Bot size={12} />
            Forestheals AI
          </div>

          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-[var(--cream)] sm:text-4xl">
            Calm guidance for your wellness questions.
          </h2>

          <div className="mt-6 space-y-3 text-sm text-[var(--cream)]/80">
            <div className="rounded-2xl border border-[var(--cream)]/10 bg-[rgba(255,255,255,0.04)] p-3">
              “I want a gentler morning routine that supports energy without adding stress.”
            </div>
            <div className="rounded-2xl border border-[var(--cream)]/10 bg-[rgba(255,255,255,0.04)] p-3">
              “What should I pair with my current routine for better skin support?”
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="space-y-4"
        >
          {[
            { title: 'Routine matching', text: 'Personalized suggestions based on your goals, product history and wellness priorities.', icon: Sparkles },
            { title: 'Smart education', text: 'Simple explanations for ingredients, benefits and how routines fit together.', icon: MessageSquareText },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-[24px] border border-[var(--line)] bg-white p-5">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--cream)] text-[var(--near-black)]">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--near-black)]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <Link href="/ai" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--near-black)]">
            Explore the AI assistant
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
