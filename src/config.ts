export const CONFIG = {
  baserow: {
    url: import.meta.env.VITE_BASEROW_URL || '',
    token: import.meta.env.VITE_BASEROW_TOKEN || ''
  },
  n8n: {
    webhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL || ''
  },
  contact: {
    whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '',
    telegram: import.meta.env.VITE_TELEGRAM_URL || '',
    viber: import.meta.env.VITE_VIBER_URL || ''
  },
  company: {
    name: import.meta.env.VITE_COMPANY_NAME || 'Demo Shop',
    phone: import.meta.env.VITE_COMPANY_PHONE || '+1 555 123 4567',
    email: import.meta.env.VITE_COMPANY_EMAIL || 'hello@demo.com',
    address: import.meta.env.VITE_COMPANY_ADDRESS || '123 Demo St'
  }
}