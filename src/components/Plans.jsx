import React from 'react';
import { Crown, Star, BadgeCheck } from 'lucide-react';

const plansData = [
  {
    id: 'free',
    name: 'Free Trial',
    highlight: '7 days',
    priceMonthly: 0,
    description: 'Explore the builder with limited access for 7 days.',
    icon: Star,
    features: [
      'Random exams only',
      'Up to 3 papers/day',
      'PDF export',
      'Community templates'
    ],
    limitations: 'Watermark on exports'
  },
  {
    id: 'starter',
    name: 'Starter',
    highlight: 'Best for teachers',
    priceMonthly: 9,
    description: 'Great for occasional paper creation with customization.',
    icon: BadgeCheck,
    features: [
      'Random and Custom exams',
      'Up to 25 papers/month',
      'PDF & DOCX export',
      'Basic question bank access'
    ],
    limitations: 'Limited AI suggestions'
  },
  {
    id: 'pro',
    name: 'Pro',
    highlight: 'Full access',
    priceMonthly: 19,
    description: 'Everything you need for frequent, professional papers.',
    icon: Crown,
    features: [
      'Unlimited exams',
      'Advanced Custom mode',
      'PDF, DOCX & more',
      'Priority rendering speed',
      'Advanced question bank + tagging'
    ],
    limitations: null
  }
];

export default function Plans({ onSelectPlan }) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Choose your plan</h2>
          <p className="mt-3 text-gray-600">Start free, upgrade anytime.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plansData.map((p) => (
            <PlanCard key={p.id} plan={p} onSelect={() => onSelectPlan(p)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan, onSelect }) {
  const Icon = plan.icon;
  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
          <Icon className="h-5 w-5 text-indigo-600" />
        </span>
        <div>
          <h3 className="font-semibold text-gray-900">{plan.name}</h3>
          <p className="text-xs text-indigo-600 font-medium">{plan.highlight}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-600 text-sm">{plan.description}</p>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-gray-900">{plan.priceMonthly === 0 ? 'Free' : `$${plan.priceMonthly}`}</span>
        {plan.priceMonthly !== 0 && <span className="text-sm text-gray-500">/month</span>}
      </div>
      <ul className="mt-6 space-y-2 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-gray-700">{f}</span>
          </li>
        ))}
      </ul>
      {plan.limitations && (
        <p className="mt-3 text-xs text-amber-600">{plan.limitations}</p>
      )}
      <button
        onClick={onSelect}
        className="mt-6 w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white px-4 py-2.5 font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
      >
        Select {plan.name}
      </button>
    </div>
  );
}
