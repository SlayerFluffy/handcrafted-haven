import pool from "@/app/lib/db"

export type PrivateProfileData = {
  id: string
  name: string
  email: string
  image: string | null
  bio: string | null
}

export type PublicProfileData = {
  id: string
  name: string
  image: string | null
  bio: string | null
}

export type ManagedProduct = {
  id: string
  name: string
  description: string | null
  price: number
  imageUrl: string | null
  category: string | null
  isActive: boolean
  updatedAt: Date
}

export type PublicProduct = {
  id: string
  name: string
  description: string | null
  price: number
  imageUrl: string | null
  category: string | null
}

export const getPrivateProfileById = async (userId: string): Promise<PrivateProfileData | null> => {
  const result = await pool.query(
    `
      SELECT
        u.id,
        u.name,
        u.email,
        u.image,
        p.bio
      FROM "user" AS u
      LEFT JOIN user_profiles AS p ON p.user_id = u.id
      WHERE u.id = $1
      LIMIT 1
    `,
    [userId],
  )

  if (result.rowCount === 0) {
    return null
  }

  return result.rows[0] as PrivateProfileData
}

export const getPublicProfileById = async (userId: string): Promise<PublicProfileData | null> => {
  const result = await pool.query(
    `
      SELECT
        u.id,
        u.name,
        u.image,
        p.bio
      FROM "user" AS u
      LEFT JOIN user_profiles AS p ON p.user_id = u.id
      WHERE u.id = $1
      LIMIT 1
    `,
    [userId],
  )

  if (result.rowCount === 0) {
    return null
  }

  return result.rows[0] as PublicProfileData
}

export const getProductsBySellerForManagement = async (sellerId: string): Promise<ManagedProduct[]> => {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        description,
        price::float8 AS price,
        image_url AS "imageUrl",
        category,
        is_active AS "isActive",
        updated_at AS "updatedAt"
      FROM products
      WHERE seller_id = $1
      ORDER BY updated_at DESC
    `,
    [sellerId],
  )

  return result.rows as ManagedProduct[]
}

export const getProductsBySellerForPublic = async (sellerId: string): Promise<PublicProduct[]> => {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        description,
        price::float8 AS price,
        image_url AS "imageUrl",
        category
      FROM products
      WHERE seller_id = $1 AND is_active = true
      ORDER BY created_at DESC
    `,
    [sellerId],
  )

  return result.rows as PublicProduct[]
}

export const updateUserProfile = async (params: {
  userId: string
  name: string
  image: string | null
  bio: string | null
}) => {
  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    await client.query(
      `
        UPDATE "user"
        SET
          name = $1,
          image = $2,
          "updatedAt" = NOW()
        WHERE id = $3
      `,
      [params.name, params.image, params.userId],
    )

    await client.query(
      `
        INSERT INTO user_profiles (user_id, bio)
        VALUES ($1, $2)
        ON CONFLICT (user_id)
        DO UPDATE SET
          bio = EXCLUDED.bio,
          updated_at = NOW()
      `,
      [params.userId, params.bio],
    )

    await client.query("COMMIT")
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}
