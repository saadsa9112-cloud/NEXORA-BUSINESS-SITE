import { Check } from 'lucide-react'
import { PRICING } from '../../data/siteData'

export default function Pricing() {
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 mb-4">
            <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">Pricing</span>
          </div>
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            Simple. Transparent. <span className="text-gradient-blue">Affordable.</span>
          </h2>
          <p className="text-[#A7ADBB] text-lg leading-relaxed">
            Professional digital services with clear starting prices for growing businesses.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger mb-12">
          {PRICING.map((plan) => (
            <article
              key={plan.id}
              className={`reveal relative flex flex-col p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                plan.highlight
                  ? 'pricing-highlight border-blue-500/30 hover:shadow-blue-500/15'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:shadow-black/30'
              }`}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-500 text-white shadow-lg shadow-blue-500/30">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan title */}
              <h3 className="text-white font-bold text-base mb-1">{plan.title}</h3>

              {/* Price */}
              <div className="mb-5 mt-3">
                <div className="text-[10px] text-[#A7ADBB] font-medium uppercase tracking-wider mb-1">{plan.note}</div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-black ${plan.highlight ? 'text-blue-400' : 'text-white'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-[#A7ADBB] font-medium">{plan.period}</span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-white/5 mb-5" aria-hidden="true" />

              {/* Features */}
              <ul className="flex flex-col gap-2.5 flex-1" role="list">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-[#A7ADBB]">
                    <Check
                      size={14}
                      className={`mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-blue-400' : 'text-white/30'}`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Note */}
              <p className="mt-4 text-[10px] text-white/20 leading-relaxed">
                Final price varies by scope & requirements.
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center reveal">
          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            Get a Custom Quote →
          </button>
          <p className="mt-4 text-xs text-white/25">
            All prices are starting points. Custom packages are available.
          </p>
        </div>
      </div>
    </section>
  )
}
