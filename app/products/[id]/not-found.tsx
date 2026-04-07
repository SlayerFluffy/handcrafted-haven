import Link from 'next/link'

const NotFound = () => (
  <main className="flex min-h-[60vh] flex-col items-center justify-center bg-background px-6 py-16 text-center">
    <h1 className="text-4xl font-bold text-text">Product Not Found</h1>
    <p className="mt-3 text-text-light">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
    <Link href="/products" className="mt-6 rounded-md bg-primary px-6 py-2 text-surface hover:bg-secondary">
      Browse Products
    </Link>
  </main>
)

export default NotFound
