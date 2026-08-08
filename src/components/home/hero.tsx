import Link from 'next/link';

export function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl bg-[var(--paper)]">
      <div className="grid min-h-[650px] items-center lg:grid-cols-2">
        <div className="px-8 py-16 lg:px-16">
          <p className="mb-6 text-sm tracking-[0.25em] text-[var(--forest)] uppercase">
            Function meets nature
          </p>

          <h1 className="max-w-2xl text-5xl font-semibold tracking-tight lg:text-7xl">
            Premium functional essentials for everyday health.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Clean ingredients. Thoughtful formulations. Better daily habits.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-xl bg-[var(--ink)] px-7 py-4 text-sm font-medium text-white"
            >
              Shop now
            </Link>

            <Link
              href="/collections"
              className="rounded-xl border border-[var(--line)] bg-white px-7 py-4 text-sm font-medium"
            >
              Explore collections
            </Link>
          </div>
        </div>

        <div className="min-h-[500px] bg-[var(--ink)]" />
      </div>
    </section>
  );
}
