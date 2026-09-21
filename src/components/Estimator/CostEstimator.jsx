import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Check, ArrowRight, Globe, Code, ShoppingCart, Palette, Layers, Sparkles } from 'lucide-react'
import ScrollReveal from '../Motion/ScrollReveal'

const DOMAIN_CONFIGS = {
  business: {
    id: 'business',
    name: 'Business Website',
    icon: Globe,
    basePricePKR: 15000,
    basePriceUSD: 299,
    theme: {
      gradient: 'from-[#0066FF] via-[#1F90FF] to-blue-400',
      badgeBg: 'bg-blue-50 text-[#0066FF] border-blue-200',
      activeBtn: 'bg-blue-50/90 border-[#0066FF] text-[#0066FF] ring-1 ring-[#0066FF]',
      activeCheckbox: 'bg-[#0066FF] border-[#0066FF]',
      actionBtn: 'bg-[#0066FF] hover:bg-[#0052CC] shadow-blue-500/20',
      totalText: 'text-[#0066FF]',
    },
    scopeLabel: '2. Select Page & Content Scope',
    addonLabel: '3. Optional Business & Growth Add-ons',
    scopesPKR: [
      { id: 'b_std', name: '1 - 5 Corporate Pages', addOn: 0 },
      { id: 'b_med', name: '6 - 10 Custom Pages', addOn: 5000 },
      { id: 'b_lrg', name: '10+ Multi-Section Portal', addOn: 10000 },
    ],
    scopesUSD: [
      { id: 'b_std', name: '1 - 5 Corporate Pages', addOn: 0 },
      { id: 'b_med', name: '6 - 10 Custom Pages', addOn: 99 },
      { id: 'b_lrg', name: '10+ Multi-Section Portal', addOn: 199 },
    ],
    addonsPKR: [
      { id: 'seo', name: 'Advanced Technical SEO & Schema', price: 10000 },
      { id: 'contact', name: 'Interactive Lead Capture Funnel', price: 5000 },
      { id: 'hosting', name: 'Managed Cloud Hosting & Domain', price: 12000 },
    ],
    addonsUSD: [
      { id: 'seo', name: 'Advanced Technical SEO & Schema', price: 199 },
      { id: 'contact', name: 'Interactive Lead Capture Funnel', price: 79 },
      { id: 'hosting', name: 'Managed Cloud Hosting & Domain', price: 149 },
    ],
    defaultScope: 'b_std',
    defaultAddons: ['seo'],
  },

  wordpress: {
    id: 'wordpress',
    name: 'WordPress Website',
    icon: Code,
    basePricePKR: 20000,
    basePriceUSD: 399,
    theme: {
      gradient: 'from-indigo-600 via-indigo-500 to-blue-500',
      badgeBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      activeBtn: 'bg-indigo-50/90 border-indigo-600 text-indigo-600 ring-1 ring-indigo-600',
      activeCheckbox: 'bg-indigo-600 border-indigo-600',
      actionBtn: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20',
      totalText: 'text-indigo-600',
    },
    scopeLabel: '2. Select Architecture & CMS Scope',
    addonLabel: '3. Optional Theme & Plugin Extensions',
    scopesPKR: [
      { id: 'wp_std', name: '1 - 5 Pages & Blog Hub', addOn: 0 },
      { id: 'wp_med', name: '6 - 15 Custom Theme Pages', addOn: 6000 },
      { id: 'wp_lrg', name: '15+ Enterprise CMS Portal', addOn: 12000 },
    ],
    scopesUSD: [
      { id: 'wp_std', name: '1 - 5 Pages & Blog Hub', addOn: 0 },
      { id: 'wp_med', name: '6 - 15 Custom Theme Pages', addOn: 119 },
      { id: 'wp_lrg', name: '15+ Enterprise CMS Portal', addOn: 229 },
    ],
    addonsPKR: [
      { id: 'plugins', name: 'Custom Plugin & API Integration', price: 8000 },
      { id: 'security', name: 'Hardened Security & Speed Caching', price: 6000 },
      { id: 'training', name: '1-on-1 Admin Dashboard Training', price: 4000 },
    ],
    addonsUSD: [
      { id: 'plugins', name: 'Custom Plugin & API Integration', price: 129 },
      { id: 'security', name: 'Hardened Security & Speed Caching', price: 99 },
      { id: 'training', name: '1-on-1 Admin Dashboard Training', price: 69 },
    ],
    defaultScope: 'wp_std',
    defaultAddons: ['plugins'],
  },

  shopify: {
    id: 'shopify',
    name: 'Shopify E-Commerce Store',
    icon: ShoppingCart,
    basePricePKR: 35000,
    basePriceUSD: 599,
    theme: {
      gradient: 'from-purple-600 via-indigo-600 to-violet-500',
      badgeBg: 'bg-purple-50 text-purple-600 border-purple-200',
      activeBtn: 'bg-purple-50/90 border-purple-600 text-purple-600 ring-1 ring-purple-600',
      activeCheckbox: 'bg-purple-600 border-purple-600',
      actionBtn: 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20',
      totalText: 'text-purple-600',
    },
    scopeLabel: '2. Select Catalog & Product Scope',
    addonLabel: '3. Optional E-Commerce & Checkout Add-ons',
    scopesPKR: [
      { id: 'sh_std', name: 'Up to 25 Products Catalog', addOn: 0 },
      { id: 'sh_med', name: '26 - 100 Products & Collections', addOn: 8000 },
      { id: 'sh_lrg', name: '100+ Enterprise Multi-Category Store', addOn: 15000 },
    ],
    scopesUSD: [
      { id: 'sh_std', name: 'Up to 25 Products Catalog', addOn: 0 },
      { id: 'sh_med', name: '26 - 100 Products & Collections', addOn: 149 },
      { id: 'sh_lrg', name: '100+ Enterprise Multi-Category Store', addOn: 279 },
    ],
    addonsPKR: [
      { id: 'payment', name: 'Multi-Currency Payment Gateways', price: 8000 },
      { id: 'inventory', name: 'Automated Shipping & Inventory Sync', price: 7000 },
      { id: 'cro', name: 'CRO Checkout & Cart Abandonment', price: 6000 },
    ],
    addonsUSD: [
      { id: 'payment', name: 'Multi-Currency Payment Gateways', price: 149 },
      { id: 'inventory', name: 'Automated Shipping & Inventory Sync', price: 119 },
      { id: 'cro', name: 'CRO Checkout & Cart Abandonment', price: 99 },
    ],
    defaultScope: 'sh_std',
    defaultAddons: ['payment'],
  },

  graphic: {
    id: 'graphic',
    name: 'Graphic & Brand Design',
    icon: Palette,
    basePricePKR: 2000,
    basePriceUSD: 49,
    theme: {
      gradient: 'from-violet-600 via-purple-500 to-fuchsia-600',
      badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
      activeBtn: 'bg-violet-50/90 border-violet-600 text-violet-700 ring-1 ring-violet-600',
      activeCheckbox: 'bg-violet-600 border-violet-600',
      actionBtn: 'bg-violet-600 hover:bg-violet-700 shadow-violet-500/20',
      totalText: 'text-violet-600',
    },
    scopeLabel: '2. Select Design & Deliverables Scope',
    addonLabel: '3. Optional Source Files & Asset Add-ons',
    scopesPKR: [
      { id: 'gd_std', name: 'Single Logo / Asset Design (3 Concepts)', addOn: 0 },
      { id: 'gd_med', name: 'Brand Kit (Logo + Palette + Social Covers)', addOn: 3000 },
      { id: 'gd_lrg', name: 'Full Corporate Branding & Marketing Suite', addOn: 8000 },
    ],
    scopesUSD: [
      { id: 'gd_std', name: 'Single Logo / Asset Design (3 Concepts)', addOn: 0 },
      { id: 'gd_med', name: 'Brand Kit (Logo + Palette + Social Covers)', addOn: 49 },
      { id: 'gd_lrg', name: 'Full Corporate Branding & Marketing Suite', addOn: 129 },
    ],
    addonsPKR: [
      { id: 'source_files', name: 'Master Vector Source Files (AI/EPS/SVG)', price: 2000 },
      { id: 'social_pack', name: 'Executive Social Media Asset Templates', price: 3000 },
      { id: 'express', name: 'Priority 48-Hour Rush Delivery', price: 3000 },
    ],
    addonsUSD: [
      { id: 'source_files', name: 'Master Vector Source Files (AI/EPS/SVG)', price: 29 },
      { id: 'social_pack', name: 'Executive Social Media Asset Templates', price: 49 },
      { id: 'express', name: 'Priority 48-Hour Rush Delivery', price: 39 },
    ],
    defaultScope: 'gd_std',
    defaultAddons: ['source_files'],
  },

  app: {
    id: 'app',
    name: 'Custom Web Application',
    icon: Layers,
    basePricePKR: 45000,
    basePriceUSD: 999,
    theme: {
      gradient: 'from-emerald-600 via-teal-500 to-cyan-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      activeBtn: 'bg-emerald-50/90 border-emerald-600 text-emerald-700 ring-1 ring-emerald-600',
      activeCheckbox: 'bg-emerald-600 border-emerald-600',
      actionBtn: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20',
      totalText: 'text-emerald-600',
    },
    scopeLabel: '2. Select Functional Software Scope',
    addonLabel: '3. Optional Cloud & Architecture Add-ons',
    scopesPKR: [
      { id: 'app_std', name: 'Core MVP & User Portal Architecture', addOn: 0 },
      { id: 'app_med', name: 'Multi-Role Admin Dashboard & Database', addOn: 15000 },
      { id: 'app_lrg', name: 'Enterprise SaaS Platform & Permissions', addOn: 30000 },
    ],
    scopesUSD: [
      { id: 'app_std', name: 'Core MVP & User Portal Architecture', addOn: 0 },
      { id: 'app_med', name: 'Multi-Role Admin Dashboard & Database', addOn: 249 },
      { id: 'app_lrg', name: 'Enterprise SaaS Platform & Permissions', addOn: 499 },
    ],
    addonsPKR: [
      { id: 'api', name: 'Custom REST / GraphQL API & Webhooks', price: 12000 },
      { id: 'rbac', name: 'RBAC Security & Role Permissions', price: 10000 },
      { id: 'cloud', name: 'High-Availability Cloud Server Deployment', price: 15000 },
    ],
    addonsUSD: [
      { id: 'api', name: 'Custom REST / GraphQL API & Webhooks', price: 199 },
      { id: 'rbac', name: 'RBAC Security & Role Permissions', price: 169 },
      { id: 'cloud', name: 'High-Availability Cloud Server Deployment', price: 229 },
    ],
    defaultScope: 'app_std',
    defaultAddons: ['api'],
  },
}

export default function CostEstimator({ currency = 'PKR', setCurrency }) {
  const isUsd = currency === 'USD'
  const currencySymbol = isUsd ? '$' : 'Rs. '

  const [selectedServiceId, setSelectedServiceId] = useState('business')
  const domain = DOMAIN_CONFIGS[selectedServiceId] || DOMAIN_CONFIGS.business

  const scopesList = isUsd ? domain.scopesUSD : domain.scopesPKR
  const addonsList = isUsd ? domain.addonsUSD : domain.addonsPKR

  const [selectedScopeId, setSelectedScopeId] = useState(domain.defaultScope)
  const [selectedAddons, setSelectedAddons] = useState(domain.defaultAddons)

  const handleSelectService = (serviceId) => {
    setSelectedServiceId(serviceId)
    const newDomain = DOMAIN_CONFIGS[serviceId]
    if (newDomain) {
      setSelectedScopeId(newDomain.defaultScope)
      setSelectedAddons(newDomain.defaultAddons)
    }
  }

  const basePrice = isUsd ? domain.basePriceUSD : domain.basePricePKR
  const selectedScopeObj = scopesList.find((s) => s.id === selectedScopeId) || scopesList[0]
  const scopeAddon = selectedScopeObj ? selectedScopeObj.addOn : 0

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const found = addonsList.find((a) => a.id === addonId)
    return sum + (found ? found.price : 0)
  }, 0)

  const estimatedTotal = basePrice + scopeAddon + addonsTotal

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
      const detailsField = document.getElementById('details')
      if (detailsField) {
        const addonNames = selectedAddons
          .map((id) => addonsList.find((a) => a.id === id)?.name)
          .filter(Boolean)
          .join(', ')

        detailsField.value = `Estimated Project Scope (${isUsd ? 'Global USD' : 'Domestic PKR'}): ${domain.name} [${selectedScopeObj.name}]. Add-ons: ${
          addonNames || 'None'
        }. Estimated Starting Investment: ${currencySymbol}${estimatedTotal.toLocaleString()}`
        detailsField.dispatchEvent(new Event('input', { bubbles: true }))
      }

      const serviceSelect = document.getElementById('service')
      if (serviceSelect) {
        const matched = Array.from(serviceSelect.options).find((opt) =>
          domain.name.toLowerCase().includes(opt.value.toLowerCase()) ||
          opt.value.toLowerCase().includes(domain.name.toLowerCase())
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

  const IconComponent = domain.icon

  return (
    <ScrollReveal variant="fadeUp" className="mt-16 mb-8 max-w-4xl mx-auto">
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5EAF1] shadow-soft relative overflow-hidden transition-all duration-300">
        {/* Dynamic Theme Gradient Accent Line */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${domain.theme.gradient} transition-all duration-500`} />

        {/* Title & Currency Switcher Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider mb-2 transition-all duration-300 ${domain.theme.badgeBg}`}>
              <IconComponent size={13} />
              <span>{domain.name} Scope Estimator</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0B1020]">Project Scope &amp; Budget Calculator</h3>
            <p className="text-sm text-[#4B5563]">Select your tailored solution scope to estimate project investment in real-time.</p>
          </div>

          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5EAF1] text-right flex sm:flex-col justify-between items-baseline sm:items-end">
            <span className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">Estimated Investment</span>
            <div className={`text-2xl font-black transition-colors duration-300 ${domain.theme.totalText}`}>
              {currencySymbol}{estimatedTotal.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Options Grid */}
        <div className="flex flex-col gap-6 mb-8">
          {/* 1. Solution Type Selector Buttons */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-3">
              1. Select Solution Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {Object.values(DOMAIN_CONFIGS).map((item) => {
                const ItemIcon = item.icon
                const isSelected = selectedServiceId === item.id
                const baseVal = isUsd ? item.basePriceUSD : item.basePricePKR
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectService(item.id)}
                    className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? item.theme.activeBtn
                        : 'bg-white border-[#E5EAF1] text-[#4B5563] hover:border-gray-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <ItemIcon size={14} className={isSelected ? 'text-current' : 'text-slate-400'} />
                        <span className="font-bold text-[#0B1020] leading-snug truncate">{item.name}</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-[#6B7280]">
                      From {currencySymbol}{baseVal.toLocaleString()}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Dynamic Scope Selector & Addons Grid */}
          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            {/* 2. Scope Options (Tailored per domain) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-3">
                {domain.scopeLabel}
              </label>
              <div className="flex flex-col gap-2">
                {scopesList.map((opt) => {
                  const isSelected = selectedScopeId === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedScopeId(opt.id)}
                      className={`p-3.5 rounded-xl flex items-center justify-between border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? domain.theme.activeBtn
                          : 'bg-white border-[#E5EAF1] text-[#4B5563] hover:border-gray-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-bold text-[#0B1020] pr-2 text-left">{opt.name}</span>
                      <span className="text-[10px] text-[#6B7280] whitespace-nowrap">
                        {opt.addOn === 0 ? 'Base Scope Included' : `+ ${currencySymbol}${opt.addOn.toLocaleString()}`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3. Add-on Services (Tailored per domain) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-3">
                {domain.addonLabel}
              </label>
              <div className="flex flex-col gap-2">
                {addonsList.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id)
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl flex items-center justify-between border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? domain.theme.activeBtn
                          : 'bg-white border-[#E5EAF1] text-[#4B5563] hover:border-gray-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 pr-2 text-left">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected ? `${domain.theme.activeCheckbox} text-white` : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check size={10} />}
                        </div>
                        <span className="font-semibold text-[#0B1020]">{addon.name}</span>
                      </div>
                      <span className="text-[10px] text-[#6B7280] whitespace-nowrap">+{currencySymbol}{addon.price.toLocaleString()}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-5 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B7280]">
            Selected domain: <strong className="text-[#0B1020]">{domain.name}</strong> • Final quotation provided after detailed scope review.
          </p>
          <button
            type="button"
            onClick={handleApplyToQuote}
            className={`w-full sm:w-auto py-3.5 px-6 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${domain.theme.actionBtn}`}
          >
            <span>Apply {domain.name} Estimate to Quote Form</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </ScrollReveal>
  )
}
