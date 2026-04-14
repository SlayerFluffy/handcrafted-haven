import { ReviewWithReviewer } from "@/app/lib/types"

const ReviewList = ({ reviews }: { reviews: ReviewWithReviewer[] }) => {
  if (reviews.length === 0) {
    return <p className="text-sm text-text-light">No reviews yet. Be the first!</p>
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li key={review.id} className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text">{review.reviewer.name}</span>
            <span className="text-xs text-text-light">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="mt-1 text-yellow-400">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </div>
          {review.comment && (
            <p className="mt-2 text-sm leading-relaxed text-text-light">{review.comment}</p>
          )}
        </li>
      ))}
    </ul>
  )
}

export default ReviewList
