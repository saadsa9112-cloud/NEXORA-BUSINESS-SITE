import { Mail, Phone } from 'lucide-react'

// Inline SVG social icons (lucide-react doesn't include Facebook/Instagram)
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
import { NAV_LINKS, SERVICES_LIST, CONTACT } from '../../data/siteData'
import nexoraLogoHorizontal from '../../assets/nexora-logo-horizontal.png'

const LEGAL_LINKS = ['Privacy Policy', 'Terms & Conditions', 'Refund Policy']

function FooterLink({ href, children, external = false }) {
  const props = external
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href }

  return (
    <a
      {...props}
      className="text-[#A7ADBB] hover:text-white text-sm transition-colors duration-200"
    >
      {children}
    </a>
  )
}

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
      className="bg-[#05070D] border-t border-white/5 pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand column — official primary horizontal logo */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <img
                src={nexoraLogoHorizontal}
                alt="NEXORA DIGITAL logo"
                className="h-12 w-auto min-w-[150px] object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-[#A7ADBB] text-sm leading-relaxed mb-5 max-w-xs">
              Professional website development, SEO, e-commerce and digital solutions for growing businesses.
            </p>
            <p className="text-white/30 text-xs italic mb-5">"We Build. You Grow."</p>

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
                  className="w-9 h-9 rounded-xl border border-white/8 bg-white/3 hover:border-blue-500/30 hover:bg-blue-500/10 flex items-center justify-center text-[#A7ADBB] hover:text-white transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold text-sm mb-5 tracking-wide uppercase">Quick Links</h3>
            <nav aria-label="Footer quick links">
              <ul className="flex flex-col gap-2.5" role="list">
                {[...NAV_LINKS, { label: 'Contact', href: '#contact' }].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                      className="text-[#A7ADBB] hover:text-white text-sm transition-colors duration-200"
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
            <h3 className="text-white font-bold text-sm mb-5 tracking-wide uppercase">Services</h3>
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
            <h3 className="text-white font-bold text-sm mb-5 tracking-wide uppercase">Contact</h3>
            <ul className="flex flex-col gap-4" role="list">
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-start gap-3 text-[#A7ADBB] hover:text-white transition-colors duration-200 text-sm"
                >
                  <Phone size={14} className="mt-0.5 text-blue-400 flex-shrink-0" aria-hidden="true" />
                  <span>{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-3 text-[#A7ADBB] hover:text-white transition-colors duration-200 text-sm"
                >
                  <Mail size={14} className="mt-0.5 text-blue-400 flex-shrink-0" aria-hidden="true" />
                  <span className="break-all">{CONTACT.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A7ADBB] text-xs">
            © 2026 NEXORA DIGITAL. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-white/25 hover:text-white/50 text-xs transition-colors duration-200"
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
