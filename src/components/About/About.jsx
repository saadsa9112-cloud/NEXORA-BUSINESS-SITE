import { ArrowRight, ShieldCheck, UserCheck, Code2, Lock, Zap, Award, MessageSquare } from 'lucide-react'
import ScrollReveal from '../Motion/ScrollReveal'
import { CONTACT } from '../../data/siteData'

const FLOW_STEPS = [
  { step: '01', title: 'Strategic Blueprint', desc: 'Scope analysis, system architecture & wireframing' },
  { step: '02', title: 'Modern UI/UX System', desc: 'Clean, brand-tailored conversion design' },
  { step: '03', title: 'React 19 Engineering', desc: 'Zero-bloat code, sub-second speed & SEO' },
  { step: '04', title: 'Launch & Growth', desc: 'Cloud CDN deployment, DNS SSL & monitoring' },
]

const FOUNDER_PILLARS = [
  {
    icon: Zap,
    title: 'Zero-Bloat Speed Standards',
    desc: 'Strict <1.2s FCP and 99+ Core Web Vitals. No heavy template bloat or slow page builders.',
    badge: 'Performance'
  },
  {
    icon: Lock,
    title: '100% Source Code Ownership',
    desc: 'You receive complete Git repository ownership, clean documentation, and master assets. Zero lock-in.',
    badge: 'Full IP Rights'
  },
  {
    icon: Code2,
    title: 'Direct Founder Oversight',
    desc: 'Every architecture decision is directly led by Hafiz Muhammad Saad. No middleman, no junior handoffs.',
    badge: 'Accountability'
  },
  {
    icon: ShieldCheck,
    title: 'Signed NDA & Enterprise Security',
    desc: 'Rigorous data protection with mutual non-disclosure agreements and OWASP secure coding standards.',
    badge: 'Confidentiality'
  }
]

export default function About() {
  const founderConsultMessage = encodeURIComponent(
    "Hello Hafiz Muhammad Saad, I would like to book a direct technical consultation for my project."
  )

  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 lg:py-28 bg-white border-y border-[#E5EAF1] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <ScrollReveal variant="fadeUp" className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 text-[#0066FF] mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase">Engineering Leadership</span>
          </div>
          <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] leading-tight tracking-tight mb-5">
            Architecture Engineered for <span className="text-gradient-blue">Speed, Scale &amp; Trust.</span>
          </h2>
          <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            At <strong>NEXORA DIGITAL</strong>, we eliminate agency bureaucracy. You work directly with a senior technical architect to deliver high-performance web systems and digital platforms.
          </p>
        </ScrollReveal>

        {/* Founder Authority Showcase Card */}
        <ScrollReveal variant="fadeUp" delay={0.1} className="mb-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#F8FAFC] via-white to-blue-50/30 rounded-3xl border border-[#E5EAF1] p-6 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Profile Identity */}
              <div className="flex items-start sm:items-center gap-5">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0066FF] text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-md border-2 border-white flex-shrink-0">
                    HMS
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Active & Available for Consultation">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[11px] font-bold text-[#0066FF] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      Founder &amp; Lead Systems Architect
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <Award size={12} /> Verified Tech Lead
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B1020]">Hafiz Muhammad Saad</h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] mt-1 max-w-md">
                    Full-Stack Software Engineer &amp; Systems Architect specializing in React 19, high-throughput web apps, and conversion optimization.
                  </p>
                </div>
              </div>

              {/* Founder Direct Action */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=${founderConsultMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0066FF] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-blue-600 transition-all hover:shadow-lg active:scale-95"
                >
                  <MessageSquare size={16} />
                  <span>Consult Founder on WhatsApp</span>
                </a>
                <div className="text-[11px] text-[#6B7280] text-center lg:text-left flex items-center justify-center lg:justify-start gap-1.5">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>Direct 1-on-1 technical advisory</span>
                </div>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#E5EAF1]">
              <div className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-black text-[#0066FF]">99+</div>
                <div className="text-[11px] text-[#6B7280] font-medium">Core Web Vitals</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-black text-[#0B1020]">&lt; 1.2s</div>
                <div className="text-[11px] text-[#6B7280] font-medium">Avg First Contentful Paint</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-black text-[#0B1020]">100%</div>
                <div className="text-[11px] text-[#6B7280] font-medium">IP Code Handoff</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-black text-emerald-600">30-Day</div>
                <div className="text-[11px] text-[#6B7280] font-medium">Post-Launch Warranty</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Engineering Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FOUNDER_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <ScrollReveal key={pillar.title} variant="fadeUp" delay={idx * 0.08}>
                <div className="h-full bg-[#F8FAFC] border border-[#E5EAF1] rounded-2xl p-6 shadow-xs hover:border-[#0066FF]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold border border-blue-100">
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-[#E5EAF1]">
                        {pillar.badge}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#0B1020] mb-2">{pillar.title}</h4>
                    <p className="text-xs text-[#4B5563] leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* 4-Step Architecture Delivery Pipeline */}
        <div>
          <ScrollReveal variant="fadeUp" className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B1020]">Our Proven Delivery Pipeline</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">From initial concept to production-grade deployment</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FLOW_STEPS.map((step, idx) => (
              <ScrollReveal key={step.title} variant="scaleUp" delay={idx * 0.08}>
                <div className="p-5 rounded-2xl border border-[#E5EAF1] bg-[#F8FAFC] hover:border-[#0066FF]/30 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#0066FF] block mb-2">{step.step}</span>
                    <h5 className="text-sm font-bold text-[#0B1020] mb-1">{step.title}</h5>
                    <p className="text-xs text-[#4B5563]">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
