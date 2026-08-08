import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'How Forestheals handles personal information and wellness preferences.',
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="text-xs font-semibold tracking-[0.2em] text-[var(--slate)] uppercase">
        Legal
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
        Privacy
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-7 text-[var(--near-black)]/75 md:text-base">
        <p>
          Forestheals only collects information needed to provide store,
          account, and wellness experiences. Wellness preferences remain
          user-controlled and are not used to infer a diagnosis.
        </p>
        <p>
          Checkout, authentication, analytics, and support providers may process
          limited data to deliver their services. Production retention and
          deletion controls are finalized when those services are connected.
        </p>
        <p>
          Do not submit urgent or highly sensitive medical information.
          Forestheals provides educational wellness information and does not
          replace professional medical care.
        </p>
      </div>
    </main>
  );
}
