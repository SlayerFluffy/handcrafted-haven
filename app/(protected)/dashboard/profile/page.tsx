import Link from "next/link"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import ImageUploadField from "@/app/components/forms/image-upload-field"
import { deleteProductForSeller } from "@/app/lib/product-data"
import {
  getPrivateProfileById,
  getProductsBySellerForManagement,
  updateUserProfile,
} from "@/app/lib/profile-data"
import { getSession } from "@/app/lib/session"
import { asNonEmptyString, asOptionalString } from "@/app/lib/validation"

const Page = async () => {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const profile = await getPrivateProfileById(session.user.id)

  if (!profile) {
    redirect("/dashboard")
  }

  const products = await getProductsBySellerForManagement(session.user.id)

  const updateProfileAction = async (formData: FormData) => {
    "use server"

    const currentSession = await getSession()

    if (!currentSession) {
      redirect("/login")
    }

    const name = asNonEmptyString(formData.get("name"))

    if (!name) {
      return
    }

    await updateUserProfile({
      userId: currentSession.user.id,
      name,
      image: asOptionalString(formData.get("image")),
      bio: asOptionalString(formData.get("bio")),
    })

    revalidatePath("/dashboard/profile")
    revalidatePath(`/users/${currentSession.user.id}`)
  }

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
    revalidatePath("/dashboard/profile")
    revalidatePath("/dashboard/products")
    revalidatePath(`/users/${currentSession.user.id}`)
  }

  return (
    <main className="bg-background px-6 py-8 md:px-10">
      <section className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold text-text">My Profile</h1>
          <Link
            href={`/users/${session.user.id}`}
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-text hover:border-secondary hover:text-secondary"
          >
            View Public Profile
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold text-text">Account Information</h2>
            <p className="mt-2 text-sm text-text-light">Email: {profile.email}</p>

            <form action={updateProfileAction} className="mt-5 space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-text">Name</span>
                <input
                  type="text"
                  name="name"
                  defaultValue={profile.name}
                  required
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary"
                />
              </label>

              <ImageUploadField
                label="Profile Image URL"
                fieldName="image"
                folder="profiles"
                defaultValue={profile.image ?? ""}
              />

              <label className="block space-y-2">
                <span className="text-sm font-medium text-text">Bio</span>
                <textarea
                  name="bio"
                  rows={4}
                  defaultValue={profile.bio ?? ""}
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary"
                />
              </label>

              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-surface hover:bg-secondary"
              >
                Update Profile
              </button>
            </form>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-text">My Listings</h2>
              <Link
                href="/dashboard/products/new"
                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-surface hover:bg-secondary"
              >
                Add Product
              </Link>
            </div>

            {products.length === 0 ? (
              <p className="mt-4 text-sm text-text-light">You have not listed any products yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {products.map((product) => (
                  <li key={product.id} className="rounded-md border border-border p-4">
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
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page
