'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const chat = [
  { role: 'assistant', text: 'Your wellness profile is built from goals, routine, and habits — not diagnosis.' },
  { role: 'user', text: 'I want more energy in the morning and better routine consistency.' },
  { role: 'assistant', text: 'A calm morning ritual and daily essentials can support energy, sleep, and recovery.' },
];

export default function AIPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--paper)] p-7 shadow-[var(--shadow-soft)] md:p-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(62,74,61,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(31,32,40,0.08),transparent_25%)]" />
        <div className="relative">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Forestheals Intelligence</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold">Understand your wellness. Make better-informed choices.</h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            Explore your goals, answer a wellness quiz, and build a personalized health profile.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/quiz" className="forest-button inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white">
              Start Wellness Quiz
              <ArrowRight size={16} />
            </Link>
            <Link href="/shop" className="forest-button-secondary rounded-full border border-[var(--border)] px-6 py-3">
              Explore Products
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-[28px] border border-[var(--border)] bg-[var(--paper)] p-5">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
            <Sparkles size={14} />
            AI assistant
          </div>

          <div className="mt-6 space-y-4">
            {chat.map((message, index) => (
              <motion.div
                key={`${message.role}-${index}`}
                initial={reduceMotion ? false : { opacity: 0, x: message.role === 'assistant' ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + index * 0.08 }}
                className={`max-w-[85%] rounded-[20px] px-4 py-3 text-sm ${
                  message.role === 'assistant'
                    ? 'bg-[var(--cream)] text-[var(--foreground)]'
                    : 'ml-auto bg-[var(--charcoal)] text-[var(--cream)]'
                }`}
              >
                {message.text}
              </motion.div>
            ))}

            <div className="mt-4 flex items-center gap-2 rounded-[18px] border border-dashed border-[var(--border)] bg-[rgba(29,27,26,0.02)] px-4 py-3 text-sm text-[var(--muted)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
              AI is drafting a routine recommendation...
            </div>
          </div>
        </motion.div>

        <motion.aside initial={reduceMotion ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }} className="rounded-[28px] border border-[var(--border)] bg-[var(--paper)] p-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Recommendation</p>
          <div className="mt-4 rounded-[20px] bg-[var(--charcoal)] p-4 text-[var(--cream)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--cream)]/70">Morning energy plan</p>
            <h3 className="mt-3 text-2xl font-semibold">Daily essentials</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--cream)]/80">
              <li>• coffee ritual + hydration</li>
              <li>• hydration support</li>
              <li>• consistent sleep routine</li>
            </ul>
          </div>
          <div className="mt-4 rounded-[20px] border border-[var(--border)] bg-[rgba(29,27,26,0.02)] p-4 text-sm text-[var(--muted)]">
            Evidence: product ingredients and goals are used to guide recommendations.
          </div>
        </motion.aside>
      </div>
    </main>
  );
}
