'use client';

import type { CartItem } from '@/lib/commerce/cart';
import { useCartStore } from '@/lib/commerce/cart-store';

type Props = {
  item: CartItem;
};

export function AddToCartButton({ item }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      type="button"
      onClick={() => addItem(item)}
      className="mt-6 w-full rounded-full bg-black px-6 py-4 text-white transition hover:opacity-80"
    >
      Add to Cart
    </button>
  );
}
