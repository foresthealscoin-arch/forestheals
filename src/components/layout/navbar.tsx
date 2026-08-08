import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--cream)]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          forestheals
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/shop">Shop</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/best-sellers">Best Sellers</Link>
          <Link href="/about">About Us</Link>
          <Link href="/track-order">Track Order</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/ai" aria-label="AI wellness assistant">
            AI
          </Link>
          <Link href="/account">Account</Link>
          <Link href="/cart">Cart</Link>
        </div>
      </div>
    </header>
  );
}
