import { ArrowRight } from 'lucide-react'
import ScrollReveal from '../Motion/ScrollReveal'

const FLOW_STEPS = ['Strategy', 'Design', 'Development', 'Growth']

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 lg:py-24 bg-white border-y border-[#E5EAF1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <ScrollReveal variant="fadeUp" className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 text-[#0066FF] mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase">About Us</span>
            </div>
            <h2 id="about-heading" className="text-3xl sm:text-4xl font-black text-[#0B1020] leading-tight tracking-tight mb-5">
              Digital Solutions Built Around <span className="text-gradient-blue">Your Business.</span>
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              NEXORA DIGITAL helps startups, small businesses and growing brands establish a
              professional online presence through modern websites, e-commerce solutions, SEO,
              creative design and reliable digital support.
            </p>
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
