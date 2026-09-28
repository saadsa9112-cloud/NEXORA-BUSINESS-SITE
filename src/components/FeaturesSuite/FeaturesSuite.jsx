import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import ScrollReveal from '../Motion/ScrollReveal'

const FEATURES = [
  { id: 1, title: 'Psychological Scarcity Launch Engine', desc: 'Live countdown counter & claimed slots for high conversion', link: '#home' },
  { id: 2, name: 'Dynamic ROI Revenue Calculator', desc: 'Manual parameter calculations across 5 global currencies', link: '#tools' },
  { id: 3, name: 'Interactive 3D Technology Matrix', desc: 'React 19, AI/ML, Python, Node.js & Shopify tabs', link: '#tools' },
  { id: 4, name: 'Multi-Currency Global Pricing', desc: 'Transparent PKR & USD tiers for startups and enterprises', link: '#pricing' },
  { id: 5, name: 'Risk-Free Satisfaction Guarantee', status: '100% Money-Back Benchmark', desc: 'Performance SLA with complete satisfaction clause', link: '#services' },
  { id: 6, name: 'Signed Mutual NDA & IP Rights', status: 'Legal Confidentiality Protection', desc: '100% full source code ownership handoff upon completion', link: '#services' },
  { id: 7, name: 'Real Google PageSpeed API Inspection', desc: '100% truthful Lighthouse & Core Web Vitals telemetry', link: '#tools' },
  { id: 8, name: 'Realtime Client Milestone Tracker', desc: 'Enter project ID (e.g. NEX-1042) to track sprint progress', link: '#home' },
  { id: 9, name: 'Founder Admin Control Portal', desc: 'Manage project database, update milestones & slots via URL', link: '#admin' },
  { id: 10, name: 'Interactive Portfolio Showcase', desc: 'Real WebGL 3D, academic & SaaS case studies', link: '#work' },
  { id: 11, name: 'Step-by-Step Quote Estimator', desc: 'Select project scope and receive instant cost breakdown', link: '#services' },
  { id: 12, name: '100% Secure B2B Milestone Payments', desc: 'Stripe, Wise, Payoneer, Wire & Escrow 50/50 terms', link: '#pricing' },
  { id: 13, name: 'Sub-Second Page Load Benchmark', desc: 'Guaranteed 99/100 PageSpeed target for maximum sales', link: '#tools' },
  { id: 14, name: 'AI Project Recommendation Engine', desc: 'Interactive assistant recommending optimal tech stack', link: '#home' },
  { id: 15, name: '5-Step Architectural Methodology', desc: 'Discovery → Design → Development → Speed QA → Handoff', link: '#home' },
  { id: 16, name: 'Startup FAQ & Knowledge Base', desc: 'Clear answers on hosting, security, SLAs & timelines', link: '#faq' },
]

export default function FeaturesSuite() {
  const handleNavClick = (e, link) => {
    e.preventDefault()
    const id = link.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-16 bg-[#05070D] text-white border-y border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal variant="fadeUp" className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={13} className="text-blue-400" />
            <span>International Agency Standards</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Engineered for High-Growth Businesses
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Clean, modern technology suite backing every website built by NEXORA DIGITAL.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((item, idx) => (
            <ScrollReveal key={idx} variant="fadeUp" delay={(idx % 4) * 0.05}>
              <a
                href={item.link}
                onClick={(e) => handleNavClick(e, item.link)}
                className="block p-4 rounded-2xl bg-[#0B1020] border border-white/10 hover:border-blue-500/50 hover:bg-blue-950/30 transition-all duration-300 group cursor-pointer h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold font-mono text-blue-400">#0{idx + 1}</span>
                    <CheckCircle2 size={14} className="text-green-400" />
                  </div>
                  <h3 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                    {item.title || item.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 group-hover:text-blue-400">
                  <span>Explore Feature</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
