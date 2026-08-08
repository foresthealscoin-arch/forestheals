import Link from 'next/link';

const collections = [
  {
    name: 'Skin & Beauty',
    slug: 'skin-beauty',
    description: 'Nutrition designed around everyday skin wellness.',
  },
  {
    name: 'Energy',
    slug: 'energy',
    description: 'Daily wellness products for active lifestyles.',
  },
  {
    name: 'Gut Wellness',
    slug: 'gut-wellness',
    description: 'Products focused on everyday digestive wellness.',
  },
  {
    name: 'Sleep & Calm',
    slug: 'sleep-calm',
    description: 'Explore products and education around rest and recovery.',
  },
];

export default function CollectionsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
        Forestheals
      </p>

      <h1 className="mt-3 text-5xl font-semibold">
        Collections
      </h1>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {collections.map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className="rounded-3xl border border-black/10 p-8 transition hover:border-black"
          >
            <h2 className="text-2xl font-semibold">
              {collection.name}
            </h2>

            <p className="mt-3 max-w-md text-gray-600">
              {collection.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
