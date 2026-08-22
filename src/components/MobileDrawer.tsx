import { useEffect } from 'react'
import { CONFIG } from '../config'

const MENU = [
  { label: 'Catalog', href: '#catalog' },
  { label: 'Delivery', href: '#delivery' },
  { label: 'Payment', href: '#payment' },
  { label: 'Contacts', href: '#contacts' }
]

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
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

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw] bg-white border-r border-gray-200 transform transition-transform duration-200 ease-out lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <span className="font-bold">Menu</span>
          <button onClick={onClose} className="p-2" aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="px-2 py-4">
          {MENU.map((m) => (
            <a
              key={m.label}
              href={m.href}
              onClick={onClose}
              className="block px-3 py-3 text-base font-medium text-gray-800 border-b border-gray-100 last:border-0 hover:bg-gray-50"
            >
              {m.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white text-sm text-gray-700">
          <div className="space-y-1">
            <div><span className="font-medium">Phone:</span> {CONFIG.company.phone}</div>
            <div><span className="font-medium">Address:</span> {CONFIG.company.address}</div>
          </div>
          <div className="flex gap-3 mt-3 text-gray-800">
            {CONFIG.contact.whatsapp && (
              <a href={`https://wa.me/${CONFIG.contact.whatsapp}`} className="hover:text-black">WhatsApp</a>
            )}
            {CONFIG.contact.telegram && (
              <a href={CONFIG.contact.telegram} className="hover:text-black">Telegram</a>
            )}
            {CONFIG.contact.viber && (
              <a href={CONFIG.contact.viber} className="hover:text-black">Viber</a>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}