'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 text-center">
      <h1 className="text-3xl font-semibold">
        Something went wrong.
      </h1>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-full bg-black px-6 py-3 text-white"
      >
        Try Again
      </button>
    </main>
  );
}
