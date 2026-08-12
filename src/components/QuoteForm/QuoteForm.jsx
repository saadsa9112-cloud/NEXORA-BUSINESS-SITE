import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react'
import { SERVICES_LIST, BUDGET_RANGES, CONTACT } from '../../data/siteData'

const INITIAL_FIELDS = {
  fullName: '',
  businessName: '',
  whatsapp: '',
  email: '',
  service: '',
  budget: '',
  details: '',
  botcheck: '',
}

function validate(fields) {
  const errors = {}
  
  if (!fields.fullName.trim()) {
    errors.fullName = 'Please enter your name.'
  }
  
  if (!fields.whatsapp.trim()) {
    errors.whatsapp = 'Please enter your WhatsApp number.'
  } else {
    const cleaned = fields.whatsapp.replace(/[\s\-\(\)]/g, '')
    const isPakistaniFormat = /^(?:\+92|92|0)?3\d{9}$/.test(cleaned)
    const isGeneralPhone = /^\+?\d{10,15}$/.test(cleaned)
    if (!isPakistaniFormat && !isGeneralPhone) {
      errors.whatsapp = 'Please enter a valid WhatsApp number.'
    }
  }

  if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!fields.service) {
    errors.service = 'Please select a service.'
  }

  if (!fields.details.trim()) {
    errors.details = 'Please tell us a little about your project.'
  } else if (fields.details.trim().length < 15) {
    errors.details = 'Please tell us a little about your project.'
  }

  return errors
}

export default function QuoteForm() {
  const [fields, setFields] = useState(INITIAL_FIELDS)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const [lastSubmitTime, setLastSubmitTime] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // 1. Honeypot spam check
    if (fields.botcheck) {
      setStatus('success')
      setFields(INITIAL_FIELDS)
      return
    }

    // 2. Cooldown check
    const now = Date.now()
    if (now - lastSubmitTime < 2000) {
      return
    }

    // 3. Validation
    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLastSubmitTime(now)
    setStatus('submitting')

    // 4. Format WhatsApp Message
    const messageLines = [
      `*New Project Inquiry — NEXORA DIGITAL*`,
      ``,
      `*Name:* ${fields.fullName.trim()}`,
      fields.businessName.trim() ? `*Business:* ${fields.businessName.trim()}` : null,
      `*WhatsApp:* ${fields.whatsapp.trim()}`,
      fields.email.trim() ? `*Email:* ${fields.email.trim()}` : null,
      `*Service Required:* ${fields.service}`,
      fields.budget ? `*Budget:* ${fields.budget}` : null,
      ``,
      `*Project Details:*`,
      fields.details.trim(),
    ].filter(Boolean)

    const fullMessage = messageLines.join('\n')
    const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(fullMessage)}`

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      setStatus('success')
      setFields(INITIAL_FIELDS)
      setErrors({})
    }, 400)
  }

  const inputClass = (name) =>
    `form-input w-full px-4 py-3 rounded-xl text-sm placeholder:text-[#A7ADBB]/60 transition-all duration-200 focus:border-blue-500 focus:bg-blue-500/5 focus:outline-none ${
      errors[name] ? 'border-red-500/60 bg-red-500/5' : ''
    }`

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 lg:py-32 bg-[#0B1020]/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column — Contact Info */}
          <div className="reveal-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 mb-4">
              <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">Get In Touch</span>
            </div>
            <h2 id="contact-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-5">
              Tell Us About <span className="text-gradient-blue">Your Project.</span>
            </h2>
            <p className="text-[#A7ADBB] text-lg leading-relaxed mb-8">
              Have a project in mind? Share a few details and we'll get back to you immediately.
            </p>

            {/* Direct Contact Details */}
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-3 text-[#A7ADBB] hover:text-white transition-colors duration-200 text-sm group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 group-hover:border-blue-500/30 flex items-center justify-center flex-shrink-0 transition-colors">
                  <span className="text-xs">📞</span>
                </div>
                <span>{CONTACT.phone}</span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-[#A7ADBB] hover:text-white transition-colors duration-200 text-sm group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 group-hover:border-blue-500/30 flex items-center justify-center flex-shrink-0 transition-colors">
                  <span className="text-xs">✉️</span>
                </div>
                <span>{CONTACT.email}</span>
              </a>
              <div className="flex items-center gap-3 text-[#A7ADBB] text-sm">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">🌐</span>
                </div>
                <span>{CONTACT.domain}</span>
              </div>
            </div>
          </div>

          {/* Right Column — Form / Success Card */}
          <div className="reveal-right">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/6 shadow-2xl">
              
              {/* SUCCESS STATE */}
              {status === 'success' ? (
                <div className="py-8 text-center" role="status" aria-live="polite">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={36} className="text-green-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Inquiry Sent via WhatsApp!</h3>
                  <p className="text-[#A7ADBB] text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
                    Your project details have been formatted and opened in WhatsApp. We look forward to discussing your project!
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setStatus('idle')
                        setFields(INITIAL_FIELDS)
                        setErrors({})
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      Send Another Inquiry
                    </button>
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-sm font-semibold rounded-xl hover:bg-[#25D366]/25 transition-all duration-200"
                    >
                      <MessageCircle size={16} aria-hidden="true" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                /* FORM STATE */
                <form onSubmit={handleSubmit} noValidate aria-label="Project quote form">
                  
                  {/* Honeypot Spam Protection Field (Hidden) */}
                  <input
                    type="text"
                    name="botcheck"
                    value={fields.botcheck}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Form Input Fields Grid */}
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    {/* 1. Full Name * */}
                    <div className="sm:col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-medium text-[#A7ADBB] mb-1.5">
                        Full Name <span className="text-red-400" aria-label="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={fields.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        autoComplete="name"
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        className={inputClass('fullName')}
                      />
                      {errors.fullName && (
                        <p id="fullName-error" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle size={12} aria-hidden="true" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* 2. Business Name */}
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-[#A7ADBB] mb-1.5">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={fields.businessName}
                        onChange={handleChange}
                        placeholder="Optional"
                        autoComplete="organization"
                        className={inputClass('businessName')}
                      />
                    </div>

                    {/* 3. WhatsApp Number * */}
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-[#A7ADBB] mb-1.5">
                        WhatsApp Number <span className="text-red-400" aria-label="required">*</span>
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={fields.whatsapp}
                        onChange={handleChange}
                        placeholder="e.g. 03453937195"
                        autoComplete="tel"
                        aria-required="true"
                        aria-invalid={!!errors.whatsapp}
                        aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
                        className={inputClass('whatsapp')}
                      />
                      {errors.whatsapp && (
                        <p id="whatsapp-error" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle size={12} aria-hidden="true" /> {errors.whatsapp}
                        </p>
                      )}
                    </div>

                    {/* 4. Email */}
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-[#A7ADBB] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={fields.email}
                        onChange={handleChange}
                        placeholder="yourname@example.com (Optional)"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={inputClass('email')}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle size={12} aria-hidden="true" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* 5. Service Required * */}
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-[#A7ADBB] mb-1.5">
                        Service Required <span className="text-red-400" aria-label="required">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={fields.service}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.service}
                        aria-describedby={errors.service ? 'service-error' : undefined}
                        className={`${inputClass('service')} bg-[#0B1020] appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>Select a service</option>
                        {SERVICES_LIST.map((s) => (
                          <option key={s} value={s} className="bg-[#0B1020]">{s}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <p id="service-error" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle size={12} aria-hidden="true" /> {errors.service}
                        </p>
                      )}
                    </div>

                    {/* 6. Budget Range */}
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-[#A7ADBB] mb-1.5">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={fields.budget}
                        onChange={handleChange}
                        className={`${inputClass('budget')} bg-[#0B1020] appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>Select budget range</option>
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b} className="bg-[#0B1020]">{b}</option>
                        ))}
                      </select>
                    </div>

                    {/* 7. Project Details * */}
                    <div className="sm:col-span-2">
                      <label htmlFor="details" className="block text-sm font-medium text-[#A7ADBB] mb-1.5">
                        Project Details <span className="text-red-400" aria-label="required">*</span>
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        value={fields.details}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your project, goals and any specific requirements..."
                        aria-required="true"
                        aria-invalid={!!errors.details}
                        aria-describedby={errors.details ? 'details-error' : undefined}
                        className={`${inputClass('details')} resize-none`}
                      />
                      {errors.details && (
                        <p id="details-error" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle size={12} aria-hidden="true" /> {errors.details}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-500 hover:bg-blue-400 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                        Opening WhatsApp...
                      </>
                    ) : (
                      <>
                        <Send size={16} aria-hidden="true" />
                        Request a Free Quote →
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-center text-xs text-white/30">
                    Your inquiry details will open directly in WhatsApp chat.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
