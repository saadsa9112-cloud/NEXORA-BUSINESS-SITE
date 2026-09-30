import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, MessageSquare, Send, Sparkles, CheckCircle2, ArrowRight, PhoneCall } from 'lucide-react'
import { CONTACT } from '../../data/siteData'

export default function AiAssistantModal({ isOpen: controlledIsOpen, onClose: controlledOnClose }) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalOpen

  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose()
    } else {
      setInternalOpen(false)
    }
  }

  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')
  const [timeline, setTimeline] = useState('')

  const handleReset = () => {
    setStep(1)
    setSelectedService('')
    setSelectedBudget('')
    setTimeline('')
  }

  const handleLaunchWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello NEXORA DIGITAL! I used your AI Consultation Assistant on your website.\n\n` +
      `• Service Required: ${selectedService || 'Not specified'}\n` +
      `• Budget Range: ${selectedBudget || 'Not specified'}\n` +
      `• Timeline: ${timeline || 'Flexible'}\n\n` +
      `I'd like to discuss my project with your team.`
    )
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${text}`, '_blank')
    handleClose()
  }

  return (
    <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Card — bottom sheet on mobile, centered card on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="relative w-full sm:max-w-lg bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl border border-[#E5EAF1] z-10 overflow-hidden text-[#0B1020] max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-[#05070D] text-white px-4 py-3.5 flex items-center justify-between border-b border-white/10 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#0066FF] flex items-center justify-center text-white font-bold flex-shrink-0">
                    <Bot size={17} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold flex items-center gap-1.5">
                      NEXORA Instant Assistant
                      <Sparkles size={12} className="text-blue-400" />
                    </h3>
                    <p className="text-[10px] text-gray-400 hidden sm:block">Get an instant project recommendation in 30 seconds</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Body Steps — scrollable */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                {step === 1 && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Step 1 of 3</div>
                    <h4 className="text-sm font-bold text-[#0B1020]">What type of digital project do you need?</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Business Website',
                        'WordPress CMS Site',
                        'Shopify Store',
                        'Custom Web App',
                        'Graphic & Brand Design',
                        'Technical SEO & Audit'
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setSelectedService(item)
                            setStep(2)
                          }}
                          className="p-2.5 text-left border border-[#E5EAF1] hover:border-[#0066FF] hover:bg-blue-50/50 rounded-xl text-xs font-semibold text-[#0B1020] transition-all cursor-pointer flex items-center justify-between gap-1"
                        >
                          <span className="leading-snug">{item}</span>
                          <ArrowRight size={12} className="text-slate-400 flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Step 2 of 3</div>
                    <h4 className="text-sm font-bold text-[#0B1020]">What is your estimated target budget?</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        'Starter (Rs. 15,000–35,000 / $100–$299)',
                        'Growth (Rs. 35,000–75,000 / $299–$599)',
                        'Enterprise (Rs. 75,000+ / $599+)',
                        'Custom Enterprise Scope'
                      ].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => {
                            setSelectedBudget(b)
                            setStep(3)
                          }}
                          className="p-2.5 text-left border border-[#E5EAF1] hover:border-[#0066FF] hover:bg-blue-50/50 rounded-xl text-xs font-semibold text-[#0B1020] transition-all cursor-pointer flex items-center justify-between gap-2"
                        >
                          <span>{b}</span>
                          <CheckCircle2 size={13} className="text-[#0066FF] flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-[#6B7280] underline hover:text-[#0B1020] pt-1"
                    >
                      ← Back
                    </button>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-3 text-center py-2">
                    <div className="w-11 h-11 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={22} />
                    </div>
                    <h4 className="text-base font-bold text-[#0B1020]">Recommendation Ready!</h4>
                    <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E5EAF1] text-left text-xs space-y-2">
                      <div><strong>Selected Service:</strong> {selectedService}</div>
                      <div><strong>Target Budget:</strong> {selectedBudget}</div>
                      <div className="text-green-700 font-semibold pt-1">✓ Includes full design, mobile responsiveness, fast delivery & Technical SEO.</div>
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={handleLaunchWhatsApp}
                        className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <MessageSquare size={15} />
                        <span>Chat Instantly on WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-xs text-[#6B7280] underline hover:text-[#0B1020]"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
