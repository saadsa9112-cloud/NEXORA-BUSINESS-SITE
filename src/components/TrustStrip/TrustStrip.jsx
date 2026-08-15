import { CheckCircle2 } from 'lucide-react'

const TRUST_ITEMS = [
  'Modern Solutions',
  'Responsive Design',
  'SEO Ready',
  'Fast & Secure',
]

export default function TrustStrip() {
  return (
    <section aria-label="Trust indicators" className="py-10 border-y border-[#E5EAF1] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust items */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-5">
          {TRUST_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2 group">
              <CheckCircle2
                size={18}
                className="text-[#0066FF] flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-[#0B1020] whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="text-center text-xs text-[#6B7280] font-medium tracking-widest uppercase">
          Built for Startups&nbsp;&nbsp;•&nbsp;&nbsp;Small Businesses&nbsp;&nbsp;•&nbsp;&nbsp;Growing Brands
        </p>
      </div>
    </section>
  )
}
