import { useState } from 'react'
import ScrollReveal from '../Motion/ScrollReveal'
import { TrendingUp, DollarSign, Calculator, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'

export default function RoiCalculator() {
  const [monthlyVisitors, setMonthlyVisitors] = useState(2500)
  const [averageSaleValue, setAverageSaleValue] = useState(150)

  // Current baseline conversion assumption: 1%
  // NEXORA optimized conversion assumption: 3.5%
  const currentLeadsOrSales = Math.round((monthlyVisitors * 0.01))
  const newLeadsOrSales = Math.round((monthlyVisitors * 0.035))
  const additionalConversions = newLeadsOrSales - currentLeadsOrSales
  const projectedRevenueGain = additionalConversions * averageSaleValue

  return (
    <section className="py-20 lg:py-28 bg-[#05070D] text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0066FF]/15 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#1F90FF] text-xs font-bold uppercase tracking-wider mb-4">
              <TrendingUp size={14} />
              <span>Investment Return Calculator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
              Calculate Your Web <span className="text-gradient-blue">ROI Growth</span>
            </h2>
            <p className="text-base text-[#A7ADBB] leading-relaxed">
              See how upgrading to a fast, mobile-optimized, and high-converting NEXORA website directly impacts your monthly revenue.
            </p>
          </ScrollReveal>
        </div>

        {/* Calculator Grid */}
        <ScrollReveal variant="fadeUp" className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Controls */}
            <div className="space-y-6">
              {/* Slider 1: Monthly Visitors */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    Estimated Monthly Visitors
                  </label>
                  <span className="text-sm font-extrabold text-[#1F90FF] bg-white/10 px-3 py-1 rounded-lg">
                    {monthlyVisitors.toLocaleString()} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="500"
                  value={monthlyVisitors}
                  onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>500</span>
                  <span>10,000</span>
                  <span>20,000+</span>
                </div>
              </div>

              {/* Slider 2: Average Sale / Deal Value ($ / USD equivalent) */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    Average Deal / Product Value
                  </label>
                  <span className="text-sm font-extrabold text-green-400 bg-white/10 px-3 py-1 rounded-lg">
                    ${averageSaleValue}
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="1000"
                  step="25"
                  value={averageSaleValue}
                  onChange={(e) => setAverageSaleValue(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>$25</span>
                  <span>$500</span>
                  <span>$1,000+</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-gray-400 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-300 font-semibold">
                  <Sparkles size={14} />
                  <span>NEXORA Conversion Rate Baseline: ~3.5%</span>
                </div>
                <p>Standard legacy websites average 1.0% conversion. NEXORA's modern architecture boosts lead generation by ~250%.</p>
              </div>
            </div>

            {/* Projected Results Card */}
            <div className="bg-gradient-to-br from-[#0066FF]/20 to-blue-900/30 border border-[#0066FF]/40 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">Projected Performance Impact</span>
                
                <div className="mt-4 mb-6">
                  <span className="text-xs text-gray-300 block">Est. Additional Monthly Revenue</span>
                  <div className="text-3xl sm:text-4xl font-black text-green-400 mt-1">
                    +${projectedRevenueGain.toLocaleString()} <span className="text-xs text-gray-300 font-normal">/ month</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-gray-400 block">Extra Monthly Sales</span>
                    <span className="text-lg font-bold text-white">+{additionalConversions} Deals</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Est. Payback Time</span>
                    <span className="text-lg font-bold text-blue-300">&lt; 30 Days</span>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('contact')
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 80
                    window.scrollTo({ top, behavior: 'smooth' })
                  }
                }}
                className="mt-6 w-full py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Unlock Your Revenue Potential</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
