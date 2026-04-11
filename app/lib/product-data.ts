import pool from "@/app/lib/db"

export type ProductFilters = {
  category?: string
  minPrice?: number
  maxPrice?: number
}

export type ProductRow = {
  id: string
  sellerId: string
  name: string
  description: string | null
  price: number
  imageUrl: string | null
  category: string | null
  isActive: boolean
}

export type PublicProductRow = {
  id: string
  sellerId: string
  sellerName: string
  name: string
  description: string | null
  price: number
  imageUrl: string | null
  category: string | null
}

export type ProductInput = {
  name: string
  description: string | null
  price: number
  imageUrl: string | null
  category: string | null
  isActive: boolean
}

export const getProductByIdForOwner = async (
  productId: string,
  ownerId: string,
): Promise<ProductRow | null> => {
  const result = await pool.query(
    `
      SELECT
        id,
        seller_id AS "sellerId",
        name,
        description,
        price::float8 AS price,
        image_url AS "imageUrl",
        category,
        is_active AS "isActive"
      FROM products
      WHERE id = $1 AND seller_id = $2
      LIMIT 1
    `,
    [productId, ownerId],
  )

  if (result.rowCount === 0) {
    return null
  }

  return result.rows[0] as ProductRow
}

export const getDistinctCategories = async (): Promise<string[]> => {
  const result = await pool.query(
    `SELECT DISTINCT category FROM products WHERE is_active = true AND category IS NOT NULL ORDER BY category`,
  )
  return result.rows.map((row: { category: string }) => row.category)
}

export const getActiveProducts = async (filters: ProductFilters = {}): Promise<PublicProductRow[]> => {
  const conditions = ['p.is_active = true']
  const values: (string | number)[] = []

  if (filters.category) {
    values.push(filters.category)
    conditions.push(`p.category = $${values.length}`)
  }

  if (filters.minPrice !== undefined) {
    values.push(filters.minPrice)
    conditions.push(`p.price >= $${values.length}`)
  }

  if (filters.maxPrice !== undefined) {
    values.push(filters.maxPrice)
    conditions.push(`p.price <= $${values.length}`)
  }

  const result = await pool.query(
    `
      SELECT
        p.id,
        p.seller_id AS "sellerId",
        u.name AS "sellerName",
        p.name,
        p.description,
        p.price::float8 AS price,
        p.image_url AS "imageUrl",
        p.category
      FROM products AS p
      INNER JOIN "user" AS u ON u.id = p.seller_id
      WHERE ${conditions.join(' AND ')}
      ORDER BY p.created_at DESC
    `,
    values,
  )

  return result.rows as PublicProductRow[]
}

export const getActiveProductById = async (productId: string): Promise<PublicProductRow | null> => {
  const result = await pool.query(
    `
      SELECT
        p.id,
        p.seller_id AS "sellerId",
        u.name AS "sellerName",
        p.name,
        p.description,
        p.price::float8 AS price,
        p.image_url AS "imageUrl",
        p.category
      FROM products AS p
      INNER JOIN "user" AS u ON u.id = p.seller_id
      WHERE p.id = $1 AND p.is_active = true
      LIMIT 1
    `,
    [productId],
  )

  if (result.rowCount === 0) {
    return null
  }

  return result.rows[0] as PublicProductRow
}

export const createProductForSeller = async (sellerId: string, data: ProductInput) => {
  await pool.query(
    `
      INSERT INTO products (
        seller_id,
        name,
        description,
        price,
        image_url,
        category,
        is_active
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
    [
      sellerId,
      data.name,
      data.description,
      data.price,
      data.imageUrl,
      data.category,
      data.isActive,
    ],
  )
}

export const updateProductForSeller = async (
  productId: string,
  sellerId: string,
  data: ProductInput,
): Promise<boolean> => {
  const result = await pool.query(
    `
      UPDATE products
      SET
        name = $1,
        description = $2,
        price = $3,
        image_url = $4,
        category = $5,
        is_active = $6,
        updated_at = NOW()
      WHERE id = $7 AND seller_id = $8
    `,
    [
      data.name,
      data.description,
      data.price,
      data.imageUrl,
      data.category,
      data.isActive,
      productId,
      sellerId,
    ],
  )

  return (result.rowCount ?? 0) > 0
}

export const deleteProductForSeller = async (productId: string, sellerId: string): Promise<boolean> => {
  const result = await pool.query(
    `DELETE FROM products WHERE id = $1 AND seller_id = $2`,
    [productId, sellerId],
  )

  return (result.rowCount ?? 0) > 0
}
