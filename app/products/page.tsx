import Link from "next/link"
import { getActiveProducts } from "@/app/lib/product-data"

const Page = async () => {
  const products = await getActiveProducts()

  return (
    <main className="bg-background px-6 py-8 md:px-10">
      <section className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-3xl font-semibold text-text">Products</h1>

        {products.length === 0 ? (
          <p className="rounded-lg border border-border bg-surface p-5 text-text-light">
            No products are currently listed.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.id} className="rounded-lg border border-border bg-surface p-4">
                <h2 className="text-lg font-semibold text-text">{product.name}</h2>
                <p className="mt-1 text-sm text-text-light">${product.price.toFixed(2)}</p>
                <p className="mt-2 text-sm text-text-light">By {product.sellerName}</p>

                <div className="mt-4 flex gap-4 text-sm font-semibold">
                  <Link href={`/products/${product.id}`} className="text-primary hover:text-secondary">
                    View Product
                  </Link>
                  <Link href={`/users/${product.sellerId}`} className="text-primary hover:text-secondary">
                    View Seller
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default Page
