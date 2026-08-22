import { useState } from 'react'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' }
]

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
  onMenuClick: () => void
}

export default function Header({ cartCount, onCartClick, onMenuClick }: HeaderProps) {
  const [lang, setLang] = useState('en')

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        {/* Mobile: hamburger */}
        <button
          className="lg:hidden p-2 -ml-2 text-gray-900"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Logo */}
        <a href="#catalog" className="text-xl font-bold tracking-tight whitespace-nowrap">
          BRAND
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 ml-8 text-sm font-medium text-gray-700">
          <a href="#catalog" className="hover:text-black">Catalog</a>
          <a href="#delivery" className="hover:text-black">Delivery</a>
          <a href="#contacts" className="hover:text-black">Contacts</a>
        </nav>

        {/* Search */}
<div className="flex-1 mx-4 flex">
  <input
    type="search"
    placeholder="Search products..."
    className="flex-1 h-10 px-4 bg-gray-50 border border-gray-200 border-r-0 text-sm placeholder:text-gray-400 focus:border-black focus:outline-none"
  />
  <button className="h-10 px-4 bg-black text-white text-sm font-semibold hover:bg-gray-800 border border-black">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </button>
</div>

        {/* Language */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="hidden sm:block h-10 px-3 border border-gray-200 bg-white text-sm cursor-pointer"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </select>

        {/* Cart */}
        <button
          onClick={onCartClick}
          className="relative p-2 text-gray-900 hover:text-black"
          aria-label="Open cart"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-black text-white text-[11px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}