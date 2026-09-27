import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, CheckCircle2, ShieldCheck, Zap, Globe, Layers, ArrowRight } from 'lucide-react'

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E5EAF1] z-10 my-8 text-[#0B1020]"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5EAF1] bg-[#F8FAFC]">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold uppercase tracking-wider rounded-full border border-[#0066FF]/20">
                {project.category}
              </span>
              <span className="text-xs text-[#6B7280] font-medium hidden sm:inline-block">• Verified NEXORA DIGITAL Case Study</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#4B5563] hover:text-[#0B1020] hover:bg-slate-200/60 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Content */}
          <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8">
            {/* Project Image Banner */}
            <div className="relative rounded-2xl overflow-hidden mb-8 border border-[#E5EAF1] shadow-inner bg-slate-900 group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 sm:h-80 object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-1">{project.title}</h2>
                  <p className="text-sm text-blue-200 font-medium">{project.subtitle || 'High-Performance Web Architecture'}</p>
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold rounded-xl shadow-lg transition-all duration-200 whitespace-nowrap"
                  >
                    <span>View Live Website</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Grid Breakdown */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column: Challenge & Solution */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#0B1020] mb-2 flex items-center gap-2">
                    <Globe className="text-[#0066FF]" size={18} />
                    Project Overview &amp; Business Objective
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {project.fullDescription || project.description}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div>
                  <h3 className="text-base font-bold text-[#0B1020] mb-3 flex items-center gap-2">
                    <CheckCircle2 className="text-[#0066FF]" size={18} />
                    Key Architecture &amp; Features Delivered
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2.5">
                    {(project.deliverables || [
                      'Responsive Mobile-First UI/UX',
                      'Ultra-Fast PageSpeed Optimization',
                      'Technical SEO & Schema Markup',
                      'Lead Capture & WhatsApp Integration',
                      'Secure Cloud Hosting Deployment',
                      'Admin Dashboard & CMS Setup'
                    ]).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-[#374151] bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E5EAF1]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Tech Stack & Metrics */}
              <div className="space-y-6 bg-[#F8FAFC] p-6 rounded-2xl border border-[#E5EAF1]">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3 flex items-center gap-1.5">
                    <Layers size={14} className="text-[#0066FF]" />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(project.tags || ['React', 'Tailwind CSS', 'Vite', 'SEO', 'Cloudflare']).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white border border-[#E5EAF1] text-[#0B1020] text-xs font-bold rounded-lg shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Performance Outcome Badges */}
                <div className="pt-4 border-t border-[#E5EAF1] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Verified Performance</h4>
                  <div className="bg-white p-3 rounded-xl border border-[#E5EAF1] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center font-black text-sm">
                      99
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1020]">Google PageSpeed Score</div>
                      <div className="text-[10px] text-gray-500">Core Web Vitals Passed</div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-[#E5EAF1] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-black text-xs">
                      100%
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1020]">Responsive &amp; Mobile-Ready</div>
                      <div className="text-[10px] text-gray-500">Cross-Browser Compatible</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#E5EAF1] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#6B7280]">
              Want a high-converting website like this for your business?
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-4 py-2.5 border border-[#E5EAF1] text-[#4B5563] hover:text-[#0B1020] text-xs font-bold rounded-xl bg-white transition-all cursor-pointer"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => {
                  onClose()
                  const el = document.getElementById('contact')
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 80
                    window.scrollTo({ top, behavior: 'smooth' })
                  }
                }}
                className="w-1/2 sm:w-auto px-5 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Request Similar Project</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
