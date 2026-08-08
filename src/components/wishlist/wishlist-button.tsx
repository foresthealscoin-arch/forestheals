'use client';

import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/lib/wishlist/wishlist-store';

export function WishlistButton({
  productId,
}: {
  productId: string;
}) {
  const toggle = useWishlistStore((state) => state.toggle);
  const active = useWishlistStore((state) =>
    state.productIds.includes(productId),
  );

  return (
    <button
      type="button"
      aria-label="Add to wishlist"
      onClick={() => toggle(productId)}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition hover:border-black"
    >
      <Heart
        size={19}
        fill={active ? 'currentColor' : 'none'}
      />
    </button>
  );
}
