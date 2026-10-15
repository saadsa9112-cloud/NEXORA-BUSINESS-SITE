import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '../../data/siteData'
import ScrollReveal from '../Motion/ScrollReveal'

function FAQItem({ item, index, isOpen, onToggle }) {
  const id = `faq-${index}`
  const panelId = `faq-panel-${index}`

  return (
    <div className="border-b border-[#E5EAF1] dark:border-white/10 last:border-0">
      <button
        type="button"
        id={id}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group transition-colors duration-200 cursor-pointer"
      >
        <span className={`text-base sm:text-lg font-semibold pr-6 leading-snug transition-colors duration-200 ${isOpen ? 'text-[#0066FF] dark:text-[#38BDF8]' : 'text-[#0B1020] dark:text-white group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8]'}`}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="flex-shrink-0"
        >
          <ChevronDown
            size={18}
            aria-hidden="true"
            className={`transition-colors duration-200 ${
              isOpen ? 'text-[#0066FF] dark:text-[#38BDF8]' : 'text-[#6B7280] dark:text-slate-400 group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8]'
            }`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[#4B5563] dark:text-slate-300 text-sm sm:text-base leading-relaxed pb-5">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (idx) => setOpenIndex((prev) => (prev === idx ? null : idx))

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 lg:py-28 bg-white dark:bg-[#070913] border-y border-[#E5EAF1] dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <ScrollReveal variant="slideLeft">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 dark:bg-blue-500/10 text-[#0066FF] dark:text-[#38BDF8] mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase">Executive FAQ</span>
            </div>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] dark:text-white leading-tight tracking-tight mb-4">
              Frequently Asked <span className="text-gradient-blue">Questions.</span>
            </h2>
            <p className="text-[#4B5563] dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Clear technical insights regarding our development process, delivery timelines, investment options, and SLA technical governance.
            </p>
          </ScrollReveal>

          {/* Right — FAQ accordion with smooth Framer Motion layout transitions */}
          <ScrollReveal variant="slideRight">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1020] border border-[#E5EAF1] dark:border-white/10 shadow-soft dark:shadow-none">
              {FAQ_ITEMS.map((item, idx) => (
                <FAQItem
                  key={item.question}
                  item={item}
                  index={idx}
                  isOpen={openIndex === idx}
                  onToggle={() => toggle(idx)}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
