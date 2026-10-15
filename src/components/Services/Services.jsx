import { useState, useEffect } from 'react'
import { ArrowRight, Info, Compass } from 'lucide-react'
import { SERVICES } from '../../data/siteData'
import TiltCard from '../Motion/TiltCard'
import ScrollReveal from '../Motion/ScrollReveal'
import ServiceDrawer from './ServiceDrawer'

const HASH_SERVICE_MAP = {
  '#shopify-development': 3,
  '#shopify': 3,
  '#react-web-apps': 8,
  '#custom-web-app': 8,
  '#web-application': 8,
  '#seo-services': 4,
  '#seo-optimization': 4,
  '#seo': 4,
  '#wordpress-development': 2,
  '#wordpress': 2,
  '#business-website': 1,
  '#corporate-website': 1,
  '#graphic-design': 5,
  '#hosting-domain': 6,
  '#website-maintenance': 7
}

const SEO_QUICK_LINKS = [
  { label: 'Shopify E-Commerce', hash: '#shopify-development' },
  { label: 'React 19 Web Apps', hash: '#react-web-apps' },
  { label: 'SEO & Speed Optimization', hash: '#seo-optimization' },
  { label: 'WordPress CMS', hash: '#wordpress-development' },
  { label: 'Corporate Websites', hash: '#business-website' }
]

export default function Services() {
  const [selectedService, setSelectedService] = useState(null)

  // Listen to deep-link hash and open the corresponding service drawer
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash.toLowerCase()
      if (HASH_SERVICE_MAP[hash]) {
        const targetId = HASH_SERVICE_MAP[hash]
        const matched = SERVICES.find((s) => s.id === targetId)
        if (matched) {
          setSelectedService(matched)
          const el = document.getElementById('services')
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }
    }

    handleHashCheck()
    window.addEventListener('hashchange', handleHashCheck)
    return () => window.removeEventListener('hashchange', handleHashCheck)
  }, [])

  const handleOpenService = (service) => {
    setSelectedService(service)
    // Update URL hash for sharing / SEO
    const slug = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    history.replaceState(null, '', `#${slug}`)
  }

  const handleCloseDrawer = () => {
    setSelectedService(null)
    if (window.location.hash && HASH_SERVICE_MAP[window.location.hash.toLowerCase()]) {
      history.replaceState(null, '', '#services')
    }
  }

  return (
    <section id="services" aria-labelledby="services-heading" className="py-20 lg:py-28 bg-[#F7F9FC] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal variant="fadeUp" className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 text-[#0066FF] mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase">Our Services</span>
          </div>
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] leading-tight tracking-tight mb-4">
            Digital Services Built to<br className="hidden sm:block" />{' '}
            <span className="text-gradient-blue">Grow Your Business.</span>
          </h2>
          <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-2xl mb-6">
            From custom website development to ongoing search optimization and maintenance, we provide end-to-end digital services tailored to your goals. Click any card to inspect full deliverables and SLAs.
          </p>

          {/* Targeted SEO Service Deep-Links */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1">
              <Compass size={13} className="text-[#0066FF]" /> Fast Track:
            </span>
            {SEO_QUICK_LINKS.map((link) => (
              <a
                key={link.hash}
                href={link.hash}
                onClick={(e) => {
                  e.preventDefault()
                  window.location.hash = link.hash
                }}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#E5EAF1] text-[#4B5563] hover:text-[#0066FF] hover:border-blue-400 hover:bg-blue-50/50 shadow-2xs transition-all duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* Services 3D Tilt Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  onClick={() => handleOpenService(service)}
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
                      View Scope &amp; Quote <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-200" aria-hidden="true" />
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
        isOpen={Boolean(selectedService)}
        onClose={handleCloseDrawer}
      />
    </section>
  )
}
