import { CONFIG } from '../config'

export default function Footer() {
  const { company, contact } = CONFIG
  return (
    <footer id="contacts" className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-bold text-base mb-3">{company.name}</div>
          <p className="text-gray-600 leading-relaxed">
            Universal shop template. Clean, fast, reliable.
          </p>
        </div>

        <div>
          <div className="font-bold mb-3">Contacts</div>
          <ul className="space-y-1 text-gray-700">
            {company.address && <li>{company.address}</li>}
            {company.phone && <li><a href={`tel:${company.phone}`} className="hover:text-black">{company.phone}</a></li>}
            {company.email && <li><a href={`mailto:${company.email}`} className="hover:text-black">{company.email}</a></li>}
          </ul>
        </div>

        <div>
          <div className="font-bold mb-3">Information</div>
          <ul className="space-y-1 text-gray-700">
            <li><a href="#delivery" className="hover:text-black">Delivery</a></li>
            <li><a href="#payment" className="hover:text-black">Payment</a></li>
            <li><a href="#" className="hover:text-black">Terms</a></li>
            <li><a href="#" className="hover:text-black">Privacy</a></li>
          </ul>
        </div>

        <div>
          <div className="font-bold mb-3">Messengers</div>
          <ul className="space-y-1 text-gray-700">
            {contact.whatsapp && (
              <li><a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-black">WhatsApp</a></li>
            )}
            {contact.telegram && (
              <li><a href={contact.telegram} target="_blank" rel="noreferrer" className="hover:text-black">Telegram</a></li>
            )}
            {contact.viber && (
              <li><a href={contact.viber} className="hover:text-black">Viber</a></li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}