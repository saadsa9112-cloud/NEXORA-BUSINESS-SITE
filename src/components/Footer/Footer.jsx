import { Mail, Phone, MapPin, Globe } from 'lucide-react'
import { NAV_LINKS, SERVICES_LIST, CONTACT } from '../../data/siteData'
import NexoraBrand from '../NexoraBrand/NexoraBrand'

// Inline SVG social icons
const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)

const LEGAL_LINKS = ['Privacy Policy', 'Terms & Conditions', 'Refund Policy']

export default function Footer() {
  const handleNavClick = (href) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <footer
      role="contentinfo"
      className="bg-[#05070D] border-t border-white/10 text-white pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <NexoraBrand variant="footer" />
            </div>
            <p className="text-[#A7ADBB] text-sm leading-relaxed mb-4 max-w-xs">
              Professional website development, SEO, e-commerce and digital solutions for growing businesses.
            </p>
            <p className="text-[#1F90FF] text-xs font-bold tracking-wider uppercase mb-5">"We Build. You Grow."</p>

            {/* Social */}
            <div className="flex gap-3" aria-label="Social media links">
              {[
                { Icon: FacebookIcon, label: 'Facebook', href: '#' },
                { Icon: InstagramIcon, label: 'Instagram', href: '#' },
                { Icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`NEXORA DIGITAL on ${label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 hover:border-[#1F90FF]/40 hover:bg-[#1F90FF]/10 flex items-center justify-center text-[#A7ADBB] hover:text-white transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Quick Links</h3>
            <nav aria-label="Footer quick links">
              <ul className="flex flex-col gap-2.5" role="list">
                {[...NAV_LINKS, { label: 'Contact', href: '#contact' }].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                      className="text-[#A7ADBB] hover:text-[#1F90FF] text-sm font-medium transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Services</h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {SERVICES_LIST.map((s) => (
                <li key={s}>
                  <span className="text-[#A7ADBB] text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Contact</h3>
            <ul className="flex flex-col gap-3.5" role="list">
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-start gap-2.5 text-[#A7ADBB] hover:text-[#1F90FF] transition-colors duration-200 text-sm"
                >
                  <Phone size={15} className="mt-0.5 text-[#1F90FF] flex-shrink-0" aria-hidden="true" />
                  <span>{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-2.5 text-[#A7ADBB] hover:text-[#1F90FF] transition-colors duration-200 text-sm"
                >
                  <Mail size={15} className="mt-0.5 text-[#1F90FF] flex-shrink-0" aria-hidden="true" />
                  <span className="break-all">{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-[#A7ADBB] text-sm">
                  <MapPin size={15} className="mt-0.5 text-[#1F90FF] flex-shrink-0" aria-hidden="true" />
                  <span>Karachi, Pakistan</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A7ADBB] text-xs">
            © 2026 NEXORA DIGITAL. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[#A7ADBB] hover:text-white text-xs transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
