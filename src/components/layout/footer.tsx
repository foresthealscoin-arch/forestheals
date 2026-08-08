import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-10 bg-[var(--near-black)] text-[var(--cream)]">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="logo text-2xl uppercase tracking-[0.14em]">FORESTHEALS</div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--cream)]/80">
            Functional essentials for a sharper daily rhythm.
          </p>
        </div>

        <div>
          <h2 className="text-[10px] uppercase tracking-[0.18em] text-[var(--cream)]/70">Shop</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--cream)]/80">
            <Link href="/shop">Shop</Link>
            <Link href="/best-sellers">Best sellers</Link>
            <Link href="/collections">Functional</Link>
          </div>
        </div>

        <div>
          <h2 className="text-[10px] uppercase tracking-[0.18em] text-[var(--cream)]/70">Company</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--cream)]/80">
            <Link href="/about">Our story</Link>
            <Link href="/quiz">Science</Link>
            <Link href="/ai">AI</Link>
          </div>
        </div>

        <div>
          <h2 className="text-[10px] uppercase tracking-[0.18em] text-[var(--cream)]/70">Support</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--cream)]/80">
            <Link href="/account">Account</Link>
            <Link href="/track-order">Track order</Link>
            <Link href="/cart">Cart</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--cream)]/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-5 text-[11px] uppercase tracking-[0.12em] text-[var(--cream)]/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} FORESTHEALS</span>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
