import { useState } from 'react'
import { ArrowRight, Info } from 'lucide-react'
import { SERVICES } from '../../data/siteData'
import TiltCard from '../Motion/TiltCard'
import ScrollReveal from '../Motion/ScrollReveal'
import ServiceDrawer from './ServiceDrawer'

export default function Services() {
  const [selectedService, setSelectedService] = useState(null)

  const handleSelectServiceForQuote = (serviceTitle) => {
    const el = document.getElementById('contact')
    if (el) {
      const select = document.getElementById('service')
      if (select) {
        // Find matching option
        const matched = Array.from(select.options).find((opt) =>
          serviceTitle.toLowerCase().includes(opt.value.toLowerCase()) ||
          opt.value.toLowerCase().includes(serviceTitle.toLowerCase())
        )
        if (matched) {
          select.value = matched.value
          select.dispatchEvent(new Event('change', { bubbles: true }))
        }
      }
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section id="services" aria-labelledby="services-heading" className="py-20 lg:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal variant="fadeUp" className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 text-[#0066FF] mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase">Our Services</span>
          </div>
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] leading-tight tracking-tight mb-4">
            Everything Your Business<br className="hidden sm:block" /> Needs to{' '}
            <span className="text-gradient-blue">Grow Online.</span>
          </h2>
          <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-2xl">
            From your first website to ongoing digital growth, we provide essential solutions
            designed to help your business build trust and attract customers. Click any service to view full scope & deliverables.
          </p>
        </ScrollReveal>

        {/* Services 3D Tilt Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon
            return (
              <ScrollReveal
                key={service.id}
                variant="fadeUp"
                delay={idx * 0.08}
              >
                <TiltCard
                  maxTilt={5}
                  onClick={() => setSelectedService(service)}
                  className="group relative flex flex-col p-6 rounded-2xl bg-white border border-[#E5EAF1] shadow-soft hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer h-full"
                >
                  {/* Info Badge */}
                  <div className="absolute top-4 right-4 text-slate-300 group-hover:text-[#0066FF] transition-colors">
                    <Info size={16} />
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center mb-5 group-hover:bg-[#0066FF] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xs">
                    <Icon size={22} aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <h3 className="text-[#0B1020] font-bold text-base sm:text-lg mb-2 leading-snug group-hover:text-[#0066FF] transition-colors">{service.title}</h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed flex-1">{service.description}</p>

                  {/* Link */}
                  <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0066FF] group-hover:text-[#0052CC] transition-colors duration-200 flex items-center gap-1.5">
                      View Scope & Quote <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-200" aria-hidden="true" />
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] opacity-50 group-hover:scale-150 transition-transform duration-200" aria-hidden="true" />
                  </div>
                </TiltCard>
              </ScrollReveal>
            )
          })}
        </div>
      </div>

      {/* Interactive Service Detail Drawer */}
      <ServiceDrawer
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectService={handleSelectServiceForQuote}
      />
    </section>
  )
}
