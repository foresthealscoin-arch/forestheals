'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/commerce/cart-store';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore(
    (state) => state.updateQuantity,
  );
  const removeItem = useCartStore(
    (state) => state.removeItem,
  );

  const total = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );

  if (!items.length) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-4xl font-semibold">
          Your cart is empty.
        </h1>

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
      <h1 className="text-4xl font-semibold">
        Your Cart
      </h1>

      <div className="mt-10 space-y-4">
        {items.map((item) => (
          <div
            key={item.variantId}
            className="flex items-center gap-5 rounded-2xl border p-5"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-20 rounded-xl object-cover"
              />
            )}

            <div className="flex-1">
              <h2 className="font-semibold">
                {item.name}
              </h2>

              <p className="text-sm text-gray-500">
                {item.variantName}
              </p>

              <p className="mt-2">
                ₹{(item.priceCents / 100).toLocaleString('en-IN')}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updateQuantity(
                    item.variantId,
                    item.quantity - 1,
                  )
                }
                className="h-9 w-9 rounded-full border"
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateQuantity(
                    item.variantId,
                    item.quantity + 1,
                  )
                }
                className="h-9 w-9 rounded-full border"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.variantId)}
              className="text-sm text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between border-t pt-6">
        <span className="text-xl font-semibold">
          Total
        </span>

        <span className="text-2xl font-semibold">
          ₹{(total / 100).toLocaleString('en-IN')}
        </span>
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
