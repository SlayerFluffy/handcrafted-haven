-- Products table
-- seller_id references better-auth's "user" table which uses TEXT ids
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  category VARCHAR(100),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS products_seller_id_idx ON products(seller_id);
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
-- Public profile fields for marketplace users
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id TEXT PRIMARY KEY REFERENCES "user"(id) ON DELETE CASCADE,
  bio TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  reviewer_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (
    rating >= 1
    AND rating <= 5
  ),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (product_id, reviewer_id) -- one review per user per product
);
CREATE INDEX IF NOT EXISTS reviews_product_id_idx ON reviews(product_id);