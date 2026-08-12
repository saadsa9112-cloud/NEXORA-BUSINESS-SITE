import { WHY_US } from '../../data/siteData'

export default function WhyChooseUs() {
  return (
    <section id="why-us" aria-labelledby="why-heading" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Header */}
          <div className="reveal-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 mb-4">
              <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">Why Nexora</span>
            </div>
            <h2 id="why-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-6">
              Why Choose <span className="text-gradient-blue">NEXORA?</span>
            </h2>
            <p className="text-[#A7ADBB] text-lg leading-relaxed mb-8">
              Professional digital solutions focused on quality, usability and business growth.
            </p>

            {/* Decorative divider */}
            <div className="w-24 h-px bg-gradient-to-r from-blue-500/60 to-transparent" aria-hidden="true" />
          </div>

          {/* Right — Numbered grid */}
          <div className="grid sm:grid-cols-2 gap-6 stagger">
            {WHY_US.map((item) => (
              <div
                key={item.number}
                className="reveal group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/15 hover:bg-white/[0.04] transition-all duration-300"
              >
                {/* Number */}
                <div className="text-4xl font-black text-white/5 group-hover:text-blue-500/15 transition-colors duration-300 mb-3 leading-none select-none">
                  {item.number}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-[#A7ADBB] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
