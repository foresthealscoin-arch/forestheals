'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Product } from '@/types/product';
import { formatINR } from '@/lib/commerce/money';
import { useCartStore } from '@/lib/commerce/cart-store';

type Props = {
  product: Product;
};

export function ProductInfo({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const isBestSeller = Boolean(product.isBestSeller || product.tags?.includes('bestseller'));

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
    <div>
      <div className="flex items-center gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--slate)]">
          Forestheals
        </p>
        {isBestSeller && (
          <span className="rounded-full bg-[var(--cream)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--charcoal)]">
            Best seller
          </span>
        )}
      </div>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--near-black)] md:text-5xl">
        {product.name}
      </h1>

      {product.rating && (
        <div className="mt-4 flex items-center gap-2 text-sm text-[var(--slate)]">
          <div className="flex items-center gap-1 rounded-full bg-[var(--cream)] px-2 py-1 text-[var(--charcoal)]">
            <Star size={14} className="fill-current" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <span>Customer favorite</span>
        </div>
      )}

      <div className="mt-6 flex items-end gap-3">
        <p className="text-3xl font-semibold text-[var(--near-black)]">
          {formatINR(product.priceCents)}
        </p>
        {product.compareAtCents && product.compareAtCents > product.priceCents && (
          <span className="pb-1 text-lg text-[var(--slate)] line-through">
            {formatINR(product.compareAtCents)}
          </span>
        )}
      </div>

      {product.variantName && (
        <p className="mt-3 text-sm text-[var(--slate)]">{product.variantName}</p>
      )}

      {product.description && (
        <p className="mt-6 max-w-xl text-base leading-7 text-[var(--slate)]">
          {product.description}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={addToCart}
          className="flex-1 rounded-full bg-[var(--charcoal)] px-6 py-3.5 text-sm font-semibold text-[var(--cream)] transition hover:bg-[var(--blue-gray)] active:scale-[0.99]"
        >
          Add to Cart
        </button>
        <Link
          href="/shop"
          className="flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] px-6 py-3.5 text-sm font-semibold text-[var(--near-black)] transition hover:bg-[var(--cream)]"
        >
          Continue shopping
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 text-sm text-[var(--slate)]">
        <div className="flex items-center justify-between gap-4">
          <span>Availability</span>
          <span className="font-medium text-[var(--near-black)]">
            {product.stock !== null && product.stock !== undefined
              ? `${product.stock} units available`
              : 'Made to order'}
          </span>
        </div>
      </div>

      {product.benefits.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[var(--near-black)]">Benefits</h2>
          <ul className="mt-4 space-y-3">
            {product.benefits.map((benefit) => (
              <li key={benefit} className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 text-[var(--slate)]">
                {benefit}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
