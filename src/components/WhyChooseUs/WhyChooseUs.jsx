import { WHY_US } from '../../data/siteData'
import TiltCard from '../Motion/TiltCard'
import ScrollReveal from '../Motion/ScrollReveal'

export default function WhyChooseUs() {
  return (
    <section id="why-us" aria-labelledby="why-heading" className="py-20 lg:py-28 bg-[#F7F9FC] dark:bg-[#05070D] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Header */}
          <ScrollReveal variant="slideLeft">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 dark:bg-blue-500/10 text-[#0066FF] dark:text-[#38BDF8] mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase">Strategic Advantage</span>
            </div>
            <h2 id="why-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] dark:text-white leading-tight tracking-tight mb-5">
              Why Partner With <span className="text-gradient-blue">NEXORA DIGITAL?</span>
            </h2>
            <p className="text-[#4B5563] dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-6 max-w-md">
              High-impact digital engineering grounded in technical excellence, strategic usability, and measurable ROI for global clients.
            </p>

            {/* Decorative line */}
            <div className="w-20 h-1 rounded-full bg-[#0066FF]" aria-hidden="true" />
          </ScrollReveal>

          {/* Right — Concise Numbered 3D Tilt Cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {WHY_US.map((item, idx) => (
              <ScrollReveal
                key={item.number}
                variant="fadeUp"
                delay={idx * 0.08}
              >
                <TiltCard
                  maxTilt={4}
                  className="group p-6 rounded-2xl bg-white dark:bg-[#0B1020] border border-[#E5EAF1] dark:border-white/10 shadow-soft dark:shadow-none hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-300 h-full"
                >
                  {/* Number */}
                  <div className="text-3xl font-black text-[#0066FF] dark:text-[#38BDF8] opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 mb-3 leading-none select-none origin-left">
                    {item.number}
                  </div>
                  <h3 className="text-[#0B1020] dark:text-white font-bold text-base sm:text-lg mb-1.5 group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-colors">{item.title}</h3>
                  <p className="text-[#4B5563] dark:text-slate-300 text-sm leading-relaxed">{item.description}</p>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
