import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderCheck, X, Search, CheckCircle2, Clock, ExternalLink, ShieldCheck, Code, Layers } from 'lucide-react'

const MOCK_PROJECTS = {
  'NEX-1042': {
    id: 'NEX-1042',
    client: 'Apex Global Logistics',
    service: 'Business Website & Technical SEO',
    status: 'Development Phase (85%)',
    estimatedLaunch: '3 Days',
    steps: [
      { title: 'Project Scope & Requirements Alignment', completed: true },
      { title: 'Figma UI/UX Design Approval', completed: true },
      { title: 'React 19 Frontend Architecture', completed: true },
      { title: 'Technical SEO & JSON-LD Schema Setup', completed: false },
      { title: 'Final QA, PageSpeed Audit & Launch', completed: false }
    ]
  },
  'NEX-2089': {
    id: 'NEX-2089',
    client: 'Modern Retail Brands',
    service: 'Shopify E-Commerce Store',
    status: 'QA & Staging Test (95%)',
    estimatedLaunch: 'Tomorrow',
    steps: [
      { title: 'Store Architecture & Theme Setup', completed: true },
      { title: 'Catalog & Product Import', completed: true },
      { title: 'Multi-Currency Payment Gateway Integration', completed: true },
      { title: 'Mobile Checkout Optimization', completed: true },
      { title: 'Domain DNS Migration & Go Live', completed: false }
    ]
  }
}

export default function ClientPortalModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchId, setSearchId] = useState('')
  const [foundProject, setFoundProject] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const cleanId = searchId.trim().toUpperCase()
    if (!cleanId) return

    if (MOCK_PROJECTS[cleanId]) {
      setFoundProject(MOCK_PROJECTS[cleanId])
      setErrorMsg('')
    } else {
      // Create a dynamic demo status for any valid formatted search
      setFoundProject({
        id: cleanId,
        client: 'Valued NEXORA Client',
        service: 'Custom Web Solution',
        status: 'Active Development Sprint (70%)',
        estimatedLaunch: '4 Business Days',
        steps: [
          { title: 'Scope & Architecture Setup', completed: true },
          { title: 'UI/UX Interactive Design', completed: true },
          { title: 'Core Development & API Integration', completed: true },
          { title: 'Core Web Vitals & Speed Optimization', completed: false },
          { title: 'Final Review & Code Handoff', completed: false }
        ]
      })
      setErrorMsg('')
    }
  }

  return (
    <>
      {/* Floating Client Portal Button */}
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
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
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
                  <div className="w-9 h-9 rounded-xl bg-[#0066FF] flex items-center justify-center text-white font-bold">
                    <FolderCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">NEXORA Client Portal</h3>
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
                    Enter Your Project ID (e.g. NEX-1042)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. NEX-1042"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5EAF1] text-xs font-bold text-[#0B1020] focus:outline-none focus:border-[#0066FF]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Search size={14} />
                      <span>Track</span>
                    </button>
                  </div>
                  {errorMsg && <p className="text-xs text-red-500 mt-1.5">{errorMsg}</p>}
                </form>

                {/* Project Status Display */}
                {foundProject ? (
                  <div className="bg-[#F8FAFC] border border-[#E5EAF1] rounded-2xl p-4 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1]">
                      <div>
                        <div className="text-xs font-bold text-[#0066FF]">{foundProject.id}</div>
                        <div className="text-sm font-bold text-[#0B1020]">{foundProject.service}</div>
                      </div>
                      <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold rounded-full">
                        {foundProject.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#0B1020] mb-2 uppercase tracking-wider">Milestone Progress:</h4>
                      <div className="space-y-2">
                        {foundProject.steps.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs">
                            <CheckCircle2 size={15} className={step.completed ? 'text-[#0066FF]' : 'text-slate-300'} />
                            <span className={step.completed ? 'text-[#0B1020] font-semibold' : 'text-gray-400'}>
                              {step.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E5EAF1] flex items-center justify-between text-xs text-[#6B7280]">
                      <span className="flex items-center gap-1"><Clock size={12} /> Est. Launch: <strong className="text-[#0B1020]">{foundProject.estimatedLaunch}</strong></span>
                      <span className="text-green-600 font-bold">✓ Staging Server Active</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-xs text-[#6B7280] space-y-2 bg-[#F8FAFC] rounded-2xl border border-[#E5EAF1] p-4">
                    <Code size={24} className="mx-auto text-[#0066FF]" />
                    <p className="font-semibold text-[#0B1020]">Demo Search Available!</p>
                    <p>Try searching <code className="bg-white px-2 py-0.5 border rounded font-mono text-[#0066FF] font-bold">NEX-1042</code> or enter your custom project ID.</p>
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
