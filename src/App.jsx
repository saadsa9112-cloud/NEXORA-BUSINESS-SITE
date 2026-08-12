import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import TrustStrip from './components/TrustStrip/TrustStrip'
import Services from './components/Services/Services'
import Portfolio from './components/Portfolio/Portfolio'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs'
import Process from './components/Process/Process'
import Pricing from './components/Pricing/Pricing'
import About from './components/About/About'
import QualitySecurity from './components/QualitySecurity/QualitySecurity'
import FAQ from './components/FAQ/FAQ'
import QuoteForm from './components/QuoteForm/QuoteForm'
import FinalCTA from './components/FinalCTA/FinalCTA'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import Footer from './components/Footer/Footer'

export default function App() {
  // Scroll-reveal animation observer
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
    <div className="min-h-screen bg-[#05070D] text-white overflow-x-hidden">
      {/* Skip to main content — accessibility */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <TrustStrip />
        <Services />
        <Portfolio />
        <WhyChooseUs />
        <Process />
        <Pricing />
        <About />
        <QualitySecurity />
        <FAQ />
        <QuoteForm />
        <FinalCTA />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
