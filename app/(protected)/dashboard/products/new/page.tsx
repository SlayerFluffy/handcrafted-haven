import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createProductForSeller } from "@/app/lib/product-data"
import { getSession } from "@/app/lib/session"
import { asNonEmptyString, asOptionalString, parseChecked, parsePrice } from "@/app/lib/validation"

const Page = async () => {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const createProductAction = async (formData: FormData) => {
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

    await createProductForSeller(currentSession.user.id, {
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
    redirect("/dashboard/profile")
  }

  return (
    <main className="bg-background px-6 py-8 md:px-10">
      <section className="mx-auto max-w-2xl space-y-6 rounded-lg border border-border bg-surface p-6">
        <h1 className="text-2xl font-semibold text-text">Add Product</h1>

        <form action={createProductAction} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-text">Name</span>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-text">Description</span>
            <textarea
              name="description"
              rows={4}
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
              required
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-text">Image URL</span>
            <input
              type="url"
              name="imageUrl"
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-text">Category</span>
            <input
              type="text"
              name="category"
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary"
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-text">
            <input type="checkbox" name="isActive" defaultChecked />
            Visible to the public
          </label>

          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-surface hover:bg-secondary"
          >
            Create Product
          </button>
        </form>
      </section>
    </main>
  )
}

export default Page
