import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, Check, ShieldCheck, Sparkles } from 'lucide-react'
import { PORTFOLIO_ITEMS } from '../../data/siteData'
import TiltCard from '../Motion/TiltCard'
import ScrollReveal from '../Motion/ScrollReveal'

const CATEGORIES = ['All', 'Web Development', 'Logistics', 'E-Commerce']

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [previewProject, setPreviewProject] = useState(null)

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
            <span className="text-xs font-semibold tracking-wider uppercase">Featured Work</span>
          </div>
          <h2 id="work-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] leading-tight tracking-tight mb-4">
            See What We <span className="text-gradient-blue">Build.</span>
          </h2>
          <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-2xl">
            Explore selected digital experiences created to demonstrate our approach to design,
            usability and modern development.
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

                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#0066FF] group-hover:text-[#0052CC] transition-colors duration-200">
                      <span>View Full Case Study</span>
                      <ExternalLink size={12} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
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
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl bg-white border border-[#E5EAF1] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                role="dialog"
                aria-modal="true"
                aria-label={previewProject.title}
              >
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-[#E5EAF1] flex items-center justify-between bg-white/95 backdrop-blur-md">
                  <div>
                    <span className="text-[10px] font-bold text-[#0066FF] uppercase tracking-wider block">{previewProject.category} Case Study</span>
                    <h3 className="text-xl font-bold text-[#0B1020]">{previewProject.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewProject(null)}
                    aria-label="Close modal"
                    className="w-9 h-9 rounded-xl border border-[#E5EAF1] hover:bg-gray-100 flex items-center justify-center text-[#4B5563] transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto flex flex-col gap-6">
                  {/* Large High-Res Image Preview */}
                  <div className="rounded-xl overflow-hidden border border-[#E5EAF1] shadow-soft max-h-[360px]">
                    <img
                      src={previewProject.image}
                      alt={previewProject.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Highlights Grid */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-3">Project Deliverables & Architecture</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        'Custom Modern UI/UX Design System',
                        '100% Fully Responsive Across Mobile & Desktop',
                        'Optimized Core Web Vitals & Speed Audit',
                        'SEO-Ready Semantic HTML5 & Meta Tags',
                        'Secure Form Submission & Anti-Spam Setup',
                        '30-Day Post-Launch Support Included',
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-[#4B5563] bg-[#F8FAFC] p-3 rounded-xl border border-[#E5EAF1]">
                          <Check size={14} className="text-[#0066FF] flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#0B1020] mr-2">Built With:</span>
                    {['React 18', 'Tailwind CSS', 'Framer Motion', 'SEO Ready', 'Vite'].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-lg bg-blue-50 text-[#0066FF] text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-[#E5EAF1] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-4">
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
                    className="px-6 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all"
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
