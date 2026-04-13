export const storageBucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "images"

export const isValidUploadFolder = (value: string): value is "products" | "profiles" => {
  return value === "products" || value === "profiles"
}
