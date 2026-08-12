import { ArrowRight } from 'lucide-react'
import { SERVICES } from '../../data/siteData'

const COLOR_MAP = {
  blue: {
    icon: 'bg-blue-500/10 text-blue-400',
    border: 'hover:border-blue-500/20',
    dot: 'bg-blue-400',
  },
  indigo: {
    icon: 'bg-indigo-500/10 text-indigo-400',
    border: 'hover:border-indigo-500/20',
    dot: 'bg-indigo-400',
  },
  purple: {
    icon: 'bg-purple-500/10 text-purple-400',
    border: 'hover:border-purple-500/20',
    dot: 'bg-purple-400',
  },
  cyan: {
    icon: 'bg-cyan-500/10 text-cyan-400',
    border: 'hover:border-cyan-500/20',
    dot: 'bg-cyan-400',
  },
  violet: {
    icon: 'bg-violet-500/10 text-violet-400',
    border: 'hover:border-violet-500/20',
    dot: 'bg-violet-400',
  },
  sky: {
    icon: 'bg-sky-500/10 text-sky-400',
    border: 'hover:border-sky-500/20',
    dot: 'bg-sky-400',
  },
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 mb-4">
            <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">Our Services</span>
          </div>
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            Everything Your Business<br className="hidden sm:block" /> Needs to{' '}
            <span className="text-gradient-blue">Grow Online.</span>
          </h2>
          <p className="text-[#A7ADBB] text-lg leading-relaxed max-w-2xl">
            From your first website to ongoing digital growth, we provide the essential solutions
            your business needs to establish and maintain a strong online presence.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger">
          {SERVICES.map((service) => {
            const colors = COLOR_MAP[service.color] || COLOR_MAP.blue
            const Icon = service.icon
            return (
              <article
                key={service.id}
                className={`reveal group relative flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/5 ${colors.border} card-hover cursor-default`}
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${colors.icon}`}>
                  <Icon size={22} aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className="text-white font-bold text-base mb-2 leading-snug">{service.title}</h3>
                <p className="text-[#A7ADBB] text-sm leading-relaxed flex-1">{service.description}</p>

                {/* Link */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#A7ADBB] group-hover:text-blue-400 transition-colors duration-200 flex items-center gap-1">
                    Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} opacity-60`} aria-hidden="true" />
                </div>
              </article>
            )
          })}

          {/* Last card spans extra column on xl */}
          <div className="hidden xl:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
