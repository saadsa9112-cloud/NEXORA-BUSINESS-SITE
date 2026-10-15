import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import LaunchBanner from './components/LaunchBanner/LaunchBanner'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import TrustStrip from './components/TrustStrip/TrustStrip'
import Services from './components/Services/Services'
import Portfolio from './components/Portfolio/Portfolio'
import Testimonials from './components/Testimonials/Testimonials'
import TechStack from './components/TechStack/TechStack'
import ServiceGuarantees from './components/Guarantees/ServiceGuarantees'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs'
import Process from './components/Process/Process'
import Pricing from './components/Pricing/Pricing'
import About from './components/About/About'
import QualitySecurity from './components/QualitySecurity/QualitySecurity'
import FAQ from './components/FAQ/FAQ'
import QuoteForm from './components/QuoteForm/QuoteForm'
import FinalCTA from './components/FinalCTA/FinalCTA'
import UnifiedFloatingHub from './components/FloatingHub/UnifiedFloatingHub'
import FloatingActionBar from './components/FloatingBar/FloatingActionBar'
import Footer from './components/Footer/Footer'
import { getRealVisitorGeo, logRealTimeVisitor, updateVisitorSection } from './utils/geoTracker'
import { getInitialTheme, applyTheme } from './utils/theme'

// Immediately ensure initial theme (defaults strictly to light) is applied
if (typeof window !== 'undefined') {
  applyTheme(getInitialTheme())
}

// Code-split heavy modals and administrative suite for sub-second mobile loads
const AdminPortalPage = lazy(() => import('./components/Admin/AdminPortalPage'))
const AiToolsPage = lazy(() => import('./pages/AiToolsPage'))
const WebsiteAuditModal = lazy(() => import('./components/WebsiteAudit/WebsiteAuditModal'))
const RoiCalculatorModal = lazy(() => import('./components/RoiCalculator/RoiCalculatorModal'))
const AiAssistantModal = lazy(() => import('./components/AiAssistant/AiAssistantModal'))
const ClientPortalModal = lazy(() => import('./components/ClientPortal/ClientPortalModal'))
const DiscountRoastFlyer = lazy(() => import('./components/DiscountFlyer/DiscountRoastFlyer'))

// Tracked sections on the page
const TRACKED_SECTIONS = ['home', 'services', 'work', 'reviews', 'pricing', 'about', 'faq', 'contact']

export default function App() {
  const [currency, setCurrency] = useState('PKR')
  const [isAdminPage, setIsAdminPage] = useState(false)
  const [isAiToolsPage, setIsAiToolsPage] = useState(false)
  const [isSpeedAuditOpen, setIsSpeedAuditOpen] = useState(false)
  const [isRoiOpen, setIsRoiOpen] = useState(false)
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false)

  // Visitor telemetry state
  const visitorGeoRef = useRef(null)          // real geo once fetched
  const currentSectionRef = useRef('#home')   // which section is visible
  const sectionEntryTimeRef = useRef(Date.now()) // when visitor entered current section
  const totalDurationRef = useRef(0)          // total seconds on site

  // URL Path/Hash Triggers for Admin Page & Modals
  useEffect(() => {
    const checkUrlState = () => {
      const hash = window.location.hash
      const search = window.location.search
      const path = window.location.pathname

      if (path === '/admin' || hash === '#admin' || search.includes('admin')) {
        setIsAdminPage(true)
      } else {
        setIsAdminPage(false)
      }

      if (path === '/ai-tools' || hash === '#ai-tools' || search.includes('ai-tools')) {
        setIsAiToolsPage(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setIsAiToolsPage(false)
      }

      if (hash === '#speed-audit' || hash === '#audit') {
        setIsSpeedAuditOpen(true)
      } else {
        setIsSpeedAuditOpen(false)
      }

      if (hash === '#roi-calculator' || hash === '#roi') {
        setIsRoiOpen(true)
      } else {
        setIsRoiOpen(false)
      }
    }

    checkUrlState()
    window.addEventListener('hashchange', checkUrlState)
    window.addEventListener('popstate', checkUrlState)
    return () => {
      window.removeEventListener('hashchange', checkUrlState)
      window.removeEventListener('popstate', checkUrlState)
    }
  }, [])

  // ─── REAL VISITOR TELEMETRY ───────────────────────────────────────────────
  useEffect(() => {
    // Step 1: Fetch real geo and log the initial visit
    const initVisitor = async () => {
      try {
        const geo = await getRealVisitorGeo()
        if (geo) {
          visitorGeoRef.current = geo
          // Set currency from country
          if (geo.countryCode) {
            setCurrency(geo.countryCode === 'PK' ? 'PKR' : 'USD')
          }
          // Log initial visit
          logRealTimeVisitor(geo, currentSectionRef.current, 0)
        }
      } catch (_) {}
    }
    initVisitor()

    // Step 2: Total time-on-site ticker (every 15s update duration)
    const durationTicker = setInterval(() => {
      totalDurationRef.current += 15
      if (visitorGeoRef.current?.ip && visitorGeoRef.current.ip !== 'Detecting...') {
        updateVisitorSection(
          visitorGeoRef.current.ip,
          currentSectionRef.current,
          totalDurationRef.current
        )
      }
    }, 15000)

    // Step 3: Section dwell tracking via IntersectionObserver
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = '#' + entry.target.id
            if (sectionId !== currentSectionRef.current) {
              // Record dwell time on previous section
              const dwell = Math.floor((Date.now() - sectionEntryTimeRef.current) / 1000)
              totalDurationRef.current += dwell

              // Switch to new section
              currentSectionRef.current = sectionId
              sectionEntryTimeRef.current = Date.now()

              // Push update to admin panel
              if (visitorGeoRef.current?.ip && visitorGeoRef.current.ip !== 'Detecting...') {
                updateVisitorSection(
                  visitorGeoRef.current.ip,
                  sectionId,
                  totalDurationRef.current
                )
              }
            }
          }
        })
      },
      { threshold: 0.4 }
    )

    // Observe all tracked sections (wait for DOM)
    const observeSections = () => {
      TRACKED_SECTIONS.forEach(id => {
        const el = document.getElementById(id)
        if (el) sectionObserver.observe(el)
      })
    }

    // Give React time to render sections
    const observeTimer = setTimeout(observeSections, 800)

    // Step 4: Log final duration when user leaves page
    const handleUnload = () => {
      const finalDuration = totalDurationRef.current + Math.floor((Date.now() - sectionEntryTimeRef.current) / 1000)
      if (visitorGeoRef.current?.ip && visitorGeoRef.current.ip !== 'Detecting...') {
        updateVisitorSection(
          visitorGeoRef.current.ip,
          currentSectionRef.current,
          finalDuration
        )
      }
    }
    window.addEventListener('beforeunload', handleUnload)
    window.addEventListener('pagehide', handleUnload)

    return () => {
      clearInterval(durationTicker)
      clearTimeout(observeTimer)
      sectionObserver.disconnect()
      window.removeEventListener('beforeunload', handleUnload)
      window.removeEventListener('pagehide', handleUnload)
    }
  }, [])

  // Scroll-reveal animation observer fallback
  useEffect(() => {
    const selectors = ['.reveal', '.reveal-left', '.reveal-right']
    const allElements = selectors.flatMap((sel) =>
      Array.from(document.querySelectorAll(sel))
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    allElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [isAdminPage])

  const handleExitAdmin = () => {
    setIsAdminPage(false)
    if (window.location.hash === '#admin' || window.location.search.includes('admin')) {
      history.replaceState(null, '', window.location.pathname)
    } else if (window.location.pathname === '/admin') {
      history.replaceState(null, '', '/')
    }
  }

  const handleCloseSpeedAudit = () => {
    setIsSpeedAuditOpen(false)
    if (window.location.hash === '#speed-audit' || window.location.hash === '#audit') {
      history.replaceState(null, '', window.location.pathname)
    }
  }

  const handleCloseRoi = () => {
    setIsRoiOpen(false)
    if (window.location.hash === '#roi-calculator' || window.location.hash === '#roi') {
      history.replaceState(null, '', window.location.pathname)
    }
  }

  // IF ADMIN ROUTE/HASH IS ACTIVE, RENDER DEDICATED FULL-SCREEN ADMIN PAGE
  if (isAdminPage) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#05070D] flex items-center justify-center text-white font-mono text-xs">Initializing Secure Admin Portal...</div>}>
        <AdminPortalPage onExit={handleExitAdmin} />
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#05070D] text-[#0B1020] dark:text-[#F8FAFC] overflow-x-hidden transition-colors duration-300">

      {/* Skip to main content — accessibility */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-[#0B1020] focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Main Single Page Header Navbar */}
      <Navbar />

      {/* Clean Single Page Body or Dedicated AI Tools Page */}
      {isAiToolsPage ? (
        <main id="main-content" className="bg-[#F7F9FC] dark:bg-[#05070D] min-h-screen transition-colors duration-300">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-gray-500 font-mono">Loading AI Tools Suite...</div>}>
            <AiToolsPage
              onOpenContact={() => {
                setIsAiToolsPage(false)
                window.location.hash = '#contact'
              }}
            />
          </Suspense>
        </main>
      ) : (
        <main id="main-content">
          <section id="home">
            <Hero />
          </section>

          <TrustStrip />

          <section id="services">
            <Services />
          </section>

          <section id="work">
            <Portfolio />
          </section>

          <Testimonials />

          <TechStack />
          <ServiceGuarantees />
          <WhyChooseUs />
          <Process />

          <section id="pricing">
            <Pricing currency={currency} setCurrency={setCurrency} />
          </section>

          <section id="about">
            <About />
          </section>

          <QualitySecurity />

          <section id="faq">
            <FAQ />
          </section>

          <section id="contact">
            <QuoteForm currency={currency} setCurrency={setCurrency} />
          </section>

          <FinalCTA />
        </main>
      )}

      {/* Global Footer */}
      <Footer
        onOpenSpeedAudit={() => setIsSpeedAuditOpen(true)}
        onOpenRoi={() => setIsRoiOpen(true)}
      />

      {/* Interactive Desktop Floating Dock (Hidden on mobile) */}
      <FloatingActionBar />

      {/* Unified Mobile & Desktop Action Hub (Wraps WhatsApp, AI Assistant, and Project Progress) */}
      <UnifiedFloatingHub
        onOpenAi={() => setIsAiModalOpen(true)}
        onOpenTracker={() => setIsClientPortalOpen(true)}
      />

      {/* Lazy-Loaded Modals & Tool Suites — Zero impact on initial page load */}
      <Suspense fallback={null}>
        {isAiModalOpen && (
          <AiAssistantModal
            isOpen={isAiModalOpen}
            onClose={() => setIsAiModalOpen(false)}
          />
        )}
        {isClientPortalOpen && (
          <ClientPortalModal
            isOpen={isClientPortalOpen}
            onClose={() => setIsClientPortalOpen(false)}
          />
        )}
        {isSpeedAuditOpen && (
          <WebsiteAuditModal isOpen={isSpeedAuditOpen} onClose={handleCloseSpeedAudit} />
        )}
        {isRoiOpen && (
          <RoiCalculatorModal isOpen={isRoiOpen} onClose={handleCloseRoi} />
        )}
        <DiscountRoastFlyer />
      </Suspense>
    </div>
  )
}
