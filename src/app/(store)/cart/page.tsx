'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCartStore } from '@/lib/commerce/cart-store';

export default function CartPage() {
  const reduceMotion = useReducedMotion();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const total = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);

  if (!items.length) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20 text-center">
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold"
        >
          Your cart is empty.
        </motion.h1>

        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-black px-6 py-3 text-white"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-semibold"
      >
        Your Cart
      </motion.h1>

      <div className="mt-10 space-y-4">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.variantId}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: 20, scale: 0.98 }}
              className="flex items-center gap-5 rounded-[26px] border border-[var(--border)] bg-[var(--paper)] p-5"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={96}
                  className="h-24 w-20 rounded-xl object-cover"
                />
              )}

              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.variantName}</p>
                <p className="mt-2">₹{(item.priceCents / 100).toLocaleString('en-IN')}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                  className="h-9 w-9 rounded-full border border-[var(--border)] transition hover:bg-[var(--cream)]"
                  aria-label={`Decrease quantity for ${item.name}`}
                >
                  −
                </button>

                <motion.span
                  key={`${item.variantId}-${item.quantity}`}
                  initial={reduceMotion ? false : { scale: 0.7, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex min-w-5 justify-center"
                >
                  {item.quantity}
                </motion.span>

                <button
                  type="button"
                  onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                  className="h-9 w-9 rounded-full border border-[var(--border)] transition hover:bg-[var(--cream)]"
                  aria-label={`Increase quantity for ${item.name}`}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.variantId)}
                className="text-sm text-red-600 transition hover:text-red-700"
              >
                Remove
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-[var(--border)] pt-6">
        <span className="text-xl font-semibold">Total</span>
        <motion.span
          key={total}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold"
        >
          ₹{(total / 100).toLocaleString('en-IN')}
        </motion.span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block rounded-full bg-black px-6 py-4 text-center font-semibold text-white"
      >
        Checkout
      </Link>
    </main>
  );
}
