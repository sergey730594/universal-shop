export default function Hero() {
  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
          Quality products, delivered fast.
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-600 max-w-xl">
          Browse our catalog and place an order in a few clicks. Simple, transparent, reliable.
        </p>
        <a
          href="#catalog"
          className="inline-block mt-8 px-8 py-3 bg-black text-white text-sm font-semibold tracking-wide hover:bg-gray-800"
        >
          SHOP NOW
        </a>
      </div>
    </section>
  )
}