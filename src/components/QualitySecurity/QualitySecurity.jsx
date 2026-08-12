import { ShieldCheck, Smartphone, Zap, Search, Server, LifeBuoy } from 'lucide-react'
import { QUALITY_FEATURES } from '../../data/siteData'

const ICONS = [ShieldCheck, Smartphone, Zap, Search, Server, LifeBuoy]

export default function QualitySecurity() {
  return (
    <section id="quality" aria-labelledby="quality-heading" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 mb-4">
            <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">Quality & Standards</span>
          </div>
          <h2 id="quality-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            Built With <span className="text-gradient-blue">Quality in Mind.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {QUALITY_FEATURES.map((item, idx) => {
            const Icon = ICONS[idx]
            return (
              <div
                key={item.title}
                className="reveal group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/15 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Icon size={18} className="text-blue-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-[#A7ADBB] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
