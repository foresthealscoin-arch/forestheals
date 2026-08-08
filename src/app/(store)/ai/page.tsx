import Link from 'next/link';

export default function AIPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
        Forestheals Intelligence
      </p>

      <h1 className="mt-4 max-w-3xl text-5xl font-semibold">
        Understand your wellness. Make better-informed choices.
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-gray-600">
        Explore your goals, answer a wellness quiz, and build a
        personalized health profile.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/quiz"
          className="rounded-full bg-black px-6 py-3 text-white"
        >
          Start Wellness Quiz
        </Link>

        <Link
          href="/shop"
          className="rounded-full border px-6 py-3"
        >
          Explore Products
        </Link>
      </div>
    </main>
  );
}
