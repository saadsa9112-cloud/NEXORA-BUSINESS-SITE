import { ArrowRight } from 'lucide-react'

const FLOW_STEPS = ['Strategy', 'Design', 'Development', 'Growth']

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 lg:py-24 bg-[#0B1020]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="text-center mb-12 reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 mb-4">
              <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">About</span>
            </div>
            <h2 id="about-heading" className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-5">
              Digital Solutions Built Around <span className="text-gradient-blue">Your Business.</span>
            </h2>
            <p className="text-[#A7ADBB] text-lg leading-relaxed max-w-2xl mx-auto">
              NEXORA DIGITAL helps startups, small businesses and growing brands establish a
              professional online presence through modern websites, e-commerce solutions, SEO,
              creative design and reliable digital support.
            </p>
          </div>

          {/* Flow diagram */}
          <div className="reveal flex flex-wrap items-center justify-center gap-3 sm:gap-0">
            {FLOW_STEPS.map((step, idx) => (
              <div key={step} className="flex items-center gap-3">
                <div className="px-5 py-3 rounded-xl border border-white/8 bg-white/[0.03] hover:border-blue-500/25 hover:bg-blue-500/5 transition-all duration-300">
                  <span className="text-white font-semibold text-sm">{step}</span>
                </div>
                {idx < FLOW_STEPS.length - 1 && (
                  <ArrowRight
                    size={16}
                    className="text-blue-400/50 flex-shrink-0 hidden sm:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
