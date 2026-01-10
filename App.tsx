
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import PricingCalculator from './components/PricingCalculator';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { ClientType, OrderState, VoucherDuration, VoucherFormat } from './types';
import { ShoppingBag, Star, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash);
  
  const [order, setOrder] = useState<OrderState>({
    clientType: 'INDIVIDUAL',
    duration: '12_MONTHS',
    format: 'DIGITAL',
    quantity: 1,
  });

  // Listen for hash changes to route to Admin
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleScrollToPricing = () => {
    const element = document.getElementById('pricing-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const updateOrder = (updates: Partial<OrderState>) => {
    setOrder(prev => {
      const newOrder = { ...prev, ...updates };
      
      // Reset quantity logic when switching client types
      if (updates.clientType === 'INDIVIDUAL' && newOrder.quantity > 10) {
        newOrder.quantity = 1;
      }
      if (updates.clientType === 'CORPORATE' && newOrder.quantity < 2) {
        newOrder.quantity = 2; // Min for corporate
      }
      
      return newOrder;
    });
  };

  // Render Admin Dashboard if hash is #admin
  if (currentPath === '#admin') {
    return <AdminDashboard onLogout={() => window.location.hash = ''} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-dark text-white selection:bg-brand-neon selection:text-brand-dark">
      
      <main className="flex-grow">
        <Hero onCtaClick={handleScrollToPricing} />
        
        {/* Trust Indicators */}
        <section id="how-it-works" className="py-10 border-b border-white/10 bg-gradient-to-r from-brand-dark via-brand-blue/20 to-brand-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center p-4">
                <div className="p-3 bg-brand-neon/10 rounded-full mb-4 text-brand-neon shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  <ShoppingBag size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Лесна поръчка</h3>
                <p className="text-gray-400">Изберете ваучер, платете онлайн и получете веднага.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="p-3 bg-brand-neon/10 rounded-full mb-4 text-brand-neon shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">За компании</h3>
                <p className="text-gray-400">Специални отстъпки и фактури за корпоративни клиенти.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="p-3 bg-brand-neon/10 rounded-full mb-4 text-brand-neon shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  <Star size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Премиум съдържание</h3>
                <p className="text-gray-400">Достъп до хиляди часове театър, опера и кино класики.</p>
              </div>
            </div>
          </div>
        </section>

        <PricingCalculator 
          order={order} 
          updateOrder={updateOrder} 
        />
        
        <OrderForm order={order} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
