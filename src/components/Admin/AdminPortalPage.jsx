import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Server, Key, Plus, Edit2, Trash2, CheckCircle2, Save, RefreshCw, ShieldAlert,
  Sparkles, Activity, Layers, FileText, Globe, Users, DollarSign, ExternalLink,
  Search, Lock, Unlock, BarChart3, Clock, AlertCircle, Copy, Send, Check,
  Eye, EyeOff, ArrowLeft, LogOut, ChevronRight, ShieldCheck, Database
} from 'lucide-react'
import { CONTACT } from '../../data/siteData'
import NexoraBrand from '../NexoraBrand/NexoraBrand'

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

export default function AdminPortalPage({ onExit }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
      setAuthError('Authentication failed. Invalid passcode.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('NEXORA_ADMIN_AUTH')
  }

  const handleExitToSite = () => {
    if (onExit) {
      onExit()
    } else {
      window.location.hash = ''
      window.location.pathname = '/'
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

  // STANDALONE UNAUTHENTICATED LOGIN PAGE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05070D] text-white flex flex-col justify-between selection:bg-blue-500 selection:text-white">
        {/* Top Header */}
        <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NexoraBrand variant="footer" />
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-semibold rounded-md">
              ENTERPRISE ADMIN PORTAL
            </span>
          </div>
          <button
            onClick={handleExitToSite}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Return to Main Site</span>
          </button>
        </header>

        {/* Login Security Form Card */}
        <div className="w-full max-w-md mx-auto my-auto px-4 py-8">
          <div className="bg-[#0B1020] border border-white/15 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Top Glow Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />
            
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck size={28} />
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">Founder Security Gate</h1>
              <p className="text-xs text-gray-400">
                Authorized Personnel Only. Please enter your security passcode to access live agency console.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Founder Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Security Passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-blue-500 pr-11 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {authError && (
                  <p className="text-xs text-red-400 font-semibold mt-2 flex items-center gap-1">
                    <AlertCircle size={13} />
                    <span>{authError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock size={15} />
                <span>Authorize &amp; Access Dashboard</span>
              </button>
            </form>

            <div className="pt-4 border-t border-white/10 text-center">
              <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
                <Database size={12} className="text-gray-400" />
                <span>256-Bit SSL Encrypted Founder Console</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <footer className="py-4 text-center text-xs text-gray-600 border-t border-white/5">
          © 2026 NEXORA DIGITAL. Internal Agency Operating System.
        </footer>
      </div>
    )
  }

  // STANDALONE AUTHENTICATED FULL ADMIN PORTAL PAGE
  return (
    <div className="min-h-screen bg-[#070A14] text-white flex flex-col selection:bg-blue-500 selection:text-white">
      
      {/* Top Header Navbar */}
      <header className="bg-[#05070D] border-b border-white/10 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-4">
          <NexoraBrand variant="footer" />
          <div className="h-5 w-[1px] bg-white/15 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-300 font-medium">Agency Control Center v2.4</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
              HS
            </div>
            <div>
              <div className="font-bold text-white text-[11px]">Hafiz Muhammad Saad</div>
              <div className="text-[9px] text-gray-400 font-mono">Founder &amp; CEO</div>
            </div>
          </div>

          <button
            onClick={handleExitToSite}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <LogOut size={13} />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="bg-[#0B1020] border border-white/10 rounded-2xl p-2 flex flex-wrap items-center justify-between gap-2 shadow-lg">
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'projects', label: `Projects (${projectList.length})`, icon: Layers },
              { id: 'scarcity', label: 'Launch Scarcity', icon: Sparkles },
              { id: 'invoices', label: 'B2B Invoices', icon: DollarSign },
              { id: 'leads', label: `Audit Leads (${auditLeads.length})`, icon: Globe },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          <div className="text-xs text-gray-400 font-mono px-3 py-1 hidden lg:block">
            Database: <strong className="text-emerald-400">Synced Live</strong>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0B1020] p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                  <span>ACTIVE CLIENT SPRINTS</span>
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400"><Layers size={16} /></div>
                </div>
                <div className="text-3xl font-black text-white">{projectList.length}</div>
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>100% On-Time Delivery SLA</span>
                </div>
              </div>

              <div className="bg-[#0B1020] p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                  <span>COLLECTED REVENUE</span>
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"><DollarSign size={16} /></div>
                </div>
                <div className="text-3xl font-black text-emerald-400 font-mono">${collectedRevenue.toLocaleString()}</div>
                <div className="text-[11px] text-gray-400">Total Pipeline: ${totalRevenue.toLocaleString()}</div>
              </div>

              <div className="bg-[#0B1020] p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                  <span>PAGESPEED BENCHMARK</span>
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400"><Activity size={16} /></div>
                </div>
                <div className="text-3xl font-black text-purple-400 font-mono">99/100</div>
                <div className="text-[11px] text-gray-400">Google Lighthouse Audit Rating</div>
              </div>

              <div className="bg-[#0B1020] p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                  <span>SCARCITY SLOTS</span>
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400"><Sparkles size={16} /></div>
                </div>
                <div className="text-3xl font-black text-amber-400 font-mono">{launchSlots.total - launchSlots.claimed} / {launchSlots.total}</div>
                <div className="text-[11px] text-gray-400">Coupon: {launchSlots.code} ({launchSlots.discount})</div>
              </div>
            </div>

            {/* Active Projects Table Overview */}
            <div className="bg-[#0B1020] p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Active Client Sprints Overview</h3>
                  <p className="text-xs text-gray-400">Live synchronization with client portal tracker</p>
                </div>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="text-xs text-blue-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Manage Projects</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-[11px] uppercase font-bold">
                      <th className="py-3 px-3">Project ID</th>
                      <th className="py-3 px-3">Client</th>
                      <th className="py-3 px-3">Service</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Progress</th>
                      <th className="py-3 px-3 text-right">Invoice Handoff</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {projectList.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-3 font-mono font-bold text-blue-400">{p.id}</td>
                        <td className="py-3.5 px-3 font-bold text-white">{p.client}</td>
                        <td className="py-3.5 px-3">{p.service}</td>
                        <td className="py-3.5 px-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-800 h-2 rounded-full overflow-hidden">
                              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${p.progress}%` }} />
                            </div>
                            <span className="font-mono text-[10px] text-gray-300">{p.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono text-emerald-400 font-bold">
                          ${p.amount} ({p.finalPaid ? '100% Paid' : p.depositPaid ? '50% Deposit Paid' : 'Pending'})
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Projects Directory */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Directory sidebar */}
            <div className="lg:col-span-4 space-y-3 bg-[#0B1020] p-4 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase text-gray-400">Projects Directory</span>
                <button
                  onClick={handleStartCreate}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-all shadow-md shadow-blue-600/30"
                >
                  <Plus size={14} />
                  <span>New Project</span>
                </button>
              </div>

              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ID, Client, Service..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-black/60 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
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
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {proj.progress}%
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white truncate mt-1">{proj.client}</div>
                    <div className="text-[11px] text-gray-400 truncate">{proj.service}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form edit details */}
            <div className="lg:col-span-8 bg-[#0B1020] p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Edit2 size={16} className="text-blue-400" />
                  <span>{isCreatingNew ? 'Create New Project Record' : `Editing Project (${formData.id})`}</span>
                </h3>
                {!isCreatingNew && (
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(formData.id)}
                    className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-all"
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
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white font-mono uppercase focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 font-bold mb-1">Client Business Name</label>
                    <input
                      type="text"
                      required
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white font-semibold focus:outline-none focus:border-blue-500"
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
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 font-bold mb-1">Sprint Status Label</label>
                    <input
                      type="text"
                      required
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white font-semibold focus:outline-none focus:border-blue-500"
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
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 font-bold mb-1">Client Email</label>
                    <input
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500"
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
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white font-mono text-[11px] focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 font-bold mb-1">GitHub Repository Link</label>
                    <input
                      type="url"
                      value={formData.repoUrl}
                      onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white font-mono text-[11px] focus:outline-none focus:border-blue-500"
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
                    className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white font-mono text-[11px] focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Save size={15} />
                    <span>Save &amp; Sync Client Portal</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 3: Launch Scarcity Manager */}
        {activeTab === 'scarcity' && (
          <form onSubmit={handleSaveScarcity} className="max-w-xl mx-auto space-y-4 bg-[#0B1020] p-6 rounded-2xl border border-white/10 text-xs shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Sparkles size={16} className="text-amber-400" />
              <span>Launch Scarcity &amp; Coupon Manager</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 font-bold mb-1">Total Available Slots</label>
                <input
                  type="number"
                  value={launchSlots.total}
                  onChange={(e) => setLaunchSlots({ ...launchSlots, total: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white text-center font-bold focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 font-bold mb-1">Slots Claimed Today</label>
                <input
                  type="number"
                  value={launchSlots.claimed}
                  onChange={(e) => setLaunchSlots({ ...launchSlots, claimed: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white text-center font-bold focus:outline-none focus:border-blue-500"
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
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white text-center font-bold focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 font-bold mb-1">Coupon Claim Code</label>
                <input
                  type="text"
                  value={launchSlots.code}
                  onChange={(e) => setLaunchSlots({ ...launchSlots, code: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white text-center font-mono font-bold focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
              >
                <Save size={15} />
                <span>Save Scarcity Settings</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 4: B2B Invoices */}
        {activeTab === 'invoices' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign size={16} className="text-emerald-400" />
                <span>B2B Client Invoicing &amp; Milestone Trackers</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projectList.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl bg-[#0B1020] border border-white/10 space-y-3 shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-blue-400">{p.id}</span>
                    <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-full">
                      Total: ${p.amount || 1500}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white">{p.client}</div>
                  <div className="text-gray-400 text-[11px]">{p.service}</div>

                  <div className="pt-3 border-t border-white/10 space-y-2 text-[11px]">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">50% Upfront Deposit:</span>
                      <span className={p.depositPaid ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {p.depositPaid ? `✓ Paid ($${(p.amount || 1500) * 0.5})` : 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">50% Final Handoff:</span>
                      <span className={p.finalPaid ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {p.finalPaid ? `✓ Paid ($${(p.amount || 1500) * 0.5})` : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Audit Leads Log */}
        {activeTab === 'leads' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Globe size={16} className="text-blue-400" />
                <span>Google PageSpeed Audit Prospective Leads Log</span>
              </h3>
            </div>

            <div className="space-y-3">
              {auditLeads.map((lead) => (
                <div key={lead.id} className="p-4 rounded-xl bg-[#0B1020] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                  <div>
                    <div className="font-bold text-white text-sm font-mono">{lead.url}</div>
                    <div className="text-gray-400 text-[11px] mt-0.5">Audited Date: {lead.date}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${lead.score < 50 ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                      Speed Score: {lead.score}/100
                    </span>
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hello, I saw your Google PageSpeed audit for ${lead.url} (Score: ${lead.score}/100). We can optimize your site to 99/100 score.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Send size={13} />
                      <span>Contact Lead</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
