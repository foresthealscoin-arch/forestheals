import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--cream)]">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-16 md:grid-cols-4 lg:px-12">
        <div className="md:col-span-2">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            forestheals
          </Link>

          <p className="mt-4 max-w-md text-sm leading-6 text-[var(--muted)]">
            Functional wellness essentials designed around better everyday
            health, thoughtful formulation, and evidence-informed education.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Explore</h2>

          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--muted)]">
            <Link href="/shop">Shop</Link>
            <Link href="/best-sellers">Best Sellers</Link>
            <Link href="/about">About Us</Link>
            <Link href="/quiz">Wellness Quiz</Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Support</h2>

          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--muted)]">
            <Link href="/track-order">Track Order</Link>
            <Link href="/account">Account</Link>
            <Link href="/ai">Wellness AI</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1600px] px-6 py-6 text-xs text-[var(--muted)] lg:px-12">
          © {new Date().getFullYear()} Forestheals. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
