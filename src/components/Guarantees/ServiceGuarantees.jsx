import ScrollReveal from '../Motion/ScrollReveal'
import { ShieldCheck, Zap, Smartphone, Award, Lock, FileCode, CheckCircle2 } from 'lucide-react'

const GUARANTEES = [
  {
    icon: FileCode,
    title: '100% Full IP Code Handoff',
    desc: 'Complete GitHub repository transfer with full intellectual property, source code rights & zero vendor lock-in.'
  },
  {
    icon: ShieldCheck,
    title: 'Risk-Free Satisfaction Clause',
    desc: '100% money-back satisfaction guarantee & signed mutual NDA for complete confidentiality.'
  },
  {
    icon: Zap,
    title: 'Sub-1 Second Speed SLA',
    desc: 'Core Web Vitals 99+ score SLA guaranteeing sub-second load times for maximum conversion.'
  },
  {
    icon: Lock,
    title: 'Zero Downtime & SSL Security',
    desc: 'Enterprise 256-bit SSL encryption, Cloudflare DNS configuration, and 99.99% server uptime guarantee.'
  }
]

export default function ServiceGuarantees() {
  return (
    <section className="py-16 bg-[#05070D] border-y border-white/10 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-bold uppercase tracking-wider mb-2">
              <Award size={13} />
              <span>International Agency SLA &amp; IP Protection</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Risk-Free Guarantees Included with Every Project
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Industry-standard legal code transfer, NDA privacy compliance, and performance benchmarks.
            </p>
          </ScrollReveal>
        </div>

        {/* Guarantees Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUARANTEES.map((g, idx) => {
            const Icon = g.icon
            return (
              <ScrollReveal key={g.title} variant="fadeUp" delay={idx * 0.1}>
                <div className="p-6 rounded-2xl bg-[#0B1020] border border-white/10 hover:border-blue-500/50 transition-all duration-300 group hover:-translate-y-1 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-4 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                      <Icon size={20} />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
                      <span>{g.title}</span>
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{g.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1 text-[11px] text-green-400 font-semibold">
                    <CheckCircle2 size={13} />
                    <span>Included in Scope Contract</span>
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
