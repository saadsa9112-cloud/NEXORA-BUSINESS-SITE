import { useState, useMemo, useEffect } from 'react'
import {
  Search,
  Sparkles,
  ExternalLink,
  Star,
  Filter,
  ArrowRight,
  ChevronDown,
  Layers,
  HelpCircle,
  PenTool,
  Palette,
  Code2,
  Video,
  Mic,
  Zap,
} from 'lucide-react'
import { AI_TOOLS, AI_CATEGORIES, AI_FAQS } from '../data/aiToolsData'
import InHouseMicroTools from '../components/AiTools/InHouseMicroTools'
import WebsiteAuditWidget from '../components/WebsiteAudit/WebsiteAuditWidget'
import RoiCalculator from '../components/RoiCalculator/RoiCalculator'

const CATEGORY_ICONS = {
  Sparkles,
  PenTool,
  Palette,
  Code2,
  Video,
  Mic,
  Zap,
}

export default function AiToolsPage({ onOpenContact }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPricing, setSelectedPricing] = useState('all') // 'all' | 'Free' | 'Freemium' | 'Paid'
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  // Inject Google Schema Markup (JSON-LD) for SEO and Rich Snippets
  useEffect(() => {
    const scriptId = 'ai-tools-schema-jsonld'
    let script = document.getElementById(scriptId)
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Best AI Tools Directory 2026 by Nexora Digital',
      description: 'Comprehensive curated directory of verified artificial intelligence tools for writing, coding, video, design, and productivity.',
      numberOfItems: AI_TOOLS.length,
      itemListElement: AI_TOOLS.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: tool.name,
          url: tool.url,
          applicationCategory: tool.category,
          operatingSystem: 'All Web Browsers',
          offers: {
            '@type': 'Offer',
            price: tool.pricing === 'Free' ? '0' : 'Paid',
            priceCurrency: 'USD',
          },
        },
      })),
    }

    script.text = JSON.stringify(schemaData)

    // Update document title for SEO
    const prevTitle = document.title
    document.title = 'Best AI Tools Directory (2026) | Verified Tools & Free Utilities — Nexora Digital'

    return () => {
      document.title = prevTitle
      const el = document.getElementById(scriptId)
      if (el) el.remove()
    }
  }, [])

  // Filter tools based on search, category, and pricing
  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory

      const matchesPricing =
        selectedPricing === 'all' || tool.pricing.toLowerCase() === selectedPricing.toLowerCase()

      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.tagline.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.features.some((f) => f.toLowerCase().includes(q))

      return matchesCategory && matchesPricing && matchesSearch
    })
  }, [selectedCategory, selectedPricing, searchQuery])

  return (
    <div className="pt-24 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* ─── HERO HEADER ─────────────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#0066FF] dark:text-[#38BDF8] text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} className="text-[#0066FF] dark:text-[#38BDF8]" />
          Verified AI Directory &amp; Browser Suite
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#0B1020] dark:text-white tracking-tight leading-tight">
          Curated <span className="text-[#0066FF] dark:text-[#38BDF8]">AI Tools</span> &amp; Free Utilities
        </h1>

        <p className="text-base sm:text-lg text-[#4B5563] dark:text-slate-300 leading-relaxed">
          Explore 35+ verified AI platforms evaluated for business performance, truthfulness, and ROI.
          Use our in-house generators below with zero sign-up required.
        </p>

        {/* Global Search Bar */}
        <div className="relative max-w-xl mx-auto pt-2">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools by name, features (e.g. 'coding', 'avatar', 'vector')..."
            className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-[#0B1020] border border-[#E5EAF1] dark:border-white/10 rounded-2xl text-sm text-[#0B1020] dark:text-white placeholder-gray-400 dark:placeholder-slate-500 shadow-sm focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-white font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ─── IN-HOUSE LIVE UTILITIES (High Retention & SEO Value) ─────────── */}
      <InHouseMicroTools />

      {/* ─── LIVE TECHNICAL SEO & GOOGLE PAGESPEED AUDIT ENGINE ─────────── */}
      <div className="rounded-3xl overflow-hidden border border-[#E5EAF1] dark:border-white/10 shadow-xl">
        <WebsiteAuditWidget />
      </div>

      {/* ─── INTERACTIVE CONVERSION & REVENUE ROI CALCULATOR ─────────────── */}
      <div className="rounded-3xl overflow-hidden border border-[#E5EAF1] dark:border-white/10 shadow-xl">
        <RoiCalculator />
      </div>

      {/* ─── ADVERTISING / SPONSORED BANNER COMPLIANT SLOT ───────────────── */}
      <div className="rounded-2xl border border-dashed border-[#E5EAF1] dark:border-blue-500/30 bg-blue-50/50 dark:bg-[#0B1020] p-4 text-center transition-colors">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF] dark:text-[#38BDF8] block mb-1">
          Advertisement &bull; Partner Network
        </span>
        <div className="py-2 text-xs text-gray-600 dark:text-slate-300 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>Looking to build custom AI workflows for your company?</span>
          <a
            href="#contact"
            onClick={onOpenContact}
            className="text-[#0066FF] dark:text-[#38BDF8] font-bold hover:underline inline-flex items-center gap-1"
          >
            Consult with Nexora AI Engineers &rarr;
          </a>
        </div>
      </div>

      {/* ─── DIRECTORY FILTER CONTROLS ───────────────────────────────────── */}
      <div className="space-y-6">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {AI_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.icon] || Sparkles
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-[#0B1020] border border-[#E5EAF1] dark:border-white/10 text-gray-600 dark:text-slate-300 hover:text-[#0B1020] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Pricing Sub-filters & Results Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF1] dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-slate-400">
            <Filter size={14} />
            <span>Pricing Filter:</span>
            {['all', 'Free', 'Freemium', 'Paid'].map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setSelectedPricing(tier)}
                className={`px-3 py-1 rounded-lg text-xs capitalize transition-all cursor-pointer ${
                  selectedPricing === tier
                    ? 'bg-[#0066FF] text-white font-bold shadow-xs'
                    : 'bg-white dark:bg-[#0B1020] border border-[#E5EAF1] dark:border-white/10 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-500 dark:text-slate-400 font-medium">
            Showing <strong className="text-[#0B1020] dark:text-white">{filteredTools.length}</strong> verified tools
          </div>
        </div>
      </div>

      {/* ─── TOOLS GRID ─────────────────────────────────────────────────── */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#0B1020] rounded-3xl border border-[#E5EAF1] dark:border-white/10">
          <Layers size={40} className="mx-auto text-gray-300 dark:text-slate-600 mb-3" />
          <h3 className="text-lg font-bold text-[#0B1020] dark:text-white">No AI tools match your criteria</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or selecting &quot;All Tools&quot; to discover more verified platforms.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all')
              setSelectedPricing('all')
              setSearchQuery('')
            }}
            className="mt-4 px-4 py-2 bg-[#0066FF] text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const isFreemium = tool.pricing === 'Freemium'
            const isFree = tool.pricing === 'Free'

            return (
              <div
                key={tool.id}
                className="bg-white dark:bg-[#0B1020] border border-[#E5EAF1] dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#0066FF]/60 dark:hover:border-blue-500/60 hover:shadow-xl transition-all duration-300 group shadow-xs"
              >
                <div className="space-y-4">
                  {/* Top Bar: Name, Badge, Pricing */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-[#0B1020] dark:text-white group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-colors">
                          {tool.name}
                        </h3>
                        {tool.badge && (
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/15 text-[#0066FF] dark:text-[#38BDF8] text-[10px] font-bold border border-blue-100 dark:border-blue-500/30">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-500 font-semibold">
                        <Star size={12} fill="currentColor" />
                        <span>{tool.rating} / 5.0</span>
                      </div>
                    </div>

                    {/* Pricing Pill */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 ${
                        isFree
                          ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'
                          : isFreemium
                          ? 'bg-blue-50 dark:bg-blue-500/15 text-[#0066FF] dark:text-[#38BDF8] border border-blue-200 dark:border-blue-500/30'
                          : 'bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30'
                      }`}
                    >
                      {tool.pricing}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs font-semibold text-gray-800 dark:text-slate-200 line-clamp-2">
                    {tool.tagline}
                  </p>

                  {/* Detailed Description for SEO Value */}
                  <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>

                  {/* Features List */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tool.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-gray-50 dark:bg-[#131B2E] border border-gray-100 dark:border-white/10 text-[10px] text-gray-600 dark:text-slate-300 font-medium"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-6 mt-4 border-t border-[#E5EAF1] dark:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-gray-500 dark:text-slate-400">
                    {tool.pricingDetail}
                  </span>

                  {/* Outbound Link adhering to strict SEO best practices */}
                  <a
                    href={tool.url}
                    target="_blank"
                    rel={`noopener noreferrer nofollow${tool.isSponsored ? ' sponsored' : ''}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#131B2E] hover:bg-[#0066FF] dark:hover:bg-[#0066FF] text-gray-700 dark:text-slate-200 hover:text-white dark:hover:text-white text-xs font-semibold transition-all border border-transparent dark:border-white/10 cursor-pointer shadow-2xs"
                  >
                    <span>Visit Site</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ─── FREQUENTLY ASKED QUESTIONS (SEO Rich FAQ Snippets) ───────────── */}
      <div className="bg-white dark:bg-[#0B1020] rounded-3xl border border-[#E5EAF1] dark:border-white/10 p-6 sm:p-10 space-y-6 shadow-xs transition-colors">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] dark:text-[#38BDF8] uppercase tracking-wider">
            <HelpCircle size={14} />
            Search &amp; Knowledge Base
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1020] dark:text-white">
            Frequently Asked Questions About AI Tools
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            Answers to common questions regarding enterprise AI selection, pricing models, and integrations.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[#E5EAF1] dark:divide-white/10">
          {AI_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-sm sm:text-base font-bold text-[#0B1020] dark:text-white hover:text-[#0066FF] dark:hover:text-[#38BDF8] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform text-gray-400 ${
                      isOpen ? 'rotate-180 text-[#0066FF] dark:text-[#38BDF8]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── AGENCY CALL TO ACTION ───────────────────────────────────────── */}
      <div className="rounded-3xl bg-[#05070D] border border-white/10 p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#0066FF]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="px-3.5 py-1 bg-white/10 rounded-full text-xs font-semibold text-[#3B82F6] uppercase tracking-wider">
            Custom AI Engineering
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Need a Proprietary AI Solution for Your Enterprise?
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            From custom RAG chatbots to fine-tuned customer support agents and automated image pipelines,
            Nexora Digital builds production-grade AI systems tailored to your revenue goals.
          </p>
          <div className="pt-2">
            <a
              href="#contact"
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Build Custom AI with Us</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
