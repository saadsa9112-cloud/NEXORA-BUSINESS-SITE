import ScrollReveal from '../Motion/ScrollReveal'
import { Code, Cpu, Server, ShieldCheck, Layers } from 'lucide-react'

const TECH_ITEMS = [
  {
    icon: Code,
    title: 'Modern Front-End',
    techs: ['React 19', 'Vite', 'Tailwind CSS v4', 'Framer Motion'],
    desc: 'Lightning-fast client rendering with responsive animations and minimal bundle sizes.'
  },
  {
    icon: Layers,
    title: 'CMS & E-Commerce',
    techs: ['Shopify Liquid', 'WordPress Custom', 'WooCommerce', 'Headless CMS'],
    desc: 'Easy-to-manage, content-rich platforms tailored for online sales and brand publishing.'
  },
  {
    icon: ShieldCheck,
    title: 'Technical SEO & Schema',
    techs: ['JSON-LD Schemas', 'Core Web Vitals', 'Semantic HTML5', 'OpenGraph Meta'],
    desc: 'Built-in Google Brand Entity optimization for high search rankings and rich snippet previews.'
  },
  {
    icon: Server,
    title: 'Cloud & Infrastructure',
    techs: ['Netlify Cloud', 'Cloudflare CDN', 'SSL / HTTPS', 'Automated CI/CD'],
    desc: 'High-availability global hosting infrastructure with 99.99% uptime SLA.'
  }
]

export default function TechStack() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#05070D] border-b border-[#E5EAF1] dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30 text-[#0066FF] dark:text-[#38BDF8] text-xs font-bold uppercase tracking-wider mb-4">
              <Cpu size={14} />
              <span>Enterprise Technology Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] dark:text-white leading-tight tracking-tight mb-4">
              Engineered for Speed, Security &amp; <span className="text-[#0066FF] dark:text-[#38BDF8]">Scale</span>
            </h2>
            <p className="text-base text-[#4B5563] dark:text-slate-300 leading-relaxed">
              We leverage modern industry-standard frameworks and cloud infrastructure to ensure your digital platform is secure, fast, and ready to scale.
            </p>
          </ScrollReveal>
        </div>

        {/* Tech Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_ITEMS.map((item, idx) => {
            const Icon = item.icon
            return (
              <ScrollReveal key={item.title} variant="fadeUp" delay={idx * 0.1}>
                <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1020] border border-[#E5EAF1] dark:border-white/10 hover:border-[#0066FF]/60 dark:hover:border-blue-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-xs hover:shadow-lg h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#131B2E] border border-[#E5EAF1] dark:border-blue-500/30 text-[#0066FF] dark:text-[#38BDF8] flex items-center justify-center mb-5 shadow-2xs group-hover:bg-[#0066FF] group-hover:text-white transition-all duration-300">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1020] dark:text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-[#6B7280] dark:text-slate-400 leading-relaxed mb-4">{item.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-[#E5EAF1] dark:border-white/10 flex flex-wrap gap-1.5">
                    {item.techs.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 bg-white dark:bg-[#131B2E] border border-[#E5EAF1] dark:border-white/10 text-[#374151] dark:text-slate-200 text-[11px] font-semibold rounded-lg shadow-2xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
