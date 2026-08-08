'use client';

import Link from 'next/link';

type Recommendation = {
  title: string;
  reason: string;
  slug: string;
};

export function RecommendationPanel({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold">
        Recommended for you
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {recommendations.map((item) => (
          <Link
            key={item.slug}
            href={`/shop/${item.slug}`}
            className="rounded-3xl border p-6 transition hover:border-black"
          >
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-gray-600">
              {item.reason}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
