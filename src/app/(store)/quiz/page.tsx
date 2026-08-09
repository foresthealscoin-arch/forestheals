'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const questions = [
  {
    question: 'What is your main wellness goal?',
    options: ['Skin', 'Energy', 'Gut', 'Sleep'],
  },
  {
    question: 'How would you describe your routine?',
    options: ['Very active', 'Moderately active', 'Mostly sedentary'],
  },
  {
    question: 'What matters most to you?',
    options: ['Nutrition', 'Recovery', 'Mental wellness', 'Overall health'],
  },
];

export default function QuizPage() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const current = questions[step];

  function answer(value: string) {
    const next = [...answers];
    next[step] = value;
    setAnswers(next);

    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  }

  const complete = step === questions.length - 1 && answers.length === questions.length;
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
          Question {step + 1} of {questions.length}
        </p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--border)]">
          <motion.div
            className="h-full rounded-full bg-[var(--charcoal)]"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.question}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -14 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="mt-4 text-4xl font-semibold">{current.question}</h1>

          <div className="mt-8 grid gap-3">
            {current.options.map((option) => (
              <motion.button
                key={option}
                whileHover={reduceMotion ? undefined : { x: 4 }}
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                onClick={() => answer(option)}
                className="rounded-[22px] border border-[var(--border)] bg-[var(--paper)] p-5 text-left transition hover:border-[var(--charcoal)] hover:bg-[var(--cream)]"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {complete && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-[28px] bg-[var(--paper)] p-6"
        >
          <h2 className="text-xl font-semibold">Your wellness profile is ready.</h2>
          <p className="mt-2 text-gray-600">
            Your answers can later be used by the Forestheals recommendation engine.
          </p>
        </motion.div>
      )}
    </main>
  );
}
