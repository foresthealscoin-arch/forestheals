import Link from 'next/link';

export default function BestSellersPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
        Forestheals
      </p>

      <h1 className="mt-3 text-5xl font-semibold">
        Best Sellers
      </h1>

      <div className="mt-12 rounded-3xl bg-gray-50 p-10">
        <h2 className="text-2xl font-semibold">
          Collagen Coffee
        </h2>

        <p className="mt-3 text-gray-600">
          Our featured functional wellness product.
        </p>

        <Link
          href="/shop/collagen-coffee"
          className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-white"
        >
          View Product
        </Link>
      </div>
    </main>
  );
}
