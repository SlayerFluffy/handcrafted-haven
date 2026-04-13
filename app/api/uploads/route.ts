import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { getSession } from "@/app/lib/session"
import { getSupabaseServerClient } from "@/app/lib/supabase-server"
import { isValidUploadFolder, storageBucketName } from "@/app/lib/supabase-storage"

const MAX_FILE_BYTES = 5 * 1024 * 1024

const getExtension = (fileName: string) => {
  const fileNameParts = fileName.split(".")
  if (fileNameParts.length <= 1) {
    return "jpg"
  }

  const extension = fileNameParts.pop()
  return extension ? extension.toLowerCase() : "jpg"
}

export const POST = async (request: Request) => {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = getSupabaseServerClient()

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase server upload is not configured." },
      { status: 500 },
    )
  }

  const formData = await request.formData()
  const folder = formData.get("folder")
  const file = formData.get("file")

  if (typeof folder !== "string" || !isValidUploadFolder(folder)) {
    return NextResponse.json({ error: "Invalid upload folder." }, { status: 400 })
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 })
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Please choose an image file." }, { status: 400 })
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "Image must be 5MB or smaller." }, { status: 400 })
  }

  const extension = getExtension(file.name)
  const filePath = `${folder}/${session.user.id}/${randomUUID()}.${extension}`
  const fileBuffer = Buffer.from(await file.arrayBuffer())

  const uploadResult = await supabase.storage.from(storageBucketName).upload(filePath, fileBuffer, {
    upsert: false,
    contentType: file.type,
    cacheControl: "3600",
  })

  if (uploadResult.error) {
    return NextResponse.json({ error: uploadResult.error.message }, { status: 500 })
  }

  const publicUrlResult = supabase.storage.from(storageBucketName).getPublicUrl(filePath)

  return NextResponse.json({ url: publicUrlResult.data.publicUrl })
}
