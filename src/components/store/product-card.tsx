'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { formatINR } from '@/lib/commerce/money';
import { useCartStore } from '@/lib/commerce/cart-store';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const isBestSeller = Boolean(product.isBestSeller || product.tags?.includes('bestseller'));
  const hasComparePrice =
    product.compareAtCents !== undefined &&
    product.compareAtCents > product.priceCents;

  function addToCart() {
    const variantId = product.variantId ?? product.id;

    addItem({
      productId: product.id,
      variantId,
      name: product.name,
      variantName: product.variantName ?? 'Standard',
      priceCents: product.priceCents,
      quantity: 1,
      image: product.image ?? null,
    });
  }

  return (
    <article className="group flex h-full flex-col">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-gray-100">
          {isBestSeller && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700">
              Best seller
            </span>
          )}

          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={945}
              height={1181}
              className="aspect-[4/5] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="aspect-[4/5] bg-gray-100" />
          )}
        </div>

        <div className="flex flex-1 flex-col pt-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
            {product.stock !== null && product.stock !== undefined && product.stock < 20 && (
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-700">
                Low stock
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-[var(--muted)]">{product.subtitle}</p>

          <div className="mt-3 flex items-center gap-2">
            <p className="text-base font-semibold text-gray-900">
              {formatINR(product.priceCents)}
            </p>
            {hasComparePrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatINR(product.compareAtCents ?? product.priceCents)}
              </span>
            )}
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={addToCart}
        className="mt-4 flex w-full items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
      >
        Add to Cart
      </button>
    </article>
  );
}
