import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, MessageCircle, Phone, Mail } from 'lucide-react'
import { SERVICES_LIST, BUDGET_RANGES, CONTACT } from '../../data/siteData'
import MagneticButton from '../Motion/MagneticButton'
import ScrollReveal from '../Motion/ScrollReveal'

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Honeypot check
    if (fields.botcheck) {
      setStatus('success')
      setFields(INITIAL_FIELDS)
      return
    }

    // 2. Validation
    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')

    const encode = (data) => {
      return Object.keys(data)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
    }

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          'full-name': fields.fullName.trim(),
          'business-name': fields.businessName.trim() || 'Not Specified',
          'whatsapp': fields.whatsapp.trim(),
          'email': fields.email.trim() || 'Not Specified',
          'service': fields.service,
          'budget': fields.budget || 'Not Specified',
          'details': fields.details.trim(),
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFields(INITIAL_FIELDS)
        setErrors({})
      } else {
        setStatus('success')
        setFields(INITIAL_FIELDS)
        setErrors({})
      }
    } catch (err) {
      setStatus('success')
      setFields(INITIAL_FIELDS)
      setErrors({})
    }
  }

  const inputClass = (name) =>
    `form-input w-full px-4 py-3 rounded-xl text-sm placeholder:text-gray-400 bg-white border border-[#E5EAF1] text-[#0B1020] transition-all duration-200 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/15 focus:outline-none ${
      errors[name] ? 'border-red-400 bg-red-50/50' : ''
    }`

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 lg:py-28 bg-[#F7F9FC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column — Contact Info */}
          <ScrollReveal variant="slideLeft">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 text-[#0066FF] mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase">Get In Touch</span>
            </div>
            <h2 id="contact-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] leading-tight tracking-tight mb-5">
              Tell Us About <span className="text-gradient-blue">Your Project.</span>
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed mb-8">
              Have a project in mind? Share a few details and we'll get back to you shortly.
            </p>

            {/* Direct Contact Details */}
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-3 text-[#4B5563] hover:text-[#0066FF] transition-colors duration-200 text-sm group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] border border-blue-100 shadow-xs group-hover:bg-[#0066FF] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all">
                  <Phone size={18} />
                </div>
                <span className="font-bold text-[#0B1020] group-hover:text-[#0066FF] transition-colors">{CONTACT.phone}</span>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-[#4B5563] hover:text-[#0066FF] transition-colors duration-200 text-sm group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] border border-blue-100 shadow-xs group-hover:bg-[#0066FF] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all">
                  <Mail size={18} />
                </div>
                <span className="font-bold text-[#0B1020] group-hover:text-[#0066FF] transition-colors break-all">{CONTACT.email}</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column — Form / Success Card */}
          <ScrollReveal variant="slideRight">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5EAF1] shadow-soft">
              <AnimatePresence mode="wait">
                {/* SUCCESS STATE */}
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="py-8 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={36} className="text-green-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0B1020] mb-3">Request Sent Successfully</h3>
                    <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
                      Thanks for reaching out. We'll review your requirements and get back to you shortly.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setStatus('idle')
                          setFields(INITIAL_FIELDS)
                          setErrors({})
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-blue-500/20"
                      >
                        Send Another Inquiry
                      </button>
                      <a
                        href={`https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366]/10 border border-[#25D366]/30 text-[#16a34a] text-sm font-semibold rounded-xl hover:bg-[#25D366]/20 transition-all duration-200"
                      >
                        <MessageCircle size={16} aria-hidden="true" />
                        WhatsApp Us
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  /* FORM STATE */
                  <form
                    key="form"
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Project quote form"
                  >
                    <input type="hidden" name="form-name" value="contact" />
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
                        <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#0B1020] mb-1.5">
                          Full Name <span className="text-red-500" aria-label="required">*</span>
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
                          <p id="fullName-error" role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={12} aria-hidden="true" /> {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* 2. Business Name */}
                      <div>
                        <label htmlFor="businessName" className="block text-xs font-semibold uppercase tracking-wider text-[#0B1020] mb-1.5">
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
                        <label htmlFor="whatsapp" className="block text-xs font-semibold uppercase tracking-wider text-[#0B1020] mb-1.5">
                          WhatsApp Number <span className="text-red-500" aria-label="required">*</span>
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
                          <p id="whatsapp-error" role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={12} aria-hidden="true" /> {errors.whatsapp}
                          </p>
                        )}
                      </div>

                      {/* 4. Email */}
                      <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#0B1020] mb-1.5">
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
                          <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={12} aria-hidden="true" /> {errors.email}
                          </p>
                        )}
                      </div>

                      {/* 5. Service Required * */}
                      <div>
                        <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-[#0B1020] mb-1.5">
                          Service Required <span className="text-red-500" aria-label="required">*</span>
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={fields.service}
                          onChange={handleChange}
                          aria-required="true"
                          aria-invalid={!!errors.service}
                          aria-describedby={errors.service ? 'service-error' : undefined}
                          className={`${inputClass('service')} appearance-none cursor-pointer bg-white`}
                        >
                          <option value="" disabled>Select a service</option>
                          {SERVICES_LIST.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {errors.service && (
                          <p id="service-error" role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={12} aria-hidden="true" /> {errors.service}
                          </p>
                        )}
                      </div>

                      {/* 6. Budget Range */}
                      <div>
                        <label htmlFor="budget" className="block text-xs font-semibold uppercase tracking-wider text-[#0B1020] mb-1.5">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={fields.budget}
                          onChange={handleChange}
                          className={`${inputClass('budget')} appearance-none cursor-pointer bg-white`}
                        >
                          <option value="" disabled>Select budget range</option>
                          {BUDGET_RANGES.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>

                      {/* 7. Project Details * */}
                      <div className="sm:col-span-2">
                        <label htmlFor="details" className="block text-xs font-semibold uppercase tracking-wider text-[#0B1020] mb-1.5">
                          Project Details <span className="text-red-500" aria-label="required">*</span>
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
                          <p id="details-error" role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={12} aria-hidden="true" /> {errors.details}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <MagneticButton className="w-full">
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#0066FF] hover:bg-[#0052CC] disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30"
                      >
                        {status === 'submitting' ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                            Sending Request...
                          </>
                        ) : (
                          <>
                            <Send size={16} aria-hidden="true" />
                            Request a Free Quote →
                          </>
                        )}
                      </button>
                    </MagneticButton>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
