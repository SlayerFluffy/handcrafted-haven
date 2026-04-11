'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

type Props = {
  categories: string[]
}

const ProductFilters = ({ categories }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeCategory = searchParams.get('category') ?? ''
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') ?? '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ?? '')

  const hasFilters = activeCategory || searchParams.get('minPrice') || searchParams.get('maxPrice')

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    router.push(`/products?${params.toString()}`)
  }

  const applyPrice = () => updateParams({ minPrice, maxPrice })

  const clearAll = () => {
    setMinPrice('')
    setMaxPrice('')
    router.push('/products')
  }

  return (
    <div className="flex flex-wrap items-end gap-4 pb-5">
      {categories.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-text-light">
            Category
          </label>
          <select
            value={activeCategory}
            onChange={(e) => updateParams({ category: e.target.value })}
            className="h-9 rounded border border-border bg-background px-3 text-sm text-text outline-none focus:border-primary"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide text-text-light">
          Price
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-9 w-20 rounded border border-border bg-background px-3 text-sm text-text outline-none focus:border-primary"
          />
          <span className="text-text-light">–</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-9 w-20 rounded border border-border bg-background px-3 text-sm text-text outline-none focus:border-primary"
          />
          <button
            onClick={applyPrice}
            className="h-9 rounded bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-secondary"
          >
            Apply
          </button>
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="h-9 text-sm text-text-light transition-colors hover:text-text"
        >
          ✕ Clear
        </button>
      )}
    </div>
  )
}

export default ProductFilters
