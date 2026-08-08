import Link from 'next/link';

export default function AccountPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Your Account</h1>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Link href="/account/orders" className="rounded-3xl border p-6 hover:border-black">
          <h2 className="font-semibold">Orders</h2>
          <p className="mt-2 text-sm text-gray-500">View your purchases.</p>
        </Link>

        <Link href="/account/profile" className="rounded-3xl border p-6 hover:border-black">
          <h2 className="font-semibold">Profile</h2>
          <p className="mt-2 text-sm text-gray-500">Manage your information.</p>
        </Link>

        <Link href="/account/health" className="rounded-3xl border p-6 hover:border-black">
          <h2 className="font-semibold">Health Card</h2>
          <p className="mt-2 text-sm text-gray-500">Your wellness profile.</p>
        </Link>
      </div>
    </main>
  );
}
