import { useState } from 'react'
import ScrollReveal from '../Motion/ScrollReveal'
import { Calculator, TrendingUp, DollarSign, ArrowRight, Zap, RefreshCw } from 'lucide-react'

const CURRENCY_SYMBOLS = {
  USD: '$',
  PKR: 'Rs. ',
  EUR: '€',
  GBP: '£',
  AED: 'AED '
}

export default function RoiCalculator() {
  const [currency, setCurrency] = useState('USD')
  const [monthlyVisitors, setMonthlyVisitors] = useState(5000)
  const [currentConversionRate, setCurrentConversionRate] = useState(1.5)
  const [averageDealValue, setAverageDealValue] = useState(250)
  const [targetUpliftRate, setTargetUpliftRate] = useState(1.5)

  const symbol = CURRENCY_SYMBOLS[currency] || '$'

  // Calculations driven 100% by manual user inputs
  const currentSalesPerMonth = Math.round(monthlyVisitors * (currentConversionRate / 100))
  const currentMonthlyRevenue = currentSalesPerMonth * averageDealValue

  const newConversionRate = parseFloat((currentConversionRate + targetUpliftRate).toFixed(2))
  const newSalesPerMonth = Math.round(monthlyVisitors * (newConversionRate / 100))
  const newMonthlyRevenue = newSalesPerMonth * averageDealValue

  const extraMonthlyRevenue = newMonthlyRevenue - currentMonthlyRevenue
  const extraAnnualRevenue = extraMonthlyRevenue * 12

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num)
  }

  return (
    <section className="py-16 bg-white border-y border-[#E5EAF1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal variant="fadeUp" className="max-w-4xl mx-auto bg-[#F8FAFC] border border-[#E5EAF1] rounded-3xl p-6 sm:p-10 shadow-xl">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-3">
              <Calculator size={14} />
              <span>Simple ROI &amp; Revenue Growth Estimator</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0B1020]">
              Calculate Your Website's Revenue Growth Potential
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-2">
              Adjust the manual inputs below to calculate your exact projected monthly &amp; annual revenue gains with NEXORA high-speed architecture.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Currency:</span>
            {Object.keys(CURRENCY_SYMBOLS).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => setCurrency(curr)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currency === curr
                    ? 'bg-[#0066FF] text-white shadow-md'
                    : 'bg-white border border-[#E5EAF1] text-gray-600 hover:bg-gray-50'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* Manual Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-6 rounded-2xl border border-[#E5EAF1]">
            
            {/* 1. Monthly Website Visitors */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-[#0B1020]">Monthly Website Visitors</label>
                <span className="text-xs font-bold text-[#0066FF] font-mono">{formatNumber(monthlyVisitors)} visitors</span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={monthlyVisitors}
                onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                className="w-full accent-[#0066FF] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>500</span>
                <span>25,000</span>
                <span>50,000+</span>
              </div>
            </div>

            {/* 2. Current Conversion Rate % */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-[#0B1020]">Current Conversion Rate (%)</label>
                <span className="text-xs font-bold text-[#0066FF] font-mono">{currentConversionRate}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="5.0"
                step="0.1"
                value={currentConversionRate}
                onChange={(e) => setCurrentConversionRate(parseFloat(e.target.value))}
                className="w-full accent-[#0066FF] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>0.2%</span>
                <span>2.5%</span>
                <span>5.0%</span>
              </div>
            </div>

            {/* 3. Average Order / Deal Value */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-[#0B1020]">Average Deal / Order Value ({symbol})</label>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">{symbol}</span>
                <input
                  type="number"
                  value={averageDealValue}
                  onChange={(e) => setAverageDealValue(Number(e.target.value) || 0)}
                  className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-[#E5EAF1] rounded-xl text-xs font-bold text-[#0B1020] focus:outline-none focus:border-[#0066FF]"
                />
              </div>
            </div>

            {/* 4. NEXORA Speed Uplift Target % */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-[#0B1020]">NEXORA Speed &amp; UI Uplift (+%)</label>
                <span className="text-xs font-bold text-green-600 font-mono">+{targetUpliftRate}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.5"
                value={targetUpliftRate}
                onChange={(e) => setTargetUpliftRate(parseFloat(e.target.value))}
                className="w-full accent-green-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>+0.5% (Conservative)</span>
                <span>+2.0%</span>
                <span>+4.0% (Aggressive)</span>
              </div>
            </div>

          </div>

          {/* Real-time Calculation Results Card */}
          <div className="bg-[#05070D] text-white rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-gray-400 font-medium block">Current Monthly Sales</span>
                <strong className="text-lg font-bold text-white font-mono">{symbol}{formatNumber(currentMonthlyRevenue)}</strong>
                <span className="text-[10px] text-gray-400 block mt-0.5">({currentSalesPerMonth} orders/mo)</span>
              </div>

              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <span className="text-[11px] text-blue-300 font-medium block">New Monthly Target</span>
                <strong className="text-lg font-bold text-blue-400 font-mono">{symbol}{formatNumber(newMonthlyRevenue)}</strong>
                <span className="text-[10px] text-blue-300 block mt-0.5">({newSalesPerMonth} orders/mo)</span>
              </div>

              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30">
                <span className="text-[11px] text-green-300 font-medium block">Extra Revenue / Month</span>
                <strong className="text-xl font-black text-green-400 font-mono">+{symbol}{formatNumber(extraMonthlyRevenue)}</strong>
                <span className="text-[10px] text-green-300 block mt-0.5">+{symbol}{formatNumber(extraAnnualRevenue)} / Year</span>
              </div>

            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-gray-300 flex items-center gap-1.5">
                <TrendingUp size={14} className="text-green-400" />
                <span>Calculated dynamically from manual input parameters</span>
              </span>
              <a
                href="#contact"
                className="py-2.5 px-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-all hover:scale-102"
              >
                <span>Claim Your Revenue Uplift →</span>
              </a>
            </div>
          </div>

        </ScrollReveal>
      </div>
    </section>
  )
}
