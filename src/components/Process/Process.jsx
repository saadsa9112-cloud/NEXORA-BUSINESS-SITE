import { useRef } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import { PROCESS_STEPS } from '../../data/siteData'
import ScrollReveal from '../Motion/ScrollReveal'

export default function Process() {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  // Track scroll progress within process section for timeline line animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  })

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20 })

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="py-20 lg:py-28 bg-white dark:bg-[#070913] border-y border-[#E5EAF1] dark:border-white/10 overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal variant="fadeUp" className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 dark:bg-blue-500/10 text-[#0066FF] dark:text-[#38BDF8] mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase">Engineering Methodology</span>
          </div>
          <h2 id="process-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] dark:text-white leading-tight tracking-tight mb-4">
            From Blueprint to <span className="text-gradient-blue">Global Deployment.</span>
          </h2>
          <p className="text-[#4B5563] dark:text-slate-300 text-base leading-relaxed">
            A disciplined, 6-phase engineering process designed to deliver technical excellence on time and within scope.
          </p>
        </ScrollReveal>

        {/* Desktop: horizontal timeline with animated progress line */}
        <div className="hidden md:grid md:grid-cols-6 gap-0 relative">
          {/* Base connecting line */}
          <div
            className="absolute top-10 left-[calc(1/12*100%)] right-[calc(1/12*100%)] h-0.5 bg-slate-200 dark:bg-white/10"
            aria-hidden="true"
          />

          {/* Animated active progress line */}
          {!shouldReduceMotion && (
            <motion.div
              style={{ scaleX, transformOrigin: 'left' }}
              className="absolute top-10 left-[calc(1/12*100%)] right-[calc(1/12*100%)] h-0.5 bg-[#0066FF] z-0"
              aria-hidden="true"
            />
          )}

          {PROCESS_STEPS.map((step, idx) => (
            <ScrollReveal
              key={step.number}
              variant="fadeUp"
              delay={idx * 0.08}
              className="flex flex-col items-center text-center px-3 relative z-10"
            >
              {/* Step circle */}
              <div className="mb-5">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="w-20 h-20 rounded-full border-2 border-[#E5EAF1] dark:border-white/10 bg-white dark:bg-[#0B1020] shadow-soft dark:shadow-none flex flex-col items-center justify-center group hover:border-[#0066FF] dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 transition-all duration-300 cursor-default"
                >
                  <span className="text-xs font-bold text-[#0066FF] dark:text-[#38BDF8] tracking-wider">{step.number}</span>
                  <span className="text-[9px] text-[#0B1020] dark:text-white font-bold uppercase tracking-wider mt-0.5">{step.title}</span>
                </motion.div>
              </div>

              {/* Content */}
              <h3 className="text-[#0B1020] dark:text-white font-bold text-base mb-1">{step.title}</h3>
              <p className="text-[#4B5563] dark:text-slate-400 text-xs leading-relaxed max-w-[160px]">{step.description}</p>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative">
          {/* Vertical line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-white/10"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <ScrollReveal
                key={step.number}
                variant="fadeUp"
                delay={idx * 0.08}
                className="flex items-start gap-6 pl-0 relative z-10"
              >
                {/* Circle */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full border-2 border-[#E5EAF1] dark:border-white/10 bg-white dark:bg-[#0B1020] shadow-soft dark:shadow-none flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-[#0066FF] dark:text-[#38BDF8] tracking-wider">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-2">
                  <h3 className="text-[#0B1020] dark:text-white font-bold text-base mb-1">{step.title}</h3>
                  <p className="text-[#4B5563] dark:text-slate-300 text-sm leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
