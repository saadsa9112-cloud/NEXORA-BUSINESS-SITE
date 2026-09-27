import { useState, useRef } from 'react'
import ScrollReveal from '../Motion/ScrollReveal'
import { Sparkles, ArrowLeftRight, CheckCircle2, ShoppingCart, Star, ShieldCheck, Zap, XCircle } from 'lucide-react'
import ecommerceImg from '../../assets/portfolio/ecommerce.jpg'

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
              <span>E-Commerce Redesign Comparison</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] leading-tight tracking-tight mb-4">
              Unoptimized Store vs. <span className="text-[#0066FF]">NEXORA Shopify Store</span>
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed">
              Drag the interactive slider to compare an old, unoptimized online store layout with NEXORA DIGITAL's high-converting 2026 e-commerce architecture.
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
            className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-black/10 cursor-ew-resize bg-slate-900"
          >
            {/* ========================================================================= */}
            {/* AFTER SIDE: Modern 2026 High-Converting NEXORA Store (Base Layer) */}
            {/* ========================================================================= */}
            <div className="absolute inset-0 bg-[#0A0D14] text-white flex flex-col justify-between p-6 sm:p-8 font-sans">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center font-black text-white text-sm">
                    N
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      NEXORA Luxury Store
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded-full border border-green-500/30">
                        Live Store
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400">Shopify Custom Liquid Theme • 99 Speed</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block px-3 py-1 bg-[#0066FF] text-white rounded-xl font-bold text-xs shadow-md">
                    AFTER: NEXORA High-Converting Store
                  </span>
                </div>
              </div>

              {/* Modern Product Grid Showcase */}
              <div className="my-auto grid sm:grid-cols-2 gap-4 items-center">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg aspect-video bg-slate-800">
                  <img
                    src={ecommerceImg}
                    alt="Modern E-Commerce Store UI"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-3 left-3 bg-[#0066FF] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                    -30% OFF TODAY
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                    <span className="text-gray-300 font-bold ml-1 text-[11px]">4.9 (1.4k Reviews)</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold leading-snug">
                    Executive Chrono Watch Series
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-green-400">$149.00</span>
                    <span className="text-xs text-gray-500 line-through">$210.00</span>
                    <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded">Save $61</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button className="flex-1 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5">
                      <ShoppingCart size={14} />
                      <span>Add to Cart — Instant Checkout</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-gray-400 pt-1">
                    <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-[#0066FF]" /> 256-Bit SSL</span>
                    <span className="flex items-center gap-1"><Zap size={12} className="text-green-400" /> Express Shipping</span>
                  </div>
                </div>
              </div>

              {/* Bottom Conversion Metric Bar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300">
                <span className="text-green-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={13} /> 3.8% Store Conversion Rate (+240% Lift)
                </span>
                <span className="hidden sm:inline-block text-gray-400">Mobile Express Checkout Ready</span>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* BEFORE SIDE: Unoptimized / Old E-Commerce Layout (Clipped Overlay) */}
            {/* ========================================================================= */}
            <div
              className="absolute inset-0 bg-white text-black flex flex-col justify-between p-6 sm:p-8 font-sans border-r-4 border-[#0066FF] shadow-2xl overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* Old Unoptimized Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-300 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 border border-gray-400 text-black flex items-center justify-center font-bold text-xs">
                    SHOP
                  </div>
                  <div>
                    <div className="font-bold text-black text-xs">My Online Store (2018 Theme)</div>
                    <div className="text-[10px] text-red-600 font-bold">⚠️ Unoptimized • Slow Loading (4.2s)</div>
                  </div>
                </div>

                <div>
                  <span className="bg-red-600 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                    BEFORE: Unoptimized Old Store
                  </span>
                </div>
              </div>

              {/* Old Unoptimized Product Layout */}
              <div className="my-auto grid sm:grid-cols-2 gap-4 items-center bg-gray-50 p-4 border border-gray-300">
                <div className="relative border border-gray-300 aspect-video bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                  <img
                    src={ecommerceImg}
                    alt="Old E-Commerce Store UI"
                    className="w-full h-full object-cover filter grayscale contrast-125 brightness-75"
                  />
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] px-1 font-bold">
                    SALE!
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] text-gray-500">Item #4082 — Category: Watches</div>
                  <h4 className="text-sm font-bold text-black leading-tight underline">
                    Men's Leather Strap Watch Product
                  </h4>
                  <div className="text-base font-bold text-black">
                    Price: $149.00 <span className="text-xs text-red-600 font-normal line-through">$210.00</span>
                  </div>
                  <div className="pt-1">
                    <button className="w-full py-2 bg-gray-300 text-black border border-gray-500 font-bold text-xs">
                      [ ADD TO CART ]
                    </button>
                  </div>
                  <div className="text-[10px] text-red-600 font-bold">
                    ❌ High Abandoned Cart Rate (82%)
                  </div>
                </div>
              </div>

              {/* Bottom Unoptimized Warning */}
              <div className="pt-3 border-t border-gray-300 flex items-center justify-between text-[11px] text-red-600 font-bold">
                <span className="flex items-center gap-1">
                  <XCircle size={13} /> Low 0.9% Conversion Rate (Legacy Layout)
                </span>
                <span className="hidden sm:inline-block text-gray-500">No Mobile Checkout Optimization</span>
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
                <h4 className="text-sm font-bold text-[#0B1020] mb-1">+240% Sales Lift</h4>
                <p className="text-xs text-[#6B7280]">Modern UI hierarchy turns store visitors into immediate buyers.</p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E5EAF1] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1020] mb-1">&lt; 1s Mobile Checkout</h4>
                <p className="text-xs text-[#6B7280]">Express checkout options eliminate cart abandonment.</p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E5EAF1] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1020] mb-1">99 PageSpeed Rating</h4>
                <p className="text-xs text-[#6B7280]">Shopify Liquid custom theme optimization for ultra-fast loading.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
