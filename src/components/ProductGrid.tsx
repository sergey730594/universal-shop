import ProductCard from './ProductCard'

interface Product {
  id: number
  title: string
  price: number
  description: string
  image_url: string
  active: boolean
}

interface ProductGridProps {
  products: Product[]
  loading: boolean
  error: string | null
  onAdd: (product: Product) => void
}

export default function ProductGrid({ products, loading, error, onAdd }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border border-gray-200 bg-gray-50 animate-pulse">
            <div className="aspect-square bg-gray-200" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 w-3/4" />
              <div className="h-4 bg-gray-200 w-1/2" />
              <div className="h-10 bg-gray-200 w-full mt-3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-600 py-10">Failed to load catalog: {error}</div>
  }

  if (!products.length) {
    return <div className="text-center text-gray-500 py-10">No products available.</div>
  }

  return (
    <div id="catalog" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  )
}