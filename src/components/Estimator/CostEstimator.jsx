import { useState, useId } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Check, ArrowRight, Sparkles } from 'lucide-react'
import ScrollReveal from '../Motion/ScrollReveal'

const SERVICE_OPTIONS = [
  { id: 'business', name: 'Business Website', basePrice: 15000 },
  { id: 'wordpress', name: 'WordPress Website', basePrice: 20000 },
  { id: 'shopify', name: 'Shopify E-Commerce Store', basePrice: 35000 },
  { id: 'app', name: 'Custom Web Application', basePrice: 45000 },
]

const PAGE_OPTIONS = [
  { id: '5', name: '1 - 5 Pages', addOn: 0 },
  { id: '10', name: '6 - 10 Pages', addOn: 5000 },
  { id: '15', name: '10+ Custom Pages', addOn: 10000 },
]

const ADDONS_OPTIONS = [
  { id: 'seo', name: 'Advanced SEO & Meta Setup', price: 10000 },
  { id: 'payment', name: 'Payment Gateway Integration', price: 8000 },
  { id: 'hosting', name: 'Managed Hosting & Domain Setup', price: 12000 },
]

export default function CostEstimator() {
  const [selectedService, setSelectedService] = useState(SERVICE_OPTIONS[0])
  const [selectedPages, setSelectedPages] = useState(PAGE_OPTIONS[0])
  const [selectedAddons, setSelectedAddons] = useState(['seo'])

  const basePrice = selectedService.basePrice + selectedPages.addOn
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const found = ADDONS_OPTIONS.find((a) => a.id === addonId)
    return sum + (found ? found.price : 0)
  }, 0)

  const estimatedTotal = basePrice + addonsTotal

  const toggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    )
  }

  const handleApplyToQuote = () => {
    const el = document.getElementById('contact')
    if (el) {
      // Pre-fill details textarea
      const detailsField = document.getElementById('details')
      if (detailsField) {
        const addonNames = selectedAddons
          .map((id) => ADDONS_OPTIONS.find((a) => a.id === id)?.name)
          .filter(Boolean)
          .join(', ')

        detailsField.value = `Estimated Project Scope: ${selectedService.name} (${selectedPages.name}). Add-ons: ${
          addonNames || 'None'
        }. Estimated Starting Investment: Rs. ${estimatedTotal.toLocaleString()}`
        detailsField.dispatchEvent(new Event('input', { bubbles: true }))
      }

      // Pre-fill service select
      const serviceSelect = document.getElementById('service')
      if (serviceSelect) {
        const matched = Array.from(serviceSelect.options).find((opt) =>
          selectedService.name.toLowerCase().includes(opt.value.toLowerCase()) ||
          opt.value.toLowerCase().includes(selectedService.name.toLowerCase())
        )
        if (matched) {
          serviceSelect.value = matched.value
          serviceSelect.dispatchEvent(new Event('change', { bubbles: true }))
        }
      }

      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <ScrollReveal variant="fadeUp" className="mt-16 mb-8 max-w-4xl mx-auto">
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5EAF1] shadow-soft relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0066FF] via-[#1F90FF] to-blue-400" />

        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-semibold uppercase tracking-wider mb-2">
              <Calculator size={13} />
              Interactive Estimator
            </div>
            <h3 className="text-2xl font-bold text-[#0B1020]">Project Investment Estimator</h3>
            <p className="text-sm text-[#4B5563]">Select your scope to estimate your project budget in real-time.</p>
          </div>
          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5EAF1] text-right flex sm:flex-col justify-between items-baseline sm:items-end">
            <span className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">Estimated Total</span>
            <div className="text-2xl font-black text-[#0066FF]">
              Rs. {estimatedTotal.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {/* 1. Website Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-3">
              1. Select Solution Type
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {SERVICE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedService(opt)}
                  className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                    selectedService.id === opt.id
                      ? 'bg-blue-50 border-[#0066FF] text-[#0066FF] ring-1 ring-[#0066FF]'
                      : 'bg-white border-[#E5EAF1] text-[#4B5563] hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-[#0B1020]">{opt.name}</div>
                  <div className="text-[10px] text-[#6B7280]">From Rs. {opt.basePrice.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Number of Pages */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-3">
              2. Select Page Scope
            </label>
            <div className="flex flex-col gap-2">
              {PAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedPages(opt)}
                  className={`p-3 rounded-xl flex items-center justify-between border text-xs font-semibold transition-all cursor-pointer ${
                    selectedPages.id === opt.id
                      ? 'bg-blue-50 border-[#0066FF] text-[#0066FF] ring-1 ring-[#0066FF]'
                      : 'bg-white border-[#E5EAF1] text-[#4B5563] hover:border-gray-300'
                  }`}
                >
                  <span className="font-bold text-[#0B1020]">{opt.name}</span>
                  <span className="text-[10px] text-[#6B7280]">
                    {opt.addOn === 0 ? 'Included' : `+ Rs. ${opt.addOn.toLocaleString()}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Add-on Services */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-3">
              3. Optional Growth Add-ons
            </label>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {ADDONS_OPTIONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id)
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-xl flex items-center justify-between border text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-[#0066FF] text-[#0066FF] ring-1 ring-[#0066FF]'
                        : 'bg-white border-[#E5EAF1] text-[#4B5563] hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'border-slate-300'}`}>
                        {isSelected && <Check size={10} />}
                      </div>
                      <span className="font-semibold text-[#0B1020]">{addon.name}</span>
                    </div>
                    <span className="text-[10px] text-[#6B7280] ml-2">+Rs. {addon.price.toLocaleString()}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B7280]">
            Estimated prices are subject to project requirements review.
          </p>
          <button
            type="button"
            onClick={handleApplyToQuote}
            className="w-full sm:w-auto py-3 px-6 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <span>Apply Estimate to Quote Form</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </ScrollReveal>
  )
}
