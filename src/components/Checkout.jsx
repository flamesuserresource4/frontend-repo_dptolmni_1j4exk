import React, { useMemo, useState } from 'react';
import { CreditCard } from 'lucide-react';

const gateways = [
  { id: 'card', name: 'Credit / Debit Card' },
  { id: 'upi', name: 'UPI' },
  { id: 'netbanking', name: 'Net Banking' },
  { id: 'paypal', name: 'PayPal' }
];

export default function Checkout({ plan, onApplyCoupon, coupon, totals, onBack, onConfirmPayment }) {
  const [codeInput, setCodeInput] = useState(coupon || '');
  const [gateway, setGateway] = useState('card');

  const validCoupon = useMemo(() => {
    // Example: SAVE10 gives 10% off on paid plans
    if (!codeInput) return null;
    if (plan.priceMonthly === 0) return null;
    if (codeInput.trim().toUpperCase() === 'SAVE10') {
      return { code: 'SAVE10', percent: 10 };
    }
    return null;
  }, [codeInput, plan.priceMonthly]);

  return (
    <section className="py-10">
      <div className="mx-auto max-w-4xl px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <p className="mt-1 text-gray-600 text-sm">Review your plan and complete the payment.</p>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold text-gray-900">Plan details</h3>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{plan.name}</p>
                <p className="text-sm text-gray-600">{plan.highlight}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{plan.priceMonthly === 0 ? 'Free' : `$${plan.priceMonthly}/mo`}</p>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="coupon" className="block text-sm font-medium text-gray-700">Coupon</label>
              <div className="mt-2 flex gap-2">
                <input
                  id="coupon"
                  type="text"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Enter code (e.g., SAVE10)"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  onClick={() => onApplyCoupon(validCoupon)}
                  disabled={!validCoupon}
                  className={`rounded-lg px-4 py-2 font-semibold text-white ${validCoupon ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                  Apply
                </button>
              </div>
              {codeInput && !validCoupon && (
                <p className="mt-2 text-sm text-amber-600">Invalid coupon or not applicable.</p>
              )}
              {validCoupon && (
                <p className="mt-2 text-sm text-emerald-600">Coupon applied: {validCoupon.percent}% off</p>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Payment method</label>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {gateways.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGateway(g.id)}
                    className={`rounded-lg border px-3 py-2 text-sm ${gateway === g.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700'}`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button onClick={onBack} className="px-4 py-2 rounded-lg bg-white ring-1 ring-gray-200 hover:bg-gray-50 font-medium">Back</button>
            <button
              onClick={() => onConfirmPayment(gateway)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
            >
              <CreditCard className="h-5 w-5" /> Pay securely
            </button>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold text-gray-900">Summary</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-gray-600">Subtotal</dt><dd className="font-medium text-gray-900">${totals.subtotal.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-600">Discount</dt><dd className="font-medium text-emerald-600">-${totals.discount.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-600">Tax (18%)</dt><dd className="font-medium text-gray-900">${totals.tax.toFixed(2)}</dd></div>
              <div className="pt-3 border-t border-gray-200 flex justify-between text-base font-bold"><dt>Total due</dt><dd>${totals.total.toFixed(2)}</dd></div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
