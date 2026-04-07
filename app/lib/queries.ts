import pool from '@/app/lib/db'
import type { ProductWithSeller, ReviewWithReviewer } from '@/app/lib/types'

export type ProductDetail = ProductWithSeller & {
  reviews: ReviewWithReviewer[]
  averageRating: number | null
  reviewCount: number
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function getProductById(id: string): Promise<ProductDetail | null> {
  if (!UUID_RE.test(id)) return null

  const productResult = await pool.query(
    `SELECT
       p.id, p.seller_id AS "sellerId", p.name, p.description, p.price,
       p.image_url AS "imageUrl", p.category, p.is_active AS "isActive",
       p.created_at AS "createdAt", p.updated_at AS "updatedAt",
       u.name AS "sellerName", u.image AS "sellerImage",
       COALESCE(AVG(r.rating), 0) AS "averageRating",
       COUNT(r.id)::int AS "reviewCount"
     FROM products p
     JOIN "user" u ON u.id = p.seller_id
     LEFT JOIN reviews r ON r.product_id = p.id
     WHERE p.id = $1
     GROUP BY p.id, u.id`,
    [id]
  )

  const row = productResult.rows[0]
  if (!row) return null

  const reviewsResult = await pool.query(
    `SELECT
       r.id, r.product_id AS "productId", r.reviewer_id AS "reviewerId",
       r.rating, r.comment, r.created_at AS "createdAt",
       u.name AS "reviewerName", u.image AS "reviewerImage"
     FROM reviews r
     JOIN "user" u ON u.id = r.reviewer_id
     WHERE r.product_id = $1
     ORDER BY r.created_at DESC`,
    [id]
  )

  return {
    id: row.id,
    sellerId: row.sellerId,
    name: row.name,
    description: row.description,
    price: parseFloat(row.price),
    imageUrl: row.imageUrl,
    category: row.category,
    isActive: row.isActive,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    seller: { id: row.sellerId, name: row.sellerName, image: row.sellerImage },
    averageRating: row.reviewCount > 0 ? parseFloat(row.averageRating) : null,
    reviewCount: row.reviewCount,
    reviews: reviewsResult.rows.map((r) => ({
      id: r.id,
      productId: r.productId,
      reviewerId: r.reviewerId,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt,
      reviewer: { id: r.reviewerId, name: r.reviewerName, image: r.reviewerImage },
    })),
  }
}
