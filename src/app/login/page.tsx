import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-6 py-20">
      <div className="w-full rounded-[32px] border border-[var(--line)] bg-[var(--paper)] p-8 shadow-[var(--shadow-soft)]">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--slate)]">Forestheals</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-[var(--near-black)]">
          Login required
        </h1>
        <p className="mt-3 text-base leading-7 text-[var(--muted)]">
          Please sign in to continue to your account or checkout.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-[var(--charcoal)] px-5 py-3 text-sm font-semibold text-[var(--cream)]"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--near-black)]"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
