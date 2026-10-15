import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, Check, ShieldCheck, Sparkles, Monitor, Tablet, Smartphone } from 'lucide-react'
import { PORTFOLIO_ITEMS } from '../../data/siteData'
import TiltCard from '../Motion/TiltCard'
import ScrollReveal from '../Motion/ScrollReveal'

const CATEGORIES = ['All', 'Web Application', 'Education & Portal', 'Automobile 3D', 'Business & Dashboard']

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [previewProject, setPreviewProject] = useState(null)
  const [deviceView, setDeviceView] = useState('desktop')

  const filteredItems = activeCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) =>
        item.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        item.title.toLowerCase().includes(activeCategory.toLowerCase())
      )

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-20 lg:py-28 bg-white border-y border-[#E5EAF1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal variant="fadeUp" className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 text-[#0066FF] mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase">Our Work</span>
          </div>
          <h2 id="work-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] leading-tight tracking-tight mb-4">
            Selected Projects &amp; <span className="text-gradient-blue">Portfolio Work.</span>
          </h2>
          <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-2xl">
            Explore recent digital solutions and showcase projects created to demonstrate our design, usability, and development standards.
          </p>
        </ScrollReveal>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white shadow-md shadow-blue-500/20'
                    : 'text-[#4B5563] bg-[#F8FAFC] border border-[#E5EAF1] hover:text-[#0B1020] hover:bg-gray-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-[#0066FF] rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            )
          })}
        </div>

        {/* Animated Portfolio Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <TiltCard
                  maxTilt={4}
                  onClick={() => setPreviewProject(item)}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-[#E5EAF1] shadow-soft hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer h-full"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden aspect-video bg-slate-100">
                    <img
                      src={item.image}
                      alt={`${item.title} — ${item.category} demo project created by NEXORA DIGITAL`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-[#0B1020]/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-2 px-5 py-2.5 bg-[#0066FF] rounded-xl text-white text-sm font-semibold shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        <span>Preview Case Study</span>
                        <ExternalLink size={14} aria-hidden="true" />
                      </div>
                    </div>

                    {/* Concept label */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase bg-white/90 border border-slate-200 text-[#0066FF] shadow-xs backdrop-blur-md">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <span className="text-xs font-bold text-[#0066FF] tracking-wider uppercase mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="text-[#0B1020] font-bold text-lg mb-2 leading-snug group-hover:text-[#0066FF] transition-colors">{item.title}</h3>
                    <p className="text-[#4B5563] text-sm leading-relaxed">{item.description}</p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0066FF] flex items-center gap-1.5 group-hover:text-[#0052CC] transition-colors">
                        <span>Preview Project</span>
                        <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-[#0066FF] border border-blue-200 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                        Case Study ↗
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Disclosure note */}
        <p className="mt-12 text-center text-xs text-[#6B7280] max-w-xl mx-auto leading-relaxed">
          Explore selected digital client work &amp; showcase projects produced by NEXORA DIGITAL.
        </p>
      </div>

      {/* Interactive Full Case Study Preview Modal */}
      <AnimatePresence>
        {previewProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewProject(null)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full sm:max-w-3xl bg-white border border-[#E5EAF1] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]"
                role="dialog"
                aria-modal="true"
                aria-label={previewProject.title}
              >
                {/* Modal Header */}
                <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-[#E5EAF1] flex items-center justify-between bg-white/95 backdrop-blur-md">
                  <div>
                    <span className="text-[10px] font-bold text-[#0066FF] uppercase tracking-wider block">{previewProject.category} Case Study</span>
                    <h3 className="text-base sm:text-xl font-bold text-[#0B1020]">{previewProject.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewProject(null)}
                    aria-label="Close modal"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[#E5EAF1] hover:bg-gray-100 flex items-center justify-center text-[#4B5563] transition-colors cursor-pointer"
                  >
                    <X size={17} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-4 sm:gap-6">
                  {/* Device Mockup Switcher Toolbar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E5EAF1]">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-bold">Preview Viewport:</span>
                      <span className="capitalize text-[#0066FF] font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {deviceView} Mockup
                      </span>
                    </div>
                    <div className="inline-flex items-center p-1 bg-white rounded-lg border border-[#E5EAF1] shadow-xs gap-1 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setDeviceView('desktop')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                          deviceView === 'desktop'
                            ? 'bg-[#0066FF] text-white shadow-xs'
                            : 'text-[#4B5563] hover:text-[#0B1020] hover:bg-gray-100'
                        }`}
                      >
                        <Monitor size={13} />
                        <span>Desktop</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeviceView('tablet')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                          deviceView === 'tablet'
                            ? 'bg-[#0066FF] text-white shadow-xs'
                            : 'text-[#4B5563] hover:text-[#0B1020] hover:bg-gray-100'
                        }`}
                      >
                        <Tablet size={13} />
                        <span>Tablet</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeviceView('mobile')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                          deviceView === 'mobile'
                            ? 'bg-[#0066FF] text-white shadow-xs'
                            : 'text-[#4B5563] hover:text-[#0B1020] hover:bg-gray-100'
                        }`}
                      >
                        <Smartphone size={13} />
                        <span>Mobile</span>
                      </button>
                    </div>
                  </div>

                  {/* High-Res Device Mockup Frame */}
                  <div className="w-full flex justify-center items-center py-1">
                    {deviceView === 'desktop' && (
                      <div className="w-full rounded-xl overflow-hidden border border-[#E5EAF1] shadow-soft bg-[#0B1020] transition-all duration-300">
                        {/* Browser Chrome Header */}
                        <div className="bg-[#1E293B] px-3 py-2 flex items-center justify-between border-b border-gray-700/50">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                          </div>
                          <div className="px-3 py-0.5 rounded-md bg-[#0B1020]/60 text-[10px] text-gray-300 font-mono truncate max-w-[200px] sm:max-w-[320px] border border-gray-700/40">
                            https://nexoradigital.com/showcase/{previewProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                          </div>
                          <div className="w-12 text-right">
                            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">SSL 256</span>
                          </div>
                        </div>
                        <div className="max-h-[260px] sm:max-h-[360px] overflow-hidden bg-white">
                          <img
                            src={previewProject.image}
                            alt={`${previewProject.title} — ${previewProject.category} desktop showcase`}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      </div>
                    )}

                    {deviceView === 'tablet' && (
                      <div className="w-full max-w-[480px] rounded-2xl p-2.5 bg-[#0F172A] border-2 border-gray-700/70 shadow-xl transition-all duration-300">
                        <div className="w-8 h-1 bg-gray-600 rounded-full mx-auto mb-2 opacity-60" />
                        <div className="rounded-xl overflow-hidden max-h-[280px] sm:max-h-[340px] bg-white border border-gray-200">
                          <img
                            src={previewProject.image}
                            alt={`${previewProject.title} — Tablet mockup showcase`}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="w-3 h-3 rounded-full border border-gray-600 mx-auto mt-2 opacity-60" />
                      </div>
                    )}

                    {deviceView === 'mobile' && (
                      <div className="w-[260px] sm:w-[280px] rounded-[32px] p-2.5 bg-[#0F172A] border-4 border-gray-800 shadow-2xl relative transition-all duration-300">
                        {/* Dynamic Island Notch */}
                        <div className="w-20 h-3.5 bg-black rounded-full mx-auto mb-2 flex items-center justify-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                        </div>
                        <div className="rounded-[20px] overflow-hidden max-h-[300px] sm:max-h-[320px] bg-white border border-gray-200">
                          <img
                            src={previewProject.image}
                            alt={`${previewProject.title} — Mobile device showcase`}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="w-24 h-1 bg-gray-500 rounded-full mx-auto mt-2 opacity-80" />
                      </div>
                    )}
                  </div>

                  {/* Highlights Grid */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-2 sm:mb-3">Project Deliverables &amp; Architecture</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {[
                        'Custom Modern UI/UX Design System',
                        '100% Fully Responsive Across Mobile & Desktop',
                        'Optimized Core Web Vitals & Speed Audit',
                        'SEO-Ready Semantic HTML5 & Meta Tags',
                        'Secure Form Submission & Anti-Spam Setup',
                        '30-Day Post-Launch Support Included',
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#4B5563] bg-[#F8FAFC] p-2.5 sm:p-3 rounded-xl border border-[#E5EAF1]">
                          <Check size={13} className="text-[#0066FF] flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#0B1020] mr-1">Built With:</span>
                    {['React 19', 'Tailwind CSS', 'Framer Motion', 'SEO Ready', 'Vite'].map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-blue-50 text-[#0066FF] text-[11px] sm:text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 sm:p-6 border-t border-[#E5EAF1] bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <ShieldCheck size={16} className="text-[#0066FF]" />
                    <span>NEXORA DIGITAL Verified Project</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewProject(null)
                      scrollToContact()
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer text-center"
                  >
                    Build A Site Like This →
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
