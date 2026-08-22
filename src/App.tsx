import { useState } from 'react';
import Header from './components/Header';
import MobileDrawer from './components/MobileDrawer';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import SuccessOverlay from './components/SuccessOverlay';
import Footer from './components/Footer';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';

export default function App() {
  const { products, loading, error } = useProducts();
  const cart = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [success, setSuccess] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header
        cartCount={cart.count}
        onCartClick={() => cart.setOpen(true)}
        onMenuClick={() => setDrawerOpen(true)}
      />

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="flex-1">
        <Hero />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Catalog</h2>
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            onAdd={cart.addItem}
          />
        </section>
      </main>

      <Footer />

      <CartDrawer
        open={cart.open}
        onClose={() => cart.setOpen(false)}
        items={cart.items}
        total={cart.total}
        updateQty={cart.updateQty}
        removeItem={cart.removeItem}
        clear={cart.clear}
        onSuccess={setSuccess}
      />

      {success && (
        <SuccessOverlay data={success} onClose={() => setSuccess(null)} />
      )}
    </div>
  );
}
