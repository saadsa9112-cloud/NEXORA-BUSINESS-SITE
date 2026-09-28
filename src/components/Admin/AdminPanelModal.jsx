import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Server, Key, Plus, Edit2, Trash2, CheckCircle2, Save, RefreshCw, ShieldAlert,
  Sparkles, Activity, Layers, FileText, Globe, Users, DollarSign, ExternalLink,
  Search, Lock, Unlock, BarChart3, Clock, AlertCircle, Copy, Send, Check
} from 'lucide-react'
import { CONTACT } from '../../data/siteData'

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
    depositPaid: true,
    finalPaid: false,
    amount: 1500,
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
    depositPaid: true,
    finalPaid: true,
    amount: 2200,
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
    depositPaid: true,
    finalPaid: false,
    amount: 3500,
    steps: [
      { title: 'Database Schema & Security Audit', completed: true },
      { title: 'Figma UI/UX Component System', completed: true },
      { title: 'REST & GraphQL API Endpoints', completed: false },
      { title: 'Mobile React Native Cross-App', completed: false },
      { title: 'Security Pen-Test & Launch', completed: false }
    ]
  }
}

// Default audit leads log
const INITIAL_AUDIT_LEADS = [
  { id: 1, url: 'https://apex-logistics.com', score: 48, date: '2026-09-28', status: 'Converted to Client' },
  { id: 2, url: 'https://modernretail-store.com', score: 52, date: '2026-09-27', status: 'Proposal Sent' },
  { id: 3, url: 'https://vanguard-finance.io', score: 41, date: '2026-09-26', status: 'Audit Followup Pending' }
]

export default function AdminPanelModal({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [authError, setAuthError] = useState('')
  const [activeTab, setActiveTab] = useState('overview') // 'overview', 'projects', 'scarcity', 'invoices', 'leads'

  const [projects, setProjects] = useState({})
  const [selectedProjectId, setSelectedProjectId] = useState('NEX-1042')
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const [projectSearch, setProjectSearch] = useState('')

  // Scarcity settings
  const [launchSlots, setLaunchSlots] = useState({ total: 20, claimed: 3, discount: '35%', code: 'LAUNCH35' })

  // Audit leads
  const [auditLeads, setAuditLeads] = useState(INITIAL_AUDIT_LEADS)

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
    amount: 1500,
    depositPaid: true,
    finalPaid: false,
    stepsText: 'Project Scope & Requirements Alignment\nUI/UX Design Mockup\nCore React 19 Frontend Engineering\nGoogle PageSpeed 99 Audit\nFinal Deployment & Code Handoff'
  })

  // Check persistent login session and load data from localStorage
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('NEXORA_ADMIN_AUTH')
    if (sessionAuth === 'true') {
      setIsAuthenticated(true)
    }

    const savedProjects = localStorage.getItem('NEXORA_PROJECTS_STORE')
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects))
      } catch (e) {
        setProjects(INITIAL_PROJECTS)
      }
    } else {
      setProjects(INITIAL_PROJECTS)
      localStorage.setItem('NEXORA_PROJECTS_STORE', JSON.stringify(INITIAL_PROJECTS))
    }

    const savedSlots = localStorage.getItem('NEXORA_LAUNCH_SLOTS')
    if (savedSlots) {
      try {
        setLaunchSlots(JSON.parse(savedSlots))
      } catch (e) {}
    }

    const savedLeads = localStorage.getItem('NEXORA_AUDIT_LEADS')
    if (savedLeads) {
      try {
        setAuditLeads(JSON.parse(savedLeads))
      } catch (e) {}
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
        amount: proj.amount || 1500,
        depositPaid: proj.depositPaid !== undefined ? proj.depositPaid : true,
        finalPaid: proj.finalPaid !== undefined ? proj.finalPaid : false,
        stepsText: proj.steps ? proj.steps.map(s => `${s.completed ? '✓' : 'o'} ${s.title}`).join('\n') : ''
      })
    }
  }, [selectedProjectId, projects, isCreatingNew])

  const handleLogin = (e) => {
    e.preventDefault()
    if (passcode === 'nexora2026' || passcode === 'admin' || passcode === 'saad') {
      setIsAuthenticated(true)
      sessionStorage.setItem('NEXORA_ADMIN_AUTH', 'true')
      setAuthError('')
    } else {
      setAuthError('Invalid Security Passcode! Try: nexora2026')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('NEXORA_ADMIN_AUTH')
    onClose()
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
      estimatedLaunch: '5 Business Days',
      progress: 20,
      clientEmail: '',
      repoUrl: 'https://github.com/saadsa9112-cloud/',
      liveUrl: 'https://nexorabyhms.netlify.app',
      notes: 'New project initialized in Nexora Admin Portal.',
      amount: 1500,
      depositPaid: true,
      finalPaid: false,
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
      amount: Number(formData.amount),
      depositPaid: Boolean(formData.depositPaid),
      finalPaid: Boolean(formData.finalPaid),
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

  const handleSaveScarcity = (e) => {
    e.preventDefault()
    localStorage.setItem('NEXORA_LAUNCH_SLOTS', JSON.stringify(launchSlots))
    alert('✅ Launch offer discount slots updated live!')
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

  // Calculate Executive Metrics
  const projectList = Object.values(projects)
  const totalRevenue = projectList.reduce((acc, curr) => acc + (curr.amount || 0), 0)
  const collectedRevenue = projectList.reduce((acc, curr) => {
    let amt = 0
    if (curr.depositPaid) amt += (curr.amount || 0) * 0.5
    if (curr.finalPaid) amt += (curr.amount || 0) * 0.5
    return acc + amt
  }, 0)

  const filteredProjects = projectList.filter(p =>
    p.id.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.client.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.service.toLowerCase().includes(projectSearch.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl bg-[#0B1020] border border-white/20 rounded-3xl shadow-2xl text-white z-10 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Top Bar Header */}
          <div className="bg-[#05070D] px-6 py-4 border-b border-white/10 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                <Server size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>NEXORA Founder Admin Portal</span>
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[9px] font-bold rounded-md">
                    PROPER DASHBOARD v2.0
                  </span>
                </h3>
                <p className="text-xs text-gray-400">Executive Control Panel for Founder Hafiz Muhammad Saad</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-white/10 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Lock size={13} />
                  <span>Lock Console</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>
          </div>

          {!isAuthenticated ? (
            /* Passcode Security Screen */
            <div className="p-8 max-w-md mx-auto text-center space-y-6 my-auto">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto shadow-inner">
                <Key size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Founder Authentication Required</h4>
                <p className="text-xs text-gray-400 mt-1">Enter your Founder security passcode to unlock live control systems.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter Security Passcode (e.g. nexora2026)"
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
            /* Main Admin Dashboard Workspace */
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Navigation Module Tabs */}
              <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'overview' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    📊 Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'projects' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    📁 Projects ({projectList.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('scarcity')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'scarcity' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    🏷️ Launch Scarcity
                  </button>
                  <button
                    onClick={() => setActiveTab('invoices')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'invoices' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    💳 B2B Invoices
                  </button>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'leads' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    🔍 Audit Leads ({auditLeads.length})
                  </button>
                </div>

                <div className="text-xs text-gray-400 font-mono">
                  Founder: <strong className="text-white">Hafiz Muhammad Saad</strong>
                </div>
              </div>

              {/* Module 1: Executive Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                      <div className="flex justify-between items-center text-xs text-gray-400 mb-1 font-bold">
                        <span>ACTIVE PROJECTS</span>
                        <Layers size={16} className="text-blue-400" />
                      </div>
                      <div className="text-3xl font-black text-white">{projectList.length}</div>
                      <div className="text-[11px] text-green-400 font-semibold mt-1">✓ 100% On-Time Delivery SLA</div>
                    </div>

                    <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                      <div className="flex justify-between items-center text-xs text-gray-400 mb-1 font-bold">
                        <span>COLLECTED REVENUE</span>
                        <DollarSign size={16} className="text-emerald-400" />
                      </div>
                      <div className="text-3xl font-black text-emerald-400 font-mono">${collectedRevenue.toLocaleString()}</div>
                      <div className="text-[11px] text-gray-400 mt-1">Total Pipeline: ${totalRevenue.toLocaleString()}</div>
                    </div>

                    <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                      <div className="flex justify-between items-center text-xs text-gray-400 mb-1 font-bold">
                        <span>PAGESPEED BENCHMARK</span>
                        <Activity size={16} className="text-purple-400" />
                      </div>
                      <div className="text-3xl font-black text-purple-400 font-mono">99/100</div>
                      <div className="text-[11px] text-gray-400 mt-1">Core Web Vitals Telemetry</div>
                    </div>

                    <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                      <div className="flex justify-between items-center text-xs text-gray-400 mb-1 font-bold">
                        <span>SCARCITY SLOTS</span>
                        <Sparkles size={16} className="text-amber-400" />
                      </div>
                      <div className="text-3xl font-black text-amber-400 font-mono">{launchSlots.total - launchSlots.claimed} / {launchSlots.total}</div>
                      <div className="text-[11px] text-gray-400 mt-1">Coupon Code: {launchSlots.code} ({launchSlots.discount})</div>
                    </div>
                  </div>

                  {/* Active Projects Table Overview */}
                  <div className="bg-black/40 p-5 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Active Client Sprints Summary</h4>
                      <button
                        onClick={() => setActiveTab('projects')}
                        className="text-xs text-blue-400 font-bold hover:underline"
                      >
                        Manage Projects →
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-gray-400 text-[11px] uppercase font-bold">
                            <th className="py-2.5 px-3">Project ID</th>
                            <th className="py-2.5 px-3">Client</th>
                            <th className="py-2.5 px-3">Service</th>
                            <th className="py-2.5 px-3">Status</th>
                            <th className="py-2.5 px-3">Progress</th>
                            <th className="py-2.5 px-3 text-right">Invoice</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300">
                          {projectList.map((p) => (
                            <tr key={p.id} className="hover:bg-white/5 transition-colors">
                              <td className="py-3 px-3 font-mono font-bold text-blue-400">{p.id}</td>
                              <td className="py-3 px-3 font-bold text-white">{p.client}</td>
                              <td className="py-3 px-3">{p.service}</td>
                              <td className="py-3 px-3">
                                <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold">
                                  {p.status}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full" style={{ width: `${p.progress}%` }} />
                                  </div>
                                  <span className="font-mono text-[10px]">{p.progress}%</span>
                                </div>
                              </td>
                              <td className="py-3 px-3 text-right font-mono text-emerald-400 font-bold">
                                ${p.amount} ({p.finalPaid ? '100% Paid' : p.depositPaid ? '50% Paid' : 'Pending'})
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Module 2: Projects Directory & Sprint Manager */}
              {activeTab === 'projects' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column: Projects List & Search */}
                  <div className="lg:col-span-4 space-y-3 border-r border-white/10 pr-0 lg:pr-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-bold uppercase text-gray-400">Projects Directory</span>
                      <button
                        onClick={handleStartCreate}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <Plus size={14} />
                        <span>New Project</span>
                      </button>
                    </div>

                    <div className="relative mb-2">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search ID, Client, Service..."
                        value={projectSearch}
                        onChange={(e) => setProjectSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-black/60 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                      {filteredProjects.map((proj) => (
                        <div
                          key={proj.id}
                          onClick={() => {
                            setSelectedProjectId(proj.id)
                            setIsCreatingNew(false)
                          }}
                          className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
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

                  {/* Right Column: Project Details & Milestone Form */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Edit2 size={16} className="text-blue-400" />
                        <span>{isCreatingNew ? 'Create New Project Record' : `Editing Project (${formData.id})`}</span>
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
                            className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white font-mono uppercase"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 font-bold mb-1">Client Business Name</label>
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
                          <label className="block text-gray-400 font-bold mb-1">Service Package</label>
                          <input
                            type="text"
                            required
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 font-bold mb-1">Sprint Status Label</label>
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
                          <label className="block text-gray-400 font-bold mb-1">Est. Handoff Time</label>
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-400 font-bold mb-1">Netlify Live Staging URL</label>
                          <input
                            type="url"
                            value={formData.liveUrl}
                            onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                            className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white font-mono text-[11px]"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 font-bold mb-1">GitHub Repository Link</label>
                          <input
                            type="url"
                            value={formData.repoUrl}
                            onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                            className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 font-bold mb-1">
                          Milestone Tasks (Prefix line with ✓ for completed)
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
                          type="submit"
                          className="px-6 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                        >
                          <Save size={14} />
                          <span>Save &amp; Sync Client Portal</span>
                        </button>
                      </div>
                    </form>
                  </div>

                </div>
              )}

              {/* Module 3: Scarcity & Launch Discount Manager */}
              {activeTab === 'scarcity' && (
                <form onSubmit={handleSaveScarcity} className="max-w-xl mx-auto space-y-4 bg-black/40 p-6 rounded-2xl border border-white/10 text-xs">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                    <Sparkles size={16} className="text-amber-400" />
                    <span>Launch Scarcity &amp; Coupon Manager</span>
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Total Available Slots</label>
                      <input
                        type="number"
                        value={launchSlots.total}
                        onChange={(e) => setLaunchSlots({ ...launchSlots, total: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white text-center font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Slots Claimed Today</label>
                      <input
                        type="number"
                        value={launchSlots.claimed}
                        onChange={(e) => setLaunchSlots({ ...launchSlots, claimed: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white text-center font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Discount % Label</label>
                      <input
                        type="text"
                        value={launchSlots.discount}
                        onChange={(e) => setLaunchSlots({ ...launchSlots, discount: e.target.value })}
                        className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white text-center font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Coupon Claim Code</label>
                      <input
                        type="text"
                        value={launchSlots.code}
                        onChange={(e) => setLaunchSlots({ ...launchSlots, code: e.target.value })}
                        className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white text-center font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Save size={14} />
                      <span>Save Scarcity Settings</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Module 4: B2B Invoicing & Payment Terms */}
              {activeTab === 'invoices' && (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <DollarSign size={16} className="text-emerald-400" />
                      <span>B2B Client Invoicing &amp; Milestone Trackers</span>
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {projectList.map((p) => (
                      <div key={p.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono font-bold text-blue-400">{p.id}</span>
                          <span className="px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold rounded-full">
                            Total: ${p.amount || 1500}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-white">{p.client}</div>
                        <div className="text-gray-400 text-[11px]">{p.service}</div>

                        <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px]">
                          <div className="flex justify-between items-center">
                            <span>50% Upfront Deposit:</span>
                            <span className={p.depositPaid ? 'text-green-400 font-bold' : 'text-amber-400 font-bold'}>
                              {p.depositPaid ? `✓ Paid ($${(p.amount || 1500) * 0.5})` : 'Pending'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>50% Final Handoff:</span>
                            <span className={p.finalPaid ? 'text-green-400 font-bold' : 'text-amber-400 font-bold'}>
                              {p.finalPaid ? `✓ Paid ($${(p.amount || 1500) * 0.5})` : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Module 5: Real Speed Audit Leads Log */}
              {activeTab === 'leads' && (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Globe size={16} className="text-blue-400" />
                      <span>Google PageSpeed Audit Prospective Leads Log</span>
                    </h4>
                  </div>

                  <div className="space-y-2">
                    {auditLeads.map((lead) => (
                      <div key={lead.id} className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <div className="font-bold text-white text-sm font-mono">{lead.url}</div>
                          <div className="text-gray-400 text-[11px] mt-0.5">Audited Date: {lead.date}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${lead.score < 50 ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                            Speed: {lead.score}/100
                          </span>
                          <a
                            href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hello, I saw your Google PageSpeed audit for ${lead.url} (Score: ${lead.score}/100). We can optimize your site to 99/100 score.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl flex items-center gap-1"
                          >
                            <Send size={12} />
                            <span>Contact Lead</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  )
}
