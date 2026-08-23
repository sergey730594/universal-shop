import { useEffect, useState } from 'react'
import CheckoutForm from './CheckoutForm'

interface BasketItem {
  id: number
  title: string
  price: number
  quantity: number
  image_url?: string
}

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  items: BasketItem[]
  total: number
  updateQty: (id: number, qty: number) => void
  removeItem: (id: number) => void
  clear: () => void
  onSuccess: (data: any) => void
}

export default function CartDrawer({
  open, onClose, items, total, updateQty, removeItem, clear, onSuccess
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart')

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) setStep('cart')
  }, [open])

  return (
    <>
      <div
        className={`fixed inset-0 z-9998 bg-black/40 transition-opacity ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 z-59999 h-full w-full sm:w-[420px] bg-white border-l border-gray-200 transform transition-transform duration-200 ease-out flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <h2 className="font-bold text-lg">
            {step === 'cart' ? `Cart (${items.length})` : 'Checkout'}
          </h2>
          <button onClick={onClose} className="p-2" aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {step === 'cart' ? (
          <>
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="p-8 text-center text-gray-500">Your cart is empty.</div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <li key={item.id} className="p-4 flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 flex-shrink-0 overflow-hidden">
                        {item.image_url ? (
                          <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                        ) : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{item.title}</div>
                        <div className="text-sm text-gray-600">${Number(item.price).toFixed(2)}</div>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-7 h-7 border border-gray-300 text-sm"
                          >−</button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-7 h-7 border border-gray-300 text-sm"
                          >+</button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-xs text-gray-500 hover:text-black underline"
                          >Remove</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-gray-200 p-4 space-y-3">
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                disabled={items.length === 0}
                onClick={() => setStep('checkout')}
                className="w-full h-12 bg-black text-white font-semibold tracking-wide hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                CHECKOUT
              </button>
            </div>
          </>
        ) : (
          <CheckoutForm
            items={items}
            total={total}
            onBack={() => setStep('cart')}
            onSuccess={onSuccess}
            onDone={() => {
              clear()
              onClose()
            }}
          />
        )}
      </aside>
    </>
  )
}