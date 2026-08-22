interface Product {
  id: number
  title: string
  price: number
  description: string
  image_url: string
  active: boolean
}

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const { title, price, image_url } = product

  return (
    <div className="border border-gray-200 bg-white flex flex-col">
      <div className="aspect-square bg-gray-100 overflow-hidden flex items-center justify-center">
        {image_url ? (
          <img src={image_url} alt={title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <span className="text-xs text-gray-400">No image</span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">
          {title}
        </h3>
        <div className="mt-2 text-base font-bold text-gray-900">
          ${Number(price).toFixed(2)}
        </div>
        <button
          onClick={() => onAdd(product)}
          className="mt-3 w-full h-10 bg-black text-white text-sm font-semibold tracking-wide hover:bg-gray-800"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  )
}