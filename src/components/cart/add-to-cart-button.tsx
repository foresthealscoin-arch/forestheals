'use client';

import type { CartItem } from '@/lib/commerce/cart';
import { useCartStore } from '@/lib/commerce/cart-store';

export function AddToCartButton({ item }: { item: CartItem }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      type="button"
      onClick={() => addItem(item)}
      className="mt-8 w-full rounded-full bg-black px-6 py-4 text-center text-sm font-semibold text-white hover:bg-gray-800"
    >
      Add to Cart
    </button>
  );
}
