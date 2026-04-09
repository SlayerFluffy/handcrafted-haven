import Link from 'next/link'
import { mockProducts } from '@/app/lib/mock-products'

type Props = {
  params: Promise<{ id: string }>
}

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const Page = async ({ params }: Props) => {
  const { id } = await params
  const product = mockProducts.find((item) => item.id === id)

  if (!product) {
    return (
      <main className="min-h-screen bg-background px-6 py-8 md:px-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-text">Product not found</h1>
          <Link 
            href="/products"
            className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-surface hover:bg-secondary"
          >
            Back to Products
        </Link>
      </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-6 py-8 md:px-10">
      <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
        <Link
          href="/products"
          className="mb-6 inline-block text-sm text-primary hover:underline"
        >
          ← Back to Products
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex h-72 items-center justify-center rounded-2xl bg-accent/20 text-6xl font-semibold text-primary">
            {product.name.charAt(0)}
          </div>

          <div>
            <p className="text-sm uppercase tracking-wide text-text-light">
              {product.category}
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-text">
              {product.name}
            </h1>

            <p className="mt-2 text-text-light">by {product.seller}</p>

            <p className="mt-6 text-3xl font-semibold text-text">
              {moneyFormatter.format(product.price)}
            </p>

            <div className="mt-4 flex gap-6 text-sm text-text-light">
              <span>⭐ {product.rating.toFixed(1)}</span>
              <span>{product.reviews} reviews</span>
            </div>

            <p className="mt-6 leading-7 text-text-light">
              {product.description}
            </p>

            <button className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-surface hover:bg-secondary">
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page