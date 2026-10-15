import { ShieldCheck, Smartphone, Zap, Search, Server, LifeBuoy } from 'lucide-react'
import { QUALITY_FEATURES } from '../../data/siteData'
import TiltCard from '../Motion/TiltCard'
import ScrollReveal from '../Motion/ScrollReveal'

const ICONS = [ShieldCheck, Smartphone, Zap, Search, Server, LifeBuoy]

export default function QualitySecurity() {
  return (
    <section id="quality" aria-labelledby="quality-heading" className="py-20 lg:py-28 bg-[#F7F9FC] dark:bg-[#05070D] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal variant="fadeUp" className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 dark:bg-blue-500/10 text-[#0066FF] dark:text-[#38BDF8] mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase">Quality & Standards</span>
          </div>
          <h2 id="quality-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] dark:text-white leading-tight tracking-tight">
            Built With <span className="text-gradient-blue">Quality in Mind.</span>
          </h2>
        </ScrollReveal>

        {/* Grid with 3D Tilt Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUALITY_FEATURES.map((item, idx) => {
            const Icon = ICONS[idx]
            return (
              <ScrollReveal
                key={item.title}
                variant="fadeUp"
                delay={idx * 0.07}
              >
                <TiltCard
                  maxTilt={4}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0B1020] border border-[#E5EAF1] dark:border-white/10 shadow-soft dark:shadow-none hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/15 text-[#0066FF] dark:text-[#38BDF8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0066FF] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-[#0B1020] dark:text-white font-bold text-base mb-1">{item.title}</h3>
                    <p className="text-[#4B5563] dark:text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
