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
      } else {
        generated = {
          title: `Comprehensive SEO Topical Authority Outline for "${topic}"`,
          output: `You are an elite SEO strategist. Build a comprehensive, search-intent aligned content outline targeting the primary keyword "${topic}".\n\nRequirements:\n1. Search Intent: Informational + Commercial Investigation\n2. H1: High-CTR headline containing the primary keyword\n3. H2s: 6 structured sub-topics including "Why most solutions fail", "Step-by-step implementation guide", and "ROI measurement"\n4. FAQs: 4 People Also Ask questions with concise direct answers\n5. Internal linking suggestions for related digital services.`,
          bestFor: 'Ranking in Google Search & Perplexity cited snippets',
        }
      }

      setEnhancedResult(generated)
      setIsGenerating(false)
    }, 400)
  }

  // Generate SEO Meta
  const handleGenerateSeo = (e) => {
    e.preventDefault()
    if (!seoTopic.trim()) return

    const topic = seoTopic.trim()
    const audience = seoAudience.trim() || 'Modern Businesses'

    setSeoResult({
      title: `${topic} | High-Performance Solutions by Nexora Digital`,
      titleCount: `${topic.length + 43} chars (Ideal: 50-60)`,
      description: `Discover premier ${topic} engineered for ${audience}. Accelerate conversion, elevate brand authority, and scale with verifiable digital results. Explore now.`,
      descriptionCount: '154 chars (Ideal: 150-160)',
      keywords: [
        `${topic.toLowerCase()}`,
        `best ${topic.toLowerCase()} 2026`,
        `${topic.toLowerCase()} for ${audience.toLowerCase()}`,
        `professional ${topic.toLowerCase()} services`,
        `${topic.toLowerCase()} agency`,
      ],
      ogTitle: `${topic} — Scaled for Enterprise Results`,
    })
  }

  // Generate Brand Names
  const handleGenerateBrand = (e) => {
    e.preventDefault()
    if (!brandIndustry.trim()) return

    const base = brandIndustry.trim().toLowerCase()
    const cap = base.charAt(0).toUpperCase() + base.slice(1, 4)

    const names = [
      { name: `Nex${cap}`, vibe: 'Tech & Innovative', tld: '.com / .ai' },
      { name: `${cap}pulse`, vibe: 'Dynamic & Fast', tld: '.io / .digital' },
      { name: `Velo${cap}`, vibe: 'Modern & Global', tld: '.co / .tech' },
      { name: `${cap}craft`, vibe: 'Artisan & Premium', tld: '.studio / .com' },
      { name: `Omni${cap}`, vibe: 'Enterprise Scale', tld: '.ai / .cloud' },
      { name: `Hyper${cap}`, vibe: 'High Velocity', tld: '.app / .dev' },
    ]

    setBrandNames(names)
  }

  return (
    <div className="bg-[#0B1020] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#3B82F6] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles size={13} className="animate-pulse" />
            Proprietary In-House AI Utilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Use Free Nexora AI Tools Right Here
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Zero sign-up required. Instant browser utilities engineered for content, SEO, and brand discovery.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('prompt')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'prompt'
                ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles size={14} />
            Prompt Enhancer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'seo'
                ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Search size={14} />
            SEO Meta Studio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('naming')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'naming'
                ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20'
                : 'text-gray-400 hover:text-white'
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
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                What is your topic or raw idea?
              </label>
              <textarea
                value={promptTopic}
                onChange={(e) => setPromptTopic(e.target.value)}
                placeholder="e.g. Modern web design for legal firm, or e-commerce sneaker brand launch..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
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
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPromptType(item.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                        promptType === item.id
                          ? 'bg-[#0066FF]/20 border-[#0066FF] text-white'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon size={14} className="text-[#3B82F6]" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !promptTopic.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#0066FF] hover:bg-[#0052CC] disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/25"
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
          <div className="lg:col-span-7 bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col justify-between min-h-[300px]">
            {enhancedResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">{enhancedResult.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Optimized for: {enhancedResult.bestFor}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(enhancedResult.output, 'prompt-res')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
                  >
                    {copiedId === 'prompt-res' ? (
                      <>
                        <Check size={13} className="text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy Output</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-[#05070D] border border-white/5 rounded-xl p-4 font-mono text-xs text-gray-200 whitespace-pre-wrap leading-relaxed max-h-[280px] overflow-y-auto">
                  {enhancedResult.output}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500">
                <Terminal size={36} className="mb-3 text-gray-600" />
                <p className="text-sm font-medium text-gray-400">Ready to build your next breakthrough prompt</p>
                <p className="text-xs text-gray-600 mt-1 max-w-sm">
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
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Target Page Topic / Core Keyword
              </label>
              <input
                type="text"
                value={seoTopic}
                onChange={(e) => setSeoTopic(e.target.value)}
                placeholder="e.g. Custom Shopify Web Development"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#0066FF]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Target Audience / Business Sector
              </label>
              <input
                type="text"
                value={seoAudience}
                onChange={(e) => setSeoAudience(e.target.value)}
                placeholder="e.g. High-Growth E-Commerce Brands"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <button
              type="submit"
              disabled={!seoTopic.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/25"
            >
              <Search size={15} />
              <span>Generate Google SEO Snippets</span>
            </button>
          </form>

          {/* SEO Preview Display */}
          <div className="lg:col-span-7 bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col justify-between min-h-[300px]">
            {seoResult ? (
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Google SERP Preview
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(`${seoResult.title}\n\n${seoResult.description}`, 'seo-all')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium"
                  >
                    {copiedId === 'seo-all' ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                    <span>{copiedId === 'seo-all' ? 'Copied All' : 'Copy Meta Tags'}</span>
                  </button>
                </div>

                {/* Google search card mockup */}
                <div className="bg-white rounded-xl p-4 text-[#1a0dab] space-y-1 shadow-inner">
                  <div className="text-xs text-[#202124] flex items-center gap-1.5 mb-1">
                    <Globe size={12} className="text-gray-500" />
                    <span className="text-gray-600 font-mono">https://nexoradigital.com &rsaquo; services</span>
                  </div>
                  <h4 className="text-base font-medium hover:underline cursor-pointer leading-snug">
                    {seoResult.title}
                  </h4>
                  <p className="text-xs text-[#4d5156] leading-relaxed">
                    {seoResult.description}
                  </p>
                </div>

                {/* Keywords breakdown */}
                <div>
                  <span className="block text-xs font-semibold text-gray-400 mb-2">
                    Recommended High-Intent Keywords:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {seoResult.keywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-white/10 text-gray-200 text-xs font-mono">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500">
                <Search size={36} className="mb-3 text-gray-600" />
                <p className="text-sm font-medium text-gray-400">SERP & Meta Snippet Simulator</p>
                <p className="text-xs text-gray-600 mt-1 max-w-sm">
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
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Core Industry / Theme
              </label>
              <input
                type="text"
                value={brandIndustry}
                onChange={(e) => setBrandIndustry(e.target.value)}
                placeholder="e.g. Cloud, Logistics, Fashion, Finance..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#0066FF]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!brandIndustry.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/25"
            >
              <Globe size={15} />
              <span>Generate Brand & Domain Ideas</span>
            </button>
          </form>

          {/* Brand Cards Display */}
          <div className="lg:col-span-7 bg-black/40 border border-white/10 rounded-2xl p-5 min-h-[300px]">
            {brandNames ? (
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Generated Brand Identities
                  </span>
                  <span className="text-xs text-[#3B82F6]">6 Available Archetypes</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {brandNames.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-center justify-between hover:border-[#0066FF]/50 transition-all"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-wide">{item.name}</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">{item.vibe}</p>
                        <span className="text-[10px] text-blue-400 font-mono mt-1 block">{item.tld}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.name, `brand-${idx}`)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                        title="Copy brand name"
                      >
                        {copiedId === `brand-${idx}` ? (
                          <Check size={14} className="text-green-400" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500">
                <Globe size={36} className="mb-3 text-gray-600" />
                <p className="text-sm font-medium text-gray-400">AI Brand Discovery Engine</p>
                <p className="text-xs text-gray-600 mt-1 max-w-sm">
                  Generate modern, memorable brand names and check suggested domain extensions.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
