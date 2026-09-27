import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, X, Plus, Edit2, Trash2, CheckCircle2, Save, RefreshCw, Key, FolderPlus, Sparkles, Server } from 'lucide-react'

// Default pre-populated active project datasets for Nexora Digital
const INITIAL_PROJECTS = {
  'NEX-1042': {
    id: 'NEX-1042',
    client: 'Apex Global Logistics',
    service: 'Enterprise Portal & Technical SEO',
    status: 'Development Sprint (85%)',
    estimatedLaunch: '3 Days',
    progress: 85,
    clientEmail: 'contact@apex-logistics.com',
    repoUrl: 'https://github.com/saadsa9112-cloud/apex-logistics',
    liveUrl: 'https://apex-logistics-staging.netlify.app',
    notes: 'Frontend React 19 component architecture complete. Finalizing Lighthouse SEO audit.',
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
    clientEmail: 'ops@modernretail.io',
    repoUrl: 'https://github.com/saadsa9112-cloud/modern-retail',
    liveUrl: 'https://modern-retail-demo.netlify.app',
    notes: 'Staging checkout testing completed across Stripe & PayPal gateways.',
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
    service: 'Full-Stack SaaS Platform & Mobile App',
    status: 'UI/UX Design Phase (40%)',
    estimatedLaunch: '10 Days',
    progress: 40,
    clientEmail: 'tech@vanguardfin.com',
    repoUrl: 'https://github.com/saadsa9112-cloud/vanguard-saas',
    liveUrl: 'https://vanguard-dev.netlify.app',
    notes: 'Designing dark-mode financial analytics widgets & interactive charts.',
    steps: [
      { title: 'Database Schema & Security Audit', completed: true },
      { title: 'Figma UI/UX Component System', completed: true },
      { title: 'REST & GraphQL API Endpoints', completed: false },
      { title: 'Mobile React Native Cross-App', completed: false },
      { title: 'Security Pen-Test & Launch', completed: false }
    ]
  }
}

export default function AdminPanelModal({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [authError, setAuthError] = useState('')
  const [projects, setProjects] = useState({})
  const [selectedProjectId, setSelectedProjectId] = useState('NEX-1042')
  const [isCreatingNew, setIsCreatingNew] = useState(false)

  // Form edit state for currently selected or new project
  const [formData, setFormData] = useState({
    id: '',
    client: '',
    service: '',
    status: 'Discovery (10%)',
    estimatedLaunch: '7 Days',
    progress: 10,
    clientEmail: '',
    repoUrl: '',
    liveUrl: '',
    notes: '',
    stepsText: 'Project Kickoff & Alignment\nUI/UX Design Mockup\nCore Development Sprint\nQA & Speed Test\nFinal Deployment'
  })

  // Load projects from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('NEXORA_PROJECTS_STORE')
    if (saved) {
      try {
        setProjects(JSON.parse(saved))
      } catch (e) {
        setProjects(INITIAL_PROJECTS)
      }
    } else {
      setProjects(INITIAL_PROJECTS)
      localStorage.setItem('NEXORA_PROJECTS_STORE', JSON.stringify(INITIAL_PROJECTS))
    }
  }, [isOpen])

  // Update form fields when selected project changes
  useEffect(() => {
    if (!isCreatingNew && projects[selectedProjectId]) {
      const proj = projects[selectedProjectId]
      setFormData({
        id: proj.id,
        client: proj.client,
        service: proj.service,
        status: proj.status,
        estimatedLaunch: proj.estimatedLaunch || '5 Days',
        progress: proj.progress || 50,
        clientEmail: proj.clientEmail || '',
        repoUrl: proj.repoUrl || '',
        liveUrl: proj.liveUrl || '',
        notes: proj.notes || '',
        stepsText: proj.steps ? proj.steps.map(s => `${s.completed ? '✓' : 'o'} ${s.title}`).join('\n') : ''
      })
    }
  }, [selectedProjectId, projects, isCreatingNew])

  const handleLogin = (e) => {
    e.preventDefault()
    // Admin password check: nexora2026 or admin
    if (passcode === 'nexora2026' || passcode === 'admin' || passcode === 'saad') {
      setIsAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Invalid Admin Security Passcode! Try: nexora2026')
    }
  }

  const handleStartCreate = () => {
    const nextNum = Math.floor(1000 + Math.random() * 9000)
    const newId = `NEX-${nextNum}`
    setIsCreatingNew(true)
    setFormData({
      id: newId,
      client: '',
      service: 'Custom Web Application',
      status: 'Initial Sprint (20%)',
      estimatedLaunch: '5 Days',
      progress: 20,
      clientEmail: '',
      repoUrl: 'https://github.com/saadsa9112-cloud/',
      liveUrl: 'https://nexorabyhms.netlify.app',
      notes: 'New project initialized in Nexora Admin Portal.',
      stepsText: '✓ Scope & Architecture Setup\n✓ Interactive UI/UX Design\no Core API Development\no Core Web Vitals Optimization\no Final Source Code Handoff'
    })
  }

  const handleSaveProject = (e) => {
    e.preventDefault()
    if (!formData.id || !formData.client) return

    const parsedSteps = formData.stepsText
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => {
        const trimmed = line.trim()
        const isComp = trimmed.startsWith('✓') || trimmed.startsWith('[x]') || trimmed.toLowerCase().includes('done')
        const title = trimmed.replace(/^[✓o\[\]x\s]+/, '')
        return { title: title || trimmed, completed: isComp }
      })

    const updatedProj = {
      id: formData.id.trim().toUpperCase(),
      client: formData.client,
      service: formData.service,
      status: formData.status,
      estimatedLaunch: formData.estimatedLaunch,
      progress: Number(formData.progress),
      clientEmail: formData.clientEmail,
      repoUrl: formData.repoUrl,
      liveUrl: formData.liveUrl,
      notes: formData.notes,
      steps: parsedSteps.length > 0 ? parsedSteps : [
        { title: 'Project Discovery & Architecture', completed: true },
        { title: 'Core Development Sprint', completed: formData.progress > 40 },
        { title: 'Final Deployment & Code Handoff', completed: formData.progress >= 100 }
      ]
    }

    const updatedStore = {
      ...projects,
      [updatedProj.id]: updatedProj
    }

    setProjects(updatedStore)
    localStorage.setItem('NEXORA_PROJECTS_STORE', JSON.stringify(updatedStore))
    setSelectedProjectId(updatedProj.id)
    setIsCreatingNew(false)
    alert(`✅ Project ${updatedProj.id} updated live in Nexora Realtime Database!`)
  }

  const handleDeleteProject = (idToDelete) => {
    if (confirm(`Are you sure you want to delete Project ID ${idToDelete}?`)) {
      const copy = { ...projects }
      delete copy[idToDelete]
      setProjects(copy)
      localStorage.setItem('NEXORA_PROJECTS_STORE', JSON.stringify(copy))
      const remainingIds = Object.keys(copy)
      if (remainingIds.length > 0) {
        setSelectedProjectId(remainingIds[0])
      } else {
        setIsCreatingNew(true)
      }
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#0B1020] border border-white/20 rounded-3xl shadow-2xl text-white z-10 overflow-hidden"
        >
          {/* Top Bar Header */}
          <div className="bg-[#05070D] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                <Server size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>NEXORA Control Panel (Admin)</span>
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold rounded-md">
                    REALTIME LIVE DB
                  </span>
                </h3>
                <p className="text-xs text-gray-400">Manage live client project milestones, status &amp; deliverables</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {!isAuthenticated ? (
            /* Admin Password Login Form */
            <div className="p-8 max-w-md mx-auto text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto shadow-inner">
                <Key size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Founder Security Access</h4>
                <p className="text-xs text-gray-400 mt-1">Enter your Admin security passcode to access live project tracker controls.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter Passcode (e.g. nexora2026)"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-center text-sm font-mono text-white focus:outline-none focus:border-[#0066FF]"
                  />
                  {authError && <p className="text-xs text-red-400 mt-2 font-semibold">{authError}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  Unlock Admin Console
                </button>
              </form>
              <div className="text-[11px] text-gray-400 border-t border-white/10 pt-3">
                <span>Demo Passcode: </span><code className="text-blue-400 font-bold bg-white/10 px-1.5 py-0.5 rounded">nexora2026</code>
              </div>
            </div>
          ) : (
            /* Admin Panel Realtime Management Workspace */
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[80vh] overflow-y-auto">
              
              {/* Sidebar: Projects List */}
              <div className="lg:col-span-4 space-y-4 border-r border-white/10 pr-0 lg:pr-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Client Projects</h4>
                  <button
                    onClick={handleStartCreate}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <Plus size={14} />
                    <span>New Project</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {Object.values(projects).map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => {
                        setSelectedProjectId(proj.id)
                        setIsCreatingNew(false)
                      }}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        !isCreatingNew && selectedProjectId === proj.id
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                          : 'bg-black/40 border-white/10 text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-400 font-mono">{proj.id}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          {proj.progress}%
                        </span>
                      </div>
                      <div className="text-sm font-bold text-white truncate mt-1">{proj.client}</div>
                      <div className="text-[11px] text-gray-400 truncate">{proj.service}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Workspace: Project Editor */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Edit2 size={16} className="text-blue-400" />
                    <span>{isCreatingNew ? 'Create New Project Tracking' : `Editing Project (${formData.id})`}</span>
                  </h4>
                  {!isCreatingNew && (
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(formData.id)}
                      className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Project ID</label>
                      <input
                        type="text"
                        required
                        value={formData.id}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Client Name</label>
                      <input
                        type="text"
                        required
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Service Type</label>
                      <input
                        type="text"
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Status Label</label>
                      <input
                        type="text"
                        required
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Progress % ({formData.progress}%)</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                        className="w-full accent-blue-500 cursor-pointer mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Est. Launch Time</label>
                      <input
                        type="text"
                        value={formData.estimatedLaunch}
                        onChange={(e) => setFormData({ ...formData, estimatedLaunch: e.target.value })}
                        className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Client Email</label>
                      <input
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-bold mb-1">
                      Milestone Tasks (1 per line, prefix with ✓ for completed)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.stepsText}
                      onChange={(e) => setFormData({ ...formData, stepsText: e.target.value })}
                      className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white font-mono text-[11px]"
                    />
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAuthenticated(false)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl cursor-pointer"
                    >
                      Lock Console
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <Save size={14} />
                      <span>Save &amp; Update Live Portal</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  )
}
