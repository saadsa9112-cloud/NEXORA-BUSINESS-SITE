import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { NAV_LINKS, CONTACT } from '../../data/siteData'
import NexoraBrand from '../NexoraBrand/NexoraBrand'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled
            ? 'bg-[#05070D]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 text-white'
            : 'bg-white/95 backdrop-blur-md border-b border-[#E5EAF1] shadow-xs text-[#0B1020]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Official Brand Logo Link */}
            <Link
              to="/"
              aria-label="NEXORA DIGITAL — Home"
              className="flex-shrink-0 flex items-center group py-2"
            >
              <NexoraBrand variant="navbar" isScrolled={scrolled} />
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.href
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? scrolled
                          ? 'text-[#3B82F6] font-bold bg-white/10 ring-1 ring-[#3B82F6]/30'
                          : 'text-[#0066FF] font-bold bg-blue-50 ring-1 ring-[#0066FF]/20'
                        : scrolled
                        ? 'text-[#A7ADBB] hover:text-white hover:bg-white/5'
                        : 'text-[#4B5563] hover:text-[#0B1020] hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                to="/services#contact"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                <span>Get Free Quote</span>
                <ArrowRight size={14} />
              </Link>

              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
                className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                  scrolled ? 'text-white hover:bg-white/10' : 'text-[#0B1020] hover:bg-gray-100'
                }`}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-white border-l border-[#E5EAF1] lg:hidden transform transition-transform duration-300 shadow-2xl ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#E5EAF1]">
          <NexoraBrand variant="navbar" isScrolled={false} />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-[#0B1020] hover:bg-gray-100 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="px-4 py-6 flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-[#0066FF] font-semibold bg-blue-50'
                    : 'text-[#4B5563] hover:text-[#0B1020] hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-8 left-4 right-4 flex flex-col gap-3">
          <Link
            to="/services#contact"
            className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-blue-500/20"
          >
            Get Free Quote →
          </Link>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#16a34a] text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-[#25D366]/20"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </>
  )
}
