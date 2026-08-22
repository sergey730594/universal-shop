import { useState } from 'react'
import { submitOrder, buildWhatsAppLink } from '../api/checkout'

const CHANNELS = ['WhatsApp', 'Telegram', 'Viber', 'Phone call']

interface BasketItem {
  id: number
  title: string
  price: number
  quantity: number
  image_url?: string
}

interface CheckoutFormProps {
  items: BasketItem[]
  total: number
  onBack: () => void
  onSuccess: (data: any) => void
  onDone: () => void
}

export default function CheckoutForm({ items, total, onBack, onSuccess, onDone }: CheckoutFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [channel, setChannel] = useState(CHANNELS[0])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setError('Please fill in name and phone.')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const customer = { name: name.trim(), phone: phone.trim(), channel }
      const basket = items.map((i) => ({
        product_id: i.id,
        title: i.title,
        quantity: i.quantity,
        price: i.price
      }))
      await submitOrder({ customer, basket, order_total: total })
      const fallback = buildWhatsAppLink({ customer, basket, order_total: total })
      onSuccess({ customer, basket, total, fallback })
      onDone()
    } catch (err: any) {
      setError(err.message || 'Could not submit order.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 text-sm focus:border-black"
            placeholder="John Doe"
            autoComplete="name"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 text-sm focus:border-black"
            placeholder="+1 555 123 4567"
            autoComplete="tel"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Contact channel</label>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 text-sm bg-white focus:border-black"
          >
            {CHANNELS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <div className="text-xs font-semibold text-gray-700 mb-2">Order summary</div>
          <ul className="text-sm space-y-1">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between">
                <span className="truncate pr-2">{i.title} × {i.quantity}</span>
                <span className="flex-shrink-0">${(i.price * i.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-3 pt-3 border-t border-gray-200 font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}
      </div>

      <div className="border-t border-gray-200 p-4 flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="h-12 px-5 border border-gray-300 text-sm font-semibold hover:bg-gray-50"
        >
          BACK
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 h-12 bg-black text-white font-semibold tracking-wide hover:bg-gray-800 disabled:bg-gray-400"
        >
          {submitting ? 'SENDING...' : 'CONFIRM ORDER'}
        </button>
      </div>
    </form>
  )
}