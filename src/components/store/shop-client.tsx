'use client';

import { useMemo, useState } from 'react';
import { ProductGrid } from '@/components/store/product-grid';
import { SearchBox } from '@/components/search/search-box';
import { ProductFilters } from '@/components/store/product-filters';
import { searchProducts } from '@/lib/search/search';
import type { Product } from '@/types/product';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
  { label: 'Best sellers', value: 'bestsellers' },
] as const;

export function ShopClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState<(typeof sortOptions)[number]['value']>('featured');
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category).filter(Boolean))],
    [products],
  );

  const filtered = useMemo(() => {
    let result = searchProducts(products, query);

    if (category !== 'all') {
      result = result.filter((product) => product.category === category);
    }

    if (maxPrice !== null) {
      result = result.filter((product) => product.priceCents <= maxPrice);
    }

    const sorted = [...result];

    sorted.sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc':
          return a.priceCents - b.priceCents;
        case 'price-desc':
          return b.priceCents - a.priceCents;
        case 'bestsellers':
          return Number(b.isBestSeller ?? false) - Number(a.isBestSeller ?? false);
        default:
          return Number(b.isBestSeller ?? false) - Number(a.isBestSeller ?? false) ||
            Number(b.rating ?? 0) - Number(a.rating ?? 0);
      }
    });

    return sorted;
  }, [products, query, category, maxPrice, sortOrder]);

  const highestPrice = Math.max(
    ...products.map((product) => product.priceCents),
    0,
  );

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
        <SearchBox value={query} onChange={setQuery} />
        <ProductFilters
          categories={categories}
          selected={category}
          onChange={setCategory}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-black/5 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-700">
            {filtered.length} products
          </span>
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          <span className="text-sm text-gray-500">
            {category === 'all' ? 'All categories' : category}
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <span>Max price</span>
            <input
              type="range"
              min={0}
              max={highestPrice}
              step={1000}
              value={maxPrice ?? highestPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="accent-black"
            />
          </label>

          <select
            value={sortOrder}
            onChange={(event) =>
              setSortOrder(event.target.value as (typeof sortOptions)[number]['value'])
            }
            className="rounded-full border border-black/10 bg-gray-50 px-4 py-2 text-sm text-gray-700 outline-none focus:border-black"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10">
        <ProductGrid products={filtered} />
      </div>
    </>
  );
}
