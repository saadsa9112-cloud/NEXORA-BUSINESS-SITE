import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Server, Key, Plus, Edit2, Trash2, CheckCircle2, Save, RefreshCw, ShieldAlert, Sparkles, Activity, Layers, FileText, Globe, Users } from 'lucide-react'

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
    service: 'Full-Stack SaaS Platform',
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

export default function AdminDashboardPage() {
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
  }, [])

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
    if (passcode === 'nexora2026' || passcode === 'admin' || passcode === 'saad') {
      setIsAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Invalid Security Passcode! Demo passcode: nexora2026')
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
    alert(`✅ Project ${updatedProj.id} updated live in Nexora Database!`)
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

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#05070D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Server size={14} />
              <span>Founder &amp; Agency Control Panel</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              NEXORA Digital Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Manage client active sprints, live Netlify builds, milestone progress, and discount availability.
            </p>
          </div>
          {isAuthenticated && (
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-300 rounded-xl cursor-pointer transition-colors"
            >
              Lock Passcode
            </button>
          )}
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="max-w-md mx-auto bg-[#0B1020] border border-white/15 rounded-3xl p-8 text-center space-y-6 shadow-2xl my-12">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto shadow-inner">
              <Key size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Founder Security Access</h3>
              <p className="text-xs text-gray-400 mt-1">Enter your Admin security passcode to unlock live client controls.</p>
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
          /* Admin Management Workspace */
          <div className="space-y-8">
            
            {/* Top Key Metrics Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-[#0B1020] p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Layers size={20} />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{Object.keys(projects).length}</div>
                  <div className="text-[11px] text-gray-400 uppercase font-bold">Active Projects</div>
                </div>
              </div>
              <div className="bg-[#0B1020] p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center">
                  <Activity size={20} />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">99.8%</div>
                  <div className="text-[11px] text-gray-400 uppercase font-bold">On-Time SLA</div>
                </div>
              </div>
              <div className="bg-[#0B1020] p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Globe size={20} />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">17 / 20</div>
                  <div className="text-[11px] text-gray-400 uppercase font-bold">Launch Slots Left</div>
                </div>
              </div>
              <div className="bg-[#0B1020] p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Users size={20} />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">100%</div>
                  <div className="text-[11px] text-gray-400 uppercase font-bold">IP Code Handoff</div>
                </div>
              </div>
            </div>

            {/* Main Admin Editor Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0B1020] border border-white/15 rounded-3xl p-6 shadow-2xl">
              
              {/* Left Column: Projects List */}
              <div className="lg:col-span-4 space-y-4 border-r border-white/10 pr-0 lg:pr-6">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Project Directory</h3>
                  <button
                    onClick={handleStartCreate}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <Plus size={14} />
                    <span>New Project</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {Object.values(projects).map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => {
                        setSelectedProjectId(proj.id)
                        setIsCreatingNew(false)
                      }}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                        !isCreatingNew && selectedProjectId === proj.id
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg'
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

              {/* Right Column: Project Form Editor */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Edit2 size={18} className="text-blue-400" />
                    <span>{isCreatingNew ? 'Create New Project Record' : `Edit Project Details (${formData.id})`}</span>
                  </h3>
                  {!isCreatingNew && (
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(formData.id)}
                      className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Project Tracking ID</label>
                      <input
                        type="text"
                        required
                        value={formData.id}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        className="w-full px-4 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Client Name / Business</label>
                      <input
                        type="text"
                        required
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        className="w-full px-4 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Service Type</label>
                      <input
                        type="text"
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Status Label</label>
                      <input
                        type="text"
                        required
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white font-semibold"
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Est. Handoff Time</label>
                      <input
                        type="text"
                        value={formData.estimatedLaunch}
                        onChange={(e) => setFormData({ ...formData, estimatedLaunch: e.target.value })}
                        className="w-full px-4 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Client Email</label>
                      <input
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        className="w-full px-4 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-bold mb-1">
                      Milestone Tasks (Prefix with ✓ for completed)
                    </label>
                    <textarea
                      rows={5}
                      value={formData.stepsText}
                      onChange={(e) => setFormData({ ...formData, stepsText: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-white font-mono text-xs"
                    />
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <Save size={16} />
                      <span>Save &amp; Sync Live Database</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}
