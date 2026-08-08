'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const questionGroups = [
  {
    title: 'What are you looking to improve?',
    options: ['Energy', 'Skin', 'Hair', 'Gut', 'Immunity', 'Sleep', 'Hydration', 'Mind & Wellness'],
  },
  {
    title: 'How would you describe your routine?',
    options: ['Active', 'Balanced', 'Recovering', 'Busy', 'Minimal'],
  },
  {
    title: 'What matters most to your daily wellness?',
    options: ['Nutrition', 'Recovery', 'Calm', 'Morning energy', 'General wellness'],
  },
  {
    title: 'Which routine support do you want first?',
    options: ['Daily essentials', 'Skin glow', 'Better focus', 'Gut balance', 'Stress calm'],
  },
];

export function OnboardingFlow() {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const shown = window.localStorage.getItem('forestheals-onboarding-seen');
    if (!shown) {
      setIsOpen(true);
    }
  }, []);

  const currentQuestion = useMemo(() => questionGroups[step] ?? questionGroups[0], [step]);
  const progress = ((step + 1) / questionGroups.length) * 100;

  function toggleOption(option: string) {
    setSelected((current) => {
      if (current.includes(option)) {
        return current.filter((item) => item !== option);
      }

      return [...current, option];
    });
  }

  function next() {
    if (step < questionGroups.length - 1) {
      setStep((value) => value + 1);
      return;
    }

    setIsOpen(false);
    window.localStorage.setItem('forestheals-onboarding-seen', 'true');
  }

  function skip() {
    setIsOpen(false);
    window.localStorage.setItem('forestheals-onboarding-seen', 'true');
  }

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--near-black)]/70 px-4 backdrop-blur-sm"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-[var(--line)] bg-[var(--paper)] shadow-[0_24px_120px_rgba(31,32,40,0.35)]"
        >
          <button
            type="button"
            onClick={skip}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] text-[var(--near-black)] transition hover:bg-[var(--cream)]"
            aria-label="Skip onboarding"
          >
            <X size={18} />
          </button>

          <div className="grid min-h-[540px] md:grid-cols-[1.08fr_1.12fr]">
            <div className="relative overflow-hidden bg-[var(--blue-gray)] p-8 text-[var(--cream)] md:p-10">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[var(--cream)]/80">
                <Sparkles size={12} />
                Forestheals
              </div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-14"
              >
                <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--cream)]/75">
                  Personalize your routine
                </p>
                <h2 className="mt-5 max-w-md text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  Better health begins with better everyday habits.
                </h2>
              </motion.div>

              <div className="mt-10 mb-8 grid gap-3 text-sm text-[var(--cream)]/80">
                {['Evidence-led essentials', 'Daily rituals that fit your life', 'A calmer, smarter routine'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-full border border-[var(--cream)]/15 bg-[var(--cream)]/5 px-3 py-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--charcoal)]">
                      <Check size={14} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--cream)]/10">
                <motion.div
                  className="h-full rounded-full bg-[var(--cream)]"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                />
              </div>

              <p className="mt-6 text-sm text-[var(--cream)]/80">
                {step + 1} of {questionGroups.length}
              </p>
            </div>

            <div className="flex flex-col justify-between p-8 md:p-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--slate)]">
                  Wellness preferences
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-[var(--near-black)]">
                  {currentQuestion.title}
                </h3>

                <div className="mt-7 grid gap-3">
                  {currentQuestion.options.map((option) => {
                    const active = selected.includes(option);

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleOption(option)}
                        className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                          active
                            ? 'border-[var(--charcoal)] bg-[var(--charcoal)] text-[var(--cream)]'
                            : 'border-[var(--line)] bg-[var(--paper)] text-[var(--near-black)] hover:border-[var(--slate)]/40 hover:bg-[var(--cream)]'
                        }`}
                      >
                        <span>{option}</span>
                        {active && <Check size={16} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={skip}
                  className="text-sm font-medium text-[var(--slate)] transition hover:text-[var(--near-black)]"
                >
                  Skip
                </button>

                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--charcoal)] px-5 py-2.5 text-sm font-semibold text-[var(--cream)] transition hover:bg-[var(--blue-gray)]"
                >
                  {step === questionGroups.length - 1 ? 'Build my Health Card' : 'Next'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
