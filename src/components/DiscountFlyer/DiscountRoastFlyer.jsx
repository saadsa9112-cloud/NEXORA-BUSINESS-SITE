import { useState, useEffect, useRef } from 'react'
import { Flame, X, Sparkles, ArrowRight, Pause, Play, Tag, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ROASTS = [
  {
    id: 1,
    title: '🐌 Speed Roast',
    roast: 'Is your site taking 8+ seconds to load? Your clients left 6 seconds ago.',
    solution: 'Upgrade to 99+ PageSpeed React 19 architecture & claim 25% OFF today!',
    code: 'SPEED25',
  },
  {
    id: 2,
    title: '💸 Agency Scam Roast',
    roast: 'Still paying $5,000 to agencies who built your site on a 2014 WordPress template?',
    solution: 'Get 100% IP Source Code ownership + 25% OFF custom enterprise engineering.',
    code: 'NOAGENCY25',
  },
  {
    id: 3,
    title: '🤡 UI/UX Design Roast',
    roast: 'Does your website look like it was made in Microsoft Paint back in 2008?',
    solution: 'Fix your layout with 3D Motion UI & save 25% on your project!',
    code: 'ROAST25',
  },
]

export default function DiscountRoastFlyer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [roastIndex, setRoastIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(4)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const showTimer = setTimeout(() => setIsOpen(true), 1500)
    return () => clearTimeout(showTimer)
  }, [])

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
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
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
        detailsField.value = `[PROMO: ${currentRoast.code} - 25% OFF] `
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
      {/* Re-open pill — sits above AI bot button on mobile */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={handleReopen}
          className="fixed bottom-36 left-3 sm:bottom-32 sm:left-4 z-40 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white p-0.5 rounded-full shadow-xl hover:scale-105 transition-transform duration-200 cursor-pointer"
          title="25% OFF Discount"
        >
          <div className="bg-[#0B1020] hover:bg-transparent px-2.5 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-bold transition-colors">
            <Flame size={12} className="text-amber-400 animate-pulse fill-current" />
            <span className="text-amber-300 font-mono font-black">25% OFF</span>
            <span className="hidden sm:inline-block text-white/90">Deal</span>
          </div>
        </motion.button>
      )}

      {/* Flyer popup — bottom sheet on mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
            className="fixed bottom-0 left-0 right-0 sm:bottom-5 sm:right-4 sm:left-auto z-50 sm:max-w-sm w-full bg-[#0B1020]/97 backdrop-blur-xl border-t-2 sm:border-2 border-amber-500/40 sm:rounded-2xl shadow-2xl text-white overflow-hidden"
          >
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-rose-500"
                animate={{ width: `${(timeLeft / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-amber-500 to-rose-500 text-black px-2 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <Flame size={10} className="fill-current" />
                    B2B DEAL
                  </span>
                  <span className="text-xs font-bold text-amber-300 font-mono">25% OFF</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border flex items-center gap-1 ${
                    isHovered ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {isHovered ? <><Pause size={9} /><span>Paused</span></> : <><Play size={9} /><span>{timeLeft}s</span></>}
                  </div>
                  <button
                    onClick={() => { setIsOpen(false); setIsDismissed(true) }}
                    className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Roast body */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 font-mono">{currentRoast.title}</span>
                  <button
                    onClick={handleNextRoast}
                    className="text-[10px] text-gray-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RefreshCw size={10} />
                    <span>Next</span>
                  </button>
                </div>

                <div className="p-3 bg-black/60 rounded-xl border border-white/10 space-y-1.5">
                  <p className="text-[11px] text-amber-100 italic leading-relaxed">"{currentRoast.roast}"</p>
                  <p className="text-[10px] text-emerald-300 font-bold flex items-start gap-1 pt-1 border-t border-white/10">
                    <span className="flex-shrink-0">⚡ Fix:</span>
                    <span>{currentRoast.solution}</span>
                  </p>
                </div>

                {/* Promo code */}
                <div className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-xl border border-white/10 text-xs">
                  <span className="text-gray-400 text-[11px]">Promo Code:</span>
                  <span className="font-mono text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40 tracking-wider text-[11px]">
                    {currentRoast.code}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={handleClaimDiscount}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Tag size={13} />
                  <span>Claim 25% OFF Project</span>
                  <ArrowRight size={13} />
                </button>

                <button
                  onClick={() => { setIsOpen(false); setIsDismissed(true) }}
                  className="text-[11px] text-gray-500 hover:text-rose-300 transition-colors cursor-pointer text-center"
                >
                  No thanks, I love slow websites 🐌
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
