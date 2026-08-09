'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { useCartStore } from '@/lib/commerce/cart-store';

export default function CheckoutPage() {
  const reduceMotion = useReducedMotion();
  const items = useCartStore((state) => state.items);
  const [submitted, setSubmitted] = useState(false);

  const total = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);

  function handleSubmit() {
    setSubmitted(true);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-semibold"
      >
        Checkout
      </motion.h1>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <motion.form
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <input
            placeholder="Full name"
            className="w-full rounded-[18px] border border-[var(--border)] bg-[var(--paper)] p-4 outline-none transition focus:border-[var(--charcoal)] focus:shadow-[0_0_0_3px_rgba(31,32,40,0.08)]"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-[18px] border border-[var(--border)] bg-[var(--paper)] p-4 outline-none transition focus:border-[var(--charcoal)] focus:shadow-[0_0_0_3px_rgba(31,32,40,0.08)]"
          />

          <input
            placeholder="Phone"
            className="w-full rounded-[18px] border border-[var(--border)] bg-[var(--paper)] p-4 outline-none transition focus:border-[var(--charcoal)] focus:shadow-[0_0_0_3px_rgba(31,32,40,0.08)]"
          />

          <textarea
            placeholder="Delivery address"
            rows={4}
            className="w-full rounded-[18px] border border-[var(--border)] bg-[var(--paper)] p-4 outline-none transition focus:border-[var(--charcoal)] focus:shadow-[0_0_0_3px_rgba(31,32,40,0.08)]"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-black p-4 font-semibold text-white transition hover:bg-[var(--blue-gray)]"
          >
            {submitted ? 'Order placed' : 'Continue to Payment'}
          </button>
        </motion.form>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[30px] border border-[var(--border)] bg-[var(--paper)] p-7"
        >
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.variantId} className="flex justify-between gap-4 text-sm text-[var(--muted)]">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-[var(--foreground)]">
                  ₹{((item.priceCents * item.quantity) / 100).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[var(--border)] pt-6">
            <div className="flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span>₹{(total / 100).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {submitted && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-6 rounded-[18px] bg-[var(--accent-soft)] p-4 text-sm text-[var(--charcoal)]"
            >
              Order confirmed. Your wellness essentials are on the way.
            </motion.div>
          )}
        </motion.div>
      </div>

      <Link href="/shop" className="mt-8 inline-block text-sm underline">
        Continue shopping
      </Link>
    </main>
  );
}
