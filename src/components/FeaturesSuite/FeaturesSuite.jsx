import { Link } from 'react-router-dom'
import { Sparkles, CheckCircle2, ShieldCheck, Zap, Server, Code, Lock, Video, FolderCheck, DollarSign, Gauge, ArrowRight } from 'lucide-react'
import ScrollReveal from '../Motion/ScrollReveal'

const MASTER_FEATURES = [
  { id: 1, name: 'Launch Offer Banner (35% OFF)', status: 'Active Live', tag: 'Scarcity Engine', link: '/' },
  { id: 2, name: 'Dynamic ROI Savings Calculator', status: '5 Currencies (USD/PKR/EUR/GBP/AED)', tag: 'Finance Tool', link: '/tools' },
  { id: 3, name: 'Interactive 3D Technology Matrix', status: 'React 19 / AI / Node / Python', tag: 'Tech Stack', link: '/tools' },
  { id: 4, name: 'Multi-Currency Global Pricing', status: 'Startup & Enterprise Tiers', tag: 'Pricing', link: '/services' },
  { id: 5, name: 'Risk-Free Satisfaction Guarantee', status: '100% Money-Back Benchmark', tag: 'Trust Clause', link: '/services' },
  { id: 6, name: 'Signed Mutual NDA Badge', status: 'Legal Confidentiality Protection', tag: 'Legal Handoff', link: '/services' },
  { id: 7, name: 'Real Google PageSpeed API Audit Engine', status: '100% Truthful Telemetry', tag: 'Audit Tool', link: '/tools' },
  { id: 8, name: 'Client Project Status Tracker', status: 'Real-time ID Tracking (NEX-1042)', tag: 'Client Portal', link: '/' },
  { id: 9, name: 'Founder Admin Control Console', status: 'Live Project Database Manager', tag: 'Admin Control', link: '/admin' },
  { id: 10, name: 'Interactive Portfolio Showcase', status: 'WebGL 3D & Case Study Demos', tag: 'Work Showcase', link: '/portfolio' },
  { id: 11, name: 'Founder Video Script & Shooting Poster Guide', status: 'Markdown Artifact & Script Card', tag: 'Founder Video', link: '/#about' },
  { id: 12, name: 'Step-by-Step Interactive Quote Builder', status: 'Instant Custom Cost Breakdown', tag: 'Estimator', link: '/services' },
  { id: 13, name: 'Verified Client Social Proof Cards', status: '5-Star International Reviews', tag: 'Social Proof', link: '/' },
  { id: 14, name: 'International Payment Badges', status: 'Stripe, Wise, PayPal, Payoneer', tag: 'Payments', link: '/services' },
  { id: 15, name: '24/7 WhatsApp & Priority Support', status: 'Instant Floating Lead Bar', tag: 'Support Hub', link: '/' },
  { id: 16, name: 'Sub-Second Load Time Benchmark', status: 'Guaranteed 99+ Core Web Vitals', tag: 'Performance', link: '/tools' },
  { id: 17, name: 'AI Project Recommendation Assistant', status: 'Smart Tech Stack Finder', tag: 'AI Assistant', link: '/' },
  { id: 18, name: 'High-Converting CTA Sections', status: 'Instant Booking & Lead Capture', tag: 'Conversion', link: '/' },
  { id: 19, name: 'Enterprise Security Badges', status: 'GDPR, SSL, ISO Standards', tag: 'Security', link: '/portfolio' },
  { id: 20, name: '5-Step Process Roadmap', status: 'Discovery → QA → Handoff', tag: 'Methodology', link: '/' },
  { id: 21, name: 'Startup FAQ Accordion', status: 'Comprehensive Business Answers', tag: 'Knowledge Base', link: '/' },
  { id: 22, name: 'Agency Performance Stats Counter', status: '50+ Projects & 99.8% On-Time', tag: 'Track Record', link: '/' },
  { id: 23, name: '100% Full IP & Source Code Ownership', status: 'GitHub Handoff Rights', tag: 'IP Protection', link: '/services' },
  { id: 24, name: 'Unified Dark Futuristic International UI', status: 'High-End Agency Design', tag: 'Master Handoff', link: '/' },
]

export default function FeaturesSuite() {
  return (
    <section className="py-20 bg-[#05070D] text-white border-y border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} className="animate-spin text-blue-400" />
            <span>Master 24 International Startup Features</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Complete Agency &amp; Startup Feature Suite
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-2">
            Explore every active, interactive component integrated across NEXORA DIGITAL.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MASTER_FEATURES.map((feat) => (
            <ScrollReveal key={feat.id} variant="fadeUp" delay={(feat.id % 6) * 0.05}>
              <Link
                to={feat.link}
                className="block p-4 rounded-2xl bg-[#0B1020]/80 border border-white/10 hover:border-blue-500/50 hover:bg-blue-950/20 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-mono text-blue-400">Feature #{feat.id}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
                  <span>{feat.name}</span>
                  <ArrowRight size={14} className="text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-green-400 flex-shrink-0" />
                  <span>{feat.status}</span>
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
