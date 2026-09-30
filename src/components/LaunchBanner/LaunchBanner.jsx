import { useState } from 'react'
import { Flame, X, ArrowRight } from 'lucide-react'

export default function LaunchBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleClaimOffer = () => {
    const el = document.getElementById('contact')
    if (el) {
      const detailsField = document.getElementById('details')
      if (detailsField) {
        detailsField.value = `Claiming 35% Startup Launch Discount (Code: LAUNCH35). I'd like to discuss my project scope.`
        detailsField.dispatchEvent(new Event('input', { bubbles: true }))
      }
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-gradient-to-r from-[#0052CC] via-[#0066FF] to-[#1F90FF] text-white py-1.5 sm:py-2 px-3 sm:px-4 relative z-50 text-[11px] sm:text-xs shadow-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Left / Center Message */}
        <div className="flex items-center gap-2 overflow-hidden text-left">
          <span className="inline-flex items-center gap-1 bg-amber-400 text-black px-2 py-0.5 rounded-full font-black text-[9px] sm:text-[10px] tracking-wider uppercase flex-shrink-0 shadow-xs">
            <Flame size={10} className="fill-current" />
            <span className="hidden xs:inline">LAUNCH OFFER</span>
            <span className="xs:hidden">35% OFF</span>
          </span>

          <span className="font-bold truncate text-[11px] sm:text-xs">
            <span className="hidden sm:inline">Up to </span>
            <strong className="underline decoration-amber-300 font-black">35% OFF</strong>
            <span className="hidden sm:inline"> for Early Clients!</span>
            <span className="hidden md:inline text-blue-100 font-normal"> | 🔥 17/20 Slots Left</span>
          </span>
        </div>

        {/* Action & Close Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <button
            onClick={handleClaimOffer}
            className="px-2.5 sm:px-3.5 py-0.5 sm:py-1 bg-white hover:bg-amber-300 text-[#0052CC] hover:text-black font-extrabold rounded-lg shadow-sm transition-all duration-200 cursor-pointer flex items-center gap-1 text-[10px] sm:text-[11px]"
          >
            <span>Claim Deal</span>
            <ArrowRight size={11} />
          </button>
          
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss banner"
            className="text-white/70 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X size={13} />
          </button>
        </div>

      </div>
    </div>
  )
}
