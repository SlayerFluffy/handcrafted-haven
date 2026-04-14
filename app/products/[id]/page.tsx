import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getActiveProductById } from "@/app/lib/product-data"
import { getReviewsForProduct, getAverageRating, getUserReview } from "@/app/lib/review-data"
import { getSession } from "@/app/lib/session"
import ReviewForm from "@/app/components/products/review-form"
import ReviewList from "@/app/components/products/review-list"

type Props = {
  params: Promise<{ id: string }>
}

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const Page = async ({ params }: Props) => {
  const { id } = await params
  const [product, reviews, ratingStats, session] = await Promise.all([
    getActiveProductById(id),
    getReviewsForProduct(id),
    getAverageRating(id),
    getSession(),
  ])

  const userReview = session?.user
    ? await getUserReview(id, session.user.id)
    : undefined

  if (!product) {
    notFound()
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
          <div className="relative h-72 overflow-hidden rounded-2xl bg-accent/20">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl font-semibold text-primary">
                {product.name.charAt(0)}
              </div>
            )}
          </div>

          <div>
            {product.category && (
              <p className="text-sm uppercase tracking-wide text-text-light">
                {product.category}
              </p>
            )}

            <h1 className="mt-2 text-3xl font-semibold text-text">
              {product.name}
            </h1>

            <Link
              href={`/users/${product.sellerId}`}
              className="mt-2 inline-block text-sm text-primary hover:text-secondary"
            >
              by {product.sellerName}
            </Link>

            <p className="mt-6 text-3xl font-semibold text-text">
              {moneyFormatter.format(product.price)}
            </p>

            {product.description ? (
              <p className="mt-6 leading-7 text-text-light">
                {product.description}
              </p>
            ) : (
              <p className="mt-6 text-sm text-text-light">No description provided.</p>
            )}

            <Link
              href={`/users/${product.sellerId}`}
              className="mt-6 inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-surface hover:bg-secondary"
            >
              View Seller
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-semibold text-text">Reviews ({ratingStats.count})</h2>
            {ratingStats.avg !== null && (
              <span className="text-sm text-text-light">
                <span className="text-yellow-400">★</span> {ratingStats.avg} / 5
              </span>
            )}
          </div>
          <div className="mt-6">
            <ReviewForm
              productId={id}
              isLoggedIn={!!session?.user}
              existingRating={userReview?.rating}
              existingComment={userReview?.comment ?? undefined}
            />
          </div>
          <div className="mt-8">
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page
