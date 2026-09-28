import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, TrendingUp, X } from 'lucide-react'

const CURRENCY_SYMBOLS = {
  USD: '$',
  PKR: 'Rs. ',
  EUR: '€',
  GBP: '£',
  AED: 'AED '
}

export default function RoiCalculatorModal({ isOpen, onClose }) {
  const [currency, setCurrency] = useState('USD')
  const [monthlyVisitors, setMonthlyVisitors] = useState(5000)
  const [currentConversionRate, setCurrentConversionRate] = useState(1.5)
  const [averageDealValue, setAverageDealValue] = useState(250)
  const [targetUpliftRate, setTargetUpliftRate] = useState(1.5)

  const symbol = CURRENCY_SYMBOLS[currency] || '$'

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

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white border border-[#E5EAF1] rounded-3xl shadow-2xl text-[#0B1020] z-10 overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-black p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="text-center max-w-xl mx-auto mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator size={14} />
              <span>Dedicated ROI Growth Estimator</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0B1020]">
              Calculate Your Website's Revenue Growth Potential
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
              Adjust the manual inputs below to calculate your projected monthly &amp; annual revenue gains.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Currency:</span>
            {Object.keys(CURRENCY_SYMBOLS).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => setCurrency(curr)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currency === curr
                    ? 'bg-[#0066FF] text-white shadow-md'
                    : 'bg-gray-100 border border-[#E5EAF1] text-gray-600 hover:bg-gray-200'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* Manual Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 bg-[#F8FAFC] p-5 rounded-2xl border border-[#E5EAF1]">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-[#0B1020]">Monthly Visitors</label>
                <span className="text-xs font-bold text-[#0066FF] font-mono">{formatNumber(monthlyVisitors)}</span>
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
            </div>

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
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1020] mb-1">Average Deal / Order Value ({symbol})</label>
              <input
                type="number"
                value={averageDealValue}
                onChange={(e) => setAverageDealValue(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-white border border-[#E5EAF1] rounded-xl text-xs font-bold text-[#0B1020]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-[#0B1020]">Target Speed Uplift (+%)</label>
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
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-[#05070D] text-white rounded-2xl p-5 border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Current Revenue</span>
                <strong className="text-base font-bold text-white font-mono">{symbol}{formatNumber(currentMonthlyRevenue)}</strong>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <span className="text-[10px] text-blue-300 uppercase font-bold block">New Monthly Target</span>
                <strong className="text-base font-bold text-blue-400 font-mono">{symbol}{formatNumber(newMonthlyRevenue)}</strong>
              </div>
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30">
                <span className="text-[10px] text-green-300 uppercase font-bold block">Extra Gain / Month</span>
                <strong className="text-lg font-black text-green-400 font-mono">+{symbol}{formatNumber(extraMonthlyRevenue)}</strong>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  )
}
