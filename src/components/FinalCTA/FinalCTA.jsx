import { MessageCircle } from 'lucide-react'
import { CONTACT } from '../../data/siteData'
import MagneticButton from '../Motion/MagneticButton'
import ScrollReveal from '../Motion/ScrollReveal'

export default function FinalCTA() {
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section aria-labelledby="finalcta-heading" className="py-20 lg:py-28 bg-white border-t border-[#E5EAF1] relative overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal variant="fadeUp">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 text-[#0066FF] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wider uppercase">Ready to Grow?</span>
          </div>

          <h2 id="finalcta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] leading-tight tracking-tight mb-5">
            Ready to Grow <span className="text-gradient-blue">Your Business?</span>
          </h2>

          <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Let's build a professional digital presence that works for your business.
          </p>

          {/* Magnetic Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton onClick={scrollToContact}>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold rounded-xl text-base transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30"
              >
                Get Your Free Quote →
              </button>
            </MagneticButton>

            <MagneticButton>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366]/10 border border-[#25D366]/30 text-[#16a34a] font-semibold rounded-xl text-base transition-all duration-200 hover:bg-[#25D366]/20"
              >
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp Us
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
