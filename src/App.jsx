import { useState, useEffect } from 'react'
import LaunchBanner from './components/LaunchBanner/LaunchBanner'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import TrustStrip from './components/TrustStrip/TrustStrip'
import Services from './components/Services/Services'
import FeaturesSuite from './components/FeaturesSuite/FeaturesSuite'
import Portfolio from './components/Portfolio/Portfolio'
import TechStack from './components/TechStack/TechStack'
import ServiceGuarantees from './components/Guarantees/ServiceGuarantees'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs'
import Process from './components/Process/Process'
import Pricing from './components/Pricing/Pricing'
import CostEstimator from './components/Estimator/CostEstimator'
import PaymentBadges from './components/PaymentBadges/PaymentBadges'
import WebsiteAuditWidget from './components/WebsiteAudit/WebsiteAuditWidget'
import RoiCalculator from './components/RoiCalculator/RoiCalculator'
import Testimonials from './components/Testimonials/Testimonials'
import About from './components/About/About'
import QualitySecurity from './components/QualitySecurity/QualitySecurity'
import FAQ from './components/FAQ/FAQ'
import QuoteForm from './components/QuoteForm/QuoteForm'
import FinalCTA from './components/FinalCTA/FinalCTA'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import FloatingActionBar from './components/FloatingBar/FloatingActionBar'
import AiAssistantModal from './components/AiAssistant/AiAssistantModal'
import ClientPortalModal from './components/ClientPortal/ClientPortalModal'
import AdminPanelModal from './components/Admin/AdminPanelModal'
import Footer from './components/Footer/Footer'

export default function App() {
  const [currency, setCurrency] = useState('PKR')
  const [isAdminOpen, setIsAdminOpen] = useState(false)

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
  }, [])

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
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Unified Single Page Application Body */}
      <main id="main-content">
        <section id="home">
          <Hero />
        </section>

        <TrustStrip />

        <section id="services">
          <Services />
          <CostEstimator />
        </section>

        <section id="features">
          <FeaturesSuite />
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

        {/* Tools Section: 100% Real Google PageSpeed Insights API + ROI Calculator */}
        <section id="tools">
          <WebsiteAuditWidget />
          <RoiCalculator />
        </section>

        <Testimonials />

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

      {/* Global Footer & Interactive Overlays */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      <FloatingActionBar />
      <WhatsAppButton />
      <AiAssistantModal />
      <ClientPortalModal />
      <AdminPanelModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  )
}
