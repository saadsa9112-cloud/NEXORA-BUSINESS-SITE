import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react'
import { CONTACT } from '../../data/siteData'

const SERVICE_DETAILS = {
  'Business Website Development': {
    price: 'Rs. 15,000 / $299',
    pricePeriod: 'Starting Investment',
    overview: 'High-impact corporate web platforms custom engineered to establish digital authority and accelerate client acquisition.',
    deliverables: [
      'Bespoke Executive UI/UX Design tailored to your brand identity',
      'Up to 5 Fully Adaptive & Mobile-Optimized Page Architectures',
      'Lead Capture & Inbound Inquiry System with immediate notification triggers',
      'Technical SEO Foundation, Schema Markup & Meta Configuration',
      'Interactive Maps, API Connectors & Social Channels Integration',
      'Sub-second Load Speeds & OWASP Security Best Practices',
    ],
    techStack: ['Corporate Web Architecture', 'Custom UI/UX System', 'Mobile First', 'Technical SEO', 'Lead Funnels'],
    timeline: '5 – 7 Business Days',
  },
  'WordPress Development': {
    price: 'Rs. 20,000 / $399',
    pricePeriod: 'Starting Investment',
    overview: 'Enterprise-grade CMS platform setup optimized for content governance, high performance, and effortless administration.',
    deliverables: [
      'Custom WordPress Theme Architecture & Page Builder Engine',
      'Intuitive Administrative Dashboard for seamless content management',
      'Structured Insights & Publications Hub with taxonomy categories',
      'Hardened Security, Caching & Performance Plugin Configurations',
      'Comprehensive Administrator Handoff & Technical Walkthrough',
    ],
    techStack: ['WordPress Architecture', 'CMS Governance', 'Content Hub', 'Custom Theme', 'Enterprise Plugins'],
    timeline: '7 – 10 Business Days',
  },
  'Shopify Development': {
    price: 'Rs. 35,000 / $599',
    pricePeriod: 'Starting Investment',
    overview: 'Omnichannel e-commerce store architecture built for high-conversion retail, multi-currency checkout, and rapid scaling.',
    deliverables: [
      'Turnkey Shopify Architecture & Customized Theme Setup',
      'Product Taxonomy, Multi-Variant Catalog & Inventory Engine',
      'Domestic & International Multi-Currency Payment Gateway Integration',
      'Automated Order Lifecycle, Invoicing & Logistics Telemetry',
      'Conversion Rate Optimized (CRO) Mobile-First Shopping Flow',
    ],
    techStack: ['Shopify Architecture', 'Product Taxonomy', 'Global Payments', 'Inventory Telemetry', 'CRO Checkout'],
    timeline: '8 – 12 Business Days',
  },
  'SEO Services': {
    price: 'Rs. 15,000 / $249',
    pricePeriod: '/month',
    overview: 'Data-driven search engine optimization to capture high-intent organic market share and dominate target keywords.',
    deliverables: [
      'Comprehensive Technical, Structural & On-Page SEO Audit',
      'In-Depth Commercial Keyword Mining & Competitor Benchmarking',
      'Meta Data, Heading Hierarchy & XML Schema Sitemap Optimization',
      'Google Search Console & GA4 Telemetry Analytics Deployment',
      'Monthly Executive Performance & Organic Ranking Intelligence Reports',
    ],
    techStack: ['Keyword Mining', 'Technical SEO Audit', 'Schema Markup', 'GA4 Analytics', 'Executive Reports'],
    timeline: 'Continuous Monthly SLA',
  },
  'Graphic Design': {
    price: 'Rs. 2,000 / $49',
    pricePeriod: 'Starting Investment',
    overview: 'Executive visual identity systems and brand assets designed to command industry authority.',
    deliverables: [
      'Custom Vector Logo System (3 Executive Concepts)',
      'Brand Identity Guidelines (Color Systems & Typography)',
      'High-Impact Social Media Graphics & Executive Banners',
      'Production-Ready Master Source Files (SVG, PDF, EPS, High-Res PNG)',
    ],
    techStack: ['Logo System', 'Brand Guidelines', 'Social Assets', 'Digital Collateral'],
    timeline: '3 – 5 Business Days',
  },
  'Hosting & Domain': {
    price: 'Rs. 16,000 / $149',
    pricePeriod: '/year',
    overview: 'Managed enterprise cloud infrastructure ensuring 99.9% uptime, rapid DNS resolution, and domain security.',
    deliverables: [
      'Global .com Domain Registration',
      'Managed Cloud Web Infrastructure',
      'Automated SSL Encryption Certificate',
      'Enterprise DNS Routing & CDN Setup',
      'Custom Business Email Provisioning',
      'Continuous Domain Security & DDoS Mitigation',
      'Dedicated Deployment Engineering Support',
    ],
    disclaimer: 'Starting investment from Rs. 16,000 / $149 yearly. Final rate depends on domain registry tier, cloud resource allocation, and email seat requirements.',
    techStack: ['Cloud Hosting', 'Global Domain', 'SSL Encryption', 'DNS Routing', 'Enterprise Email'],
    timeline: '1 – 2 Business Days',
  },
  'Website Maintenance': {
    price: 'Rs. 5,000 / $79',
    pricePeriod: '/month',
    overview: 'Proactive SLA maintenance, security monitoring, automated backups, and continuous performance tuning post-launch.',
    deliverables: [
      'Routine Core Engine, Theme & Security Patch Management',
      '24/7 Security Scanning & Real-Time Threat Mitigation',
      'Scheduled Offsite Database & Full System Backups',
      'Monthly Content Updates & UI Maintenance Support',
      'Core Web Vitals & Speed Optimization Audits',
    ],
    techStack: ['SLA Governance', 'Threat Security', 'Offsite Backups', 'Core Web Vitals'],
    timeline: 'Continuous Monthly SLA',
  },
  'Custom Web Application': {
    price: 'Rs. 45,000 / $999',
    pricePeriod: 'Starting Investment',
    overview: 'Tailored full-stack web software, client portals, and cloud integrations for complex business operations.',
    deliverables: [
      'Custom React / Node.js Full-Stack Application Architecture',
      'Relational Database Modeling, RBAC Authentication & Security',
      'RESTful & GraphQL API Integration with Custom Webhooks',
      'Executive Operations Dashboard & Administrative Controls',
      'High-Availability Cloud Server Deployment & Telemetry',
      'Complete Technical Documentation & Engineering Handoff',
    ],
    techStack: ['Full-Stack React/Node', 'API Integration', 'RBAC Security', 'Cloud Infrastructure', 'Executive Dashboard'],
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
