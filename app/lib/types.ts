// Matches better-auth's "user" table
export type User = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export type Product = {
  id: string
  sellerId: string
  name: string
  description: string | null
  price: number
  imageUrl: string | null
  category: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type Review = {
  id: string
  productId: string
  reviewerId: string
  rating: number   // 1–5
  comment: string | null
  createdAt: Date
}

// Joined types for common queries
export type ProductWithSeller = Product & {
  seller: Pick<User, 'id' | 'name' | 'image'>
}

export type ReviewWithReviewer = Review & {
  reviewer: Pick<User, 'id' | 'name' | 'image'>
}

export type ProductWithReviews = Product & {
  reviews: ReviewWithReviewer[]
  averageRating: number | null
  reviewCount: number
}

// Form input types (no auto-generated fields)
export type ProductFormData = {
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
}
