import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react'
import { CONTACT } from '../../data/siteData'

const SERVICE_DETAILS = {
  'Business Website Development': {
    price: 'Rs. 15,000',
    pricePeriod: 'Starting From',
    overview: 'Custom modern website design and development tailored to your business goals.',
    deliverables: [
      'Custom Modern UI/UX Design tailored to your brand',
      'Up to 5 Fully Responsive & Mobile-Optimized Pages',
      'Contact & Quote Request Form with instant notifications',
      'SEO-Ready Technical Structure & Meta Tag setup',
      'Google Maps & Social Media Integration',
      'Fast Load Speeds & Basic Security Configuration',
    ],
    techStack: ['Web Development', 'Custom UI/UX', 'Responsive Design', 'SEO Ready', 'Contact Form'],
    timeline: '5 – 7 Business Days',
  },
  'WordPress Development': {
    price: 'Rs. 20,000',
    pricePeriod: 'Starting From',
    overview: 'Professional, flexible and easy-to-manage WordPress website setup.',
    deliverables: [
      'Custom WordPress Theme & Page Builder Configuration',
      'Easy-to-use Admin Dashboard for content updates',
      'Blog / News Section setup with categories',
      'Essential Plugin Configuration (Security, Speed, SEO)',
      '1-on-1 Admin Training & Video Walkthrough',
    ],
    techStack: ['WordPress', 'CMS Integration', 'Blog Setup', 'Custom Theme', 'Plugins'],
    timeline: '7 – 10 Business Days',
  },
  'Shopify Development': {
    price: 'Rs. 35,000',
    pricePeriod: 'Starting From',
    overview: 'Complete e-commerce store setup built for high conversion and smooth shopping.',
    deliverables: [
      'Complete Shopify Store Setup & Theme Customization',
      'Product Catalogue, Collections & Inventory Setup',
      'Local & International Payment Gateway Integration',
      'Automated Order & Shipping Notification System',
      'Mobile-First E-Commerce Shopping Experience',
    ],
    techStack: ['Shopify Store', 'Product Catalogue', 'Payment Setup', 'Inventory', 'Mobile E-Commerce'],
    timeline: '8 – 12 Business Days',
  },
  'SEO Services': {
    price: 'Rs. 15,000',
    pricePeriod: '/month',
    overview: 'Improve search rankings, attract organic traffic and optimize your search presence.',
    deliverables: [
      'Comprehensive Technical & On-Page SEO Audit',
      'In-Depth Keyword Research & Competitor Analysis',
      'Meta Tag, Heading & Sitemap Optimization',
      'Google Search Console & Analytics 4 Setup',
      'Monthly Ranking & Performance Traffic Reports',
    ],
    techStack: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Google Analytics', 'Monthly Reports'],
    timeline: 'Ongoing Monthly Service',
  },
  'Graphic Design': {
    price: 'Rs. 2,000+',
    pricePeriod: 'Starting From',
    overview: 'Professional visual design solutions to strengthen your brand identity.',
    deliverables: [
      'Custom Vector Logo Design (3 Concepts)',
      'Complete Brand Style Guide (Colors & Typography)',
      'Social Media Graphics & Marketing Banners',
      'High-Resolution Print & Web Source Files (PNG, SVG, PDF)',
    ],
    techStack: ['Logo Design', 'Brand Identity', 'Social Graphics', 'Marketing Assets'],
    timeline: '3 – 5 Business Days',
  },
  'Hosting & Domain': {
    price: 'Rs. 16,000 / year',
    pricePeriod: 'Starting From',
    overview: 'Reliable hosting and domain setup to give your business a professional and secure online presence.',
    deliverables: [
      '.com Domain Registration',
      'Reliable Web Hosting',
      'Free SSL Certificate',
      'DNS Configuration',
      'Professional Email Setup',
      'Domain & Hosting Connection',
      'Basic Security Configuration',
      'Initial Deployment Support',
    ],
    disclaimer: 'Starting from Rs. 16,000/year. Final price may vary depending on hosting provider, domain availability, hosting resources and email requirements.',
    techStack: ['Hosting', '.com Domain', 'SSL Certificate', 'DNS Setup', 'Business Email'],
    timeline: '1 – 2 Business Days',
  },
  'Website Maintenance': {
    price: 'Rs. 5,000',
    pricePeriod: '/month',
    overview: 'Ongoing updates, security monitoring, backups and technical support after launch.',
    deliverables: [
      'Regular Core, Theme & Plugin Security Updates',
      '24/7 Security Monitoring & Malware Scans',
      'Weekly Offsite Database & File Backups',
      'Monthly Content Updates & Minor Layout Tweaks',
      'Page Speed & Performance Audits',
    ],
    techStack: ['Regular Updates', 'Security Monitoring', 'Backups', 'Performance Checks'],
    timeline: 'Ongoing Monthly Service',
  },
  'Custom Web Application': {
    price: 'Rs. 45,000',
    pricePeriod: 'Starting From',
    overview: 'Tailored web applications, portals and custom software solutions built for complex business workflows.',
    deliverables: [
      'Custom React / Node.js Application Architecture',
      'Database Design, Authentication & Role Permissions',
      'REST / GraphQL API Integration & Webhooks',
      'Admin Dashboard & Management Interfaces',
      'High-Performance Scalable Cloud Deployment',
      'Comprehensive Technical Documentation & Handoff',
    ],
    techStack: ['Custom Architecture', 'React / Node.js', 'API & Database', 'Cloud Hosting', 'Scalable Security'],
    timeline: '10 – 20 Business Days',
  },
}

export default function ServiceDrawer({ service, onClose, onSelectService }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!service) return null

  const details = SERVICE_DETAILS[service.title] || {
    price: 'Custom Pricing',
    pricePeriod: 'Starting From',
    overview: service.description || 'Professional digital service tailored to your business needs.',
    deliverables: [
      'Professional Implementation',
      'Quality Assurance & Verification',
      'Mobile & Desktop Optimization',
      'Dedicated Client Support',
    ],
    techStack: ['Professional Service', 'Quality Assurance', 'Client Support'],
    timeline: '1 – 3 Business Days',
  }

  const Icon = service.icon

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg bg-white border-l border-[#E5EAF1] shadow-2xl overflow-y-auto flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-6 py-5 border-b border-[#E5EAF1] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold">
                  <Icon size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#0066FF] uppercase tracking-wider block">Service Details</span>
                  <h3 className="text-lg font-bold text-[#0B1020] leading-tight">{service.title}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="w-9 h-9 rounded-xl border border-[#E5EAF1] hover:bg-gray-100 flex items-center justify-center text-[#4B5563] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col gap-6">
              {/* Starting Price Header Card */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EAF1] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider block">{details.pricePeriod}</span>
                  <div className="text-xl font-black text-[#0066FF]">{details.price}</div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#0066FF] text-xs font-bold">
                  Setup: {details.timeline}
                </div>
              </div>

              {/* Overview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-2">Overview</h4>
                <p className="text-[#4B5563] text-sm leading-relaxed">{details.overview}</p>
              </div>

              {/* Pricing Disclaimer if present */}
              {details.disclaimer && (
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs leading-relaxed flex items-start gap-2.5">
                  <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{details.disclaimer}</span>
                </div>
              )}

              {/* What's Included / Deliverables */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-3">What's Included</h4>
                <ul className="flex flex-col gap-2.5" role="list">
                  {details.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#4B5563]">
                      <CheckCircle2 size={16} className="text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What You Get / Service Tags */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-3">What You Get</h4>
                <div className="flex flex-wrap gap-2">
                  {details.techStack.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E5EAF1] text-xs font-semibold text-[#0B1020]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[#E5EAF1] bg-[#F8FAFC] flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  onSelectService(service.title)
                  onClose()
                }}
                className="w-full py-3.5 px-5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Quote for {service.title}</span>
                <ArrowRight size={16} />
              </button>

              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi NEXORA DIGITAL, I would like to get a quote for ${service.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#16a34a] font-semibold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
