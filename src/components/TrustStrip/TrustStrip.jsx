import { CheckCircle2 } from 'lucide-react'

const TRUST_ITEMS = [
  'Modern Solutions',
  'Responsive Design',
  'SEO Ready',
  'Fast & Secure',
]

export default function TrustStrip() {
  return (
    <section aria-label="Trust indicators" className="py-12 border-y border-white/5 bg-[#0B1020]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust items */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-6">
          {TRUST_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2 group">
              <CheckCircle2
                size={16}
                className="text-blue-400 flex-shrink-0 group-hover:text-blue-300 transition-colors"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-[#A7ADBB] group-hover:text-white transition-colors whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="text-center text-xs text-white/30 font-medium tracking-widest uppercase">
          Built for Startups&nbsp;&nbsp;•&nbsp;&nbsp;Small Businesses&nbsp;&nbsp;•&nbsp;&nbsp;Growing Brands
        </p>
      </div>
    </section>
  )
}
