import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '../../data/siteData'

function FAQItem({ item, index, isOpen, onToggle }) {
  const id = `faq-${index}`
  const panelId = `faq-panel-${index}`

  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        type="button"
        id={id}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-1 text-left group hover:text-white transition-colors duration-200"
      >
        <span className={`text-base font-semibold pr-6 leading-snug transition-colors duration-200 ${isOpen ? 'text-white' : 'text-[#A7ADBB] group-hover:text-white'}`}>
          {item.question}
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`flex-shrink-0 transition-all duration-300 ${
            isOpen ? 'text-blue-400 rotate-180' : 'text-[#A7ADBB] group-hover:text-white'
          }`}
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={id}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-[#A7ADBB] text-sm leading-relaxed px-1">{item.answer}</p>
      </div>
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
      className="py-24 lg:py-32 bg-[#0B1020]/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="reveal-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 mb-4">
              <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">FAQ</span>
            </div>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-5">
              Frequently Asked <span className="text-gradient-blue">Questions.</span>
            </h2>
            <p className="text-[#A7ADBB] text-base leading-relaxed mb-8">
              Have more questions? Reach out via WhatsApp or the contact form below.
            </p>

            <a
              href={`https://wa.me/923453937195?text=${encodeURIComponent("Hello NEXORA DIGITAL, I'm interested in your services and would like to discuss my project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366]/10 border border-[#25D366]/25 text-[#25D366] text-sm font-semibold rounded-xl hover:bg-[#25D366]/20 transition-all duration-200"
            >
              Ask via WhatsApp →
            </a>
          </div>

          {/* Right — Accordion */}
          <div className="reveal-right">
            <div role="list" className="divide-y-0">
              {FAQ_ITEMS.map((item, idx) => (
                <FAQItem
                  key={idx}
                  item={item}
                  index={idx}
                  isOpen={openIndex === idx}
                  onToggle={() => toggle(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
