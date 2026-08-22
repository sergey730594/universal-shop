import { CONFIG } from '../config'

interface Customer {
  name: string
  phone: string
  channel: string
}

interface BasketItem {
  product_id: number
  title: string
  quantity: number
  price: number
}

interface OrderPayload {
  customer: Customer
  basket: BasketItem[]
  order_total: number
}

export async function submitOrder({ customer, basket, order_total }: OrderPayload) {
  const url = CONFIG.n8n.webhookUrl
  
  if (!url || url.trim() === '') {
    console.log('[checkout] Demo mode - order submitted:', { customer, basket, order_total })
    return { ok: true, demo: true }
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer, basket, order_total })
    })
    if (!res.ok) throw new Error(`Webhook failed: ${res.status}`)
    return { ok: true }
  } catch (err) {
    console.error('[checkout] Webhook error:', err)
    throw err
  }
}

export function buildWhatsAppLink({ customer, basket, order_total }: OrderPayload) {
  const num = CONFIG.contact.whatsapp.replace(/\D/g, '')
  if (!num) return ''
  
  const lines = [
    `Hello, I'd like to confirm my order.`,
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    '',
    'Items:',
    ...basket.map((b) => `• ${b.title} × ${b.quantity} — $${(b.price * b.quantity).toFixed(2)}`),
    '',
    `Total: $${order_total.toFixed(2)}`
  ]
  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${num}?text=${text}`
}