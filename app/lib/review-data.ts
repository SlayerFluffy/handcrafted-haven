import pool from "@/app/lib/db"
import { ReviewWithReviewer } from "@/app/lib/types"

export const getReviewsForProduct = async (productId: string): Promise<ReviewWithReviewer[]> => {
  const result = await pool.query(
    `
      SELECT
        r.id,
        r.product_id AS "productId",
        r.reviewer_id AS "reviewerId",
        r.rating,
        r.comment,
        r.created_at AS "createdAt",
        u.id AS "reviewer_id",
        u.name AS "reviewer_name",
        u.image AS "reviewer_image"
      FROM reviews r
      INNER JOIN "user" u ON u.id = r.reviewer_id
      WHERE r.product_id = $1
      ORDER BY r.created_at DESC
    `,
    [productId],
  )

  return result.rows.map((row: Record<string, unknown>) => ({
    id: row.id as string,
    productId: row.productId as string,
    reviewerId: row.reviewerId as string,
    rating: row.rating as number,
    comment: row.comment as string | null,
    createdAt: row.createdAt as Date,
    reviewer: {
      id: row.reviewer_id as string,
      name: row.reviewer_name as string,
      image: row.reviewer_image as string | null,
    },
  }))
}

export const upsertReview = async (
  productId: string,
  reviewerId: string,
  rating: number,
  comment: string | null,
) => {
  await pool.query(
    `INSERT INTO reviews (product_id, reviewer_id, rating, comment)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (product_id, reviewer_id)
     DO UPDATE SET rating = $3, comment = $4`,
    [productId, reviewerId, rating, comment],
  )
}

export const getAverageRating = async (productId: string): Promise<{ avg: number | null; count: number }> => {
  const result = await pool.query(
    `SELECT AVG(rating)::float8 AS avg, COUNT(*)::int AS count FROM reviews WHERE product_id = $1`,
    [productId],
  )
  const row = result.rows[0]
  return { avg: row.avg ? Math.round(row.avg * 10) / 10 : null, count: row.count }
}

export const getUserReview = async (productId: string, userId: string) => {
  const result = await pool.query(
    `SELECT rating, comment FROM reviews WHERE product_id = $1 AND reviewer_id = $2 LIMIT 1`,
    [productId, userId],
  )
  return result.rows[0] as { rating: number; comment: string | null } | undefined
}
