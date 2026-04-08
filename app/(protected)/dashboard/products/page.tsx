import Link from "next/link"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { deleteProductForSeller } from "@/app/lib/product-data"
import { getProductsBySellerForManagement } from "@/app/lib/profile-data"
import { getSession } from "@/app/lib/session"

const Page = async () => {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const products = await getProductsBySellerForManagement(session.user.id)

  const deleteProductAction = async (formData: FormData) => {
    "use server"

    const currentSession = await getSession()

    if (!currentSession) {
      redirect("/login")
    }

    const productId = formData.get("productId")

    if (typeof productId !== "string") {
      return
    }

    await deleteProductForSeller(productId, currentSession.user.id)
    revalidatePath("/dashboard/products")
    revalidatePath("/dashboard/profile")
    revalidatePath(`/users/${currentSession.user.id}`)
  }

  return (
    <main className="bg-background px-6 py-8 md:px-10">
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold text-text">Manage Products</h1>
          <Link
            href="/dashboard/products/new"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-surface hover:bg-secondary"
          >
            Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="rounded-lg border border-border bg-surface p-5 text-text-light">
            You have not created any products yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {products.map((product) => (
              <li
                key={product.id}
                className="rounded-lg border border-border bg-surface p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-text">{product.name}</p>
                    <p className="text-sm text-text-light">
                      ${product.price.toFixed(2)} · {product.isActive ? "Active" : "Hidden"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/products/${product.id}/edit`}
                      className="rounded-md border border-border px-3 py-1.5 text-sm text-text hover:border-secondary"
                    >
                      Edit
                    </Link>
                    <form action={deleteProductAction}>
                      <input type="hidden" name="productId" value={product.id} />
                      <button
                        type="submit"
                        className="rounded-md border border-error px-3 py-1.5 text-sm text-error hover:bg-error hover:text-surface"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default Page
