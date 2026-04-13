import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById } from '@/app/lib/queries'

type Props = { params: Promise<{ id: string }> }

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        className="h-5 w-5"
        fill={star <= Math.round(rating) ? '#F59E0B' : '#E5D5C5'}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
)

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const Page = async ({ params }: Props) => {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) notFound()

  return (
    <main className="bg-background px-6 py-8 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/products"
          className="mb-6 inline-block text-sm text-primary hover:underline"
        >
          ← Back to Products
        </Link>

        {/* Product Info */}
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface md:w-1/2">
            {product.imageUrl ? (
              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl font-semibold text-primary">
                {product.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4 md:w-1/2">
            {product.category && (
              <span className="text-sm font-medium uppercase tracking-wide text-accent">{product.category}</span>
            )}
            <h1 className="text-3xl font-bold text-text">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary">{moneyFormatter.format(product.price)}</p>

            {/* Rating summary */}
            <div className="flex items-center gap-2">
              <StarRating rating={product.averageRating ?? 0} />
              <span className="text-sm text-text-light">
                {product.averageRating !== null
                  ? `${product.averageRating.toFixed(1)} (${product.reviewCount} ${product.reviewCount === 1 ? 'review' : 'reviews'})`
                  : 'No reviews yet'}
              </span>
            </div>

            {product.description && (
              <p className="leading-relaxed text-text-light">{product.description}</p>
            )}

            {/* Seller */}
            <Link href={`/creators/${product.seller.id}`} className="mt-2 flex items-center gap-3 rounded-lg border border-border bg-surface p-3 transition-colors hover:border-accent">
              {product.seller.image ? (
                <Image src={product.seller.image} alt={product.seller.name} width={40} height={40} className="rounded-full" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-surface">
                  {product.seller.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-sm text-text-light">Sold by</p>
                <p className="font-medium text-text">{product.seller.name}</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-text">
            Reviews {product.reviewCount > 0 && `(${product.reviewCount})`}
          </h2>

          {product.reviews.length === 0 ? (
            <p className="mt-4 text-text-light">No reviews yet. Be the first to review this product!</p>
          ) : (
            <div className="mt-6 space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="rounded-lg border border-border bg-surface p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {review.reviewer.image ? (
                        <Image src={review.reviewer.image} alt={review.reviewer.name} width={32} height={32} className="rounded-full" />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-surface">
                          {review.reviewer.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="font-medium text-text">{review.reviewer.name}</span>
                    </div>
                    <time className="text-sm text-text-light" dateTime={new Date(review.createdAt).toISOString()}>
                      {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </time>
                  </div>
                  <div className="mt-2">
                    <StarRating rating={review.rating} />
                  </div>
                  {review.comment && (
                    <p className="mt-3 leading-relaxed text-text-light">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Page
