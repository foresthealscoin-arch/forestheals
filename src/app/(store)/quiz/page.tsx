'use client';

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

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-gray-500">
        Question {step + 1} of {questions.length}
      </p>

      <h1 className="mt-4 text-4xl font-semibold">
        {current.question}
      </h1>

      <div className="mt-8 grid gap-3">
        {current.options.map((option) => (
          <button
            key={option}
            onClick={() => answer(option)}
            className="rounded-2xl border p-5 text-left transition hover:border-black"
          >
            {option}
          </button>
        ))}
      </div>

      {complete && (
        <div className="mt-8 rounded-3xl bg-gray-50 p-6">
          <h2 className="text-xl font-semibold">
            Your wellness profile is ready.
          </h2>

          <p className="mt-2 text-gray-600">
            Your answers can later be used by the Forestheals
            recommendation engine.
          </p>
        </div>
      )}
    </main>
  );
}
