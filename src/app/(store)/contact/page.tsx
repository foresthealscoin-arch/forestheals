import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact and order-support options for Forestheals customers.',
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="text-xs font-semibold tracking-[0.2em] text-[var(--slate)] uppercase">
        Support
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
        How can we help?
      </h1>
      <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--near-black)]/75 md:text-base">
        Use order tracking for delivery updates or visit your account for saved
        details. Direct support contact information is added when the production
        support channel is connected.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/track-order"
          className="forest-button rounded-full bg-[var(--blue-gray)] px-5 py-3 text-sm font-semibold text-[var(--cream)]"
        >
          Track an order
        </Link>
        <Link
          href="/account"
          className="forest-button-secondary rounded-full border border-[var(--line)] bg-[var(--paper)] px-5 py-3 text-sm font-semibold"
        >
          Open account
        </Link>
      </div>
    </main>
  );
}
