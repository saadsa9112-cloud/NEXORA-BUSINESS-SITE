import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import LaunchBanner from './components/LaunchBanner/LaunchBanner'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import FloatingActionBar from './components/FloatingBar/FloatingActionBar'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import AiAssistantModal from './components/AiAssistant/AiAssistantModal'
import ClientPortalModal from './components/ClientPortal/ClientPortalModal'

import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import ToolsPage from './pages/ToolsPage'
import AdminDashboardPage from './pages/AdminDashboardPage'

// Helper component to auto-scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

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

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#F7F9FC] text-[#0B1020] overflow-x-hidden flex flex-col justify-between">
        <div>
          {/* Global Launch Announcement Scarcity Banner */}
          <LaunchBanner />

          {/* Main Top Header Navbar */}
          <Navbar />

          <main id="main-content">
            <Routes>
              <Route path="/" element={<HomePage currency={currency} setCurrency={setCurrency} />} />
              <Route path="/services" element={<ServicesPage currency={currency} setCurrency={setCurrency} />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="*" element={<HomePage currency={currency} setCurrency={setCurrency} />} />
            </Routes>
          </main>
        </div>

        {/* Global Footer & Floating Tools */}
        <Footer />
        <FloatingActionBar />
        <WhatsAppButton />
        <AiAssistantModal />
        <ClientPortalModal />
      </div>
    </BrowserRouter>
  )
}
