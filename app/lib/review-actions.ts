"use server"

import { revalidatePath } from "next/cache"
import { getSession } from "@/app/lib/session"
import { upsertReview } from "@/app/lib/review-data"

export type ReviewActionState = {
  error?: string
  success?: boolean
}

export const submitReview = async (
  _prev: ReviewActionState,
  formData: FormData,
): Promise<ReviewActionState> => {
  const session = await getSession()
  if (!session?.user) return { error: "You must be logged in." }

  const productId = formData.get("productId") as string
  const rating = Number(formData.get("rating"))
  const comment = (formData.get("comment") as string)?.trim() || null

  if (!rating || rating < 1 || rating > 5) return { error: "Select a rating (1–5)." }
  if (comment && comment.length < 10) return { error: "Review must be at least 10 characters." }
  if (comment && comment.length > 1000) return { error: "Review must be 1000 characters or fewer." }

  try {
    await upsertReview(productId, session.user.id, rating, comment)
  } catch {
    return { error: "Failed to save review. Please try again." }
  }

  revalidatePath(`/products/${productId}`)
  return { success: true }
}
