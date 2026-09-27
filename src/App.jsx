import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import TrustStrip from './components/TrustStrip/TrustStrip'
import Services from './components/Services/Services'
import Portfolio from './components/Portfolio/Portfolio'
import TechStack from './components/TechStack/TechStack'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs'
import Process from './components/Process/Process'
import Pricing from './components/Pricing/Pricing'
import Testimonials from './components/Testimonials/Testimonials'
import About from './components/About/About'
import QualitySecurity from './components/QualitySecurity/QualitySecurity'
import FAQ from './components/FAQ/FAQ'
import RoiCalculator from './components/RoiCalculator/RoiCalculator'
import QuoteForm from './components/QuoteForm/QuoteForm'
import FinalCTA from './components/FinalCTA/FinalCTA'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import FloatingActionBar from './components/FloatingBar/FloatingActionBar'
import AiAssistantModal from './components/AiAssistant/AiAssistantModal'
import Footer from './components/Footer/Footer'

export default function App() {
  const [currency, setCurrency] = useState('PKR')

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
      {/* Skip to main content — accessibility */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-[#0B1020] focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <TrustStrip />
        <Services />
        <Portfolio />
        <TechStack />
        <WhyChooseUs />
        <Process />
        <Pricing currency={currency} setCurrency={setCurrency} />
        <Testimonials />
        <About />
        <QualitySecurity />
        <FAQ />
        <RoiCalculator />
        <QuoteForm currency={currency} setCurrency={setCurrency} />
        <FinalCTA />
      </main>

      <Footer />
      <FloatingActionBar />
      <WhatsAppButton />
      <AiAssistantModal />
    </div>
  )
}
