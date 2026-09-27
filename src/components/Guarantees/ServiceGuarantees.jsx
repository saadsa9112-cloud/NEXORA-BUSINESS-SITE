import ScrollReveal from '../Motion/ScrollReveal'
import { ShieldCheck, Zap, Smartphone, RefreshCw, Award, Lock } from 'lucide-react'

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: '30-Day Code Warranty',
    desc: 'Free technical support, bug fixes, and maintenance warranty included post-launch.'
  },
  {
    icon: Zap,
    title: 'Sub-1 Second Speed SLA',
    desc: 'Core Web Vitals optimized architecture ensuring lightning-fast page load times.'
  },
  {
    icon: Smartphone,
    title: '100% Mobile Perfection',
    desc: 'Pixel-perfect responsive UX engineered across all iOS, Android, and desktop screens.'
  },
  {
    icon: Lock,
    title: 'Zero Downtime & SSL',
    desc: 'Enterprise 256-bit SSL encryption, Cloudflare DNS, and 99.99% uptime SLA.'
  }
]

export default function ServiceGuarantees() {
  return (
    <section className="py-16 bg-[#05070D] border-y border-white/10 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#1F90FF] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Award size={13} />
              <span>Agency Service Level Agreement</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Standard Guarantees Included with Every Project
            </h3>
          </ScrollReveal>
        </div>

        {/* Guarantees Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUARANTEES.map((g, idx) => {
            const Icon = g.icon
            return (
              <ScrollReveal key={g.title} variant="fadeUp" delay={idx * 0.1}>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0066FF]/50 transition-all duration-300 group hover:-translate-y-1 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 text-[#1F90FF] border border-[#0066FF]/40 flex items-center justify-center mb-4 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                      <Icon size={20} />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">{g.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
