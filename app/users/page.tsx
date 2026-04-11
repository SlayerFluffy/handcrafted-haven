import Link from "next/link"
import Image from "next/image"
import { getActiveCreators } from "@/app/lib/profile-data"

const Page = async () => {
  const creators = await getActiveCreators()

  return (
    <main className="min-h-screen bg-background px-6 py-8 md:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-text-light">
            Handcrafted Haven
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-text md:text-4xl">
            Meet the Creators
          </h1>
          <p className="mt-3 max-w-2xl text-text-light">
            Independent artisans handcrafting one-of-a-kind items.
          </p>
        </div>

        {creators.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-text">No creators yet</h2>
            <p className="mt-2 text-text-light">Check back soon.</p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-text-light">
              {creators.length} {creators.length === 1 ? 'creator' : 'creators'}
            </p>

            <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {creators.map((creator) => (
                <li key={creator.id}>
                  <Link
                    href={`/users/${creator.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-32 items-center justify-center bg-accent/20">
                      {creator.image ? (
                        <Image
                          src={creator.image}
                          alt={creator.name}
                          width={72}
                          height={72}
                          className="h-18 w-18 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-18 w-18 items-center justify-center rounded-full bg-accent text-3xl font-semibold text-primary">
                          {creator.name.trim().charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h2 className="text-lg font-semibold text-text group-hover:text-primary">
                        {creator.name}
                      </h2>

                      {creator.bio && (
                        <p className="mt-1 line-clamp-2 text-sm text-text-light">
                          {creator.bio}
                        </p>
                      )}

                      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-text-light">
                        {creator.productCount} {creator.productCount === 1 ? 'product' : 'products'}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  )
}

export default Page
