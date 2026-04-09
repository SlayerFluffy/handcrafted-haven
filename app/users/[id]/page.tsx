import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getProductsBySellerForPublic, getPublicProfileById } from "@/app/lib/profile-data"

type Props = {
  params: Promise<{ id: string }>
}

const avatarFallback = (name: string) => name.trim().charAt(0).toUpperCase() || "U"

const Page = async ({ params }: Props) => {
  const { id } = await params

  const [profile, products] = await Promise.all([
    getPublicProfileById(id),
    getProductsBySellerForPublic(id),
  ])

  if (!profile) {
    notFound()
  }

  return (
    <main className="bg-background px-6 py-8 md:px-10">
      <section className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-lg border border-border bg-surface p-6">
          <div className="flex items-center gap-4">
            {profile.image ? (
              <Image
                src={profile.image}
                alt={`${profile.name} profile`}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full border border-border object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background text-xl font-semibold text-text">
                {avatarFallback(profile.name)}
              </div>
            )}

            <div>
              <h1 className="text-2xl font-semibold text-text">{profile.name}</h1>
              <p className="mt-1 text-sm text-text-light">{profile.bio || "No bio yet."}</p>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text">Products</h2>

          {products.length === 0 ? (
            <p className="rounded-lg border border-border bg-surface p-5 text-text-light">
              No active products are currently listed.
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <li key={product.id} className="rounded-lg border border-border bg-surface p-4">
                  <h3 className="font-semibold text-text">{product.name}</h3>
                  <p className="mt-1 text-sm text-text-light">${product.price.toFixed(2)}</p>
                  {product.category ? (
                    <p className="mt-1 text-xs text-text-light">Category: {product.category}</p>
                  ) : null}
                  <Link
                    href={`/products/${product.id}`}
                    className="mt-4 inline-block text-sm font-semibold text-primary hover:text-secondary"
                  >
                    View Product
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  )
}

export default Page
