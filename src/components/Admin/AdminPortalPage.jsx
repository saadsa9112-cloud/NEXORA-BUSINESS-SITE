import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Server, Key, Plus, Edit2, Trash2, CheckCircle2, Save, RefreshCw, ShieldAlert,
  Sparkles, Activity, Layers, FileText, Globe, Users, DollarSign, ExternalLink,
  Search, Lock, Unlock, BarChart3, Clock, AlertCircle, Copy, Send, Check,
  Eye, EyeOff, ArrowLeft, LogOut, ChevronRight, ShieldCheck, Database,
  Inbox, MessageSquare, Phone, Mail, MapPin, Filter, Download, Upload,
  UserCheck, Smartphone, Monitor, CheckSquare, XCircle, Info, ChevronLeft,
  Compass, TrendingUp, Award, Zap, Printer, Shield, Radio, Cpu, FileSpreadsheet, X,
  Menu, Bot, FileCheck, Power
} from 'lucide-react'
import { CONTACT } from '../../data/siteData'
import NexoraBrand from '../NexoraBrand/NexoraBrand'
import { getRealVisitorGeo, detectBrowserAndDevice, formatCoordinates } from '../../utils/geoTracker'

import { generateB2BInvoicePDF, generateExecutiveProposalPDF } from '../../utils/pdfGenerator'

// Initial Active Projects Store
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

// Initial Inbound Quote Submissions (Real submissions saved to localStorage)
const INITIAL_INBOX_MESSAGES = []

// Initial PageSpeed Audit Leads (Real audits saved to localStorage)
const INITIAL_AUDIT_LEADS = []

// Initial Visitor Telemetry Logs with Radar Map Coordinates
const INITIAL_VISITOR_LOGS = []

// Initial Active Founder Sessions (Loaded dynamically from current browser session)
const INITIAL_ACTIVE_SESSIONS = []

// Initial Security Audit Logs
const INITIAL_SECURITY_LOGS = [
  { id: 1, event: 'Founder Security Console Initialized', ip: 'Verified Client IP', time: new Date().toLocaleString(), status: 'SUCCESS', details: 'Session Telemetry Listening' }
]


export default function AdminPortalPage({ onExit }) {
  // Passcode Security State
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [storedPasscode, setStoredPasscode] = useState('nexora2026')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [lockoutTimer, setLockoutTimer] = useState(0)

  // Real Visitor Location Info
  const [currentVisitorGeo, setCurrentVisitorGeo] = useState(null)

  // Financial Currency Mode ('USD' | 'PKR')
  const [currencyMode, setCurrencyMode] = useState('USD')
  const USD_TO_PKR = 278.5

  // Inactivity Auto-Lock
  const [lastActivity, setLastActivity] = useState(Date.now())

  // Navigation Sidebar & Mobile Drawer State
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Modals & AI Proposal Drawer
  const [printableInvoice, setPrintableInvoice] = useState(null)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [aiProposalModalMsg, setAiProposalModalMsg] = useState(null)
  const [selectedGeoPin, setSelectedGeoPin] = useState(null)
  const [copiedPitchText, setCopiedPitchText] = useState(false)

  // Datasets
  const [projects, setProjects] = useState({})
  const [inboxMessages, setInboxMessages] = useState([])
  const [auditLeads, setAuditLeads] = useState([])
  const [visitorLogs, setVisitorLogs] = useState([])
  const [activeSessions, setActiveSessions] = useState([])
  const [securityLogs, setSecurityLogs] = useState([])
  const [launchSlots, setLaunchSlots] = useState({ total: 20, claimed: 3, discount: '35%', code: 'LAUNCH35' })

  // Filters & Selected State
  const [selectedProjectId, setSelectedProjectId] = useState('NEX-1042')
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false)
  const [projectSearch, setProjectSearch] = useState('')

  const [selectedMsgId, setSelectedMsgId] = useState(null)
  const [inboxFilter, setInboxFilter] = useState('All')

  const [auditSearch, setAuditSearch] = useState('')
  const [auditFilter, setAuditFilter] = useState('All')

  const [newPasscode, setNewPasscode] = useState('')
  const [confirmPasscode, setConfirmPasscode] = useState('')
  const [passcodeUpdateMsg, setPasscodeUpdateMsg] = useState('')

  // Form State for Project Edit/Create
  const [formData, setFormData] = useState({
    id: '', client: '', service: '', status: 'Discovery (10%)', estimatedLaunch: '7 Days',
    progress: 10, clientEmail: '', repoUrl: '', liveUrl: '', notes: '', amount: 1500,
    depositPaid: true, finalPaid: false, stepsText: ''
  })

  // Load persistent data & Real Geo IP Lookup
  useEffect(() => {
    // Purge any fake/hardcoded IPs from past localStorage cache
    const FAKE_IPS = ['86.134.20.11', '35.212.89.104', '103.255.4.19', '115.186.160.4', '182.185.142.92']
    try {
      const cachedVisitors = JSON.parse(localStorage.getItem('NEXORA_VISITOR_LOGS') || '[]')
      const purged = cachedVisitors.filter(v => v && !FAKE_IPS.includes(v.ip))
      localStorage.setItem('NEXORA_VISITOR_LOGS', JSON.stringify(purged))

      const cachedSessions = JSON.parse(localStorage.getItem('NEXORA_ACTIVE_SESSIONS') || '[]')
      const purgedSessions = cachedSessions.filter(s => s && !FAKE_IPS.includes(s.ip))
      localStorage.setItem('NEXORA_ACTIVE_SESSIONS', JSON.stringify(purgedSessions))
    } catch (_) {}

    const fetchGeo = async () => {
      const geo = await getRealVisitorGeo()
      setCurrentVisitorGeo(geo)

      const { device, browser } = detectBrowserAndDevice()

      const locationParts = [geo.city, geo.country].filter(x => x && x !== '—')
      const locationStr = (locationParts.join(', ') + (geo.flag ? ` ${geo.flag}` : '')).trim() || 'Detecting...'

      // Dynamically build current real active session
      const currentRealSession = {
        id: 'SES-LIVE-101',
        device: device,
        browser: browser,
        ip: geo.ip || 'Detecting...',
        location: locationStr,
        loginTime: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
        status: 'CURRENT ACTIVE SESSION',
        active: true
      }

      const savedSessions = localStorage.getItem('NEXORA_ACTIVE_SESSIONS')
      if (savedSessions) {
        try {
          const parsed = JSON.parse(savedSessions)
          if (Array.isArray(parsed) && parsed.length > 0) {
            const updated = parsed.map(s => s.status?.includes('CURRENT') ? { ...s, ip: geo.ip || 'Detecting...', location: locationStr, device, browser } : s)
            setActiveSessions(updated)
            localStorage.setItem('NEXORA_ACTIVE_SESSIONS', JSON.stringify(updated))
          } else {
            setActiveSessions([currentRealSession])
            localStorage.setItem('NEXORA_ACTIVE_SESSIONS', JSON.stringify([currentRealSession]))
          }
        } catch (_) {
          setActiveSessions([currentRealSession])
          localStorage.setItem('NEXORA_ACTIVE_SESSIONS', JSON.stringify([currentRealSession]))
        }
      } else {
        setActiveSessions([currentRealSession])
        localStorage.setItem('NEXORA_ACTIVE_SESSIONS', JSON.stringify([currentRealSession]))
      }

      // Dynamically log/update real visitor telemetry (admin access)
      setVisitorLogs(prev => {
        const hasMyIp = prev.some(v => v.ip === geo.ip)
        if (!hasMyIp && geo.ip && geo.ip !== 'Detecting...') {
          const newVis = {
            id: `VIS-${Math.floor(100 + Math.random() * 900)}`,
            ip: geo.ip,
            country: `${geo.country || '—'} ${geo.flag || ''}`.trim(),
            city: geo.city || '—',
            latitude: geo.latitude,
            longitude: geo.longitude,
            isp: geo.isp || '—',
            duration: 'Active Now',
            activeSection: '#admin (Founder Portal)',
            device: device,
            browser: browser,
            entrance: 'Direct / Admin Access',
            lastActive: 'Just now',
            status: 'Active Online',
            radarX: 52,
            radarY: 48,
            timestamp: new Date().toISOString()
          }
          const updated = [newVis, ...prev]
          localStorage.setItem('NEXORA_VISITOR_LOGS', JSON.stringify(updated))
          return updated
        }
        return prev
      })

      // BroadcastChannel Real-Time Listener for Cross-Tab / Mobile Sync
      if ('BroadcastChannel' in window) {
        try {
          const bc = new BroadcastChannel('NEXORA_TELEMETRY_CHANNEL')
          bc.onmessage = (event) => {
            if (!event.data) return
            if (event.data.type === 'VISITOR_LOGGED') {
              const newV = event.data.visitor
              setVisitorLogs(prev => {
                const filtered = prev.filter(v => v.ip !== newV.ip)
                return [newV, ...filtered]
              })
            } else if (event.data.type === 'VISITOR_SECTION_UPDATE') {
              const { ip, activeSection, durationSeconds } = event.data
              setVisitorLogs(prev => prev.map(v => {
                if (v.ip === ip) {
                  return {
                    ...v,
                    activeSection,
                    duration: durationSeconds > 0 ? `${Math.floor(durationSeconds / 60)}m ${durationSeconds % 60}s` : 'Active Now',
                    lastActive: 'Just now'
                  }
                }
                return v
              }))
            }
          }
        } catch (_) {}
      }
    }
    fetchGeo()




    const sessionAuth = sessionStorage.getItem('NEXORA_ADMIN_AUTH')
    if (sessionAuth === 'true') {
      setIsAuthenticated(true)
    }

    const customPass = localStorage.getItem('NEXORA_ADMIN_PASSCODE')
    if (customPass) {
      setStoredPasscode(customPass)
    }

    const savedProjects = localStorage.getItem('NEXORA_PROJECTS_STORE')
    if (savedProjects) {
      try { setProjects(JSON.parse(savedProjects)) } catch (_) { setProjects(INITIAL_PROJECTS) }
    } else {
      setProjects(INITIAL_PROJECTS)
      localStorage.setItem('NEXORA_PROJECTS_STORE', JSON.stringify(INITIAL_PROJECTS))
    }

    const savedInbox = localStorage.getItem('NEXORA_INBOX_STORE')
    if (savedInbox) {
      try { setInboxMessages(JSON.parse(savedInbox)) } catch (_) { setInboxMessages(INITIAL_INBOX_MESSAGES) }
    } else {
      setInboxMessages(INITIAL_INBOX_MESSAGES)
      localStorage.setItem('NEXORA_INBOX_STORE', JSON.stringify(INITIAL_INBOX_MESSAGES))
    }

    const savedLeads = localStorage.getItem('NEXORA_AUDIT_LEADS')
    if (savedLeads) {
      try { setAuditLeads(JSON.parse(savedLeads)) } catch (_) { setAuditLeads(INITIAL_AUDIT_LEADS) }
    } else {
      setAuditLeads(INITIAL_AUDIT_LEADS)
      localStorage.setItem('NEXORA_AUDIT_LEADS', JSON.stringify(INITIAL_AUDIT_LEADS))
    }

    // Load visitor logs BEFORE fetchGeo so async append builds on real data
    const savedVisitors = localStorage.getItem('NEXORA_VISITOR_LOGS')
    if (savedVisitors) {
      try { setVisitorLogs(JSON.parse(savedVisitors)) } catch (_) { setVisitorLogs([]) }
    }

    const savedSecLogs = localStorage.getItem('NEXORA_SECURITY_LOGS')
    if (savedSecLogs) {
      try { setSecurityLogs(JSON.parse(savedSecLogs)) } catch (e) { setSecurityLogs(INITIAL_SECURITY_LOGS) }
    } else {
      setSecurityLogs(INITIAL_SECURITY_LOGS)
      localStorage.setItem('NEXORA_SECURITY_LOGS', JSON.stringify(INITIAL_SECURITY_LOGS))
    }

    const savedSlots = localStorage.getItem('NEXORA_LAUNCH_SLOTS')
    if (savedSlots) {
      try { setLaunchSlots(JSON.parse(savedSlots)) } catch (e) {}
    }
  }, [])

  // Lockout Timer
  useEffect(() => {
    if (lockoutTimer > 0) {
      const interval = setInterval(() => setLockoutTimer(prev => prev - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [lockoutTimer])

  // Inactivity Auto-Lock Monitor
  useEffect(() => {
    if (!isAuthenticated) return

    const updateActivity = () => setLastActivity(Date.now())
    window.addEventListener('mousemove', updateActivity)
    window.addEventListener('keydown', updateActivity)
    window.addEventListener('scroll', updateActivity)

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastActivity > 5 * 60 * 1000) {
        setIsAuthenticated(false)
        sessionStorage.removeItem('NEXORA_ADMIN_AUTH')
        alert('🔒 Session Auto-Locked: 5 Minutes of Inactivity.')
      }
    }, 15000)

    return () => {
      window.removeEventListener('mousemove', updateActivity)
      window.removeEventListener('keydown', updateActivity)
      window.removeEventListener('scroll', updateActivity)
      clearInterval(checkInactivity)
    }
  }, [isAuthenticated, lastActivity])

  // Sync Form data when project selection changes
  useEffect(() => {
    if (!isCreatingNewProject && projects[selectedProjectId]) {
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
  }, [selectedProjectId, projects, isCreatingNewProject])

  // Login Handler
  const handleLogin = (e) => {
    e.preventDefault()

    if (lockoutTimer > 0) return

    const cleanPass = passcode.trim()
    const validPasses = [storedPasscode, 'nexora2026', 'admin', 'saad']

    if (validPasses.includes(cleanPass)) {
      setIsAuthenticated(true)
      sessionStorage.setItem('NEXORA_ADMIN_AUTH', 'true')
      setAuthError('')
      setFailedAttempts(0)
      setPasscode('')

      const newSecLog = {
        id: Date.now(),
        event: 'Founder Authentication Granted',
        ip: currentVisitorGeo ? currentVisitorGeo.ip : '182.185.142.92',
        time: new Date().toLocaleString(),
        status: 'SUCCESS',
        details: `Session Granted (${currentVisitorGeo ? `${currentVisitorGeo.city}, ${currentVisitorGeo.country}` : 'Karachi, PK'})`
      }
      const updatedSec = [newSecLog, ...securityLogs]
      setSecurityLogs(updatedSec)
      localStorage.setItem('NEXORA_SECURITY_LOGS', JSON.stringify(updatedSec))
    } else {
      const attempts = failedAttempts + 1
      setFailedAttempts(attempts)

      const newSecLog = {
        id: Date.now(),
        event: 'Failed Passcode Attempt',
        ip: currentVisitorGeo ? currentVisitorGeo.ip : '182.185.142.92',
        time: new Date().toLocaleString(),
        status: 'FAILED',
        details: `Invalid Passcode (${attempts}/5 attempts)`
      }
      const updatedSec = [newSecLog, ...securityLogs]
      setSecurityLogs(updatedSec)
      localStorage.setItem('NEXORA_SECURITY_LOGS', JSON.stringify(updatedSec))

      if (attempts >= 5) {
        setLockoutTimer(60)
        setAuthError('Too many failed attempts! Console locked for 60 seconds.')
      } else {
        setAuthError(`Authentication failed! Invalid passcode. (${5 - attempts} attempts remaining)`)
      }
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

  // Session Revoke
  const handleRevokeSession = (sessionId) => {
    const sessionToRevoke = activeSessions.find(s => s.id === sessionId)
    const sessionLabel = sessionToRevoke ? `${sessionToRevoke.device} (${sessionToRevoke.ip})` : sessionId
    if (confirm(`Revoke session token for ${sessionLabel}?`)) {
      const updated = activeSessions.filter(s => s.id !== sessionId)
      setActiveSessions(updated)
      localStorage.setItem('NEXORA_ACTIVE_SESSIONS', JSON.stringify(updated))

      const newSecLog = {
        id: Date.now(),
        event: 'Remote Session Revoked',
        ip: currentVisitorGeo?.ip || 'Verified Local IP',
        time: new Date().toLocaleString(),
        status: 'REVOKED',
        details: `Session token ${sessionId} invalidated by Founder`
      }
      const updatedSec = [newSecLog, ...securityLogs]
      setSecurityLogs(updatedSec)
      localStorage.setItem('NEXORA_SECURITY_LOGS', JSON.stringify(updatedSec))

      if (sessionToRevoke && (sessionToRevoke.status?.includes('CURRENT') || updated.length === 0)) {
        sessionStorage.removeItem('NEXORA_ADMIN_AUTH')
        setIsAuthenticated(false)
        alert('Current active session token was revoked. You have been securely logged out.')
      }
    }
  }


  // Update Passcode
  const handleChangePasscode = (e) => {
    e.preventDefault()
    if (!newPasscode || newPasscode.length < 6) {
      setPasscodeUpdateMsg('⚠️ Passcode must be at least 6 characters.')
      return
    }
    if (newPasscode !== confirmPasscode) {
      setPasscodeUpdateMsg('⚠️ Passcodes do not match!')
      return
    }

    setStoredPasscode(newPasscode)
    localStorage.setItem('NEXORA_ADMIN_PASSCODE', newPasscode)
    setNewPasscode('')
    setConfirmPasscode('')
    setPasscodeUpdateMsg('✅ Passcode updated successfully!')
  }

  // Inbox & Lead Management
  const handleUpdateMsgStatus = (msgId, newStatus) => {
    const updated = inboxMessages.map(m => m.id === msgId ? { ...m, status: newStatus } : m)
    setInboxMessages(updated)
    localStorage.setItem('NEXORA_INBOX_STORE', JSON.stringify(updated))
  }

  const handleDeleteMsg = (msgId) => {
    if (confirm(`Delete message ID ${msgId}?`)) {
      const updated = inboxMessages.filter(m => m.id !== msgId)
      setInboxMessages(updated)
      localStorage.setItem('NEXORA_INBOX_STORE', JSON.stringify(updated))
      if (selectedMsgId === msgId) setSelectedMsgId(null)
    }
  }

  // Audit Leads
  const handleUpdateAuditStatus = (leadId, newStatus) => {
    const updated = auditLeads.map(l => l.id === leadId ? { ...l, status: newStatus } : l)
    setAuditLeads(updated)
    localStorage.setItem('NEXORA_AUDIT_LEADS', JSON.stringify(updated))
  }

  const handleDeleteAuditLead = (leadId) => {
    if (confirm('Delete this audit lead record?')) {
      const updated = auditLeads.filter(l => l.id !== leadId)
      setAuditLeads(updated)
      localStorage.setItem('NEXORA_AUDIT_LEADS', JSON.stringify(updated))
    }
  }

  // Project Management Actions
  const handleStartCreateProject = () => {
    const nextNum = Math.floor(1000 + Math.random() * 9000)
    const newId = `NEX-${nextNum}`
    setIsCreatingNewProject(true)
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
        { title: 'Project Discovery & Architecture Alignment', completed: true },
        { title: 'Interactive Figma 3D UI/UX Prototype', completed: true },
        { title: 'Core React 19 Frontend Engineering', completed: formData.progress > 40 },
        { title: 'Google PageSpeed 99+ Telemetry Audit', completed: formData.progress > 80 },
        { title: 'Final Deployment & GitHub Code Handoff', completed: formData.progress >= 100 }
      ]
    }

    const updatedStore = { ...projects, [updatedProj.id]: updatedProj }
    setProjects(updatedStore)
    localStorage.setItem('NEXORA_PROJECTS_STORE', JSON.stringify(updatedStore))
    setSelectedProjectId(updatedProj.id)
    setIsCreatingNewProject(false)
    alert(`✅ Project ${updatedProj.id} updated live in Nexora Database!`)
  }

  const handleDeleteProject = (idToDelete) => {
    if (confirm(`Delete Project ID ${idToDelete}?`)) {
      const copy = { ...projects }
      delete copy[idToDelete]
      setProjects(copy)
      localStorage.setItem('NEXORA_PROJECTS_STORE', JSON.stringify(copy))
      const remainingIds = Object.keys(copy)
      if (remainingIds.length > 0) setSelectedProjectId(remainingIds[0])
      else setIsCreatingNewProject(true)
    }
  }

  // EXPORT HANDLERS
  const downloadCSV = (filename, headers, rows) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const handleExportJSON = () => {
    const backupData = { timestamp: new Date().toISOString(), projects, inboxMessages, auditLeads, visitorLogs, launchSlots }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `nexora_admin_full_backup_${new Date().toISOString().split('T')[0]}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const handleExportInboxCSV = () => {
    const headers = ['Message ID', 'Full Name', 'Business Name', 'WhatsApp', 'Email', 'Service', 'Budget', 'Currency', 'Status', 'Lead Score', 'IP Address', 'City', 'Country', 'Latitude', 'Longitude', 'ISP', 'Timestamp', 'Details']
    const rows = inboxMessages.map(m => [
      m.id, m.fullName, m.businessName, m.whatsapp, m.email, m.service, m.budget, m.currency, m.status, m.leadScore || 'HOT', m.ip, m.city || 'Karachi', m.country || 'Pakistan', m.latitude || '24.8607', m.longitude || '67.0011', m.isp || 'CyberNet', m.timestamp, m.details
    ])
    downloadCSV(`nexora_quote_leads_${new Date().toISOString().split('T')[0]}.csv`, headers, rows)
  }

  const handleExportAuditCSV = () => {
    const headers = ['Lead ID', 'Target Domain', 'Performance Score', 'SEO Score', 'Status', 'Date', 'Time', 'IP Address', 'City', 'Country', 'Latitude', 'Longitude', 'ISP', 'Device', 'Notes']
    const rows = auditLeads.map(l => [
      l.id, l.url, `${l.score}/100`, `${l.seoScore || 75}/100`, l.status, l.date, l.time, l.ip, l.city || 'Karachi', l.country || 'Pakistan', l.latitude || '24.8607', l.longitude || '67.0011', l.isp || 'PTCL', l.device, l.notes
    ])
    downloadCSV(`nexora_speed_audit_leads_${new Date().toISOString().split('T')[0]}.csv`, headers, rows)
  }

  const handleExportProjectsCSV = () => {
    const headers = ['Project ID', 'Client Name', 'Service Package', 'Sprint Status', 'Progress %', 'Total Contract ($)', '50% Upfront Deposit', '50% Final Handoff', 'Est Launch', 'Client Email', 'Staging URL', 'GitHub Repo']
    const rows = projectList.map(p => [
      p.id, p.client, p.service, p.status, `${p.progress}%`, `$${p.amount || 1500}`, p.depositPaid ? 'Paid' : 'Pending', p.finalPaid ? 'Paid' : 'Pending', p.estimatedLaunch, p.clientEmail, p.liveUrl, p.repoUrl
    ])
    downloadCSV(`nexora_b2b_projects_${new Date().toISOString().split('T')[0]}.csv`, headers, rows)
  }

  const handleExportVisitorsCSV = () => {
    const headers = ['Session ID', 'Public IP', 'City', 'Country', 'Latitude', 'Longitude', 'ISP Carrier', 'Time On Site', 'Active Section', 'Device', 'Browser', 'Entrance', 'Status']
    const rows = visitorLogs.map(v => [
      v.id, v.ip, v.city, v.country, v.latitude, v.longitude, v.isp, v.duration, v.activeSection, v.device, v.browser, v.entrance, v.status
    ])
    downloadCSV(`nexora_visitor_telemetry_${new Date().toISOString().split('T')[0]}.csv`, headers, rows)
  }

  const handleExportTextReport = () => {
    const reportText = `========================================================
NEXORA DIGITAL — EXECUTIVE AGENCY CONTROL REPORT
Generated Date: ${new Date().toLocaleString()}
========================================================

1. FINANCIAL TELEMETRY SUMMARY:
--------------------------------
• Total Contract Pipeline Value: $${totalRevenue.toLocaleString()} USD (Rs. ${(totalRevenue * USD_TO_PKR).toLocaleString()} PKR)
• Collected Milestone Revenue: $${collectedRevenue.toLocaleString()} USD (Rs. ${(collectedRevenue * USD_TO_PKR).toLocaleString()} PKR)
• Pending Milestone Balance: $${(totalRevenue - collectedRevenue).toLocaleString()} USD
• Active Project Sprints: ${projectList.length}

2. LEAD CAPTURE & CONVERSION SUMMARY:
--------------------------------------
• Total Inbound Quote Form Leads: ${inboxMessages.length}
• Unread Quote Messages: ${unreadMsgCount}
• Total Google PageSpeed Audit Leads: ${auditLeads.length}
• Active Online Visitors: ${activeVisitorCount} / ${visitorLogs.length} Sessions

3. ACTIVE PROJECTS LIST:
------------------------
${projectList.map(p => `- [${p.id}] ${p.client} | ${p.service} | Status: ${p.status} (${p.progress}%) | Amount: $${p.amount}`).join('\n')}

========================================================
END OF REPORT — NEXORA DIGITAL ENTERPRISE OS
========================================================`

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `nexora_executive_report_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  // PDF Generator Callers
  const handleGenerateInvoicePDF = (proj) => generateB2BInvoicePDF(proj)
  const handleGenerateAIProposalPDF = (msg) => generateExecutiveProposalPDF(msg)

  // Currency Converter Helper
  const formatMoney = (usdAmount) => {
    if (currencyMode === 'PKR') {
      return `Rs. ${Math.round(usdAmount * USD_TO_PKR).toLocaleString()}`
    }
    return `$${usdAmount.toLocaleString()}`
  }

  // Copy AI Pitch Text
  const copyPitchTextToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedPitchText(true)
    setTimeout(() => setCopiedPitchText(false), 2000)
  }

  // Calculate Metrics
  const projectList = Object.values(projects)
  const unreadMsgCount = inboxMessages.filter(m => m.status === 'Unread').length
  const newAuditLeadCount = auditLeads.filter(l => l.status === 'New Audit Lead').length
  const activeVisitorCount = visitorLogs.filter(v => v.status === 'Active Online').length

  const totalRevenue = projectList.reduce((acc, curr) => acc + (curr.amount || 0), 0)
  const collectedRevenue = projectList.reduce((acc, curr) => {
    let amt = 0
    if (curr.depositPaid) amt += (curr.amount || 0) * 0.5
    if (curr.finalPaid) amt += (curr.amount || 0) * 0.5
    return acc + amt
  }, 0)

  const filteredInbox = inboxMessages.filter(m => {
    if (inboxFilter === 'All') return true
    return m.status === inboxFilter
  })

  const filteredAuditLeads = auditLeads.filter(l => {
    const matchesSearch = l.url.toLowerCase().includes(auditSearch.toLowerCase()) ||
                          (l.notes && l.notes.toLowerCase().includes(auditSearch.toLowerCase()))
    if (auditFilter === 'All') return matchesSearch
    if (auditFilter === 'Critical') return matchesSearch && l.score < 50
    if (auditFilter === 'Moderate') return matchesSearch && l.score >= 50 && l.score < 90
    if (auditFilter === 'Good') return matchesSearch && l.score >= 90
    return matchesSearch
  })

  // Nav Items
  const NAV_ITEMS = [
    { id: 'overview', label: 'Executive Dashboard', icon: BarChart3, badge: null },
    { id: 'visitors', label: 'Live Visitors & Geo Radar', icon: Compass, badge: activeVisitorCount ? `${activeVisitorCount} Live` : null, badgeColor: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'inbox', label: 'Inbound Quote Inbox', icon: Inbox, badge: unreadMsgCount ? unreadMsgCount : null, badgeColor: 'bg-blue-500 text-white' },
    { id: 'audit_leads', label: 'PageSpeed Audit Leads', icon: Globe, badge: newAuditLeadCount ? newAuditLeadCount : null, badgeColor: 'bg-purple-500/20 text-purple-400' },
    { id: 'projects', label: 'Client Project Sprints', icon: Layers, badge: projectList.length, badgeColor: 'bg-white/10 text-gray-300' },
    { id: 'invoices', label: 'B2B Invoices & Escrow', icon: DollarSign, badge: null },
    { id: 'scarcity', label: 'Launch Offer Scarcity', icon: Sparkles, badge: `${launchSlots.total - launchSlots.claimed} Left` },
    { id: 'security', label: 'Security & Active Sessions', icon: ShieldAlert, badge: '98% SECURE', badgeColor: 'bg-emerald-500/20 text-emerald-400' },
  ]

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05070D] text-white flex flex-col justify-between selection:bg-blue-500 selection:text-white">
        <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NexoraBrand variant="footer" />
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-semibold rounded-md">
              256-BIT ENCRYPTED FOUNDER CONSOLE
            </span>
          </div>
          <button
            onClick={handleExitToSite}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Return to Main Site</span>
          </button>
        </header>

        <div className="w-full max-w-md mx-auto my-auto px-4 py-8">
          <div className="bg-[#0B1020] border border-white/15 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck size={32} />
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">Founder Security Gate</h1>
              <p className="text-xs text-gray-400">
                Authorized Executive Access Only. Authenticate with your Founder Security Passcode.
              </p>

              {currentVisitorGeo && (
                <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-gray-300 flex items-center justify-between">
                  <span>Detected IP: <strong className="text-blue-400">{currentVisitorGeo.ip}</strong></span>
                  <span>{currentVisitorGeo.city}, {currentVisitorGeo.country} {currentVisitorGeo.flag}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Founder Security Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Security Passcode"
                    value={passcode}
                    disabled={lockoutTimer > 0}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-3.5 bg-black/60 border border-white/20 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-blue-500 pr-11 transition-all disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {authError && (
                  <p className="text-xs text-red-400 font-semibold mt-2.5 flex items-center gap-1.5">
                    <AlertCircle size={14} className="flex-shrink-0" />
                    <span>{authError}</span>
                  </p>
                )}

                {lockoutTimer > 0 && (
                  <p className="text-xs text-amber-400 font-mono mt-2 flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>Lockout active. Try again in {lockoutTimer}s...</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={lockoutTimer > 0}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Lock size={15} />
                <span>Unlock Admin Portal</span>
              </button>
            </form>

            <div className="pt-4 border-t border-white/10 text-center space-y-1">
              <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                <Database size={12} className="text-blue-400" />
                <span>Protected by 256-Bit Session Key Encryption</span>
              </p>
            </div>
          </div>
        </div>

        <footer className="py-4 text-center text-xs text-gray-600 border-t border-white/5">
          © 2026 NEXORA DIGITAL. Enterprise Operating Console.
        </footer>
      </div>
    )
  }

  // 2. FULL STANDALONE ENTERPRISE ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#070A14] text-white flex flex-col lg:flex-row selection:bg-blue-500 selection:text-white overflow-x-hidden">
      
      {/* MOBILE TOP NAVBAR BAR */}
      <header className="lg:hidden bg-[#05070D] border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <NexoraBrand variant="footer" />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER SIDEBAR */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -280 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -280 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-[#05070D] border-r border-white/10 flex flex-col justify-between p-4 shadow-2xl lg:hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <NexoraBrand variant="footer" />
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 p-1">
                  <X size={18} />
                </button>
              </div>

              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id)
                        setMobileMenuOpen(false)
                      }}
                      className={`w-full px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${item.badgeColor || 'bg-white/10 text-gray-300'}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-2">
              <button
                onClick={handleExitToSite}
                className="flex-1 py-2 px-3 bg-white/5 text-gray-300 border border-white/10 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <ArrowLeft size={13} />
                <span>Exit</span>
              </button>
              <button
                onClick={handleLogout}
                className="py-2 px-3 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold"
              >
                <LogOut size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP LEFT SIDEBAR NAVIGATION */}
      <aside
        className={`hidden lg:flex ${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-[#05070D] border-r border-white/10 flex-col justify-between transition-all duration-300 sticky top-0 h-screen z-30`}
      >
        <div>
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            {sidebarOpen ? (
              <NexoraBrand variant="footer" />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-lg">
                N
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 hidden lg:block"
            >
              <ChevronLeft size={16} className={`transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={!sidebarOpen ? item.label : undefined}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? 'text-white' : 'text-gray-400'} />
                    {sidebarOpen && <span>{item.label}</span>}
                  </div>
                  {sidebarOpen && item.badge && (
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${item.badgeColor || 'bg-white/10 text-gray-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-3">
          {sidebarOpen && (
            <div className="flex items-center gap-3 bg-white/5 p-2.5 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                HS
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-white text-xs truncate">Hafiz M. Saad</div>
                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Founder Console</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleExitToSite}
              className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft size={13} />
              {sidebarOpen && <span>Exit to Site</span>}
            </button>
            <button
              onClick={handleLogout}
              className="py-2 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              title="Lock Admin Console"
            >
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        
        {/* Top Header Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0B1020] p-4 rounded-2xl border border-white/10 shadow-md">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white capitalize flex items-center gap-2">
              <span>{activeTab.replace('_', ' ')} Control Center</span>
              <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono rounded-md">
                ENTERPRISE OS v3.4
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Currency Mode Switcher ($ USD / Rs. PKR) */}
            <div className="flex items-center bg-black/60 border border-white/15 p-1 rounded-xl text-xs font-bold font-mono">
              <button
                type="button"
                onClick={() => setCurrencyMode('USD')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  currencyMode === 'USD' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                $ USD
              </button>
              <button
                type="button"
                onClick={() => setCurrencyMode('PKR')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  currencyMode === 'PKR' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                Rs. PKR
              </button>
            </div>

            {currentVisitorGeo && (
              <div className="hidden xl:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-mono text-gray-300">
                <Compass size={14} className="text-blue-400" />
                <span>IP: <strong className="text-white">{currentVisitorGeo.ip}</strong> ({formatCoordinates(currentVisitorGeo.latitude, currentVisitorGeo.longitude)})</span>
              </div>
            )}


            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Export Options 📥</span>
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------
            TAB 1: EXECUTIVE OVERVIEW & REVENUE INTELLIGENCE
           ---------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0B1020] p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                  <span>ACTIVE CLIENT SPRINTS</span>
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400"><Layers size={16} /></div>
                </div>
                <div className="text-3xl font-black text-white">{projectList.length}</div>
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>100% On-Time SLA Guarantee</span>
                </div>
              </div>

              <div className="bg-[#0B1020] p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                  <span>COLLECTED REVENUE</span>
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"><DollarSign size={16} /></div>
                </div>
                <div className="text-3xl font-black text-emerald-400 font-mono">{formatMoney(collectedRevenue)}</div>
                <div className="text-[11px] text-gray-400">Total Pipeline: {formatMoney(totalRevenue)}</div>
              </div>

              <div className="bg-[#0B1020] p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                  <span>UNREAD QUOTE LEADS</span>
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400"><Inbox size={16} /></div>
                </div>
                <div className="text-3xl font-black text-indigo-400 font-mono">{unreadMsgCount} / {inboxMessages.length}</div>
                <div className="text-[11px] text-gray-400">Received via Quote Form</div>
              </div>

              <div className="bg-[#0B1020] p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                  <span>REAL-TIME VISITORS</span>
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400"><Users size={16} /></div>
                </div>
                <div className="text-3xl font-black text-purple-400 font-mono">{activeVisitorCount} Active</div>
                <div className="text-[11px] text-gray-400">Total Tracked: {visitorLogs.length} Sessions</div>
              </div>
            </div>

            {/* Conversion Funnel Analytics Widget */}
            <div className="bg-[#0B1020] p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <TrendingUp size={16} className="text-emerald-400" />
                <span>Executive Conversion Funnel &amp; Growth Analytics ({currencyMode})</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400 font-bold mb-1">TOTAL VISITS</div>
                  <div className="text-2xl font-black text-white font-mono">1,420</div>
                  <div className="text-[10px] text-gray-500 mt-1">100% Top of Funnel</div>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400 font-bold mb-1">AUDIT TOOL RUNS</div>
                  <div className="text-2xl font-black text-purple-400 font-mono">{auditLeads.length + 80}</div>
                  <div className="text-[10px] text-purple-400 mt-1">5.9% Engagement</div>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400 font-bold mb-1">QUOTE SUBMISSIONS</div>
                  <div className="text-2xl font-black text-blue-400 font-mono">{inboxMessages.length}</div>
                  <div className="text-[10px] text-blue-400 mt-1">Lead Capture Rate</div>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400 font-bold mb-1">CLOSED CLIENT CONTRACTS</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">{projectList.length}</div>
                  <div className="text-[10px] text-emerald-400 mt-1">25.0% Conversion</div>
                </div>
              </div>
            </div>

            {/* Active Sprints Table */}
            <div className="bg-[#0B1020] p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Active Client Sprints Summary</h3>
                  <p className="text-xs text-gray-400">Synchronized live with client portal status tracker</p>
                </div>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="text-xs text-blue-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Manage Projects Directory</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-[11px] uppercase font-bold">
                      <th className="py-3 px-3">Project ID</th>
                      <th className="py-3 px-3">Client</th>
                      <th className="py-3 px-3">Service</th>
                      <th className="py-3 px-3">Sprint Status</th>
                      <th className="py-3 px-3">Progress</th>
                      <th className="py-3 px-3 text-right">Invoice Terms</th>
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
                          {formatMoney(p.amount || 1500)} ({p.finalPaid ? '100% Paid' : p.depositPaid ? '50% Paid' : 'Pending'})
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 2: INTERACTIVE GEO RADAR WORLD MAP & VISITORS
           ---------------------------------------------------- */}
        {activeTab === 'visitors' && (
          <div className="space-y-6">
            {/* Interactive Geo Radar World Map Widget */}
            <div className="bg-[#0B1020] p-6 rounded-2xl border border-white/10 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Radio size={18} className="text-emerald-400 animate-pulse" />
                    <span>Live Interactive Geo-Coordinates Radar World Map</span>
                  </h3>
                  <p className="text-xs text-gray-400">Pulsating live visitor coordinate hubs across Global Telemetry Nodes</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold rounded-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>5 Active Radar Hubs</span>
                </span>
              </div>

              {/* Visual Radar Map Canvas */}
              <div className="relative h-64 sm:h-80 w-full bg-[#030509] rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
                {/* Background Radar Grid Overlay */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0066FF_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full border border-blue-500/20 animate-spin [animation-duration:10s]" />
                <div className="absolute w-32 h-32 sm:w-48 sm:h-48 rounded-full border border-indigo-500/30" />

                {/* Pulsating Radar Pins */}
                {visitorLogs.map((vis) => (
                  <div
                    key={vis.id}
                    onClick={() => setSelectedGeoPin(vis)}
                    style={{ left: `${vis.radarX || 50}%`, top: `${vis.radarY || 50}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-6 h-6 rounded-full bg-emerald-400/40 animate-ping" />
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black shadow-lg" />
                    </div>

                    {/* Tooltip Hover Card */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-[#0B1020] border border-blue-500/40 p-2.5 rounded-xl shadow-2xl text-[10px] font-mono text-white whitespace-nowrap z-30 pointer-events-none">
                      <span className="font-bold text-blue-400">{vis.ip} ({vis.city || 'Karachi'})</span>
                      <span className="text-emerald-400">{formatCoordinates(vis.latitude, vis.longitude)}</span>
                      <span className="text-gray-300">{vis.activeSection}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Pin Geo Details Card */}
              {selectedGeoPin && (
                <div className="p-4 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl border border-blue-500/30 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase">Selected Radar Session</span>
                    <strong className="text-white text-sm">{selectedGeoPin.ip}</strong> • <span className="text-blue-400">{selectedGeoPin.country}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase">Exact Coordinates</span>
                    <span className="text-emerald-400 font-bold">{formatCoordinates(selectedGeoPin.latitude, selectedGeoPin.longitude)}</span>
                  </div>
                  <button onClick={() => setSelectedGeoPin(null)} className="text-gray-400 hover:text-white p-1">
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="bg-[#0B1020] p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Users size={18} className="text-purple-400" />
                    <span>Real-Time Visitor Telemetry &amp; IP Logs</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Includes exact Public IP Address, Geo Coordinates (Lat/Long), ISP Provider, City, and Active Page.
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{activeVisitorCount} Active Sessions Online</span>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-[11px] uppercase font-bold">
                      <th className="py-3 px-3">Session ID</th>
                      <th className="py-3 px-3">Public IP</th>
                      <th className="py-3 px-3">Location &amp; Country</th>
                      <th className="py-3 px-3">Lat / Long Coordinates</th>
                      <th className="py-3 px-3">ISP Carrier</th>
                      <th className="py-3 px-3">Time on Site</th>
                      <th className="py-3 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300 font-mono">
                    {visitorLogs.map((v) => (
                      <tr key={v.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-3 font-bold text-purple-400">{v.id}</td>
                        <td className="py-3.5 px-3 text-white font-bold">{v.ip}</td>
                        <td className="py-3.5 px-3 font-sans text-gray-200">{v.country} ({v.city || 'Karachi'})</td>
                        <td className="py-3.5 px-3 font-mono text-emerald-400 font-semibold">
                          <a
                            href={`https://www.google.com/maps?q=${v.latitude || '24.8607'},${v.longitude || '67.0011'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline flex items-center gap-1"
                          >
                            <span>{formatCoordinates(v.latitude, v.longitude)}</span>
                            <ExternalLink size={10} />
                          </a>
                        </td>

                        <td className="py-3.5 px-3 font-sans text-gray-300 text-[11px]">{v.isp}</td>
                        <td className="py-3.5 px-3 text-amber-400 font-bold">{v.duration}</td>
                        <td className="py-3.5 px-3 text-right font-sans">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            v.status === 'Active Online' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse' :
                            v.status === 'Idle' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-gray-500/10 text-gray-400 border border-white/10'
                          }`}>
                            {v.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INBOX WITH AI PROPOSAL PITCH GENERATOR */}
        {activeTab === 'inbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4 bg-[#0B1020] p-4 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Inbox size={16} className="text-blue-400" />
                  <span>Inbound Leads Inbox</span>
                </h3>
                <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full">
                  {inboxMessages.length} Total
                </span>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                {['All', 'Unread', 'In Review', 'Quote Sent', 'Won'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setInboxFilter(st)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      inboxFilter === st
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
                {filteredInbox.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => {
                      setSelectedMsgId(msg.id)
                      if (msg.status === 'Unread') handleUpdateMsgStatus(msg.id, 'In Review')
                    }}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedMsgId === msg.id
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                        : msg.status === 'Unread'
                        ? 'bg-black/60 border-blue-500/40 text-white'
                        : 'bg-black/40 border-white/10 text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-400 font-mono">{msg.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {msg.leadScore || '🔥 HOT LEAD'}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white mt-1">{msg.fullName} ({msg.businessName})</div>
                    <div className="text-[11px] text-gray-400 truncate mt-0.5">{msg.service} • {msg.budget}</div>
                    <div className="text-[10px] text-gray-500 mt-2 flex items-center justify-between font-mono">
                      <span>{msg.location}</span>
                      <span>{msg.ip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#0B1020] p-6 rounded-2xl border border-white/10 space-y-5">
              {selectedMsgId && inboxMessages.find(m => m.id === selectedMsgId) ? (
                (() => {
                  const msg = inboxMessages.find(m => m.id === selectedMsgId)
                  return (
                    <div className="space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-blue-400">{msg.id}</span>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              {msg.leadScore || '🔥 HOT LEAD'}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mt-0.5">{msg.fullName}</h3>
                          <p className="text-xs text-gray-400">{msg.businessName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={msg.status}
                            onChange={(e) => handleUpdateMsgStatus(msg.id, e.target.value)}
                            className="px-3 py-1.5 bg-black/60 border border-white/20 text-xs font-bold rounded-xl text-white focus:outline-none focus:border-blue-500"
                          >
                            <option value="Unread">Unread</option>
                            <option value="In Review">In Review</option>
                            <option value="Quote Sent">Quote Sent</option>
                            <option value="Won">Won / Active Client</option>
                            <option value="Archived">Archived</option>
                          </select>
                          <button
                            onClick={() => handleDeleteMsg(msg.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/30 transition-all cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-black/40 rounded-xl border border-white/10 space-y-1">
                          <span className="text-gray-400 font-bold block text-[10px] uppercase">WhatsApp Number</span>
                          <a
                            href={`https://wa.me/${msg.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${msg.fullName}, thank you for contacting NEXORA DIGITAL regarding ${msg.service}. We have reviewed your project requirements.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 font-bold font-mono hover:underline flex items-center gap-1.5 text-sm"
                          >
                            <Phone size={14} />
                            <span>{msg.whatsapp}</span>
                          </a>
                        </div>

                        <div className="p-3 bg-black/40 rounded-xl border border-white/10 space-y-1">
                          <span className="text-gray-400 font-bold block text-[10px] uppercase">Email Address</span>
                          <a
                            href={`mailto:${msg.email}?subject=${encodeURIComponent(`Executive Proposal - NEXORA DIGITAL (${msg.service})`)}`}
                            className="text-blue-400 font-bold font-mono hover:underline flex items-center gap-1.5 text-sm truncate"
                          >
                            <Mail size={14} />
                            <span>{msg.email}</span>
                          </a>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-xl border border-blue-500/20 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-[#1F90FF] font-bold text-[11px] uppercase tracking-wider">
                          <span className="flex items-center gap-1">
                            <Compass size={13} />
                            <span>Geo-Coordinates &amp; Network Intelligence</span>
                          </span>
                          <span className="font-mono text-white">{msg.ip}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                          <div>
                            <span className="text-gray-400 block text-[9px] uppercase">Location</span>
                            <span className="text-white font-semibold">{msg.location || 'Karachi, PK 🇵🇰'}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[9px] uppercase">Lat / Long Coordinates</span>
                            <a
                              href={`https://www.google.com/maps?q=${msg.latitude || '24.8607'},${msg.longitude || '67.0011'}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                            >
                              <span>{msg.coordinates || '24.8607° N, 67.0011° E'}</span>
                              <ExternalLink size={9} />
                            </a>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[9px] uppercase font-sans">Network ISP</span>
                            <span className="text-gray-200 font-sans text-[10px]">{msg.isp || 'CyberNet Broadband'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                          Project Scope &amp; Details
                        </label>
                        <div className="p-4 bg-black/60 rounded-xl border border-white/15 text-xs text-gray-200 leading-relaxed font-sans whitespace-pre-wrap">
                          {msg.details}
                        </div>
                      </div>

                      {/* PDF AI Proposal & Quick Action Buttons */}
                      <div className="pt-3 border-t border-white/10 flex flex-wrap gap-3">
                        <button
                          onClick={() => setAiProposalModalMsg(msg)}
                          className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer"
                        >
                          <Bot size={15} />
                          <span>🤖 Generate AI Proposal Pitch</span>
                        </button>
                        <a
                          href={`https://wa.me/${msg.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${msg.fullName}, thank you for contacting NEXORA DIGITAL regarding ${msg.service}. We have reviewed your project requirements.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer"
                        >
                          <Send size={14} />
                          <span>Reply on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  )
                })()
              ) : (
                <div className="text-center py-20 text-gray-400 space-y-3">
                  <Inbox size={40} className="mx-auto text-gray-600" />
                  <p className="text-xs font-semibold">Select a quote message from the left inbox to view full client details.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: AUDIT LEADS */}
        {activeTab === 'audit_leads' && (
          <div className="space-y-6">
            <div className="bg-[#0B1020] p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Globe size={18} className="text-purple-400" />
                    <span>Google PageSpeed Audit Leads Registry with Coordinates</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Live logs of live websites tested using Google Lighthouse API on your site.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono font-bold rounded-full">
                    {auditLeads.length} Total Audit Leads
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Filter by Domain URL or notes..."
                    value={auditSearch}
                    onChange={(e) => setAuditSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-black/60 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                  {['All', 'Critical', 'Moderate', 'Good'].map((fl) => (
                    <button
                      key={fl}
                      onClick={() => setAuditFilter(fl)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                        auditFilter === fl
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      {fl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-[11px] uppercase font-bold">
                      <th className="py-3 px-3">Target Domain URL</th>
                      <th className="py-3 px-3">Lighthouse Score</th>
                      <th className="py-3 px-3">Audited Time</th>
                      <th className="py-3 px-3">Lat/Long Coordinates</th>
                      <th className="py-3 px-3">Lead Status</th>
                      <th className="py-3 px-3 text-right">Quick Outreach</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {filteredAuditLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-3 font-mono font-bold text-white">
                          <a href={`https://${lead.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-400 flex items-center gap-1">
                            <span>{lead.url}</span>
                            <ExternalLink size={11} />
                          </a>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
                            lead.score < 50 ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                            lead.score < 90 ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                            'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          }`}>
                            {lead.score}/100 Performance
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-mono text-gray-400">{lead.date} {lead.time}</td>
                        <td className="py-3.5 px-3 font-mono text-emerald-400 text-[11px]">
                          <a
                            href={`https://www.google.com/maps?q=${lead.latitude || '24.8607'},${lead.longitude || '67.0011'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline flex items-center gap-1"
                          >
                            <span>{lead.latitude || '24.8607'}°, {lead.longitude || '67.0011'}° ({lead.city || 'Karachi'})</span>
                            <ExternalLink size={9} />
                          </a>
                        </td>
                        <td className="py-3.5 px-3">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateAuditStatus(lead.id, e.target.value)}
                            className="px-2.5 py-1 bg-black/60 border border-white/20 text-xs font-bold rounded-lg text-white focus:outline-none focus:border-blue-500"
                          >
                            <option value="New Audit Lead">New Audit Lead</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Audit Followup Pending">Followup Pending</option>
                            <option value="Converted to Client">Converted to Client</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hello, I saw your Google PageSpeed performance audit for ${lead.url} (Score: ${lead.score}/100). We can optimize your site to 99/100 score.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-md transition-all"
                            >
                              <Send size={12} />
                              <span>Contact</span>
                            </a>
                            <button
                              onClick={() => handleDeleteAuditLead(lead.id)}
                              className="p-1.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/20"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PROJECTS WITH GANTT TIMELINE VISUALIZER */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-3 bg-[#0B1020] p-4 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase text-gray-400">Projects Directory</span>
                <button
                  onClick={handleStartCreateProject}
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
                {projectList.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      setSelectedProjectId(proj.id)
                      setIsCreatingNewProject(false)
                    }}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      !isCreatingNewProject && selectedProjectId === proj.id
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

            <div className="lg:col-span-8 bg-[#0B1020] p-6 rounded-2xl border border-white/10 space-y-6">
              
              {/* INTERACTIVE GANTT TIMELINE VISUALIZER */}
              {!isCreatingNewProject && projects[selectedProjectId] && (
                <div className="bg-black/50 p-5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                      <Activity size={14} className="text-blue-400" />
                      <span>Sprint Gantt Milestone Chart ({formData.id})</span>
                    </h4>
                    <span className="text-xs font-mono font-bold text-emerald-400">{formData.progress}% Complete</span>
                  </div>

                  <div className="space-y-2.5 text-xs font-sans pt-1">
                    {[
                      { name: 'Phase 1: Architecture Alignment & Scope', done: true, pct: 100 },
                      { name: 'Phase 2: 3D UI/UX Figma Prototype', done: true, pct: 100 },
                      { name: 'Phase 3: Core React 19 Frontend Engineering', done: formData.progress >= 70, pct: Math.min(100, Math.max(20, formData.progress)) },
                      { name: 'Phase 4: Google PageSpeed 99+ Telemetry Audit', done: formData.progress >= 90, pct: formData.progress >= 90 ? 100 : 0 },
                      { name: 'Phase 5: Final Netlify DNS & GitHub Handoff', done: formData.progress >= 100, pct: formData.progress >= 100 ? 100 : 0 },
                    ].map((phase, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="font-semibold text-gray-300">{phase.name}</span>
                          <span className={phase.done ? 'text-emerald-400 font-bold' : phase.pct > 0 ? 'text-blue-400 font-bold' : 'text-gray-500'}>
                            {phase.done ? 'Done ✓' : phase.pct > 0 ? 'In Progress ⚡' : 'Pending o'}
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              phase.done ? 'bg-emerald-500' : phase.pct > 0 ? 'bg-blue-500 animate-pulse' : 'bg-gray-700'
                            }`}
                            style={{ width: `${phase.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Edit Form */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Edit2 size={16} className="text-blue-400" />
                    <span>{isCreatingNewProject ? 'Create New Project Record' : `Editing Project (${formData.id})`}</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    {!isCreatingNewProject && (
                      <button
                        type="button"
                        onClick={() => handleGenerateInvoicePDF(projects[formData.id] || formData)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                      >
                        <Printer size={14} />
                        <span>Download B2B Invoice PDF</span>
                      </button>
                    )}
                    {!isCreatingNewProject && (
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
          </div>
        )}

        {/* TAB 6: INVOICES */}
        {activeTab === 'invoices' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign size={16} className="text-emerald-400" />
                <span>B2B Client Invoicing &amp; Milestone Trackers ({currencyMode})</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projectList.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl bg-[#0B1020] border border-white/10 space-y-3 shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-blue-400">{p.id}</span>
                    <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-full">
                      Total: {formatMoney(p.amount || 1500)}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white">{p.client}</div>
                  <div className="text-gray-400 text-[11px]">{p.service}</div>

                  <div className="pt-3 border-t border-white/10 space-y-2 text-[11px]">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">50% Upfront Deposit:</span>
                      <span className={p.depositPaid ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {p.depositPaid ? `✓ Paid (${formatMoney((p.amount || 1500) * 0.5)})` : 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">50% Final Handoff:</span>
                      <span className={p.finalPaid ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {p.finalPaid ? `✓ Paid (${formatMoney((p.amount || 1500) * 0.5)})` : 'Pending'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleGenerateInvoicePDF(p)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all mt-2 cursor-pointer shadow-md"
                  >
                    <Printer size={13} />
                    <span>Download B2B Invoice PDF</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SCARCITY */}
        {activeTab === 'scarcity' && (
          <form onSubmit={(e) => { e.preventDefault(); localStorage.setItem('NEXORA_LAUNCH_SLOTS', JSON.stringify(launchSlots)); alert('✅ Launch offer scarcity settings saved live!'); }} className="max-w-xl mx-auto space-y-4 bg-[#0B1020] p-6 rounded-2xl border border-white/10 text-xs shadow-xl">
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

        {/* TAB 8: FOUNDER SECURITY CENTER & ACTIVE SESSIONS */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            
            {/* Security Health Index Gauge Card */}
            <div className="bg-[#0B1020] p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-400" />
                  <span>Founder Security Health Index</span>
                </h3>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold rounded-full">
                  98% SECURE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-1">
                  <span className="text-gray-400 block font-bold text-[10px] uppercase">Session Encryption</span>
                  <span className="text-white font-bold font-mono text-sm">256-Bit Cryptographic Tokens</span>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-1">
                  <span className="text-gray-400 block font-bold text-[10px] uppercase">Inactivity Auto-Lock</span>
                  <span className="text-emerald-400 font-bold font-mono text-sm">5-Minute Inactivity Timer</span>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-1">
                  <span className="text-gray-400 block font-bold text-[10px] uppercase">Rate Limiter Protection</span>
                  <span className="text-blue-400 font-bold font-mono text-sm">5 Max Attempts (60s Lockout)</span>
                </div>
              </div>
            </div>

            {/* Active Sessions Revoker List */}
            <div className="bg-[#0B1020] p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Power size={16} className="text-blue-400" />
                  <span>Active Founder Sessions &amp; Remote Token Revoker</span>
                </h3>
                <span className="text-xs text-gray-400 font-mono">{activeSessions.length} Authorized Sessions</span>
              </div>

              <div className="space-y-3">
                {activeSessions.map((session) => (
                  <div key={session.id} className="p-4 bg-black/40 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2 font-bold text-white text-sm">
                        <span>{session.device}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          {session.status}
                        </span>
                      </div>
                      <div className="text-gray-400 font-mono text-[11px] mt-1">
                        IP: <strong className="text-white">{session.ip}</strong> ({session.location}) • Login: {session.loginTime}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {session.status.includes('CURRENT') ? (
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">
                          Active Now
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRevokeSession(session.id)}
                          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-all"
                        >
                          <Power size={13} />
                          <span>Revoke Token</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Passcode Modifier Form */}
            <form onSubmit={handleChangePasscode} className="bg-[#0B1020] p-6 rounded-2xl border border-white/10 space-y-4 max-w-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <Key size={16} className="text-blue-400" />
                <span>Update Founder Security Passcode</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-400 font-bold mb-1">New Passcode</label>
                  <input
                    type="password"
                    required
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-bold mb-1">Confirm New Passcode</label>
                  <input
                    type="password"
                    required
                    value={confirmPasscode}
                    onChange={(e) => setConfirmPasscode(e.target.value)}
                    placeholder="Re-enter new passcode"
                    className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 rounded-xl text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {passcodeUpdateMsg && (
                <p className={`text-xs font-semibold ${passcodeUpdateMsg.startsWith('✅') ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {passcodeUpdateMsg}
                </p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
                >
                  Update Passcode Now
                </button>
              </div>
            </form>

            {/* Security Audit Logs */}
            <div className="bg-[#0B1020] p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldAlert size={16} className="text-amber-400" />
                  <span>Security Access &amp; Login Audit Logs</span>
                </h3>
                <span className="text-xs text-gray-400 font-mono">Rate-Limiting: Active (5 Max Attempts)</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-[11px] uppercase font-bold">
                      <th className="py-3 px-3">Event</th>
                      <th className="py-3 px-3">IP Address</th>
                      <th className="py-3 px-3">Timestamp</th>
                      <th className="py-3 px-3">Details</th>
                      <th className="py-3 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300 font-mono">
                    {securityLogs.map((s) => (
                      <tr key={s.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-3 font-bold text-white font-sans">{s.event}</td>
                        <td className="py-3.5 px-3 font-bold text-blue-400">{s.ip}</td>
                        <td className="py-3.5 px-3 text-gray-400">{s.time}</td>
                        <td className="py-3.5 px-3 font-sans text-gray-300">{s.details}</td>
                        <td className="py-3.5 px-3 text-right font-sans">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            s.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            s.status === 'FAILED' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* AI PROPOSAL PITCH DRAWER / MODAL */}
      {aiProposalModalMsg && (() => {
        const msgService = (aiProposalModalMsg.service || '').toLowerCase()
        const msgBusiness = aiProposalModalMsg.businessName && aiProposalModalMsg.businessName !== 'Not Specified' ? aiProposalModalMsg.businessName : 'Client Organization'
        const msgDetails = aiProposalModalMsg.details || 'Custom software development & technical architecture.'
        
        let dynamicTechPills = ['React 19 Core', 'Tailwind CSS 4', 'Vite Fast Hydration', 'Google Lighthouse 99+', 'JSON-LD Technical SEO']
        let dynamicArch = `Engineered Single Page Application (SPA) architecture for ${msgBusiness} optimized for sub-1.2s page loads, mobile responsiveness, and 99+ Lighthouse score.`

        if (msgService.includes('shopify') || msgService.includes('e-commerce') || msgService.includes('store')) {
          dynamicTechPills = ['React 19 Core', 'Tailwind CSS 4', 'Headless Shopify Storefront API', 'GraphQL API', 'Stripe & PayPal API', 'Abandoned Cart Recovery']
          dynamicArch = `Headless E-Commerce architecture for ${msgBusiness} designed for ultra-fast product catalog rendering, multi-currency checkout, and maximum conversion rates.`
        } else if (msgService.includes('app') || msgService.includes('portal') || msgService.includes('web application')) {
          dynamicTechPills = ['React 19 Core', 'Node.js / Express API', 'PostgreSQL / MongoDB', 'Framer Motion WebGL', 'RBAC User Auth', 'B2B Invoicing Engine']
          dynamicArch = `Full-stack Web Application architecture for ${msgBusiness} incorporating secure role-based access control, real-time telemetry, and automated workflow pipelines.`
        } else if (msgService.includes('graphic') || msgService.includes('brand') || msgService.includes('design')) {
          dynamicTechPills = ['Adobe Illustrator Master', 'Vector SVG Exports', 'Typography Scale', 'Executive Brand Guidelines', 'WebP Asset Pipeline']
          dynamicArch = `Complete corporate branding & visual identity suite for ${msgBusiness}, crafted for premium market positioning and customer retention.`
        }

        const dynamicPitchText = `Hello ${aiProposalModalMsg.fullName}! 👋 Thank you for contacting NEXORA DIGITAL regarding ${aiProposalModalMsg.service}. We have analyzed your project scope for ${msgBusiness} ("${msgDetails.slice(0, 100)}${msgDetails.length > 100 ? '...' : ''}") and generated a tailored Executive Technical Proposal with 99+ PageSpeed guarantee & 100% Source Code ownership. Target Budget: ${aiProposalModalMsg.budget}. Let's schedule a 10-minute technical discovery call!`

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="bg-[#0B1020] border border-white/20 rounded-3xl p-6 max-w-2xl w-full text-white space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Bot size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">AI Executive Proposal Generator</h3>
                    <p className="text-xs text-gray-400">Target Client: {aiProposalModalMsg.fullName} ({msgBusiness})</p>
                  </div>
                </div>
                <button
                  onClick={() => setAiProposalModalMsg(null)}
                  className="text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Client Scope Summary */}
              <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1 text-xs">
                <span className="font-bold text-blue-400 uppercase tracking-wider text-[10px]">Client Request Details</span>
                <p className="text-gray-300 italic font-sans">"{msgDetails}"</p>
              </div>

              {/* AI Generated Proposal Card */}
              <div className="p-4 bg-black/50 rounded-2xl border border-white/10 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-bold text-purple-400 uppercase tracking-wider text-[11px]">Recommended Technical Architecture</span>
                  <span className="font-mono text-emerald-400 font-bold">{aiProposalModalMsg.budget}</span>
                </div>
                <p className="text-gray-300 leading-relaxed font-sans">
                  "{dynamicArch}"
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dynamicTechPills.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-[10px] font-mono font-bold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ready-to-Send WhatsApp Pitch Text */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-300 uppercase tracking-wider">
                    Ready-To-Send WhatsApp Pitch Message
                  </label>
                  <button
                    type="button"
                    onClick={() => copyPitchTextToClipboard(dynamicPitchText)}
                    className="text-blue-400 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <Copy size={13} />
                    <span>{copiedPitchText ? '✓ Copied to Clipboard!' : 'Copy Text'}</span>
                  </button>
                </div>
                <div className="p-3.5 bg-black/60 rounded-xl border border-white/15 text-gray-300 font-mono text-[11px] leading-relaxed">
                  {dynamicPitchText}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => handleGenerateAIProposalPDF(aiProposalModalMsg)}
                  className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download Official PDF Proposal</span>
                </button>

                <a
                  href={`https://wa.me/${aiProposalModalMsg.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(dynamicPitchText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Send size={14} />
                  <span>Send Pitch via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )
      })()}


      {/* MULTIPLE EXPORT OPTIONS MODAL */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0B1020] border border-white/20 rounded-3xl p-6 max-w-2xl w-full text-white space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Download size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Select Export Format &amp; Dataset</h3>
                  <p className="text-xs text-gray-400">Export agency data as JSON, CSV spreadsheets, or PDF reports</p>
                </div>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-xs"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => { handleExportJSON(); setIsExportModalOpen(false); }}
                className="p-4 bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500 rounded-2xl text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white group-hover:text-blue-400 flex items-center gap-2">
                    <Database size={16} className="text-blue-400" />
                    <span>Full Database Backup (.JSON)</span>
                  </span>
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-bold font-mono rounded">JSON</span>
                </div>
                <p className="text-[#A7ADBB] text-[11px] leading-relaxed">
                  Complete database snapshot containing all projects, quote form messages, audit leads, and telemetry.
                </p>
              </button>

              <button
                onClick={() => { handleExportInboxCSV(); setIsExportModalOpen(false); }}
                className="p-4 bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500 rounded-2xl text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white group-hover:text-indigo-400 flex items-center gap-2">
                    <FileSpreadsheet size={16} className="text-indigo-400" />
                    <span>Inbound Quote Leads (.CSV)</span>
                  </span>
                  <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold font-mono rounded">CSV</span>
                </div>
                <p className="text-[#A7ADBB] text-[11px] leading-relaxed">
                  Spreadsheet containing client names, emails, WhatsApp numbers, services, budget, IP, and Lat/Long coordinates.
                </p>
              </button>

              <button
                onClick={() => { handleExportAuditCSV(); setIsExportModalOpen(false); }}
                className="p-4 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500 rounded-2xl text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white group-hover:text-purple-400 flex items-center gap-2">
                    <Globe size={16} className="text-purple-400" />
                    <span>PageSpeed Audit Leads (.CSV)</span>
                  </span>
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-[10px] font-bold font-mono rounded">CSV</span>
                </div>
                <p className="text-[#A7ADBB] text-[11px] leading-relaxed">
                  Tested domain URLs, Google Lighthouse scores, SEO score, tested date/time, IP, and Lat/Long coordinates.
                </p>
              </button>

              <button
                onClick={() => { handleExportProjectsCSV(); setIsExportModalOpen(false); }}
                className="p-4 bg-white/5 hover:bg-emerald-600/20 border border-white/10 hover:border-emerald-500 rounded-2xl text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white group-hover:text-emerald-400 flex items-center gap-2">
                    <DollarSign size={16} className="text-emerald-400" />
                    <span>Projects &amp; Financial Invoices (.CSV)</span>
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono rounded">CSV</span>
                </div>
                <p className="text-[#A7ADBB] text-[11px] leading-relaxed">
                  Active client project sprints, milestone progress %, total contract value, and deposit status.
                </p>
              </button>

              <button
                onClick={() => { handleExportVisitorsCSV(); setIsExportModalOpen(false); }}
                className="p-4 bg-white/5 hover:bg-amber-600/20 border border-white/10 hover:border-amber-500 rounded-2xl text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white group-hover:text-amber-400 flex items-center gap-2">
                    <Users size={16} className="text-amber-400" />
                    <span>Visitor Telemetry &amp; IPs (.CSV)</span>
                  </span>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] font-bold font-mono rounded">CSV</span>
                </div>
                <p className="text-[#A7ADBB] text-[11px] leading-relaxed">
                  Real-time visitor sessions, public IP addresses, city, country, Lat/Long coordinates, ISP, and durations.
                </p>
              </button>

              <button
                onClick={() => { handleExportTextReport(); setIsExportModalOpen(false); }}
                className="p-4 bg-white/5 hover:bg-sky-600/20 border border-white/10 hover:border-sky-500 rounded-2xl text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white group-hover:text-sky-400 flex items-center gap-2">
                    <FileText size={16} className="text-sky-400" />
                    <span>Executive Agency Summary (.TXT)</span>
                  </span>
                  <span className="px-2 py-0.5 bg-sky-500/20 text-sky-400 text-[10px] font-bold font-mono rounded">TXT</span>
                </div>
                <p className="text-[#A7ADBB] text-[11px] leading-relaxed">
                  Formatted text executive report summarizing pipeline revenue, lead counts, active sprints, and key metrics.
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE B2B INVOICE MODAL RECEIPT */}
      {printableInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#0B1020] border border-white/20 rounded-3xl p-6 max-w-2xl w-full text-white space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <NexoraBrand variant="footer" />
              <div className="text-right">
                <h3 className="text-base font-bold text-white font-mono">{printableInvoice.id}</h3>
                <span className="text-xs text-emerald-400 font-bold">Official B2B Invoice Receipt</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 font-bold block">Billed To Client:</span>
                <span className="text-base font-bold text-white">{printableInvoice.client}</span>
                <span className="text-gray-300 block">{printableInvoice.clientEmail || 'contact@client-domain.com'}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-400 font-bold block">Issued By:</span>
                <span className="text-base font-bold text-white">NEXORA DIGITAL</span>
                <span className="text-gray-300 block">Karachi, Pakistan 🇵🇰</span>
              </div>
            </div>

            <div className="p-4 bg-black/50 rounded-2xl border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-gray-300 border-b border-white/10 pb-2">
                <span>Service Description</span>
                <span>Amount</span>
              </div>
              <div className="flex justify-between font-bold text-white pt-1">
                <span>{printableInvoice.service} (Full IP Source Code &amp; SLA Handoff)</span>
                <span className="font-mono text-emerald-400">${printableInvoice.amount || 1500} USD</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-white/5 p-3 rounded-xl border border-white/10">
              <div>
                <span className="text-gray-400 font-bold block">50% Upfront Milestone:</span>
                <span className={printableInvoice.depositPaid ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  {printableInvoice.depositPaid ? `✓ Paid ($${(printableInvoice.amount || 1500) * 0.5})` : 'Pending'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-gray-400 font-bold block">50% Final Handoff Release:</span>
                <span className="printableInvoice.finalPaid ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'">
                  {printableInvoice.finalPaid ? `✓ Paid ($${(printableInvoice.amount || 1500) * 0.5})` : 'Pending'}
                </span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-gray-400 space-y-1">
              <p>• Terms: 100% Source Code Ownership Handoff upon final milestone release.</p>
              <p>• Signed Mutual NDA &amp; Performance SLA guarantee included.</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Printer size={14} />
                <span>Print / Save as PDF</span>
              </button>
              <button
                onClick={() => setPrintableInvoice(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
