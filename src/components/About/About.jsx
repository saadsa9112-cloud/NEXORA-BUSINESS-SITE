import { ArrowRight, ShieldCheck, UserCheck } from 'lucide-react'
import ScrollReveal from '../Motion/ScrollReveal'

const FLOW_STEPS = ['Strategy', 'Design', 'Development', 'Growth']

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 lg:py-24 bg-white border-y border-[#E5EAF1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <ScrollReveal variant="fadeUp" className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 text-[#0066FF] mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase">About Us • HMS Engineering</span>
            </div>
            <h2 id="about-heading" className="text-3xl sm:text-4xl font-black text-[#0B1020] leading-tight tracking-tight mb-5">
              Digital Solutions Built Around <span className="text-gradient-blue">Your Business.</span>
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              NEXORA DIGITAL (by HMS) is led by <strong>Hafiz Muhammad Saad</strong>, providing startups, small businesses and enterprise clients with custom web engineering, e-commerce, SEO, and ongoing technical excellence.
            </p>
          </ScrollReveal>

          {/* HMS Founder & Leadership Trust Badge */}
          <ScrollReveal variant="fadeUp" delay={0.15} className="mb-12">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center flex-shrink-0 font-bold border border-blue-100">
                  <UserCheck size={22} />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold text-[#0066FF] uppercase tracking-wider block">Founder & Lead Engineer</span>
                  <h3 className="text-base font-bold text-[#0B1020]">Hafiz Muhammad Saad (HMS)</h3>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Verified Direct Accountability</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Flow diagram */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {FLOW_STEPS.map((step, idx) => (
              <ScrollReveal key={step} variant="scaleUp" delay={idx * 0.08}>
                <div className="flex items-center gap-3">
                  <div className="px-5 py-3 rounded-xl border border-[#E5EAF1] bg-[#F8FAFC] shadow-xs hover:border-[#0066FF]/30 hover:bg-blue-50/50 hover:scale-105 transition-all duration-300">
                    <span className="text-[#0B1020] font-semibold text-sm">{step}</span>
                  </div>
                  {idx < FLOW_STEPS.length - 1 && (
                    <ArrowRight
                      size={16}
                      className="text-[#0066FF] flex-shrink-0 hidden sm:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
