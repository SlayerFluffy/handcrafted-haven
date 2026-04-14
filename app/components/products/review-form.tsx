"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { submitReview, ReviewActionState } from "@/app/lib/review-actions"

type Props = {
  productId: string
  isLoggedIn: boolean
  existingRating?: number
  existingComment?: string
}

const ReviewForm = ({ productId, isLoggedIn, existingRating, existingComment }: Props) => {
  const [rating, setRating] = useState(existingRating ?? 0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState(existingComment ?? "")
  const [state, formAction, pending] = useActionState<ReviewActionState, FormData>(submitReview, {})
  const isUpdate = !!existingRating

  if (!isLoggedIn) {
    return (
      <p className="text-sm text-text-light">
        <Link href="/login" className="text-primary hover:underline">Log in</Link> to leave a review.
      </p>
    )
  }

  if (state.success) {
    return <p className="text-sm text-green-600">Thanks for your review!</p>
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="rating" value={rating} />

      <div>
        <label className="mb-1 block text-sm font-medium text-text">Rating</label>
        <div className="flex gap-1" onMouseLeave={() => setHovered(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              className={`text-2xl transition-colors ${star <= (hovered || rating) ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="mb-1 block text-sm font-medium text-text">
          Review <span className="font-normal text-text-light">(optional)</span>
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          maxLength={1000}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience (min 10 characters)…"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none"
        />
        <p className="mt-1 text-xs text-text-light">{comment.length}/1000</p>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending || rating === 0}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-surface hover:bg-secondary disabled:opacity-50"
      >
        {pending ? "Submitting…" : isUpdate ? "Update Review" : "Submit Review"}
      </button>
    </form>
  )
}

export default ReviewForm
