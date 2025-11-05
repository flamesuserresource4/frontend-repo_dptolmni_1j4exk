import React from 'react';
import { Rocket, BadgeCheck, Shield, Star } from 'lucide-react';

const perks = [
  {
    icon: <BadgeCheck className="h-5 w-5 text-emerald-500" />,
    title: 'AI‑assisted paper builder',
    desc: 'Generate randomized or fully custom exam sets in minutes.'
  },
  {
    icon: <Shield className="h-5 w-5 text-indigo-500" />,
    title: 'Integrity controls',
    desc: 'Question shuffling, section weights, and time/marks constraints.'
  },
  {
    icon: <Star className="h-5 w-5 text-amber-500" />,
    title: 'Multi‑format export',
    desc: 'Download as PDF, DOCX, or print‑ready layouts.'
  }
];

export default function LandingHero({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-12">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-medium mb-6">
            <Rocket className="h-4 w-4 mr-2" />
            Exam Paper Generator
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
            Create high‑quality exam papers in minutes
          </h1>
          <p className="mt-5 max-w-2xl text-gray-600 text-lg">
            Select your board, class, stream and subjects. Choose Random or Custom mode, set marks and duration, then export in your preferred format.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white px-6 py-3 font-semibold shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              Get Started Free
            </button>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg bg-white text-gray-900 px-6 py-3 font-semibold ring-1 ring-gray-200 hover:bg-gray-50"
            >
              Explore Features
            </a>
          </div>

          <div id="features" className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            {perks.map((p) => (
              <div key={p.title} className="rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm">
                <div className="flex items-center gap-3">
                  {p.icon}
                  <h3 className="font-semibold text-gray-900">{p.title}</h3>
                </div>
                <p className="mt-3 text-gray-600 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
