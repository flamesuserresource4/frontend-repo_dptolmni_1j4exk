import React, { useMemo, useState } from 'react';
import LandingHero from './components/LandingHero';
import Plans from './components/Plans';
import Checkout from './components/Checkout';
import PaymentStatus from './components/PaymentStatus';

function useTotals(plan, coupon) {
  return useMemo(() => {
    const price = plan?.priceMonthly || 0;
    const subtotal = price;
    const discount = coupon?.percent ? (subtotal * coupon.percent) / 100 : 0;
    const taxable = Math.max(subtotal - discount, 0);
    const tax = +(taxable * 0.18).toFixed(2);
    const total = +(taxable + tax).toFixed(2);
    return { subtotal, discount, tax, total };
  }, [plan, coupon]);
}

export default function App() {
  const [view, setView] = useState('landing');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [transaction, setTransaction] = useState(null);

  const totals = useTotals(selectedPlan || { priceMonthly: 0 }, coupon);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setCoupon(null);
    setView('checkout');
  };

  const handleConfirmPayment = (gateway) => {
    // Simulate processing result: success for paid gateways except when price is 0 (instant success)
    const status = selectedPlan?.priceMonthly === 0 ? 'success' : ['success', 'pending', 'failed'][Math.floor(Math.random() * 3)];
    const id = `${gateway}-${Date.now().toString(36)}`;
    setTransaction({ id, amount: totals.total });
    setPaymentStatus(status);
    setView('status');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600" />
            <span className="font-extrabold text-gray-900">ExamBuilder</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <button onClick={() => setView('landing')} className={`hover:text-indigo-600 ${view==='landing'?'text-indigo-600 font-semibold':'text-gray-600'}`}>Home</button>
            <button onClick={() => setView('plans')} className={`hover:text-indigo-600 ${view==='plans'?'text-indigo-600 font-semibold':'text-gray-600'}`}>Plans</button>
            <button onClick={() => setView(selectedPlan ? 'checkout' : 'plans')} className={`hover:text-indigo-600 ${view==='checkout'?'text-indigo-600 font-semibold':'text-gray-600'}`}>Checkout</button>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setView('plans')} className="rounded-lg bg-indigo-600 text-white px-3 py-1.5 text-sm font-semibold hover:bg-indigo-700">Start Free</button>
          </div>
        </div>
      </header>

      {view === 'landing' && (
        <LandingHero onGetStarted={() => setView('plans')} />
      )}

      {view === 'plans' && (
        <Plans onSelectPlan={handleSelectPlan} />
      )}

      {view === 'checkout' && selectedPlan && (
        <Checkout
          plan={selectedPlan}
          coupon={coupon?.code}
          totals={totals}
          onApplyCoupon={(c) => setCoupon(c)}
          onBack={() => setView('plans')}
          onConfirmPayment={handleConfirmPayment}
        />
      )}

      {view === 'status' && (
        <PaymentStatus
          status={paymentStatus}
          plan={selectedPlan}
          txn={transaction}
          onGoHome={() => setView('landing')}
          onGoPlans={() => setView('plans')}
        />
      )}

      <footer className="mt-20 border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ExamBuilder. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
