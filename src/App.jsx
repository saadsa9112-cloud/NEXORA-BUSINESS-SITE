import { useState, useEffect } from 'react'
import LaunchBanner from './components/LaunchBanner/LaunchBanner'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import TrustStrip from './components/TrustStrip/TrustStrip'
import Services from './components/Services/Services'
import Portfolio from './components/Portfolio/Portfolio'
import TechStack from './components/TechStack/TechStack'
import ServiceGuarantees from './components/Guarantees/ServiceGuarantees'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs'
import Process from './components/Process/Process'
import Pricing from './components/Pricing/Pricing'
import PaymentBadges from './components/PaymentBadges/PaymentBadges'
import WebsiteAuditModal from './components/WebsiteAudit/WebsiteAuditModal'
import RoiCalculatorModal from './components/RoiCalculator/RoiCalculatorModal'
import About from './components/About/About'
import QualitySecurity from './components/QualitySecurity/QualitySecurity'
import FAQ from './components/FAQ/FAQ'
import QuoteForm from './components/QuoteForm/QuoteForm'
import FinalCTA from './components/FinalCTA/FinalCTA'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import FloatingActionBar from './components/FloatingBar/FloatingActionBar'
import AiAssistantModal from './components/AiAssistant/AiAssistantModal'
import ClientPortalModal from './components/ClientPortal/ClientPortalModal'
import AdminPortalPage from './components/Admin/AdminPortalPage'
import Footer from './components/Footer/Footer'

export default function App() {
  const [currency, setCurrency] = useState('PKR')
  const [isAdminPage, setIsAdminPage] = useState(false)
  const [isSpeedAuditOpen, setIsSpeedAuditOpen] = useState(false)
  const [isRoiOpen, setIsRoiOpen] = useState(false)

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

  // Auto-detect Geo-location currency (PKR for PK, USD for International)
  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 2000)
        const res = await fetch('https://ipapi.co/json/', { signal: controller.signal })
        clearTimeout(timeoutId)
        if (res.ok) {
          const data = await res.json()
          if (data && data.country_code) {
            setCurrency(data.country_code === 'PK' ? 'PKR' : 'USD')
          }
        }
      } catch (err) {
        // Fallback default to PKR
      }
    }
    detectCurrency()
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
    return <AdminPortalPage onExit={handleExitAdmin} />
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#0B1020] overflow-x-hidden">
      {/* Launch Offer Scarcity Announcement Banner */}
      <LaunchBanner />

      {/* Skip to main content — accessibility */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-[#0B1020] focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Main Single Page Header Navbar */}
      <Navbar />

      {/* Clean Single Page Body */}
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

        <TechStack />
        <ServiceGuarantees />
        <WhyChooseUs />
        <Process />

        <section id="pricing">
          <Pricing currency={currency} setCurrency={setCurrency} />
          <PaymentBadges />
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

      {/* Global Footer */}
      <Footer
        onOpenSpeedAudit={() => setIsSpeedAuditOpen(true)}
        onOpenRoi={() => setIsRoiOpen(true)}
      />

      {/* Interactive Floating Tools & Modals */}
      <FloatingActionBar />
      <WhatsAppButton />
      <AiAssistantModal />
      <ClientPortalModal />

      {/* Dedicated Standalone Tool Modals */}
      <WebsiteAuditModal isOpen={isSpeedAuditOpen} onClose={handleCloseSpeedAudit} />
      <RoiCalculatorModal isOpen={isRoiOpen} onClose={handleCloseRoi} />
    </div>
  )
}
