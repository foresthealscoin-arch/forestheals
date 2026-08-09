'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { MagneticButton } from '@/components/ui/motion';

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[var(--line)] bg-[var(--paper)] shadow-[var(--shadow-soft)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(44,41,48,0.06),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(82,93,99,0.08),transparent_30%)]" />

      <div className="relative grid min-h-[720px] items-center lg:grid-cols-[1.08fr_0.92fr]">
        <div className="px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--slate)]"
          >
            Function meets nature
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="mt-6 max-w-xl text-5xl font-semibold tracking-[-0.06em] text-[var(--near-black)] sm:text-6xl xl:text-[5.6rem]"
          >
            Premium wellness for a stronger everyday rhythm.
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]"
          >
            Clean ingredients, science-led essentials, and a personalized routine designed for calm, clarity, and daily resilience.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <MagneticButton href="/shop" className="forest-button inline-flex items-center gap-2 rounded-full bg-[var(--blue-gray)] px-6 py-3.5 text-sm font-semibold text-[var(--cream)] shadow-[0_18px_40px_rgba(31,32,40,0.18)] hover:bg-[var(--charcoal)]">
              Shop now
              <ArrowRight size={16} />
            </MagneticButton>

            <MagneticButton href="/collections" className="forest-button-secondary inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--paper)] px-6 py-3.5 text-sm font-semibold text-[var(--near-black)] hover:border-[var(--slate)]/40 hover:bg-[var(--cream)]">
              <Play size={14} className="fill-current" />
              Explore collections
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-10 flex flex-wrap gap-6 text-sm text-[var(--slate)]"
          >
            {['Clean ingredients', 'Evidence-informed', 'Fast delivery'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--blue-gray)]" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-[500px] items-center justify-center px-6 pb-10 pt-4 sm:px-10 lg:px-0"
        >
          <div className="absolute inset-x-8 bottom-10 top-10 rounded-[36px] bg-[radial-gradient(circle_at_top,rgba(44,41,48,0.12),transparent_55%)]" />

          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 w-full max-w-[500px] overflow-hidden rounded-[32px] border border-[var(--line)] bg-[var(--blue-gray)] p-4 shadow-[var(--shadow-soft)]"
          >
            <div className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#f0e7dc_0%,#d9dfe2_100%)] p-6">
              <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-[var(--paper)]/40 blur-2xl" />
              <div className="absolute bottom-8 right-8 h-32 w-32 rounded-full bg-[var(--charcoal)]/10 blur-2xl" />

              <div className="relative rounded-[22px] bg-[var(--paper)] p-5 shadow-inner">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-[var(--slate)]">
                  <span>Collagen Coffee</span>
                  <span>Daily ritual</span>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-3xl font-semibold tracking-[-0.07em] text-[var(--near-black)]">₹999</p>
                    <p className="mt-2 text-sm text-[var(--slate)]">Hair • Skin • Nails</p>
                  </div>
                  <span className="rounded-full bg-[var(--charcoal)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--cream)]">
                    Best seller
                  </span>
                </div>

                <div className="mt-8 flex justify-center">
                  <div className="relative h-[280px] w-full max-w-[260px] rounded-[26px] bg-[var(--cream)] p-5 shadow-[inset_0_0_0_1px_rgba(31,32,40,0.04)]">
                    <div className="absolute inset-x-8 top-10 h-14 rounded-full bg-[var(--paper)] blur-xl" />
                    <div className="absolute inset-x-12 bottom-8 h-20 rounded-[50%] bg-[var(--charcoal)]/10 blur-2xl" />
                    <div className="relative flex h-full items-end justify-center rounded-[20px] bg-[linear-gradient(180deg,#f9f6f0_0%,#efe5d8_100%)] shadow-[0_18px_40px_rgba(31,32,40,0.08)]">
                      <div className="relative h-[200px] w-[150px] rounded-[30px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(224,216,208,1)_50%,_rgba(199,189,176,1)_100%)] shadow-[0_18px_30px_rgba(31,32,40,0.12)]">
                        <div className="absolute inset-x-5 top-5 h-8 rounded-full bg-[var(--near-black)]/90" />
                        <div className="absolute inset-x-6 bottom-5 h-6 rounded-full bg-[var(--paper)]" />
                        <div className="absolute inset-x-6 top-10 h-28 rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,#f0e8df_0%,#f8f4ef_100%)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
