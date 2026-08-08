'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/commerce/cart-store';

export function Navbar() {
  const items = useCartStore((state) => state.items);
  const count = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="w-full border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight"
        >
          forestheals
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link href="/shop" className="transition-opacity hover:opacity-50">
            Shop
          </Link>

          <Link
            href="/collections"
            className="transition-opacity hover:opacity-50"
          >
            Collections
          </Link>

          <Link
            href="/best-sellers"
            className="transition-opacity hover:opacity-50"
          >
            Best Sellers
          </Link>

          <Link
            href="/about"
            className="transition-opacity hover:opacity-50"
          >
            About Us
          </Link>

          <Link
            href="/track-order"
            className="transition-opacity hover:opacity-50"
          >
            Track Order
          </Link>
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/ai"
            aria-label="AI wellness assistant"
            className="text-sm font-medium transition-opacity hover:opacity-50"
          >
            AI
          </Link>

          <Link
            href="/account"
            className="hidden text-sm font-medium sm:block transition-opacity hover:opacity-50"
          >
            Account
          </Link>

          <Link
            href="/cart"
            aria-label={`Cart with ${count} items`}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition-all hover:border-black hover:bg-black hover:text-white"
          >
            <ShoppingBag
              size={19}
              strokeWidth={1.8}
              className="transition-transform group-hover:scale-105"
            />

            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white ring-2 ring-white group-hover:bg-white group-hover:text-black">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
