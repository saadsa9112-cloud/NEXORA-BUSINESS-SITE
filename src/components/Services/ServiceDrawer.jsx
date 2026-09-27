import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Clock, Layers, ArrowRight, ShieldCheck, Zap } from 'lucide-react'

const SERVICE_DETAILS = {
  1: {
    title: 'Business Website Development',
    subtitle: 'Corporate Branding, Lead Capture & High-Speed Architecture',
    timeline: '5 – 7 Business Days',
    techStack: ['React 19', 'Tailwind CSS v4', 'Vite', 'SEO Schema', 'Netlify Cloud'],
    deliverables: [
      'Custom UI/UX Designed Corporate Layout',
      '100% Fully Responsive Across Mobile, Tablet & Desktop',
      'Lead Capture Contact Form with Instant Notification',
      'Technical SEO Setup (JSON-LD Organization Schema)',
      'SSL Security Certificate & Business Email Setup',
      'Google Maps & Social Media Integration',
      '30-Day Post-Launch Technical Support & Warranty'
    ]
  },
  2: {
    title: 'WordPress Development',
    subtitle: 'Custom Theme, Flexible CMS & High-Speed Optimization',
    timeline: '5 – 8 Business Days',
    techStack: ['WordPress CMS', 'PHP 8.2', 'Custom Theme', 'W3 Speed Cache', 'MySQL'],
    deliverables: [
      'Custom WordPress Theme Tailored for Your Brand',
      'Easy Admin Dashboard for Managing Content & Pages',
      'Hardened Security Setup & Firewall Protection',
      'W3 Speed Caching & Image WebP Optimization',
      'Blog / News Hub Setup with Categories',
      '1-on-1 Recorded Admin Training Session',
      'Automated Weekly Database Backups'
    ]
  },
  3: {
    title: 'Shopify Development',
    subtitle: 'High-Converting Store Design & Multi-Currency Checkout',
    timeline: '7 – 10 Business Days',
    techStack: ['Shopify Liquid', 'Custom Theme', 'Multi-Currency', 'REST API', 'CRO Engine'],
    deliverables: [
      'Custom Shopify Store Design Optimized for Conversions',
      'Up to 100+ Product Catalog & Collection Setup',
      'Multi-Currency & Local/Global Payment Gateways',
      'Automated Shipping Rates & Tax Configuration',
      'Abandoned Cart Recovery Email Automation',
      'Mobile Express Checkout (Apple Pay, Google Pay, Visa)',
      'Inventory Sync & Order Notification Setup'
    ]
  },
  4: {
    title: 'SEO Services',
    subtitle: 'Technical SEO Audit, Schema.org & Organic Search Ranking',
    timeline: 'Ongoing / 14-Day Initial Sprint',
    techStack: ['Google Search Console', 'JSON-LD', 'Core Web Vitals', 'Semantic HTML5'],
    deliverables: [
      'Comprehensive Technical SEO & Audit Report',
      'Schema.org Structured Data (Organization, LocalBusiness, FAQ)',
      'Core Web Vitals Optimization (LCP, FID, CLS)',
      'Keyword Mapping & Meta Tag Architecture',
      'Google Search Console & XML Sitemap Indexing',
      'Google Business Profile Setup & Optimization',
      'Monthly Ranking & Traffic Performance Reports'
    ]
  },
  5: {
    title: 'Graphic Design',
    subtitle: 'Brand Identity, Logos, Social Media Kits & Marketing Assets',
    timeline: '3 – 5 Business Days',
    techStack: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Vector Formats (SVG/EPS)'],
    deliverables: [
      'Professional Brand Logo Design (3 Concepts)',
      'Complete Brand Book (Color Palette, Typography, Rules)',
      'Master Vector Source Files (AI, EPS, SVG, PNG, PDF)',
      'Social Media Kit (Covers, Profile Pics, Post Templates)',
      'Business Card & Stationery Print Mockups',
      'Full Commercial Copyright Transfer'
    ]
  },
  6: {
    title: 'Hosting & Domain',
    subtitle: 'High-Availability Cloud Server, SSL & Business Email',
    timeline: '24 Hours Setup',
    techStack: ['Cloudflare CDN', 'Netlify Enterprise', 'DNSSEC', 'SSL 256-Bit'],
    deliverables: [
      'Domain Name Registration & Management',
      'High-Speed Cloud Server Hosting Deployment',
      'Free 256-Bit SSL Security Certificate (HTTPS)',
      'Professional Business Email Setup (name@yourdomain.com)',
      'Global Cloudflare CDN Integration for Low Latency',
      '99.99% Uptime Guarantee SLA'
    ]
  },
  7: {
    title: 'Website Maintenance',
    subtitle: '24/7 Monitoring, Security Patches & Monthly Content Updates',
    timeline: 'Monthly Ongoing Care',
    techStack: ['Uptime Robot', 'Automated Backups', 'Security Scanner', 'Git'],
    deliverables: [
      '24/7 Server Uptime & Performance Monitoring',
      'Monthly Core Software & Security Patch Updates',
      'Daily Automated Offsite Database Backups',
      'Content & Price Updates (up to 3 hrs/month included)',
      'Emergency Hack & Malware Recovery Guarantee',
      'Priority Technical Support Desk Access'
    ]
  },
  8: {
    title: 'Custom Web Application',
    subtitle: 'SaaS Software, Client Portals & Enterprise Databases',
    timeline: '14 – 21 Business Days',
    techStack: ['React 19', 'ASP.NET Core / Node.js', 'PostgreSQL / SQL', 'REST APIs'],
    deliverables: [
      'Custom Web Application Architecture & DB Schema',
      'Multi-Role User Authentication & Admin Dashboards',
      'RESTful API & Third-Party Webhook Integrations',
      'Role-Based Access Control (RBAC) Security',
      'Scalable Cloud Deployment (AWS / Vercel / Netlify)',
      'Full Source Code Ownership & IP Handoff',
      'Detailed API Documentation & Handoff'
    ]
  }
}

export default function ServiceDrawer({ service, isOpen, onClose }) {
  if (!isOpen || !service) return null

  const details = SERVICE_DETAILS[service.id] || {
    title: service.title,
    subtitle: service.description,
    timeline: '5 – 7 Business Days',
    techStack: ['React 19', 'Tailwind CSS', 'Vite'],
    deliverables: [
      'Custom Responsive UI Layout',
      'Technical SEO Optimization',
      '30-Day Warranty Support'
    ]
  }

  const handleApplyService = () => {
    onClose()
    const el = document.getElementById('contact')
    if (el) {
      const serviceSelect = document.getElementById('service')
      if (serviceSelect) {
        const matched = Array.from(serviceSelect.options).find((opt) =>
          service.title.toLowerCase().includes(opt.value.toLowerCase()) ||
          opt.value.toLowerCase().includes(service.title.toLowerCase())
        )
        if (matched) {
          serviceSelect.value = matched.value
          serviceSelect.dispatchEvent(new Event('change', { bubbles: true }))
        }
      }
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Slide-over Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-lg bg-white h-full shadow-2xl z-10 flex flex-col justify-between text-[#0B1020]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#E5EAF1] bg-[#05070D] text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#1F90FF] uppercase tracking-wider block mb-1">Service Scope &amp; Deliverables</span>
              <h3 className="text-xl font-bold">{details.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {details.subtitle}
            </p>

            {/* Timeline Badge */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-bold">
              <Clock size={16} />
              <span>Est. Delivery Timeline: {details.timeline}</span>
            </div>

            {/* Deliverables List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-3 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#0066FF]" />
                Included Scope &amp; Deliverables
              </h4>
              <div className="space-y-2.5">
                {details.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#374151] bg-[#F8FAFC] p-3 rounded-xl border border-[#E5EAF1]">
                    <CheckCircle2 size={14} className="text-[#0066FF] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1020] mb-3 flex items-center gap-1.5">
                <Layers size={15} className="text-[#0066FF]" />
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {details.techStack.map((t) => (
                  <span key={t} className="px-3 py-1 bg-[#F8FAFC] border border-[#E5EAF1] text-[#0B1020] text-xs font-bold rounded-lg">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Guarantees */}
            <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-green-400">
                <ShieldCheck size={16} />
                <span>NEXORA DIGITAL Quality Guarantee</span>
              </div>
              <p className="text-[11px] text-gray-300">Includes 100% Mobile Responsiveness, Sub-1s PageSpeed Optimization, SSL Security, and 30-Day Post-Launch Support.</p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-6 border-t border-[#E5EAF1] bg-[#F8FAFC] flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-3 border border-[#E5EAF1] text-[#4B5563] text-xs font-bold rounded-xl bg-white hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleApplyService}
              className="flex-1 py-3 px-5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Get Started with {details.title}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
