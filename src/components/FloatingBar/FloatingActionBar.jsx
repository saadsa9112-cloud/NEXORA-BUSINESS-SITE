import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Zap } from 'lucide-react'
import { CONTACT } from '../../data/siteData'

export default function FloatingActionBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Show floating bar after scrolling 400px down
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 80, opacity: 0, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed bottom-6 left-1/2 z-40 max-w-md w-[calc(100%-2rem)] sm:w-auto"
        >
          <div className="bg-white/90 backdrop-blur-md border border-[#E5EAF1] shadow-2xl rounded-2xl p-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-3 text-xs font-semibold">
            {/* Status indicator */}
            <div className="hidden sm:flex items-center gap-2 pr-2 border-r border-[#E5EAF1]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] text-[#0B1020] font-bold">Online</span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#16a34a] border border-[#25D366]/30 transition-all text-xs font-semibold"
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={scrollToContact}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-md shadow-blue-500/20 transition-all text-xs font-semibold"
              >
                <Zap size={14} />
                <span>Get Quote</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
