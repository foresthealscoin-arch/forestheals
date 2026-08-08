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
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gray-500">
          Forestheals
        </p>
        {isBestSeller && (
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-800">
            Best seller
          </span>
        )}
      </div>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
        {product.name}
      </h1>

      {product.rating && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-amber-700">
            <Star size={14} className="fill-current" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <span>Customer favorite</span>
        </div>
      )}

      <div className="mt-6 flex items-end gap-3">
        <p className="text-3xl font-semibold text-gray-900">
          {formatINR(product.priceCents)}
        </p>
        {product.compareAtCents && product.compareAtCents > product.priceCents && (
          <span className="pb-1 text-lg text-gray-400 line-through">
            {formatINR(product.compareAtCents)}
          </span>
        )}
      </div>

      {product.variantName && (
        <p className="mt-3 text-sm text-gray-600">{product.variantName}</p>
      )}

      {product.description && (
        <p className="mt-6 max-w-xl text-base leading-7 text-gray-600">
          {product.description}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={addToCart}
          className="flex-1 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99]"
        >
          Add to Cart
        </button>
        <Link
          href="/shop"
          className="flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Continue shopping
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border border-black/5 bg-gray-50 p-4 text-sm text-gray-600">
        <div className="flex items-center justify-between gap-4">
          <span>Availability</span>
          <span className="font-medium text-gray-900">
            {product.stock !== null && product.stock !== undefined
              ? `${product.stock} units available`
              : 'Made to order'}
          </span>
        </div>
      </div>

      {product.benefits.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Benefits</h2>
          <ul className="mt-4 space-y-3">
            {product.benefits.map((benefit) => (
              <li key={benefit} className="rounded-2xl border border-black/5 bg-white p-4 text-gray-700">
                {benefit}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
