import { Star, Quote, CheckCircle2, ShieldCheck } from 'lucide-react'
import ScrollReveal from '../Motion/ScrollReveal'

const REVIEWS = [
  {
    name: 'Tariq Al-Mansoor',
    role: 'CEO, Apex Global Logistics (UAE)',
    rating: 5,
    text: 'NEXORA DIGITAL delivered our enterprise portal with a 99/100 PageSpeed score. Their 100% source code handoff and signed NDA gave us total peace of mind.',
    project: 'Enterprise Logistics Portal',
    verified: true,
  },
  {
    name: 'Sarah Jenkins',
    role: 'Founder, Modern Retail Brands (USA)',
    rating: 5,
    text: 'The Shopify multi-currency store layout doubled our conversion rate in 30 days. The real-time client tracker kept us updated on every sprint milestone.',
    project: 'E-Commerce Storefront',
    verified: true,
  },
  {
    name: 'Hamza Malik',
    role: 'Managing Director, Vane FinTech',
    rating: 5,
    text: 'Hafiz Muhammad Saad and his team built our full-stack SaaS UI in record time. The 35% launch discount made it unbelievable value for a startup.',
    project: 'Full-Stack SaaS Platform',
    verified: true,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#F8FAFC] border-y border-[#E5EAF1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck size={14} />
            <span>Verified Client Social Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1020]">
            Trusted by Ambitious International Startups &amp; Brands
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Read real feedback from clients who transformed their online presence with NEXORA DIGITAL.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <ScrollReveal key={idx} variant="fadeUp" delay={idx * 0.1}>
              <div className="bg-white border border-[#E5EAF1] rounded-3xl p-6 sm:p-8 shadow-lg hover:border-[#0066FF]/40 transition-all duration-300 relative flex flex-col justify-between h-full">
                <Quote size={32} className="text-blue-100 absolute top-6 right-6" />

                <div>
                  {/* Star Ratings */}
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#374151] leading-relaxed italic mb-6">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5EAF1] flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#0B1020] flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      <CheckCircle2 size={14} className="text-[#0066FF]" />
                    </h4>
                    <span className="text-[11px] text-gray-500 font-medium block">{rev.role}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-50 text-[#0066FF] border border-blue-200 text-[10px] font-bold rounded-md">
                    {rev.project}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
