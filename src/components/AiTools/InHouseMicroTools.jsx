import { useState } from 'react'
import { Sparkles, Copy, Check, Terminal, Search, Globe, Flame, RefreshCw } from 'lucide-react'

export default function InHouseMicroTools() {
  const [activeTab, setActiveTab] = useState('prompt') // 'prompt' | 'seo' | 'naming'
  const [copiedId, setCopiedId] = useState(null)

  // Tab 1: Prompt Enhancer State
  const [promptTopic, setPromptTopic] = useState('')
  const [promptType, setPromptType] = useState('hook') // 'hook' | 'sales' | 'image' | 'seo'
  const [enhancedResult, setEnhancedResult] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Tab 2: SEO Studio State
  const [seoTopic, setSeoTopic] = useState('')
  const [seoAudience, setSeoAudience] = useState('')
  const [seoResult, setSeoResult] = useState(null)

  // Tab 3: Brand Name State
  const [brandIndustry, setBrandIndustry] = useState('')
  const [brandNames, setBrandNames] = useState(null)

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Generate Enhanced Prompt
  const handleGeneratePrompt = (e) => {
    e.preventDefault()
    if (!promptTopic.trim()) return

    setIsGenerating(true)
    setTimeout(() => {
      const topic = promptTopic.trim()
      let generated = {}

      if (promptType === 'hook') {
        generated = {
          title: `Viral Social Media Hooks for "${topic}"`,
          output: [
            `1. 90% of people get ${topic} wrong. Here is the exact framework the top 1% use: [Thread 🧵]`,
            `2. Stop wasting hours on ${topic}. This simple 3-step system saves 10+ hours every week:`,
            `3. If you want to master ${topic} in 2026, here is the harsh truth no one will tell you:`,
            `4. The single biggest mistake you are making with ${topic} (and how to fix it in 60 seconds):`,
          ].join('\n\n'),
          bestFor: 'Twitter/X, LinkedIn, Instagram Reels, TikTok caption hooks',
        }
      } else if (promptType === 'sales') {
        generated = {
          title: `High-Converting Direct Response Sales Prompt for "${topic}"`,
          output: `Act as a world-class conversion copywriter. Write a high-converting landing page value proposition and 3-part benefit stack for "${topic}".\n\nTarget Persona: Discerning clients who value speed, truthful execution, and clear ROI.\nTone: Authoritative, modern, punchy, zero fluff.\nFormat: \n- Hero Headline (under 10 words)\n- Sub-headline (explaining the mechanism)\n- 3 Key Value Drivers with quantifiable impact metrics\n- Primary Call to Action button label.`,
          bestFor: 'ChatGPT / Claude for drafting landing pages & sales emails',
        }
      } else if (promptType === 'image') {
        generated = {
          title: `Cinematic Midjourney / Flux Prompt for "${topic}"`,
          output: `Cinematic editorial photograph representing ${topic}, ultra-clean modern studio lighting, premium glassmorphism accents, soft depth of field, 8k resolution, shot on 35mm Hasselblad lens, octane render aesthetic, minimal luxury composition, color palette of deep navy #05070D and glowing electric blue #0066FF --ar 16:9 --v 6.1 --style raw`,
          bestFor: 'Midjourney v6.1, Flux.1, Leonardo.ai',
        }
      } else if (promptType === 'seo') {
        generated = {
          title: `SEO Cluster & Comprehensive Pillar Article Prompt for "${topic}"`,
          output: `Act as a senior technical SEO content strategist. Create a comprehensive topic cluster architecture and 2,500-word article outline for "${topic}".\n\nRequirements:\n1. Search Intent classification (Informational / Commercial)\n2. Primary & Secondary semantic LSI keywords\n3. H1, H2, and H3 outline incorporating Answer-The-Public question formats\n4. Internal linking strategy to related subtopics\n5. Schema.org FAQ questions for Rich Snippet indexing.`,
          bestFor: 'Google Top-10 Organic Rankings & Pillar Content Strategy',
        }
      }

      setEnhancedResult(generated)
      setIsGenerating(false)
    }, 700)
  }

  // Generate SEO Meta
  const handleGenerateSeo = (e) => {
    e.preventDefault()
    if (!seoTopic.trim()) return

    const topic = seoTopic.trim()
    const audience = seoAudience.trim() || 'Modern Businesses'

    setSeoResult({
      title: `${topic} — Verified Solutions & Expert Architecture | Nexora`,
      description: `Discover premier ${topic} tailored for ${audience}. Engineered with 99+ PageSpeed performance, truthful pricing, and enterprise security. Explore case studies.`,
      keywords: [
        `${topic.toLowerCase()}`,
        `${topic.toLowerCase()} agency`,
        `best ${topic.toLowerCase()} 2026`,
        `enterprise ${topic.toLowerCase()}`,
        `high speed ${topic.toLowerCase()}`,
      ],
      canonical: `https://nexoradigital.com/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    })
  }

  // Generate Brand Names
  const handleGenerateBrand = (e) => {
    e.preventDefault()
    if (!brandIndustry.trim()) return

    const ind = brandIndustry.trim()
    const prefixes = ['Nex', 'Velo', 'Aura', 'Synap', 'Pulse', 'Hyper', 'Strat', 'Omni']
    const suffixes = ['ix', 'ora', 'flow', 'scale', 'craft', 'wave', 'core', 'lab']

    const names = [
      { name: `${prefixes[0]}${suffixes[1]}`, vibe: 'Modern & Futuristic', tld: '.digital / .com' },
      { name: `${prefixes[1]}${suffixes[2]}`, vibe: 'Speed & Agility', tld: '.io / .dev' },
      { name: `${prefixes[3]}${suffixes[7]}`, vibe: 'Intelligence & Research', tld: '.ai / .co' },
      { name: `${prefixes[4]}${suffixes[3]}`, vibe: 'High Growth & Momentum', tld: '.tech' },
      { name: `${prefixes[6]}${suffixes[4]}`, vibe: 'Enterprise & Strategy', tld: '.solutions' },
      { name: `${prefixes[7]}${suffixes[5]}`, vibe: 'Global Scale & Fluidity', tld: '.global' },
    ]

    setBrandNames(names)
  }

  return (
    <div className="bg-white dark:bg-[#0B1020] border border-[#E5EAF1] dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden transition-colors duration-300">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-[#0066FF]/20 border border-blue-200 dark:border-[#0066FF]/40 text-[#0066FF] dark:text-[#38BDF8] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles size={13} className="animate-pulse" />
            Proprietary In-House AI Utilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1020] dark:text-white">
            Use Free Nexora AI Tools Right Here
          </h2>
          <p className="text-sm text-[#4B5563] dark:text-gray-400 mt-1">
            Zero sign-up required. Instant browser utilities engineered for content, SEO, and brand discovery.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-gray-100 dark:bg-white/5 border border-[#E5EAF1] dark:border-white/10 rounded-xl p-1 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('prompt')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'prompt'
                ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20'
                : 'text-[#4B5563] dark:text-gray-400 hover:text-[#0B1020] dark:hover:text-white'
            }`}
          >
            <Sparkles size={14} />
            Prompt Enhancer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'seo'
                ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20'
                : 'text-[#4B5563] dark:text-gray-400 hover:text-[#0B1020] dark:hover:text-white'
            }`}
          >
            <Search size={14} />
            SEO Meta Studio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('naming')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'naming'
                ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20'
                : 'text-[#4B5563] dark:text-gray-400 hover:text-[#0B1020] dark:hover:text-white'
            }`}
          >
            <Globe size={14} />
            Brand Namer
          </button>
        </div>
      </div>

      {/* TAB 1: PROMPT ENHANCER */}
      {activeTab === 'prompt' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form onSubmit={handleGeneratePrompt} className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B1020] dark:text-gray-300 uppercase tracking-wider mb-2">
                What is your topic or raw idea?
              </label>
              <textarea
                value={promptTopic}
                onChange={(e) => setPromptTopic(e.target.value)}
                placeholder="e.g. Modern web design for legal firm, or e-commerce sneaker brand launch..."
                rows={4}
                className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-white/5 border border-[#E5EAF1] dark:border-white/10 rounded-xl text-[#0B1020] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1020] dark:text-gray-300 uppercase tracking-wider mb-2">
                Select Enhancement Engine
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'hook', label: 'Viral Social Hooks', icon: Flame },
                  { id: 'sales', label: 'Sales Copy Prompt', icon: Terminal },
                  { id: 'image', label: 'Midjourney Art Prompt', icon: Sparkles },
                  { id: 'seo', label: 'SEO Authority Outline', icon: Search },
                ].map((item) => {
                  const Icon = item.icon
                  const isSelected = promptType === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPromptType(item.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-[#0066FF]/20 border-[#0066FF] text-[#0066FF] dark:text-white font-semibold'
                          : 'bg-[#F8FAFC] dark:bg-white/5 border-[#E5EAF1] dark:border-white/10 text-[#4B5563] dark:text-gray-400 hover:text-[#0B1020] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                      }`}
                    >
                      <Icon size={14} className="text-[#0066FF] dark:text-[#38BDF8]" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !promptTopic.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#0066FF] hover:bg-[#0052CC] disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={15} className="animate-spin" />
                  <span>Synthesizing Optimal Prompt...</span>
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  <span>Generate Enhanced Prompt</span>
                </>
              )}
            </button>
          </form>

          {/* Prompt Output Display */}
          <div className="lg:col-span-7 bg-[#F8FAFC] dark:bg-black/40 border border-[#E5EAF1] dark:border-white/10 rounded-2xl p-5 flex flex-col justify-between min-h-[300px]">
            {enhancedResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5EAF1] dark:border-white/10 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#0B1020] dark:text-white">{enhancedResult.title}</h3>
                    <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">Optimized for: {enhancedResult.bestFor}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(enhancedResult.output, 'prompt-res')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 text-[#0B1020] dark:text-white text-xs font-semibold border border-[#E5EAF1] dark:border-white/10 transition-all cursor-pointer"
                  >
                    {copiedId === 'prompt-res' ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                    <span>{copiedId === 'prompt-res' ? 'Copied!' : 'Copy Prompt'}</span>
                  </button>
                </div>

                <div className="bg-white dark:bg-[#0B1020] rounded-xl p-4 border border-[#E5EAF1] dark:border-white/10 overflow-x-auto">
                  <pre className="text-xs text-[#0B1020] dark:text-gray-200 font-mono whitespace-pre-wrap leading-relaxed">
                    {enhancedResult.output}
                  </pre>
                </div>

                <div className="text-[11px] text-[#6B7280] dark:text-gray-400 flex items-center justify-between pt-2">
                  <span>💡 Tip: Paste directly into ChatGPT, Claude, or Midjourney.</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Client-Side Free</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12 text-[#6B7280] dark:text-gray-500">
                <Terminal size={36} className="mb-3 text-[#0066FF] opacity-60" />
                <p className="text-sm font-bold text-[#0B1020] dark:text-gray-300">Ready to build your next breakthrough prompt</p>
                <p className="text-xs text-[#6B7280] dark:text-gray-500 mt-1 max-w-sm">
                  Enter your topic on the left and choose an enhancement engine to receive production-ready output.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SEO META STUDIO */}
      {activeTab === 'seo' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form onSubmit={handleGenerateSeo} className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B1020] dark:text-gray-300 uppercase tracking-wider mb-2">
                Target Page Topic / Core Keyword
              </label>
              <input
                type="text"
                value={seoTopic}
                onChange={(e) => setSeoTopic(e.target.value)}
                placeholder="e.g. Custom Shopify Web Development"
                className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-white/5 border border-[#E5EAF1] dark:border-white/10 rounded-xl text-[#0B1020] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:border-[#0066FF] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1020] dark:text-gray-300 uppercase tracking-wider mb-2">
                Target Audience / Business Sector
              </label>
              <input
                type="text"
                value={seoAudience}
                onChange={(e) => setSeoAudience(e.target.value)}
                placeholder="e.g. High-Growth E-Commerce Brands"
                className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-white/5 border border-[#E5EAF1] dark:border-white/10 rounded-xl text-[#0B1020] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:border-[#0066FF] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!seoTopic.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              <Search size={15} />
              <span>Generate Google SEO Snippets</span>
            </button>
          </form>

          {/* SEO Preview Display */}
          <div className="lg:col-span-7 bg-[#F8FAFC] dark:bg-black/40 border border-[#E5EAF1] dark:border-white/10 rounded-2xl p-5 flex flex-col justify-between min-h-[300px]">
            {seoResult ? (
              <div className="space-y-4">
                <div className="border-b border-[#E5EAF1] dark:border-white/10 pb-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6B7280] dark:text-gray-400 uppercase tracking-wider">
                    Google SERP Preview
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(`${seoResult.title}\n\n${seoResult.description}`, 'seo-all')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 text-[#0B1020] dark:text-white text-xs font-semibold border border-[#E5EAF1] dark:border-white/10 transition-all cursor-pointer"
                  >
                    {copiedId === 'seo-all' ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                    <span>{copiedId === 'seo-all' ? 'Copied All' : 'Copy Meta Tags'}</span>
                  </button>
                </div>

                {/* Google search card mockup */}
                <div className="bg-white dark:bg-[#0B1020] rounded-xl p-4 text-[#1a0dab] dark:text-[#8ab4f8] space-y-1 shadow-inner border border-[#E5EAF1] dark:border-white/10">
                  <div className="text-xs text-[#202124] dark:text-slate-300 flex items-center gap-1.5 mb-1">
                    <Globe size={12} className="text-gray-500" />
                    <span className="text-gray-600 dark:text-slate-400 font-mono">https://nexoradigital.com &rsaquo; services</span>
                  </div>
                  <h4 className="text-base font-medium hover:underline cursor-pointer leading-snug">
                    {seoResult.title}
                  </h4>
                  <p className="text-xs text-[#4d5156] dark:text-slate-300 leading-relaxed">
                    {seoResult.description}
                  </p>
                </div>

                {/* Keywords breakdown */}
                <div>
                  <span className="block text-xs font-semibold text-[#0B1020] dark:text-gray-300 mb-2">
                    Recommended High-Intent Keywords:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {seoResult.keywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-white dark:bg-white/10 border border-[#E5EAF1] dark:border-transparent text-gray-700 dark:text-gray-200 text-xs font-mono shadow-2xs">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12 text-[#6B7280] dark:text-gray-500">
                <Search size={36} className="mb-3 text-[#0066FF] opacity-60" />
                <p className="text-sm font-bold text-[#0B1020] dark:text-gray-300">SERP &amp; Meta Snippet Simulator</p>
                <p className="text-xs text-[#6B7280] dark:text-gray-500 mt-1 max-w-sm">
                  Generate SEO tags tailored for Google crawler algorithms and click-through optimization.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: BRAND NAMER */}
      {activeTab === 'naming' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form onSubmit={handleGenerateBrand} className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B1020] dark:text-gray-300 uppercase tracking-wider mb-2">
                Core Industry / Theme
              </label>
              <input
                type="text"
                value={brandIndustry}
                onChange={(e) => setBrandIndustry(e.target.value)}
                placeholder="e.g. Cloud, Logistics, Fashion, Finance..."
                className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-white/5 border border-[#E5EAF1] dark:border-white/10 rounded-xl text-[#0B1020] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:border-[#0066FF] transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!brandIndustry.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              <Globe size={15} />
              <span>Generate Brand &amp; Domain Ideas</span>
            </button>
          </form>

          {/* Brand Cards Display */}
          <div className="lg:col-span-7 bg-[#F8FAFC] dark:bg-black/40 border border-[#E5EAF1] dark:border-white/10 rounded-2xl p-5 min-h-[300px]">
            {brandNames ? (
              <div className="space-y-4">
                <div className="border-b border-[#E5EAF1] dark:border-white/10 pb-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6B7280] dark:text-gray-400 uppercase tracking-wider">
                    Generated Brand Identities
                  </span>
                  <span className="text-xs text-[#0066FF] dark:text-[#38BDF8] font-bold">6 Available Archetypes</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {brandNames.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-white/5 border border-[#E5EAF1] dark:border-white/10 rounded-xl p-3.5 flex items-center justify-between hover:border-[#0066FF]/50 transition-all shadow-2xs"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-[#0B1020] dark:text-white tracking-wide">{item.name}</h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{item.vibe}</p>
                        <span className="text-[10px] text-[#0066FF] dark:text-blue-400 font-mono mt-1 block">{item.tld}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.name, `brand-${idx}`)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-[#0B1020] dark:text-white transition-all cursor-pointer"
                        title="Copy brand name"
                      >
                        {copiedId === `brand-${idx}` ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12 text-[#6B7280] dark:text-gray-500">
                <Globe size={36} className="mb-3 text-[#0066FF] opacity-60" />
                <p className="text-sm font-bold text-[#0B1020] dark:text-gray-300">Brand Identity &amp; Naming Lab</p>
                <p className="text-xs text-[#6B7280] dark:text-gray-500 mt-1 max-w-sm">
                  Generate punchy, phonetically memorable domain names for software, e-commerce, and agencies.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
