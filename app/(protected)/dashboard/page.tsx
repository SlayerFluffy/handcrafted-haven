import Link from "next/link"

const Page = () => {
  return (
    <main className="bg-background px-6 py-8 md:px-10">
      <section className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-2xl font-semibold text-text">Dashboard</h1>
        <p className="text-text-light">Manage your profile and product listings.</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/dashboard/profile"
            className="rounded-lg border border-border bg-surface p-5 hover:border-secondary"
          >
            <h2 className="text-lg font-semibold text-text">My Profile</h2>
            <p className="mt-2 text-sm text-text-light">
              Update your personal information and manage your listings.
            </p>
          </Link>

          <Link
            href="/dashboard/products/new"
            className="rounded-lg border border-border bg-surface p-5 hover:border-secondary"
          >
            <h2 className="text-lg font-semibold text-text">Add Product</h2>
            <p className="mt-2 text-sm text-text-light">Create a new product listing.</p>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Page
