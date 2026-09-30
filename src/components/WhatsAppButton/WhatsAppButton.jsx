import { MessageCircle } from 'lucide-react'
import { CONTACT } from '../../data/siteData'

export default function WhatsAppButton() {
  const href = `https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.whatsappMessage}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with NEXORA DIGITAL on WhatsApp"
      className="wa-button fixed bottom-6 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-2xl shadow-2xl shadow-[#25D366]/25 transition-all duration-200 hover:scale-105 hover:shadow-[#25D366]/40"
    >
      <MessageCircle size={20} aria-hidden="true" className="flex-shrink-0" />
      <span className="hidden sm:block text-sm font-semibold whitespace-nowrap">
        WhatsApp Us
      </span>
    </a>
  )
}
