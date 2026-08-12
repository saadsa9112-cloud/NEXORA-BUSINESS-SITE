import { PROCESS_STEPS } from '../../data/siteData'

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="py-24 lg:py-32 bg-[#0B1020]/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 mb-4">
            <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">Our Process</span>
          </div>
          <h2 id="process-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            From Idea to <span className="text-gradient-blue">Launch.</span>
          </h2>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid md:grid-cols-6 gap-0 relative">
          {/* Connecting line */}
          <div
            className="absolute top-10 left-[calc(1/12*100%)] right-[calc(1/12*100%)] h-px"
            style={{
              background: 'linear-gradient(90deg, rgba(59,130,246,0.05), rgba(59,130,246,0.4) 50%, rgba(59,130,246,0.05))',
            }}
            aria-hidden="true"
          />

          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="reveal flex flex-col items-center text-center px-3 relative"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              {/* Step circle */}
              <div className="relative z-10 mb-5">
                <div className="w-20 h-20 rounded-full border border-blue-500/20 bg-[#05070D] flex flex-col items-center justify-center group hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 cursor-default">
                  <span className="text-[10px] font-bold text-blue-400 tracking-widest">{step.number}</span>
                  <span className="text-[8px] text-[#A7ADBB] uppercase tracking-widest font-semibold mt-0.5">{step.title}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
              <p className="text-[#A7ADBB] text-xs leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative">
          {/* Vertical line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(180deg, rgba(59,130,246,0.05), rgba(59,130,246,0.4) 50%, rgba(59,130,246,0.05))',
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="reveal flex items-start gap-6 pl-0"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                {/* Circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full border border-blue-500/25 bg-[#05070D] flex flex-col items-center justify-center">
                    <span className="text-[9px] font-bold text-blue-400 tracking-widest">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-3">
                  <h3 className="text-white font-bold text-base mb-1">{step.title}</h3>
                  <p className="text-[#A7ADBB] text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
