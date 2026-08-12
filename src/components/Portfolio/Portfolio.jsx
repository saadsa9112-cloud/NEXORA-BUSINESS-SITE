import { ExternalLink } from 'lucide-react'
import { PORTFOLIO_ITEMS } from '../../data/siteData'

export default function Portfolio() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-24 lg:py-32 bg-[#0B1020]/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 mb-4">
            <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">Featured Work</span>
          </div>
          <h2 id="work-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            See What We <span className="text-gradient-blue">Build.</span>
          </h2>
          <p className="text-[#A7ADBB] text-lg leading-relaxed max-w-2xl">
            Explore selected digital experiences created to demonstrate our approach to design,
            usability and modern development.
          </p>
        </div>

        {/* Portfolio grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {PORTFOLIO_ITEMS.map((item, idx) => (
            <article
              key={item.id}
              className={`reveal group relative overflow-hidden rounded-2xl bg-[#0a0f1e] border border-white/5 hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={item.image}
                  alt={`${item.title} — ${item.category} demo project created by NEXORA DIGITAL`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#05070D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 rounded-lg text-white text-sm font-semibold transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <span>View Project</span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </div>
                </div>

                {/* Concept label */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase bg-blue-500/20 border border-blue-500/30 text-blue-300 backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase mb-1 block">
                  {item.category}
                </span>
                <h3 className="text-white font-bold text-base mb-2 leading-snug">{item.title}</h3>
                <p className="text-[#A7ADBB] text-sm leading-relaxed">{item.description}</p>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#A7ADBB] group-hover:text-blue-400 transition-colors duration-200">
                  <span>View Project</span>
                  <ExternalLink size={11} aria-hidden="true" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Disclosure note */}
        <p className="mt-10 text-center text-xs text-white/25 max-w-xl mx-auto leading-relaxed">
          All projects shown are self-created demonstration concepts produced by NEXORA DIGITAL
          to showcase design and development capabilities.
        </p>
      </div>
    </section>
  )
}
