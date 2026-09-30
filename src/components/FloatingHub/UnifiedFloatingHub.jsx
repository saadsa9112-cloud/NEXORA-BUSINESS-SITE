import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, X, MessageCircle, Bot, FolderCheck, Sparkles, ArrowRight } from 'lucide-react'
import { CONTACT } from '../../data/siteData'

export default function UnifiedFloatingHub({ onOpenAi, onOpenTracker }) {
  const [isOpen, setIsOpen] = useState(false)
  const hubRef = useRef(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (hubRef.current && !hubRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleSelect = (action) => {
    setIsOpen(false)
    if (action === 'ai') {
      if (onOpenAi) onOpenAi()
    } else if (action === 'tracker') {
      if (onOpenTracker) onOpenTracker()
    } else if (action === 'whatsapp') {
      const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <aside
      ref={hubRef}
      aria-label="Quick Communication and Project Tracking Hub"
      className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end"
    >
      {/* EXPANDABLE ACTIONS MENU (Slides out upward with staggered spring physics) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            className="mb-3 flex flex-col gap-2.5 w-64 sm:w-72"
          >
            {/* Header pill */}
            <div className="bg-[#05070D]/90 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl border border-white/10 shadow-lg flex items-center justify-between text-[11px]">
              <span className="font-bold flex items-center gap-1.5 text-blue-400">
                <Sparkles size={13} />
                <span>Quick Actions</span>
              </span>
              <span className="text-[10px] text-gray-400">Select an option</span>
            </div>

            {/* Option 1: WhatsApp Executive Chat */}
            <motion.button
              whileHover={{ scale: 1.02, x: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect('whatsapp')}
              className="w-full p-3 bg-white/95 hover:bg-white backdrop-blur-md rounded-2xl border border-[#E5EAF1] hover:border-[#25D366] shadow-xl flex items-center justify-between gap-3 transition-all cursor-pointer group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-[#25D366]/25 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1020] group-hover:text-[#16a34a] transition-colors flex items-center gap-1.5">
                    <span>WhatsApp Chat</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-[#6B7280]">Direct Executive Consultation</div>
                </div>
              </div>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-[#16a34a] group-hover:translate-x-1 transition-all" />
            </motion.button>

            {/* Option 2: AI Project Assistant */}
            <motion.button
              whileHover={{ scale: 1.02, x: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect('ai')}
              className="w-full p-3 bg-white/95 hover:bg-white backdrop-blur-md rounded-2xl border border-[#E5EAF1] hover:border-[#0066FF] shadow-xl flex items-center justify-between gap-3 transition-all cursor-pointer group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0066FF] text-white flex items-center justify-center shadow-md shadow-blue-500/25 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Bot size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1020] group-hover:text-[#0066FF] transition-colors">
                    AI Project Assistant
                  </div>
                  <div className="text-[10px] text-[#6B7280]">Instant 30-Sec Project Scope</div>
                </div>
              </div>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-[#0066FF] group-hover:translate-x-1 transition-all" />
            </motion.button>

            {/* Option 3: Project Status Tracker */}
            <motion.button
              whileHover={{ scale: 1.02, x: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect('tracker')}
              className="w-full p-3 bg-white/95 hover:bg-white backdrop-blur-md rounded-2xl border border-[#E5EAF1] hover:border-indigo-500 shadow-xl flex items-center justify-between gap-3 transition-all cursor-pointer group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4F46E5] text-white flex items-center justify-center shadow-md shadow-indigo-500/25 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FolderCheck size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1020] group-hover:text-[#4F46E5] transition-colors">
                    Project Status Tracker
                  </div>
                  <div className="text-[10px] text-[#6B7280]">Live Development Milestone Check</div>
                </div>
              </div>
              <ArrowRight size={14} className="text-slate-400 group-hover:text-[#4F46E5] group-hover:translate-x-1 transition-all" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN ARROW TOGGLE BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close Quick Actions Menu' : 'Open WhatsApp, AI Assistant and Project Progress Menu'}
        aria-expanded={isOpen}
        className={`flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 cursor-pointer border ${
          isOpen
            ? 'bg-[#05070D] text-white border-white/20 shadow-black/40'
            : 'bg-gradient-to-r from-[#0066FF] via-[#0052CC] to-[#1E293B] text-white border-white/20 shadow-blue-600/35 hover:shadow-blue-600/50'
        }`}
      >
        {/* Pulsating online ring */}
        <div className="relative flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="absolute w-4 h-4 rounded-full bg-emerald-400/30 animate-ping" />
        </div>

        {/* Text Label */}
        <span className="text-xs font-bold tracking-wide">
          {isOpen ? 'Close' : 'Quick Actions'}
        </span>

        {/* Arrow Toggle Icon — flips smoothly */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white"
        >
          {isOpen ? <X size={14} /> : <ChevronUp size={16} />}
        </motion.div>
      </motion.button>
    </aside>
  )
}
