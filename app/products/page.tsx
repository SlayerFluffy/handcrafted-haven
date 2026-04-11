import Link from "next/link"
import { Suspense } from "react"
import { getActiveProducts, getDistinctCategories } from "@/app/lib/product-data"
import ProductFilters from "@/app/components/products/product-filters"

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

type SearchParams = {
  category?: string
  minPrice?: string
  maxPrice?: string
}

const Page = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const params = await searchParams

  const minPrice = params.minPrice ? parseFloat(params.minPrice) : undefined
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : undefined

  const [products, categories] = await Promise.all([
    getActiveProducts({ category: params.category, minPrice, maxPrice }),
    getDistinctCategories(),
  ])

  const hasFilters = params.category || params.minPrice || params.maxPrice

  return (
    <main className="min-h-screen bg-background px-6 py-8 md:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-text-light">
            Handcrafted Haven
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-text md:text-4xl">
            Browse Products
          </h1>
          <p className="mt-3 max-w-2xl text-text-light">
            Discover handmade items from artisans around the world.
          </p>
        </div>

        <Suspense>
          <ProductFilters categories={categories} />
        </Suspense>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-text">No products found</h2>
            <p className="mt-2 text-text-light">
              {hasFilters
                ? 'No products match the selected filters.'
                : 'No products are currently listed.'}
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-text-light">
              Showing {products.length} product{products.length === 1 ? '' : 's'}
            </p>

            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm hover:shadow-md"
                >
                  <div className="flex h-44 items-center justify-center bg-accent text-4xl font-semibold text-primary">
                    {product.name.charAt(0)}
                  </div>

                  <div className="p-5">
                    {product.category && (
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-light">
                        {product.category}
                      </p>
                    )}

                    <h2 className="text-lg font-semibold text-text">
                      {product.name}
                    </h2>

                    <Link
                      href={`/users/${product.sellerId}`}
                      className="mt-2 inline-block text-sm text-primary hover:text-secondary"
                    >
                      by {product.sellerName}
                    </Link>

                    <p className="mt-4 text-2xl font-semibold text-text">
                      {moneyFormatter.format(product.price)}
                    </p>

                    {product.description && (
                      <p className="mt-4 line-clamp-2 text-sm text-text-light">
                        {product.description}
                      </p>
                    )}

                    <Link
                      href={`/products/${product.id}`}
                      className="mt-5 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-surface hover:bg-secondary"
                    >
                      View Product
                    </Link>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </section>
    </main>
  )
}

export default Page
