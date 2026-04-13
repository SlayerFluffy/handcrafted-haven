"use client"

import { ChangeEvent, useId, useState } from "react"
import { isValidUploadFolder } from "@/app/lib/supabase-storage"

type Props = {
  label: string
  fieldName: string
  folder: "products" | "profiles"
  defaultValue?: string
}

const MAX_FILE_BYTES = 5 * 1024 * 1024

const ImageUploadField = ({ label, fieldName, folder, defaultValue = "" }: Props) => {
  const [imageUrl, setImageUrl] = useState(defaultValue)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputId = useId()

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.")
      return
    }

    if (file.size > MAX_FILE_BYTES) {
      setError("Image must be 5MB or smaller.")
      return
    }

    if (!isValidUploadFolder(folder)) {
      setError("Invalid upload folder.")
      return
    }

    setError("")
    setIsUploading(true)

    const uploadFormData = new FormData()
    uploadFormData.append("folder", folder)
    uploadFormData.append("file", file)

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: uploadFormData,
    })

    const responseData = (await response.json().catch(() => null)) as { error?: string; url?: string } | null

    if (!response.ok || !responseData?.url) {
      setError(responseData?.error || "Upload failed.")
      setIsUploading(false)
      return
    }

    setImageUrl(responseData.url)
    setIsUploading(false)
    event.target.value = ""
  }

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-text">{label}</span>
      <input type="hidden" name={fieldName} value={imageUrl} />

      <input
        type="url"
        value={imageUrl}
        onChange={(event) => {
          setImageUrl(event.target.value)
          setError("")
        }}
        placeholder="https://..."
        className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary"
      />

      <input
        id={fileInputId}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
        className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-surface disabled:cursor-not-allowed disabled:opacity-70"
      />

      {isUploading ? <p className="text-xs text-text-light">Uploading image...</p> : null}
      {error ? <p className="text-xs text-error">{error}</p> : null}

      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Preview"
          className="h-28 w-28 rounded-md border border-border object-cover"
        />
      ) : null}
    </label>
  )
}

export default ImageUploadField
