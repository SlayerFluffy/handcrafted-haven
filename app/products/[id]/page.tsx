import Link from "next/link"
import { notFound } from "next/navigation"
import { getActiveProductById } from "@/app/lib/product-data"

type Props = {
  params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {
  const { id } = await params
  const product = await getActiveProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <main className="bg-background px-6 py-8 md:px-10">
      <section className="mx-auto max-w-3xl space-y-4 rounded-lg border border-border bg-surface p-6">
        <h1 className="text-2xl font-semibold text-text">{product.name}</h1>
        <p className="text-lg font-medium text-text">${product.price.toFixed(2)}</p>

        {product.description ? (
          <p className="text-sm leading-6 text-text-light">{product.description}</p>
        ) : (
          <p className="text-sm text-text-light">No description provided.</p>
        )}

        {product.category ? (
          <p className="text-sm text-text-light">Category: {product.category}</p>
        ) : null}

        <Link href={`/users/${product.sellerId}`} className="text-sm font-semibold text-primary hover:text-secondary">
          View {product.sellerName}&apos;s profile
        </Link>
      </section>
    </main>
  )
}

export default Page
