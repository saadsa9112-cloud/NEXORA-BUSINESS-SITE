import { useState, useRef } from 'react'
import ScrollReveal from '../Motion/ScrollReveal'
import { Sparkles, ArrowLeftRight, CheckCircle2, ShoppingCart, Zap, XCircle } from 'lucide-react'
import beforeStoreImg from '../../assets/before-after/before-store.png'
import afterStoreImg from '../../assets/before-after/after-store.png'

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMove = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    let percentage = (x / rect.width) * 100
    if (percentage < 5) percentage = 5
    if (percentage > 95) percentage = 95
    setSliderPosition(percentage)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-[#E5EAF1] relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles size={14} />
              <span>Real E-Commerce Transformation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] leading-tight tracking-tight mb-4">
              Basic Web Store vs. <span className="text-[#0066FF]">NEXORA Redesign</span>
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed">
              Drag the interactive slider to see how NEXORA DIGITAL transforms plain, low-converting web stores into ultra-sleek, high-converting platforms.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive Comparison Canvas */}
        <ScrollReveal variant="fadeUp" className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            className="relative h-[360px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-black/10 cursor-ew-resize bg-[#060B18]"
          >
            {/* ========================================================================= */}
            {/* AFTER SIDE: Ultra-Modern 2026 NEXORA Store (Base Layer) */}
            {/* ========================================================================= */}
            <div className="absolute inset-0 bg-[#060B18] flex items-center justify-center">
              <img
                src={afterStoreImg}
                alt="NEXORA High-Converting Redesigned Store"
                className="w-full h-full object-contain sm:object-cover object-top"
              />
              
              {/* After Label Badge */}
              <div className="absolute top-4 right-4 bg-[#0066FF] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                <CheckCircle2 size={15} />
                <span>AFTER: NEXORA High-Converting Store (3.8% Conversion)</span>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* BEFORE SIDE: Basic Plain Store (Clipped Overlay Layer) */}
            {/* ========================================================================= */}
            <div
              className="absolute inset-0 bg-white overflow-hidden border-r-4 border-[#0066FF] shadow-2xl"
              style={{ width: `${sliderPosition}%` }}
            >
              <div
                className="relative h-full bg-white flex items-center justify-center"
                style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
              >
                <img
                  src={beforeStoreImg}
                  alt="Basic Plain Store Layout"
                  className="w-full h-full object-contain sm:object-cover object-top"
                />
              </div>

              {/* Before Label Badge */}
              <div className="absolute top-4 left-4 bg-slate-900/90 text-red-400 border border-red-500/30 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                <XCircle size={15} />
                <span>BEFORE: Basic / Plain Store (1.2% Conversion)</span>
              </div>
            </div>

            {/* Vertical Slider Handle Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0066FF] border-2 border-white shadow-xl flex items-center justify-center text-white cursor-ew-resize">
                <ArrowLeftRight size={16} />
              </div>
            </div>
          </div>

          {/* Key Advantages Grid */}
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E5EAF1] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-[#0066FF]">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1020] mb-1">+240% Sales Growth</h4>
                <p className="text-xs text-[#6B7280]">Converting basic layouts into high-converting visual storefronts.</p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E5EAF1] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1020] mb-1">&lt; 1s Mobile Checkout</h4>
                <p className="text-xs text-[#6B7280]">Streamlined checkout flow reduces cart abandonment to a minimum.</p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E5EAF1] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1020] mb-1">Custom Shopify Liquid</h4>
                <p className="text-xs text-[#6B7280]">High-performance code architecture optimized for speed and SEO.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
