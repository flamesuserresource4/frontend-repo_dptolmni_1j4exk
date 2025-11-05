import React from 'react';
import { CheckCircle2, Hourglass, XCircle } from 'lucide-react';

export default function PaymentStatus({ status, plan, txn, onGoHome, onGoPlans }) {
  const views = {
    success: {
      icon: <CheckCircle2 className="h-10 w-10 text-emerald-600" />,
      title: 'Payment successful',
      desc: 'Your subscription is now active. You can start generating papers right away.'
    },
    pending: {
      icon: <Hourglass className="h-10 w-10 text-amber-500" />,
      title: 'Payment pending',
      desc: 'We are waiting for confirmation from the gateway. You will receive an update shortly.'
    },
    failed: {
      icon: <XCircle className="h-10 w-10 text-rose-600" />,
      title: 'Payment failed',
      desc: 'Something went wrong while processing your payment. Please try again or use a different method.'
    }
  };

  const v = views[status] || views.pending;

  const statusColor = status === 'failed' ? 'text-rose-600' : status === 'pending' ? 'text-amber-600' : 'text-emerald-600';

  return (
    <section className="py-14">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-50 mx-auto">
          {v.icon}
        </div>
        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">{v.title}</h2>
        <p className="mt-2 text-gray-600">{v.desc}</p>

        <div className="mt-8 text-left rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="font-semibold text-gray-900">Subscription details</h3>
          <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-600">Plan</dt>
              <dd className="font-medium text-gray-900">{plan?.name} {plan?.priceMonthly ? `- $${plan.priceMonthly}/mo` : '(Free Trial)'}</dd>
            </div>
            <div>
              <dt className="text-gray-600">Transaction ID</dt>
              <dd className="font-mono text-gray-900">{txn?.id}</dd>
            </div>
            <div>
              <dt className="text-gray-600">Status</dt>
              <dd className={`font-medium capitalize ${statusColor}`}>{status}</dd>
            </div>
            <div>
              <dt className="text-gray-600">Amount</dt>
              <dd className="font-medium text-gray-900">${(txn?.amount || 0).toFixed(2)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onGoHome} className="px-4 py-2 rounded-lg bg-white ring-1 ring-gray-200 hover:bg-gray-50 font-medium">Go to Home</button>
          <button onClick={onGoPlans} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700">View Plans</button>
        </div>
      </div>
    </section>
  );
}
