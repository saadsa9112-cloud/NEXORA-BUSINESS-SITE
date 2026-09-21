import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Check, ArrowRight, Globe, Code, ShoppingCart, Palette, Layers } from 'lucide-react'
import ScrollReveal from '../Motion/ScrollReveal'

const CORPORATE_BLUE_THEME = {
  gradient: 'from-[#0066FF] via-[#1F90FF] to-blue-400',
  badgeBg: 'bg-blue-50 text-[#0066FF] border-blue-200',
  activeBtn: 'bg-blue-50/90 border-[#0066FF] text-[#0066FF] ring-1 ring-[#0066FF]',
  activeCheckbox: 'bg-[#0066FF] border-[#0066FF]',
  actionBtn: 'bg-[#0066FF] hover:bg-[#0052CC] shadow-blue-500/20',
  totalText: 'text-[#0066FF]',
}

const DOMAIN_CONFIGS = {
  business: {
    id: 'business',
    name: 'Business Website',
    estimatorTitle: 'BUSINESS WEBSITE ESTIMATOR',
    subtitle: 'Choose the features and website size you need to get an estimated project price.',
    icon: Globe,
    basePricePKR: 15000,
    basePriceUSD: 299,
    theme: CORPORATE_BLUE_THEME,
    scopeLabel: '2. SELECT WEBSITE SIZE & CONTENT',
    addonLabel: '3. OPTIONAL FEATURES & UPGRADES',
    scopesPKR: [
      { id: 'b_std', name: '1–5 Business Pages', addOn: 0 },
      { id: 'b_med', name: '6–10 Custom Pages', addOn: 5000 },
      { id: 'b_lrg', name: '10+ Pages & Advanced Website Features', addOn: 10000 },
    ],
    scopesUSD: [
      { id: 'b_std', name: '1–5 Business Pages', addOn: 0 },
      { id: 'b_med', name: '6–10 Custom Pages', addOn: 99 },
      { id: 'b_lrg', name: '10+ Pages & Advanced Website Features', addOn: 199 },
    ],
    addonsPKR: [
      { id: 'seo', name: 'Advanced SEO & Google Setup', price: 10000 },
      { id: 'contact', name: 'Interactive Lead Form', price: 5000 },
      { id: 'hosting', name: 'Managed Hosting & Domain', price: 12000 },
    ],
    addonsUSD: [
      { id: 'seo', name: 'Advanced SEO & Google Setup', price: 199 },
      { id: 'contact', name: 'Interactive Lead Form', price: 79 },
      { id: 'hosting', name: 'Managed Hosting & Domain', price: 149 },
    ],
    defaultScope: 'b_std',
    defaultAddons: ['seo'],
  },

  wordpress: {
    id: 'wordpress',
    name: 'WordPress Website',
    estimatorTitle: 'WORDPRESS WEBSITE ESTIMATOR',
    subtitle: 'Choose the features and website size you need to get an estimated project price.',
    icon: Code,
    basePricePKR: 20000,
    basePriceUSD: 399,
    theme: CORPORATE_BLUE_THEME,
    scopeLabel: '2. SELECT WEBSITE SIZE & CONTENT',
    addonLabel: '3. OPTIONAL FEATURES & UPGRADES',
    scopesPKR: [
      { id: 'wp_std', name: '1–5 Pages + Blog', addOn: 0 },
      { id: 'wp_med', name: '6–15 Custom Pages', addOn: 6000 },
      { id: 'wp_lrg', name: '15+ Pages & Advanced Website Management', addOn: 12000 },
    ],
    scopesUSD: [
      { id: 'wp_std', name: '1–5 Pages + Blog', addOn: 0 },
      { id: 'wp_med', name: '6–15 Custom Pages', addOn: 119 },
      { id: 'wp_lrg', name: '15+ Pages & Advanced Website Management', addOn: 229 },
    ],
    addonsPKR: [
      { id: 'plugins', name: 'Custom Features & Integrations', price: 8000 },
      { id: 'security', name: 'Advanced Security & Speed Optimization', price: 6000 },
      { id: 'training', name: 'Personal Website Management Training', price: 4000 },
    ],
    addonsUSD: [
      { id: 'plugins', name: 'Custom Features & Integrations', price: 129 },
      { id: 'security', name: 'Advanced Security & Speed Optimization', price: 99 },
      { id: 'training', name: 'Personal Website Management Training', price: 69 },
    ],
    defaultScope: 'wp_std',
    defaultAddons: ['plugins'],
  },

  shopify: {
    id: 'shopify',
    name: 'Shopify E-Commerce Store',
    estimatorTitle: 'SHOPIFY E-COMMERCE STORE ESTIMATOR',
    subtitle: 'Choose the store size and features you need to get an estimated project price.',
    icon: ShoppingCart,
    basePricePKR: 35000,
    basePriceUSD: 599,
    theme: CORPORATE_BLUE_THEME,
    scopeLabel: '2. SELECT STORE SIZE',
    addonLabel: '3. OPTIONAL STORE FEATURES',
    scopesPKR: [
      { id: 'sh_std', name: 'Up to 25 Products', addOn: 0 },
      { id: 'sh_med', name: '26–100 Products & Collections', addOn: 8000 },
      { id: 'sh_lrg', name: '100+ Products & Large Store Setup', addOn: 15000 },
    ],
    scopesUSD: [
      { id: 'sh_std', name: 'Up to 25 Products', addOn: 0 },
      { id: 'sh_med', name: '26–100 Products & Collections', addOn: 149 },
      { id: 'sh_lrg', name: '100+ Products & Large Store Setup', addOn: 279 },
    ],
    addonsPKR: [
      { id: 'payment', name: 'Multiple Currencies & Payment Options', price: 8000 },
      { id: 'inventory', name: 'Shipping & Inventory Automation', price: 7000 },
      { id: 'cro', name: 'Checkout Optimization & Abandoned Cart Recovery', price: 6000 },
    ],
    addonsUSD: [
      { id: 'payment', name: 'Multiple Currencies & Payment Options', price: 149 },
      { id: 'inventory', name: 'Shipping & Inventory Automation', price: 119 },
      { id: 'cro', name: 'Checkout Optimization & Abandoned Cart Recovery', price: 99 },
    ],
    defaultScope: 'sh_std',
    defaultAddons: ['payment'],
  },

  graphic: {
    id: 'graphic',
    name: 'Graphic & Brand Design',
    estimatorTitle: 'GRAPHIC & BRAND DESIGN ESTIMATOR',
    subtitle: 'Choose the design options and deliverables you need to get an estimated project price.',
    icon: Palette,
    basePricePKR: 2000,
    basePriceUSD: 49,
    theme: CORPORATE_BLUE_THEME,
    scopeLabel: '2. SELECT DESIGN DELIVERABLES',
    addonLabel: '3. OPTIONAL ASSET EXTENSIONS',
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
    estimatorTitle: 'CUSTOM WEB APPLICATION ESTIMATOR',
    subtitle: 'Choose the features and functionality your web application needs to get an estimated project price.',
    icon: Layers,
    basePricePKR: 45000,
    basePriceUSD: 999,
    theme: CORPORATE_BLUE_THEME,
    scopeLabel: '2. SELECT APPLICATION FEATURES',
    addonLabel: '3. OPTIONAL FEATURES & ADVANCED OPTIONS',
    scopesPKR: [
      { id: 'app_std', name: 'Core Features + User Account', addOn: 0 },
      { id: 'app_med', name: 'Advanced Admin Dashboard', addOn: 15000 },
      { id: 'app_lrg', name: 'Advanced Multi-User Platform', addOn: 30000 },
    ],
    scopesUSD: [
      { id: 'app_std', name: 'Core Features + User Account', addOn: 0 },
      { id: 'app_med', name: 'Advanced Admin Dashboard', addOn: 249 },
      { id: 'app_lrg', name: 'Advanced Multi-User Platform', addOn: 499 },
    ],
    addonsPKR: [
      { id: 'api', name: 'Custom API & Third-Party Integrations', price: 12000 },
      { id: 'rbac', name: 'Multiple User Roles & Access Control', price: 10000 },
      { id: 'cloud', name: 'Advanced Cloud Hosting & Deployment', price: 15000 },
    ],
    addonsUSD: [
      { id: 'api', name: 'Custom API & Third-Party Integrations', price: 199 },
      { id: 'rbac', name: 'Multiple User Roles & Access Control', price: 169 },
      { id: 'cloud', name: 'Advanced Cloud Hosting & Deployment', price: 229 },
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
        {/* Unified Corporate Blue Theme Accent Line */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${CORPORATE_BLUE_THEME.gradient}`} />

        {/* Title & Currency Switcher Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider mb-2 transition-all duration-300 ${CORPORATE_BLUE_THEME.badgeBg}`}>
              <IconComponent size={13} />
              <span>{domain.estimatorTitle}</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0B1020]">Project Scope &amp; Budget Calculator</h3>
            <p className="text-sm text-[#4B5563]">{domain.subtitle}</p>
          </div>

          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5EAF1] text-right flex sm:flex-col justify-between items-baseline sm:items-end">
            <span className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">Estimated Investment</span>
            <div className={`text-2xl font-black transition-colors duration-300 ${CORPORATE_BLUE_THEME.totalText}`}>
              {currencySymbol}{estimatedTotal.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Options Grid */}
        <div className="flex flex-col gap-6 mb-8">
          {/* 1. Solution Type Selector Buttons */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-3">
              1. SELECT WEBSITE TYPE
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
                        ? CORPORATE_BLUE_THEME.activeBtn
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
                          ? CORPORATE_BLUE_THEME.activeBtn
                          : 'bg-white border-[#E5EAF1] text-[#4B5563] hover:border-gray-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-bold text-[#0B1020] pr-2 text-left">{opt.name}</span>
                      <span className="text-[10px] text-[#6B7280] whitespace-nowrap">
                        {opt.addOn === 0 ? 'Included in Base Price' : `+ ${currencySymbol}${opt.addOn.toLocaleString()}`}
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
                          ? CORPORATE_BLUE_THEME.activeBtn
                          : 'bg-white border-[#E5EAF1] text-[#4B5563] hover:border-gray-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 pr-2 text-left">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected ? `${CORPORATE_BLUE_THEME.activeCheckbox} text-white` : 'border-slate-300 bg-white'
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
            Selected service: <strong className="text-[#0B1020]">{domain.name}</strong> • Final quotation will be confirmed after reviewing your requirements.
          </p>
          <button
            type="button"
            onClick={handleApplyToQuote}
            className={`w-full sm:w-auto py-3.5 px-6 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${CORPORATE_BLUE_THEME.actionBtn}`}
          >
            <span>Continue with This Estimate</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </ScrollReveal>
  )
}
