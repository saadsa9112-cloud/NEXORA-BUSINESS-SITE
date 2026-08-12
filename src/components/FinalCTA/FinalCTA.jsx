import { Mail, Phone, Globe } from 'lucide-react'
import { CONTACT } from '../../data/siteData'

export default function FinalCTA() {
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section aria-labelledby="finalcta-heading" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(ellipse, #3B82F6, transparent)' }}
        />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="reveal">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
            <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">Ready to Start?</span>
          </div>

          <h2 id="finalcta-heading" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight tracking-tight mb-6">
            Ready to Build Your<br />
            <span className="text-gradient-blue">Digital Presence?</span>
          </h2>

          <p className="text-[#A7ADBB] text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Let's turn your idea into a professional digital experience.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl text-base transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1"
            >
              Get Your FREE Consultation →
            </button>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-bold rounded-xl text-base transition-all duration-200 hover:bg-[#25D366]/25 hover:-translate-y-1"
            >
              <span>WhatsApp Us →</span>
            </a>
          </div>

          {/* Contact details row */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm">
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-2 text-[#A7ADBB] hover:text-white transition-colors duration-200"
            >
              <Phone size={14} className="text-blue-400" aria-hidden="true" />
              <span>{CONTACT.phone}</span>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2 text-[#A7ADBB] hover:text-white transition-colors duration-200"
            >
              <Mail size={14} className="text-blue-400" aria-hidden="true" />
              <span>{CONTACT.email}</span>
            </a>
            <div className="flex items-center gap-2 text-[#A7ADBB]">
              <Globe size={14} className="text-blue-400" aria-hidden="true" />
              <span>{CONTACT.domain}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
