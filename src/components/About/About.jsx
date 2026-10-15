import { ShieldCheck, UserCheck, Phone, Mail, ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react'
import ScrollReveal from '../Motion/ScrollReveal'
import { CONTACT } from '../../data/siteData'

const WORKFLOW_STEPS = [
  { step: '01', title: 'Discussion & Scope', desc: 'We understand your goals, target audience, and project requirements.' },
  { step: '02', title: 'Design & Review', desc: 'Clean, modern UI layout tailored specifically to your brand identity.' },
  { step: '03', title: 'Development & Testing', desc: 'Fast, secure, and mobile-friendly build with thorough device testing.' },
  { step: '04', title: 'Launch & Handoff', desc: 'Domain/hosting deployment, full credentials handover, and 30-day warranty.' },
]

const REAL_PROMISES = [
  'Direct communication with the lead developer on your project',
  'Transparent quotes with clear milestones — no hidden charges',
  '100% full ownership of your source code, design assets & credentials',
  '30 days of post-launch technical assistance and maintenance included',
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 lg:py-28 bg-white dark:bg-[#05070D] border-y border-[#E5EAF1] dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <ScrollReveal variant="fadeUp" className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-[#0066FF] dark:text-[#38BDF8] mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase">About NEXORA DIGITAL</span>
          </div>
          <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] dark:text-white leading-tight tracking-tight mb-5">
            Digital Solutions Built Around <span className="text-gradient-blue">Your Business.</span>
          </h2>
          <p className="text-[#4B5563] dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            <strong>NEXORA DIGITAL</strong> is a dedicated web design and digital development agency. We help small businesses, startups, and brands establish a credible online presence with high-performing websites, WordPress, Shopify stores, and digital marketing.
          </p>
        </ScrollReveal>

        {/* Real Founder Card & Message */}
        <ScrollReveal variant="fadeUp" delay={0.1} className="mb-16">
          <div className="max-w-4xl mx-auto bg-[#F8FAFC] dark:bg-[#0B1020] border border-[#E5EAF1] dark:border-white/10 rounded-2xl p-6 sm:p-10 shadow-xs relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#E5EAF1] dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-blue-50 dark:bg-[#131B2E] text-[#0066FF] dark:text-[#38BDF8] border border-blue-100 dark:border-blue-500/20 flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <UserCheck size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-[#0066FF] dark:text-[#38BDF8] uppercase tracking-wider bg-white dark:bg-[#131B2E] px-2.5 py-0.5 rounded border border-[#E5EAF1] dark:border-white/10">
                      Founder &amp; Lead Developer
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B1020] dark:text-white">Hafiz Muhammad Saad</h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] dark:text-slate-400">Karachi, Pakistan • Serving Clients Locally &amp; Globally</p>
                </div>
              </div>

              {/* Direct Founder Contacts */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Saad, I want to discuss a project with you.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0066FF] text-white text-xs sm:text-sm font-semibold hover:bg-blue-600 transition-all shadow-xs cursor-pointer"
                >
                  <MessageSquare size={15} />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={`tel:${CONTACT.phone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#131B2E] border border-[#E5EAF1] dark:border-white/10 text-[#0B1020] dark:text-white text-xs sm:text-sm font-semibold hover:bg-gray-100 dark:hover:bg-white/5 transition-all shadow-2xs"
                >
                  <Phone size={14} className="text-[#0066FF] dark:text-[#38BDF8]" />
                  <span>{CONTACT.phone}</span>
                </a>
              </div>
            </div>

            {/* Founder's Genuine Note */}
            <div className="pt-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-slate-400 block mb-2">A Personal Commitment</span>
              <p className="text-sm sm:text-base text-[#4B5563] dark:text-slate-300 leading-relaxed italic border-l-3 border-[#0066FF] dark:border-[#38BDF8] pl-4 mb-6">
                &ldquo;When you trust NEXORA DIGITAL with your project, you work directly with me and my team. We don&rsquo;t use bloated, slow templates or pass clients between different support agents. Every line of code, design layout, and feature is crafted to help your business gain trust, load fast, and convert visitors into customers.&rdquo;
              </p>

              {/* Real agency promises list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {REAL_PROMISES.map((promise, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0B1020] dark:text-white">
                    <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{promise}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 4-Step Working Process */}
        <div>
          <ScrollReveal variant="fadeUp" className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B1020] dark:text-white">How We Work Together</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-slate-400 mt-1">A simple, transparent 4-step process from initial idea to live launch</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WORKFLOW_STEPS.map((item, idx) => (
              <ScrollReveal key={item.step} variant="scaleUp" delay={idx * 0.08}>
                <div className="p-5 rounded-xl border border-[#E5EAF1] dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1020] hover:border-[#0066FF]/30 dark:hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#0066FF] dark:text-[#38BDF8] block mb-2">{item.step}</span>
                    <h4 className="text-sm font-bold text-[#0B1020] dark:text-white mb-1.5">{item.title}</h4>
                    <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed">{item.desc}</p>
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
