import { useState } from 'react'
import { Sparkles, Flame, X, ArrowRight, ShieldCheck } from 'lucide-react'

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
    <div className="bg-gradient-to-r from-[#0052CC] via-[#0066FF] to-[#1F90FF] text-white py-2.5 px-4 relative z-50 text-xs shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        
        {/* Left Side: Offer & Scarcity */}
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1 bg-amber-400 text-black px-2 py-0.5 rounded-full font-black text-[10px] tracking-wider uppercase shadow-xs">
            <Flame size={12} className="fill-current" />
            STARTUP LAUNCH OFFER
          </span>
          <span className="font-bold">
            Up to <strong className="underline decoration-amber-300 font-black">35% OFF</strong> for Early Clients!
          </span>
          <span className="hidden md:inline-block text-blue-100">|</span>
          <span className="bg-black/20 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-blue-100 border border-white/15">
            🔥 <strong className="text-white font-bold">17 / 20</strong> Slots Remaining (3 Claimed)
          </span>
        </div>

        {/* Right Side: CTA Button & Dismiss */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleClaimOffer}
            className="px-3.5 py-1 bg-white hover:bg-amber-300 text-[#0052CC] hover:text-black font-extrabold rounded-lg shadow-sm transition-all duration-200 cursor-pointer flex items-center gap-1 text-[11px]"
          >
            <span>Claim 35% Discount</span>
            <ArrowRight size={12} />
          </button>
          
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss banner"
            className="text-white/70 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

      </div>
    </div>
  )
}
