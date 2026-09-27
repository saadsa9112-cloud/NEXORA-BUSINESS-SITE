import { useState, useRef } from 'react'
import ScrollReveal from '../Motion/ScrollReveal'
import { Sparkles, ArrowLeftRight, CheckCircle2, AlertTriangle, Lock, Unlock, Zap, RefreshCw } from 'lucide-react'

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
              <span>Real Visual Transformation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] leading-tight tracking-tight mb-4">
              Outdated 2012 Site vs. <span className="text-[#0066FF]">2026 NEXORA Redesign</span>
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed">
              Drag the interactive slider below to see how NEXORA DIGITAL transforms ugly, slow legacy sites into high-converting 2026 digital platforms.
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
            className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-black/10 cursor-ew-resize bg-[#05070D]"
          >
            {/* ========================================================================= */}
            {/* AFTER SIDE: Ultra-Modern 2026 NEXORA Platform (Base Layer) */}
            {/* ========================================================================= */}
            <div className="absolute inset-0 bg-[#05070D] text-white flex flex-col justify-between p-6 sm:p-10 font-sans">
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <div className="ml-2 px-3 py-1 bg-white/10 rounded-lg text-green-400 font-mono text-[11px] flex items-center gap-1.5 border border-green-500/30">
                    <Lock size={11} /> https://nexorabyhms.netlify.app
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-green-500/20 text-green-400 rounded-full font-bold text-[10px] border border-green-500/30 flex items-center gap-1">
                    <Zap size={10} /> 99 PageSpeed
                  </span>
                  <span className="bg-[#0066FF] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    AFTER: NEXORA REDESIGN
                  </span>
                </div>
              </div>

              {/* Modern Hero Content Mockup */}
              <div className="my-auto max-w-xl space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#1F90FF] text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles size={12} />
                  <span>2026 Enterprise Web Architecture</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
                  Building Digital Success For <span className="text-[#1F90FF]">High-Growth Brands</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md">
                  Ultra-fast React 19 execution, responsive mobile layout, custom theme design, and built-in technical SEO schema.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="px-5 py-2.5 bg-[#0066FF] text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/30 flex items-center gap-2">
                    Get Free Quote →
                  </div>
                  <div className="px-4 py-2.5 bg-white/10 border border-white/20 text-xs font-semibold rounded-xl text-gray-200">
                    Explore Case Studies
                  </div>
                </div>
              </div>

              {/* Bottom Feature Pill Grid */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-center text-[11px] text-gray-300">
                <div className="bg-white/5 p-2 rounded-xl border border-white/10">⚡ &lt; 0.8s Load Time</div>
                <div className="bg-white/5 p-2 rounded-xl border border-white/10">📱 100% Responsive</div>
                <div className="bg-white/5 p-2 rounded-xl border border-white/10">🎯 3.5x Conversion</div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* BEFORE SIDE: Outdated 2012 Retro Legacy Website (Clipped Overlay) */}
            {/* ========================================================================= */}
            <div
              className="absolute inset-0 bg-[#D4D0C8] text-black flex flex-col justify-between p-4 sm:p-8 font-serif border-r-4 border-[#0066FF] shadow-2xl overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* Retro Browser Bar */}
              <div className="bg-[#C0C0C0] p-2 border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 mb-4 flex items-center justify-between font-sans text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-red-600 flex items-center gap-1 bg-red-100 px-2 py-0.5 border border-red-400">
                    <Unlock size={12} /> http://old-unsecure-site.com
                  </span>
                  <span className="text-[10px] text-red-700 font-bold hidden sm:inline-block">⚠️ NOT SECURE</span>
                </div>
                <div className="bg-red-600 text-white px-2 py-0.5 font-sans font-bold text-[10px] uppercase">
                  BEFORE: LEGACY 2012 SITE
                </div>
              </div>

              {/* Retro Cluttered Web Mockup */}
              <div className="my-auto space-y-3 bg-yellow-50 p-4 border-2 border-gray-500 shadow-inner">
                {/* Retro Banner Header */}
                <div className="bg-blue-900 text-yellow-300 p-3 text-center border-2 border-yellow-400 font-serif">
                  <div className="text-xl sm:text-2xl font-bold tracking-wider underline">*** WELCOME TO OUR WEBSITE ***</div>
                  <div className="text-[10px] text-white mt-1 font-sans">Best viewed in Internet Explorer 8.0 @ 1024x768 resolution</div>
                </div>

                {/* Retro Content Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  <div className="bg-white p-2 border border-gray-400">
                    <span className="bg-red-600 text-white font-bold text-[9px] px-1 animate-pulse">🔥 HOT OFFER 🔥</span>
                    <p className="mt-1 text-[11px] text-blue-900 font-bold underline">Click Here To Buy Product Now!!</p>
                    <p className="text-[10px] text-gray-600 mt-1">Slow loading times, no mobile layout, broken links.</p>
                  </div>
                  <div className="bg-white p-2 border border-gray-400 text-center flex flex-col justify-between">
                    <div className="text-[10px] text-red-600 font-bold">⚠️ Warning: Page takes 4.8 seconds to open</div>
                    <button className="bg-yellow-400 text-black border-2 border-black font-bold text-[10px] py-1 mt-1 shadow-md">
                      [ SUBMIT FORM ]
                    </button>
                  </div>
                </div>
              </div>

              {/* Retro Visitor Counter Footer */}
              <div className="bg-[#C0C0C0] p-2 border-2 border-gray-500 font-mono text-[10px] text-center text-black flex items-center justify-between">
                <span>Visitor Count: 004812</span>
                <span className="text-red-700 font-bold">❌ High 78% Visitor Bounce Rate</span>
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
                <h4 className="text-sm font-bold text-[#0B1020] mb-1">Modern UI/UX Design</h4>
                <p className="text-xs text-[#6B7280]">Replaces outdated retro layouts with sleek 2026 visual aesthetics.</p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E5EAF1] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1020] mb-1">&lt; 0.8s Load Speed</h4>
                <p className="text-xs text-[#6B7280]">Eliminating code bloat stops users from abandoning your site.</p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E5EAF1] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1020] mb-1">100% Mobile Ready</h4>
                <p className="text-xs text-[#6B7280]">Flawless user experience across all smartphones and tablets.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
