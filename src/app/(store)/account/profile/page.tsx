export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Profile</h1>

      <div className="mt-8 space-y-4">
        <input className="w-full rounded-xl border p-4" placeholder="Full name" />
        <input className="w-full rounded-xl border p-4" placeholder="Email" />
        <input className="w-full rounded-xl border p-4" placeholder="Phone" />
        <button className="rounded-full bg-black px-6 py-3 text-white">
          Save Profile
        </button>
      </div>
    </main>
  );
}
