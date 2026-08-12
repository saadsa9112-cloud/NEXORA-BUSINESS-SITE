import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, CONTACT } from '../../data/siteData'
import nexoraLogoHorizontal from '../../assets/nexora-logo-horizontal.png'
import nexoraIconMark from '../../assets/nexora-icon-mark.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on ESC key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#05070D]/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Official Logo (Horizontal for Desktop, Icon Mark for Mobile) ── */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
              aria-label="NEXORA DIGITAL — Home"
              className="flex-shrink-0 flex items-center py-2"
            >
              {/* Primary Horizontal Logo (Desktop) */}
              <img
                src={nexoraLogoHorizontal}
                alt="NEXORA DIGITAL logo"
                className="hidden sm:block h-10 lg:h-12 w-auto min-w-[140px] object-contain"
                loading="eager"
                decoding="sync"
              />
              {/* N Icon Mark (Compact Mobile) */}
              <img
                src={nexoraIconMark}
                alt="NEXORA DIGITAL"
                className="sm:hidden h-10 w-auto object-contain"
                loading="eager"
                decoding="sync"
              />
            </a>

            {/* Desktop Navigation */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-white bg-white/5'
                      : 'text-[#A7ADBB] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Get Free Quote
                <span aria-hidden="true">→</span>
              </a>

              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[#A7ADBB] hover:text-white hover:bg-white/5 transition-all duration-200"
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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
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
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0B1020] border-l border-white/5 lg:hidden transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0 mobile-menu-enter' : 'translate-x-full'
        }`}
      >
        {/* Mobile menu header with official logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/5">
          <img
            src={nexoraLogoHorizontal}
            alt="NEXORA DIGITAL"
            className="h-8 w-auto object-contain"
            loading="eager"
          />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-[#A7ADBB] hover:text-white hover:bg-white/5 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile nav links */}
        <nav aria-label="Mobile navigation" className="px-4 py-6 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              className="flex items-center px-4 py-3 text-sm font-medium text-[#A7ADBB] hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div className="absolute bottom-8 left-4 right-4 flex flex-col gap-3">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold rounded-lg transition-all duration-200"
          >
            Get Free Quote →
          </a>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-[#25D366]/20"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </>
  )
}
