import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, MessageSquare, Send, Sparkles, CheckCircle2, ArrowRight, PhoneCall } from 'lucide-react'
import { CONTACT } from '../../data/siteData'

export default function AiAssistantModal() {
  const [isOpen, setIsOpen] = useState(false)
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
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating AI Launcher Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Consultation Assistant"
        className="fixed bottom-6 left-6 z-40 bg-[#05070D] hover:bg-[#0066FF] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl border border-white/20 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 group cursor-pointer"
      >
        <div className="relative">
          <Bot size={20} className="text-[#1F90FF] group-hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-black" />
        </div>
        <span className="hidden sm:inline-block text-xs font-bold tracking-wide">
          AI Project Assistant
        </span>
      </button>

      {/* AI Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E5EAF1] z-10 overflow-hidden text-[#0B1020]"
            >
              {/* Header */}
              <div className="bg-[#05070D] text-white p-5 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0066FF] flex items-center justify-center text-white font-bold">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-1.5">
                      NEXORA Instant Assistant
                      <Sparkles size={13} className="text-blue-400" />
                    </h3>
                    <p className="text-[11px] text-gray-400">Get an instant project recommendation in 30 seconds</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body Steps */}
              <div className="p-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Step 1 of 3</div>
                    <h4 className="text-base font-bold text-[#0B1020]">What type of digital project do you need?</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                          className="p-3 text-left border border-[#E5EAF1] hover:border-[#0066FF] hover:bg-blue-50/50 rounded-xl text-xs font-semibold text-[#0B1020] transition-all cursor-pointer flex items-center justify-between"
                        >
                          <span>{item}</span>
                          <ArrowRight size={14} className="text-slate-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Step 2 of 3</div>
                    <h4 className="text-base font-bold text-[#0B1020]">What is your estimated target budget?</h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {[
                        'Starter (Rs. 15,000 – 35,000 / $100 – $299)',
                        'Growth (Rs. 35,000 – 75,000 / $299 – $599)',
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
                          className="p-3 text-left border border-[#E5EAF1] hover:border-[#0066FF] hover:bg-blue-50/50 rounded-xl text-xs font-semibold text-[#0B1020] transition-all cursor-pointer flex items-center justify-between"
                        >
                          <span>{b}</span>
                          <CheckCircle2 size={14} className="text-[#0066FF]" />
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-[#6B7280] underline hover:text-[#0B1020] pt-2"
                    >
                      ← Back to Service Type
                    </button>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4 text-center py-2">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-[#0B1020]">Recommendation Ready!</h4>
                    <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E5EAF1] text-left text-xs space-y-2">
                      <div><strong>Selected Service:</strong> {selectedService}</div>
                      <div><strong>Target Budget:</strong> {selectedBudget}</div>
                      <div className="text-green-700 font-semibold pt-1">✓ Includes full design, mobile responsiveness, fast delivery &amp; Technical SEO.</div>
                    </div>

                    <div className="pt-2 flex flex-col gap-2.5">
                      <button
                        type="button"
                        onClick={handleLaunchWhatsApp}
                        className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <MessageSquare size={16} />
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
    </>
  )
}
