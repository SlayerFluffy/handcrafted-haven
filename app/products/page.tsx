'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { mockProducts } from '@/app/lib/mock-products'

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const Page = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  const categories = useMemo(() => {
    return ['All', ...new Set(mockProducts.map((product) => product.category))]
  }, [])

  const filteredProducts = useMemo(() => {
    let results = [...mockProducts]

    if (category !== 'All') {
      results = results.filter((product) => product.category === category)
    }

    if (search.trim()) {
      const searchValue = search.toLowerCase()
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue) ||
        product.seller.toLowerCase().includes(searchValue)
      )
    }

    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        results.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        results.sort((a, b) => b.rating - a.rating)
        break
      case 'reviews':
        results.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        break
    }

    return results
  }, [category, search, sortBy])

  return (
    <main className="min-h-screen bg-background px-6 py-8 md:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-text-light">
            Handcrafted Haven
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-text md:text-4xl">
            Browse Products
          </h1>
          <p className="mt-3 max-w-2xl text-text-light">
            Discover handmade items from artisans and browse by category, price, and customer reviews.
          </p>
        </div>

        <section className="mb-8 rounded-2xl border border-border bg-surface p-4 shadow-sm md:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-medium text-text">
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search products or sellers"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text outline-none focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-text"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text outline-none focus:border-primary"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="sortBy"
                className="mb-2 block text-sm font-medium text-text"
              >
                Sort By
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text outline-none focus:border-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </section>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-text-light">
            Showing {filteredProducts.length} product
            {filteredProducts.length === 1 ? '' : 's'}
          </p>

          {(search || category !== 'All' || sortBy !== 'featured') && (
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setCategory('All')
                setSortBy('featured')
              }}
              className="rounded-lg border border-border px-4 py-2 text-sm text-text hover:bg-white"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-text">No products found</h2>
            <p className="mt-2 text-text-light">
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm hover:shadow-md"
              >
                <div className="flex h-44 items-center justify-center bg-accent text-4xl font-semibold text-primary">
                  {product.name.charAt(0)}
                </div>
              
                <div className="p-5">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-light">
                    {product.category}
                  </p>

                  <h2 className="text-lg font-semibold text-text">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-sm text-text-light">
                    by {product.seller}
                  </p>

                  <p className="mt-4 text-2xl font-semibold text-text">
                    {moneyFormatter.format(product.price)}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-sm text-text-light">
                    <span>⭐ {product.rating.toFixed(1)}</span>
                    <span>{product.reviews} reviews</span>
                  </div>

              <p className="mt-4 line-clamp-2 text-sm text-text-light">
                {product.description}
              </p>
            
              <Link
                href={`/products/${product.id}`}
                className="mt-5 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-surface hover:bg-secondary"
              >
              View Product
              </Link>
            </div> 
            </article>
          ))}   
          </section>    
        )}
      </section>
    </main>
  )
}

export default Page