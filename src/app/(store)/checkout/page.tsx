'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/commerce/cart-store';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);

  const total = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold">
        Checkout
      </h1>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <form className="space-y-5">
          <input
            placeholder="Full name"
            className="w-full rounded-xl border p-4"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border p-4"
          />

          <input
            placeholder="Phone"
            className="w-full rounded-xl border p-4"
          />

          <textarea
            placeholder="Delivery address"
            rows={4}
            className="w-full rounded-xl border p-4"
          />

          <button
            type="button"
            className="w-full rounded-full bg-black p-4 font-semibold text-white"
          >
            Continue to Payment
          </button>
        </form>

        <div className="rounded-3xl bg-gray-50 p-7">
          <h2 className="text-xl font-semibold">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="flex justify-between"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ₹
                  {(
                    (item.priceCents * item.quantity) /
                    100
                  ).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span>
                ₹{(total / 100).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Link
        href="/shop"
        className="mt-8 inline-block text-sm underline"
      >
        Continue shopping
      </Link>
    </main>
  );
}
