import { useState, useEffect, useRef } from 'react'
import { Flame, X, Sparkles, ArrowRight, Pause, Play, Tag, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ROASTS = [
  {
    id: 1,
    title: '🐌 Speed Roast',
    roast: 'Is your current website taking 8+ seconds to load? Your prospective clients left 6 seconds ago.',
    solution: 'Upgrade to 99+ PageSpeed React 19 architecture & claim 25% OFF today!',
    code: 'SPEED25',
  },
  {
    id: 2,
    title: '💸 Agency Scam Roast',
    roast: 'Still paying $5,000 to legacy agencies who built your site on a 2014 WordPress template?',
    solution: 'Get 100% IP Source Code ownership + 25% OFF custom enterprise engineering.',
    code: 'NOAGENCY25',
  },
  {
    id: 3,
    title: '🤡 UI/UX Design Roast',
    roast: 'Does your website design look like it was created in Microsoft Paint back in 2008?',
    solution: 'Fix your embarrassing layout with 3D Motion UI & save 25% on your project!',
    code: 'ROAST25',
  },
]

export default function DiscountRoastFlyer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [roastIndex, setRoastIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(4) // 4 seconds auto-hide
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef(null)

  // Delay entry popup by 1.5 seconds on initial load
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsOpen(true)
    }, 1500)
    return () => clearTimeout(showTimer)
  }, [])

  // Auto-hide countdown (4 seconds) with pause on hover
  useEffect(() => {
    if (!isOpen || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setIsOpen(false)
          setIsDismissed(true)
          return 4
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isOpen, isHovered])

  const currentRoast = ROASTS[roastIndex]

  const handleNextRoast = (e) => {
    e.stopPropagation()
    setRoastIndex((prev) => (prev + 1) % ROASTS.length)
    setTimeLeft(4)
  }

  const handleClaimDiscount = () => {
    setIsOpen(false)
    setIsDismissed(true)
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      const detailsField = document.getElementById('details')
      if (detailsField) {
        detailsField.value = `[PROMO CLAIMED: ${currentRoast.code} - 25% OFF] ${currentRoast.roast}`
        detailsField.dispatchEvent(new Event('input', { bubbles: true }))
      }
      const top = contactSection.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const handleReopen = () => {
    setTimeLeft(4)
    setIsDismissed(false)
    setIsOpen(true)
  }

  return (
    <>
      {/* FLOATING RE-OPEN TRIGGER BADGE (Shows when closed or auto-hidden) */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={handleReopen}
          className="fixed bottom-20 left-4 z-40 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white p-0.5 rounded-full shadow-2xl hover:scale-105 transition-transform duration-200 cursor-pointer group"
          title="Click to view 25% OFF Roast Discount"
        >
          <div className="bg-[#0B1020] hover:bg-transparent px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-bold transition-colors">
            <Flame size={15} className="text-amber-400 animate-pulse fill-current" />
            <span className="text-amber-300 font-mono font-black">25% OFF</span>
            <span className="hidden sm:inline-block text-white/90">Roast Deal</span>
            <Sparkles size={13} className="text-rose-400 group-hover:rotate-12 transition-transform" />
          </div>
        </motion.button>
      )}

      {/* FLYER POPUP MODAL / CARD */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed bottom-5 right-4 sm:right-6 z-50 max-w-md w-[calc(100vw-2rem)] bg-[#0B1020]/95 backdrop-blur-xl border-2 border-amber-500/40 rounded-3xl p-5 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-white overflow-hidden"
          >
            {/* Countdown Progress Bar Top Indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-rose-500"
                initial={{ width: '100%' }}
                animate={{ width: isHovered ? `${(timeLeft / 4) * 100}%` : `${(timeLeft / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Header: Title, Timer Badge & Close */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-amber-500 to-rose-500 text-black px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Flame size={12} className="fill-current" />
                  LIMITED B2B DEAL
                </span>
                <span className="text-xs font-bold text-amber-300 font-mono">25% OFF</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Auto-Hide Countdown Badge */}
                <div
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 transition-colors ${
                    isHovered
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {isHovered ? (
                    <>
                      <Pause size={10} />
                      <span>Paused</span>
                    </>
                  ) : (
                    <>
                      <Play size={10} />
                      <span>Auto-closing in {timeLeft}s</span>
                    </>
                  )}
                </div>

                {/* Cancel / Close Button */}
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setIsDismissed(true)
                  }}
                  className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close flyer"
                  aria-label="Close flyer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Roast Body */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 font-mono tracking-wide">
                  {currentRoast.title}
                </span>
                <button
                  onClick={handleNextRoast}
                  className="text-[11px] text-gray-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Try another roast"
                >
                  <RefreshCw size={11} />
                  <span>Next Roast</span>
                </button>
              </div>

              {/* Roasting Quote Box */}
              <div className="p-3.5 bg-black/60 rounded-2xl border border-white/10 space-y-1.5 relative group">
                <p className="text-xs text-amber-100 font-sans italic leading-relaxed">
                  "{currentRoast.roast}"
                </p>
                <p className="text-[11px] text-emerald-300 font-bold flex items-center gap-1 pt-1 border-t border-white/10">
                  <span>⚡ Fix:</span> {currentRoast.solution}
                </p>
              </div>

              {/* Promo Code Badge */}
              <div className="flex items-center justify-between bg-white/5 p-2 rounded-xl border border-white/10 text-xs">
                <span className="text-gray-400 text-[11px]">Promo Code:</span>
                <span className="font-mono text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40 tracking-wider">
                  {currentRoast.code}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={handleClaimDiscount}
                className="w-full sm:flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-extrabold text-xs rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <Tag size={14} />
                <span>Claim 25% OFF Project</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => {
                  setIsOpen(false)
                  setIsDismissed(true)
                }}
                className="w-full sm:w-auto py-2 px-3 text-[11px] text-gray-400 hover:text-rose-300 hover:bg-white/5 rounded-xl transition-colors cursor-pointer text-center font-medium"
              >
                No thanks, I love slow websites 🐌
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
