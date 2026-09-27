import { useState } from 'react'
import ScrollReveal from '../Motion/ScrollReveal'
import { TrendingUp, DollarSign, Calculator, ArrowRight, ShieldCheck, Sparkles, HelpCircle, CheckCircle } from 'lucide-react'

export default function RoiCalculator({ currency: externalCurrency, setCurrency: externalSetCurrency }) {
  const [internalCurrency, setInternalCurrency] = useState('PKR')
  
  const activeCurrency = externalCurrency || internalCurrency
  const isUsd = activeCurrency === 'USD'
  const currencySymbol = isUsd ? '$' : 'Rs. '

  const handleCurrencyToggle = (c) => {
    setInternalCurrency(c)
    if (externalSetCurrency) externalSetCurrency(c)
  }

  // State sliders
  const [monthlyVisitors, setMonthlyVisitors] = useState(2500)
  const [avgSaleValue, setAvgSaleValue] = useState(isUsd ? 250 : 25000)

  // Calculations
  const currentBaselineRate = 0.01 // 1.0% conversion rate on typical old site
  const upgradedRate = 0.025       // Realistic 2.5% conversion rate on optimized site

  const currentSales = Math.round(monthlyVisitors * currentBaselineRate)
  const newSales = Math.round(monthlyVisitors * upgradedRate)
  const extraMonthlySales = newSales - currentSales
  
  const extraMonthlyRevenue = extraMonthlySales * avgSaleValue
  const annualRevenueGain = extraMonthlyRevenue * 12

  return (
    <section className="py-20 lg:py-28 bg-[#05070D] text-white relative overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0066FF]/15 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#1F90FF] text-xs font-bold uppercase tracking-wider mb-4">
              <TrendingUp size={14} />
              <span>Real-Time Business Growth Calculator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
              Estimate Your Website <span className="text-gradient-blue">Revenue Impact</span>
            </h2>
            <p className="text-sm sm:text-base text-[#A7ADBB] leading-relaxed max-w-2xl mx-auto">
              <strong>Asaan Lafzo Me:</strong> Jab aapki website fast, modern aur mobile-friendly hoti hai, tu aapke zyaada visitors customer me convert hotay hain. Niche real-time slider se calculate karein.
            </p>
          </ScrollReveal>
        </div>

        {/* Calculator Main Card */}
        <ScrollReveal variant="fadeUp" className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Header Bar with Currency Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calculator size={18} className="text-[#1F90FF]" />
                Real-Time ROI Estimator
              </h3>
              <p className="text-xs text-gray-400">Adjust the sliders below to see your realistic monthly sales increase.</p>
            </div>

            {/* Currency Selector Toggle Buttons */}
            <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl border border-white/10 self-start sm:self-auto">
              <span className="text-[10px] text-gray-400 font-bold px-2 uppercase">Currency:</span>
              <button
                type="button"
                onClick={() => handleCurrencyToggle('PKR')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !isUsd
                    ? 'bg-[#0066FF] text-white shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                PKR (Rs.)
              </button>
              <button
                type="button"
                onClick={() => handleCurrencyToggle('USD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isUsd
                    ? 'bg-[#0066FF] text-white shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>

          {/* Calculator Controls & Output Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left Column: Real-Time Inputs */}
            <div className="space-y-6">
              
              {/* Slider 1: Monthly Visitors */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1">
                    1. Monthly Website Visitors
                  </label>
                  <span className="text-xs font-extrabold text-[#1F90FF] bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                    {monthlyVisitors.toLocaleString()} Visitors
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
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
                  <span>500</span>
                  <span>10,000</span>
                  <span>20,000+</span>
                </div>
              </div>

              {/* Slider 2: Average Order / Service Value */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    2. Average Order / Service Price
                  </label>
                  <span className="text-xs font-extrabold text-green-400 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                    {currencySymbol}{avgSaleValue.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={isUsd ? 25 : 2500}
                  max={isUsd ? 2000 : 200000}
                  step={isUsd ? 25 : 2500}
                  value={avgSaleValue}
                  onChange={(e) => setAvgSaleValue(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
                  <span>{currencySymbol}{isUsd ? '25' : '2,500'}</span>
                  <span>{currencySymbol}{isUsd ? '1,000' : '100,000'}</span>
                  <span>{currencySymbol}{isUsd ? '2,000+' : '200,000+'}</span>
                </div>
              </div>

              {/* Transparent Conversion Rate Formula Note */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-xs text-gray-300">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#1F90FF]" />
                  How Real-Time Calculation Works:
                </div>
                <ul className="space-y-1 text-[11px] text-gray-300">
                  <li>• <strong>Old/Unoptimized Site:</strong> Baseline ~1.0% conversion ({currentSales} sales/leads).</li>
                  <li>• <strong>NEXORA Redesigned Site:</strong> Realistic ~2.5% conversion ({newSales} sales/leads).</li>
                  <li className="text-green-400 font-semibold pt-0.5">• Additional Monthly Deliveries: +{extraMonthlySales} Sales / Inquiries.</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Real-Time Results Output Box */}
            <div className="bg-gradient-to-br from-[#0066FF]/25 to-blue-950/40 border border-[#0066FF]/40 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-[#0066FF]/30 px-2.5 py-1 rounded-full border border-[#0066FF]/40">
                  Real-Time Projection Results
                </span>

                {/* Big Gain Output */}
                <div className="mt-5 mb-6">
                  <span className="text-xs text-gray-300 block">Est. Additional Monthly Revenue</span>
                  <div className="text-3xl sm:text-4xl font-black text-green-400 mt-1">
                    +{currencySymbol}{extraMonthlyRevenue.toLocaleString()} <span className="text-xs text-gray-300 font-normal">/ month</span>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Extra Monthly Orders:</span>
                    <strong className="text-white">+{extraMonthlySales} Deals / mo</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Estimated Annual Impact (12 Months):</span>
                    <strong className="text-green-400">+{currencySymbol}{annualRevenueGain.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Why Conversion Increases:</span>
                    <strong className="text-blue-300">&lt;0.8s Load Speed + Mobile UX</strong>
                  </div>
                </div>
              </div>

              {/* Action Link */}
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
                <span>Request Custom Project Estimate</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Simple Explanation Details at Bottom */}
          <div className="mt-8 pt-6 border-t border-white/10 grid sm:grid-cols-3 gap-4 text-xs text-gray-300">
            <div className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">No Fake Numbers</strong>
                <span className="text-[11px] text-gray-400">Calculated on standard 1% vs 2.5% web conversion benchmarks.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle size={16} className="text-[#1F90FF] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Real-Time Currency Toggle</strong>
                <span className="text-[11px] text-gray-400">Switch instantly between PKR (Rs.) for local and USD ($) for global.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle size={16} className="text-blue-300 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Fast Payback Time</strong>
                <span className="text-[11px] text-gray-400">Increased conversion rates help your website investment pay for itself quickly.</span>
              </div>
            </div>
          </div>

        </ScrollReveal>

      </div>
    </section>
  )
}
