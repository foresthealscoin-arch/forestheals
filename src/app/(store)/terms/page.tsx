import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms',
  description:
    'Terms for using the Forestheals store and wellness education experience.',
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="text-xs font-semibold tracking-[0.2em] text-[var(--slate)] uppercase">
        Legal
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
        Terms
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-7 text-[var(--near-black)]/75 md:text-base">
        <p>
          Forestheals content is provided for general wellness education. It is
          not medical advice, a diagnosis, or a substitute for care from a
          qualified professional.
        </p>
        <p>
          Product availability, pricing, shipping, promotions, and checkout
          terms are confirmed at the time an order is placed. Product labels and
          usage instructions should always be read before use.
        </p>
        <p>
          Do not use the AI or quiz experiences for emergencies. Contact local
          emergency services or a qualified healthcare professional when
          immediate help is needed.
        </p>
      </div>
    </main>
  );
}
