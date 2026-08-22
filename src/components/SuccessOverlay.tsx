interface SuccessOverlayProps {
  data: {
    customer: { name: string; phone: string }
    total: number
    fallback: string
  } | null
  onClose: () => void
}

export default function SuccessOverlay({ data, onClose }: SuccessOverlayProps) {
  const { customer, total, fallback } = data || {}

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 text-center">
        <div className="mx-auto w-14 h-14 border-2 border-black flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold">Order Received</h3>
        <p className="mt-2 text-gray-600">
          Thank you, <span className="font-medium text-gray-900">{customer?.name}</span>. We'll contact you at <span className="font-medium text-gray-900">{customer?.phone}</span> shortly.
        </p>
        <div className="mt-3 text-lg font-bold">Total: ${Number(total).toFixed(2)}</div>

        {fallback && (
          <a
            href={fallback}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block w-full h-12 leading-[48px] bg-black text-white font-semibold tracking-wide hover:bg-gray-800"
          >
            CONFIRM VIA WHATSAPP
          </a>
        )}

        <button
          onClick={onClose}
          className="mt-3 w-full h-12 border border-gray-300 text-sm font-semibold hover:bg-gray-50"
        >
          CLOSE
        </button>
      </div>
    </div>
  )
}