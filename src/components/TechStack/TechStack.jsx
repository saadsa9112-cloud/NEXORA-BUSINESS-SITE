import ScrollReveal from '../Motion/ScrollReveal'
import { Code, Cpu, Server, ShieldCheck, Zap, Globe, Layers, Database } from 'lucide-react'

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
    <section className="py-20 lg:py-28 bg-white border-b border-[#E5EAF1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-4">
              <Cpu size={14} />
              <span>Enterprise Technology Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] leading-tight tracking-tight mb-4">
              Engineered for Speed, Security &amp; <span className="text-[#0066FF]">Scale</span>
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed">
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
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] hover:border-[#0066FF]/40 transition-all duration-300 group hover:-translate-y-1 shadow-xs hover:shadow-lg h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#E5EAF1] text-[#0066FF] flex items-center justify-center mb-5 shadow-2xs group-hover:bg-[#0066FF] group-hover:text-white transition-colors duration-300">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1020] mb-2">{item.title}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed mb-4">{item.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-[#E5EAF1] flex flex-wrap gap-1.5">
                    {item.techs.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 bg-white border border-[#E5EAF1] text-[#374151] text-[10px] font-bold rounded-md"
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
