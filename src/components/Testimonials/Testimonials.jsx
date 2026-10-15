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
    <section id="reviews" aria-labelledby="reviews-heading" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#070913] border-y border-[#E5EAF1] dark:border-white/10 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-[#0066FF] dark:text-[#38BDF8] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck size={14} />
            <span>Verified Client Social Proof</span>
          </div>
          <h2 id="reviews-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] dark:text-white tracking-tight">
            Trusted by Ambitious International <span className="text-gradient-blue">Startups &amp; Brands.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300 mt-3 max-w-2xl mx-auto">
            Read verified feedback from founders and executives who transformed their digital infrastructure with NEXORA DIGITAL.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <ScrollReveal key={idx} variant="fadeUp" delay={idx * 0.1}>
              <div className="bg-white dark:bg-[#0B1020] border border-[#E5EAF1] dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-soft dark:shadow-none hover:shadow-xl hover:border-[#0066FF]/50 dark:hover:border-blue-500/50 transition-all duration-300 relative flex flex-col justify-between h-full group">
                <Quote size={36} className="text-blue-100 dark:text-blue-900/30 absolute top-6 right-6 transition-colors" />

                <div className="relative z-10">
                  {/* Star Ratings */}
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                    <span className="ml-2 text-xs font-bold text-slate-500 dark:text-slate-400">5.0 / 5.0</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#374151] dark:text-slate-200 leading-relaxed italic mb-6">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5EAF1] dark:border-white/10 flex items-center justify-between relative z-10">
                  <div>
                    <h3 className="text-sm font-bold text-[#0B1020] dark:text-white flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      <CheckCircle2 size={14} className="text-[#0066FF] dark:text-[#38BDF8]" />
                    </h3>
                    <span className="text-[11px] text-[#6B7280] dark:text-slate-400 font-medium block">{rev.role}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-500/15 text-[#0066FF] dark:text-[#38BDF8] border border-blue-200 dark:border-blue-500/30 text-[10px] font-bold rounded-lg whitespace-nowrap">
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
