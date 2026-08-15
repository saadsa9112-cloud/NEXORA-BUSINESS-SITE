import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '../../data/siteData'
import ScrollReveal from '../Motion/ScrollReveal'

function FAQItem({ item, index, isOpen, onToggle }) {
  const id = `faq-${index}`
  const panelId = `faq-panel-${index}`

  return (
    <div className="border-b border-[#E5EAF1] last:border-0">
      <button
        type="button"
        id={id}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group transition-colors duration-200"
      >
        <span className={`text-base sm:text-lg font-semibold pr-6 leading-snug transition-colors duration-200 ${isOpen ? 'text-[#0066FF]' : 'text-[#0B1020] group-hover:text-[#0066FF]'}`}>
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
              isOpen ? 'text-[#0066FF]' : 'text-[#6B7280] group-hover:text-[#0066FF]'
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
            <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed pb-5">{item.answer}</p>
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
      className="py-20 lg:py-28 bg-white border-y border-[#E5EAF1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <ScrollReveal variant="slideLeft">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 text-[#0066FF] mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase">FAQ</span>
            </div>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] leading-tight tracking-tight mb-4">
              Frequently Asked <span className="text-gradient-blue">Questions.</span>
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed mb-6">
              Got questions? We've got answers. If you need further assistance, feel free to reach out.
            </p>
          </ScrollReveal>

          {/* Right — FAQ accordion with smooth Framer Motion layout transitions */}
          <ScrollReveal variant="slideRight">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] shadow-soft">
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
