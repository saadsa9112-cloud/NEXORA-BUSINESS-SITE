import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderCheck, X, Search, CheckCircle2, Clock, ExternalLink, ShieldCheck, Code, Layers, Sparkles } from 'lucide-react'

// Default fallback projects if localStorage is empty
const DEFAULT_PROJECTS = {
  'NEX-1042': {
    id: 'NEX-1042',
    client: 'Apex Global Logistics',
    service: 'Enterprise Portal & Technical SEO',
    status: 'Development Sprint (85%)',
    estimatedLaunch: '3 Days',
    progress: 85,
    steps: [
      { title: 'Scope & Technical Architecture Alignment', completed: true },
      { title: 'Figma 3D UI/UX Prototype Approval', completed: true },
      { title: 'React 19 & Tailwind CSS Core Frontend', completed: true },
      { title: 'JSON-LD Schema & Speed Optimization', completed: true },
      { title: 'Final QA Test & Netlify DNS Handoff', completed: false }
    ]
  },
  'NEX-2089': {
    id: 'NEX-2089',
    client: 'Modern Retail Brands LLC',
    service: 'Headless E-Commerce Storefront',
    status: 'QA & Staging Test (95%)',
    estimatedLaunch: 'Tomorrow',
    progress: 95,
    steps: [
      { title: 'Store Schema & Product Catalog Import', completed: true },
      { title: 'Multi-Currency Real-time Converter', completed: true },
      { title: 'Stripe & Wise Payment Gateway Setup', completed: true },
      { title: 'Mobile PageSpeed 99+ Optimization', completed: true },
      { title: 'Live Domain Launch & SSL Certification', completed: false }
    ]
  },
  'NEX-3011': {
    id: 'NEX-3011',
    client: 'Vanguard FinTech Solutions',
    service: 'Full-Stack SaaS Platform',
    status: 'UI/UX Design Phase (40%)',
    estimatedLaunch: '10 Days',
    progress: 40,
    steps: [
      { title: 'Database Schema & Security Audit', completed: true },
      { title: 'Figma UI/UX Component System', completed: true },
      { title: 'REST & GraphQL API Endpoints', completed: false },
      { title: 'Mobile React Native Cross-App', completed: false },
      { title: 'Security Pen-Test & Launch', completed: false }
    ]
  }
}

export default function ClientPortalModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchId, setSearchId] = useState('')
  const [foundProject, setFoundProject] = useState(null)
  const [projectsStore, setProjectsStore] = useState(DEFAULT_PROJECTS)

  // Sync with localStorage whenever modal opens or storage changes
  useEffect(() => {
    const loadProjects = () => {
      const saved = localStorage.getItem('NEXORA_PROJECTS_STORE')
      if (saved) {
        try {
          setProjectsStore(JSON.parse(saved))
        } catch (e) {
          setProjectsStore(DEFAULT_PROJECTS)
        }
      } else {
        setProjectsStore(DEFAULT_PROJECTS)
      }
    }

    if (isOpen) {
      loadProjects()
    }
  }, [isOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    const cleanId = searchId.trim().toUpperCase()
    if (!cleanId) return

    if (projectsStore[cleanId]) {
      setFoundProject(projectsStore[cleanId])
    } else {
      // Dynamic fallback preview for unrecorded project IDs
      setFoundProject({
        id: cleanId,
        client: 'Valued NEXORA Client',
        service: 'Custom High-Performance Solution',
        status: 'Active Development Sprint (75%)',
        estimatedLaunch: '4 Business Days',
        progress: 75,
        steps: [
          { title: 'Requirements & Architectural Design', completed: true },
          { title: 'Interactive Figma UI/UX Handoff', completed: true },
          { title: 'React 19 Core Component Engineering', completed: true },
          { title: 'Google PageSpeed 99 Score Calibration', completed: false },
          { title: 'Final Production Handoff & NDA Sign', completed: false }
        ]
      })
    }
  }

  return (
    <>
      {/* Floating Client Tracker Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Client Portal Status Tracker"
        className="fixed bottom-6 left-44 sm:left-52 z-40 bg-white hover:bg-blue-50 text-[#0066FF] p-3.5 sm:px-4 sm:py-3 rounded-full shadow-xl border border-[#E5EAF1] flex items-center gap-2 transition-all duration-300 hover:scale-105 group cursor-pointer"
      >
        <FolderCheck size={18} className="text-[#0066FF]" />
        <span className="hidden sm:inline-block text-xs font-bold tracking-wide">
          Project Status Tracker
        </span>
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E5EAF1] z-10 overflow-hidden text-[#0B1020]"
            >
              {/* Header */}
              <div className="bg-[#05070D] text-white p-5 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF] flex items-center justify-center text-white font-bold shadow-md">
                    <FolderCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <span>NEXORA Client Tracker</span>
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 text-[9px] font-bold rounded-full">
                        REAL-TIME API
                      </span>
                    </h3>
                    <p className="text-[11px] text-gray-400">Track real-time development milestone status</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body Content */}
              <div className="p-6">
                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-2">
                    Enter Your Project ID (e.g. NEX-1042, NEX-2089, NEX-3011)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. NEX-1042"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5EAF1] text-xs font-bold text-[#0B1020] focus:outline-none focus:border-[#0066FF] font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Search size={14} />
                      <span>Track</span>
                    </button>
                  </div>
                </form>

                {/* Project Status Display */}
                {foundProject ? (
                  <div className="bg-[#F8FAFC] border border-[#E5EAF1] rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1]">
                      <div>
                        <div className="text-xs font-bold text-[#0066FF] font-mono">{foundProject.id}</div>
                        <div className="text-sm font-bold text-[#0B1020]">{foundProject.service}</div>
                        <div className="text-[11px] text-gray-500 font-medium">Client: {foundProject.client}</div>
                      </div>
                      <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 text-[11px] font-bold rounded-full">
                        {foundProject.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#0B1020] mb-1">
                        <span>Sprint Completion Rate</span>
                        <span className="text-[#0066FF]">{foundProject.progress || 85}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#0066FF] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${foundProject.progress || 85}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#0B1020] mb-2 uppercase tracking-wider">Milestone Checklist:</h4>
                      <div className="space-y-2">
                        {foundProject.steps && foundProject.steps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs">
                            <CheckCircle2 size={15} className={step.completed ? 'text-[#0066FF] mt-0.5' : 'text-slate-300 mt-0.5'} />
                            <span className={step.completed ? 'text-[#0B1020] font-semibold' : 'text-gray-400'}>
                              {step.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {foundProject.notes && (
                      <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3 text-xs text-[#0066FF] font-medium">
                        <strong>Developer Notes:</strong> {foundProject.notes}
                      </div>
                    )}

                    <div className="pt-2 border-t border-[#E5EAF1] flex items-center justify-between text-xs text-[#6B7280]">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> Est. Handoff: <strong className="text-[#0B1020]">{foundProject.estimatedLaunch}</strong>
                      </span>
                      <span className="text-green-600 font-bold flex items-center gap-1">
                        <ShieldCheck size={14} /> Live Staging Active
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-xs text-[#6B7280] space-y-2 bg-[#F8FAFC] rounded-2xl border border-[#E5EAF1] p-4">
                    <Code size={24} className="mx-auto text-[#0066FF]" />
                    <p className="font-semibold text-[#0B1020]">Realtime Demo Project Search</p>
                    <p>Try entering demo IDs: <code className="bg-white px-2 py-0.5 border rounded font-mono text-[#0066FF] font-bold">NEX-1042</code>, <code className="bg-white px-2 py-0.5 border rounded font-mono text-[#0066FF] font-bold">NEX-2089</code>, or <code className="bg-white px-2 py-0.5 border rounded font-mono text-[#0066FF] font-bold">NEX-3011</code>.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
