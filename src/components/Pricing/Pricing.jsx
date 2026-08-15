import { Check } from 'lucide-react'
import { PRICING } from '../../data/siteData'
import TiltCard from '../Motion/TiltCard'
import MagneticButton from '../Motion/MagneticButton'
import ScrollReveal from '../Motion/ScrollReveal'
import CostEstimator from '../Estimator/CostEstimator'

export default function Pricing() {
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-20 lg:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal variant="fadeUp" className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 text-[#0066FF] mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase">Pricing</span>
          </div>
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] leading-tight tracking-tight mb-4">
            Simple. Transparent. <span className="text-gradient-blue">Affordable.</span>
          </h2>
          <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed">
            Professional digital services with clear starting prices for growing businesses.
          </p>
        </ScrollReveal>

        {/* Pricing Grid (Compact 4-feature interactive 3D cards) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4 mb-12">
          {PRICING.map((plan, idx) => (
            <ScrollReveal
              key={plan.id}
              variant="fadeUp"
              delay={idx * 0.07}
            >
              <TiltCard
                maxTilt={6}
                glowColor={plan.highlight ? 'rgba(0, 102, 255, 0.22)' : 'rgba(0, 102, 255, 0.1)'}
                className={`group relative flex flex-col p-6 rounded-2xl border transition-all duration-300 h-full ${
                  plan.highlight
                    ? 'bg-white border-[#0066FF] shadow-lg shadow-blue-500/15 ring-2 ring-[#0066FF]/20'
                    : 'bg-white border-[#E5EAF1] shadow-soft hover:shadow-xl hover:border-blue-300'
                }`}
              >
                {/* Recommended Badge */}
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#0066FF] text-white shadow-md shadow-blue-500/40">
                      {plan.badge || 'Recommended'}
                    </span>
                  </div>
                )}

                {/* Plan title */}
                <h3 className="text-[#0B1020] font-bold text-lg mb-1">{plan.title}</h3>

                {/* Price */}
                <div className="mb-4 mt-2">
                  <div className="text-[10px] text-[#6B7280] font-semibold uppercase tracking-wider mb-1">{plan.note}</div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-black ${plan.highlight ? 'text-[#0066FF]' : 'text-[#0B1020]'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-xs text-[#6B7280] font-medium">{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#F1F5F9] mb-4" aria-hidden="true" />

                {/* Features (Max 4 short features) */}
                <ul className="flex flex-col gap-2.5 flex-1" role="list">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#4B5563]">
                      <Check
                        size={14}
                        className={`flex-shrink-0 ${plan.highlight ? 'text-[#0066FF]' : 'text-slate-400'}`}
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Card CTA with Magnetic Motion */}
                <div className="mt-6">
                  <MagneticButton onClick={scrollToContact} className="w-full">
                    <button
                      type="button"
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        plan.highlight
                          ? 'bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-md shadow-blue-500/20'
                          : 'bg-slate-50 hover:bg-slate-100 text-[#0B1020] border border-[#E5EAF1]'
                      }`}
                    >
                      Get a Custom Quote →
                    </button>
                  </MagneticButton>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Interactive Scope & Cost Estimator Widget */}
        <CostEstimator />

        {/* Global Pricing Disclaimer */}
        <ScrollReveal variant="fadeIn" delay={0.4} className="text-center max-w-2xl mx-auto">
          <p className="text-xs text-[#6B7280] leading-relaxed">
            All prices are starting prices. Final pricing depends on project scope, content, integrations and requirements.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
