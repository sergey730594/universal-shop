import { useCallback, useState } from 'react'

const STORAGE_KEY = 'cart_v1'

interface Product {
  id: number
  title: string
  price: number
  description: string
  image_url: string
  active: boolean
}

interface CartItem extends Product {
  quantity: number
}

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart)
  const [open, setOpen] = useState(false)

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id)
      let next: CartItem[]
      if (idx >= 0) {
        next = prev.map((p, i) =>
          i === idx ? { ...p, quantity: p.quantity + 1 } : p
        )
      } else {
        next = [...prev, { ...product, quantity: 1 }]
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const removeItem = useCallback((id: number) => {
    setItems((prev) => {
      const next = prev.filter((p) => p.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const updateQty = useCallback((id: number, qty: number) => {
    setItems((prev) => {
      const q = Math.max(1, Number(qty) || 1)
      const next = prev.map((p) => (p.id === id ? { ...p, quantity: q } : p))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setItems([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const count = items.reduce((s, i) => s + i.quantity, 0)
  const total = items.reduce((s, i) => s + i.quantity * i.price, 0)

  return { items, open, setOpen, addItem, removeItem, updateQty, clear, count, total }
}