import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderCheck, X, Search, CheckCircle2, Clock, ShieldCheck, Code, AlertTriangle, Sparkles, MessageCircle, ArrowRight } from 'lucide-react'
import { CONTACT } from '../../data/siteData'

// Default approved projects in Nexora Database
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

export default function ClientPortalModal({ isOpen: controlledIsOpen, onClose: controlledOnClose }) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalOpen

  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose()
    } else {
      setInternalOpen(false)
    }
  }

  const [searchId, setSearchId] = useState('')
  const [foundProject, setFoundProject] = useState(null)
  const [notFoundId, setNotFoundId] = useState(null)
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
      setNotFoundId(null)
    } else {
      setFoundProject(null)
      setNotFoundId(cleanId)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          {/* Modal Card — Bottom Sheet on Mobile, Centered on Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E5EAF1] z-10 overflow-hidden text-[#0B1020] max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#05070D] text-white p-4 sm:p-5 flex items-center justify-between border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0066FF] flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
                  <FolderCheck size={19} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold flex items-center gap-2">
                    <span>NEXORA Verified Tracker</span>
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 text-[9px] font-bold rounded-full">
                      LIVE
                    </span>
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-gray-400">Track real-time development milestone status</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer flex-shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-2">
                    Enter Official Project ID (e.g. NEX-1042)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. NEX-1042"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5EAF1] text-xs font-bold text-[#0B1020] focus:outline-none focus:border-[#0066FF] font-mono uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Search size={14} />
                      <span>Verify ID</span>
                    </button>
                  </div>
                </form>

                {/* Approved Project Found Display */}
                {foundProject ? (
                  <div className="bg-[#F8FAFC] border border-[#E5EAF1] rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1]">
                      <div>
                        <div className="text-xs font-bold text-[#0066FF] font-mono flex items-center gap-1">
                          <span>{foundProject.id}</span>
                          <CheckCircle2 size={13} className="text-green-600" />
                        </div>
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
                        <ShieldCheck size={14} /> Approved by Founder
                      </span>
                    </div>
                  </div>
                ) : notFoundId ? (
                  /* Professional Not Found Notice */
                  <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 text-center space-y-4 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        ID Not Found
                      </span>
                      <h4 className="text-base font-black text-[#0B1020] mt-1">
                        Unverified Project ID
                      </h4>
                      <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                        We searched the NEXORA database for Project ID <code className="bg-amber-200/60 text-amber-900 font-mono font-bold px-1.5 py-0.5 rounded">{notFoundId}</code>, but no active project was found with this identifier.
                      </p>
                    </div>

                    <div className="bg-white border border-amber-200 rounded-xl p-3.5 text-xs text-left space-y-1.5">
                      <span className="font-bold text-[#0B1020] block">Need Assistance with your Project ID?</span>
                      <p className="text-gray-600 text-[11px] leading-relaxed">
                        Please check your official invoice or contract document for your assigned NEX-ID code. If you have misplaced it, reach out to Founder Hafiz Muhammad Saad directly.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-gray-500 font-medium">Have questions about your project?</span>
                      <a
                        href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hello Founder Saad, I am trying to track my project with ID: ${notFoundId}. Could you please verify my access?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                      >
                        <MessageCircle size={13} />
                        <span>WhatsApp Founder →</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Initial Search Prompt */
                  <div className="text-center py-6 text-xs text-[#6B7280] space-y-3 bg-[#F8FAFC] rounded-2xl border border-[#E5EAF1] p-5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center mx-auto">
                      <Code size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-[#0B1020] text-sm">Verify Client Milestone Access</p>
                      <p className="text-gray-500 text-xs mt-1.5 max-w-sm mx-auto leading-relaxed">
                        Enter your confidential Project ID (provided in your official invoice or agreement) to view live development sprints, milestone progress, and staging deployments.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#E5EAF1] flex items-center justify-center gap-2 text-[11px] text-gray-500 font-medium">
                      <ShieldCheck size={14} className="text-green-600" />
                      <span>Encrypted client verification protocol</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
  )
}
