import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"
import ImageUploadField from "@/app/components/forms/image-upload-field"
import { getProductByIdForOwner, updateProductForSeller } from "@/app/lib/product-data"
import { getSession } from "@/app/lib/session"
import { asNonEmptyString, asOptionalString, parseChecked, parsePrice } from "@/app/lib/validation"

type Props = {
  params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const { id } = await params
  const product = await getProductByIdForOwner(id, session.user.id)

  if (!product) {
    notFound()
  }

  const updateProductAction = async (formData: FormData) => {
    "use server"

    const currentSession = await getSession()

    if (!currentSession) {
      redirect("/login")
    }

    const name = asNonEmptyString(formData.get("name"))
    const price = parsePrice(formData.get("price"))

    if (!name || price === null) {
      return
    }

    await updateProductForSeller(id, currentSession.user.id, {
      name,
      description: asOptionalString(formData.get("description")),
      price,
      imageUrl: asOptionalString(formData.get("imageUrl")),
      category: asOptionalString(formData.get("category")),
      isActive: parseChecked(formData.get("isActive")),
    })

    revalidatePath("/dashboard/products")
    revalidatePath("/dashboard/profile")
    revalidatePath(`/users/${currentSession.user.id}`)
    revalidatePath(`/products/${id}`)
    redirect("/dashboard/profile")
  }

  return (
    <main className="bg-background px-6 py-8 md:px-10">
      <section className="mx-auto max-w-2xl space-y-6 rounded-lg border border-border bg-surface p-6">
        <h1 className="text-2xl font-semibold text-text">Edit Product</h1>

        <form action={updateProductAction} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-text">Name</span>
            <input
              type="text"
              name="name"
              defaultValue={product.name}
              required
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-text">Description</span>
            <textarea
              name="description"
              rows={4}
              defaultValue={product.description ?? ""}
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-text">Price (USD)</span>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              defaultValue={product.price}
              required
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary"
            />
          </label>

          <ImageUploadField
            label="Image URL"
            fieldName="imageUrl"
            folder="products"
            defaultValue={product.imageUrl ?? ""}
          />

          <label className="block space-y-2">
            <span className="text-sm font-medium text-text">Category</span>
            <input
              type="text"
              name="category"
              defaultValue={product.category ?? ""}
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary"
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-text">
            <input type="checkbox" name="isActive" defaultChecked={product.isActive} />
            Visible to the public
          </label>

          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-surface hover:bg-secondary"
          >
            Save Changes
          </button>
        </form>
      </section>
    </main>
  )
}

export default Page
