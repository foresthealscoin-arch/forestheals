export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid animate-pulse gap-10 md:grid-cols-2">
        <div className="aspect-square rounded-3xl bg-gray-100" />
        <div className="space-y-5">
          <div className="h-5 w-32 rounded bg-gray-100" />
          <div className="h-12 w-3/4 rounded bg-gray-100" />
          <div className="h-6 w-32 rounded bg-gray-100" />
          <div className="h-24 rounded bg-gray-100" />
        </div>
      </div>
    </main>
  );
}
