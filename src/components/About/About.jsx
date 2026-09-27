import { ArrowRight, ShieldCheck, UserCheck, Video, FileText, Play } from 'lucide-react'
import ScrollReveal from '../Motion/ScrollReveal'

const FLOW_STEPS = ['Strategy', 'Design', 'Development', 'Growth']

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 lg:py-24 bg-white border-y border-[#E5EAF1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <ScrollReveal variant="fadeUp" className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 text-[#0066FF] mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase">About NEXORA DIGITAL</span>
            </div>
            <h2 id="about-heading" className="text-3xl sm:text-4xl font-black text-[#0B1020] leading-tight tracking-tight mb-5">
              Digital Solutions Built Around <span className="text-gradient-blue">Your Business.</span>
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              <strong>NEXORA DIGITAL</strong> provides businesses with professional website development, WordPress CMS, Shopify e-commerce, SEO, graphic design, web hosting, and maintenance services.
            </p>
          </ScrollReveal>

          {/* Founder Badge */}
          <ScrollReveal variant="fadeUp" delay={0.15} className="mb-12">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center flex-shrink-0 font-bold border border-blue-100">
                  <UserCheck size={22} />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold text-[#0066FF] uppercase tracking-wider block">Founder &amp; Lead Architect</span>
                  <h3 className="text-base font-bold text-[#0B1020]">Hafiz Muhammad Saad</h3>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Dedicated Technical Support</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Feature #15: Founder Video Intro & Poster Shooting Guide */}
          <ScrollReveal variant="fadeUp" delay={0.25} className="mb-12">
            <div className="bg-[#05070D] border border-white/10 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/10 gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                    <Video size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Founder Video Intro Script &amp; Poster Guide</span>
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[9px] font-bold rounded-md">
                        FEATURE #15
                      </span>
                    </h4>
                    <p className="text-xs text-gray-400">Executive Video Shooting Script &amp; Teleprompter Lines for Hafiz Muhammad Saad</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5">
                  <FileText size={14} />
                  <span>Script Ready</span>
                </span>
              </div>

              {/* Script Teleprompter Card */}
              <div className="bg-[#0B1020] p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3 font-mono text-xs text-gray-300">
                <div className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Play size={12} fill="currentColor" />
                  <span>30-Sec Script Teleprompter Lines:</span>
                </div>
                <p className="leading-relaxed italic border-l-2 border-blue-500 pl-3">
                  "Assalam-o-Alaikum, I'm Hafiz Muhammad Saad, Founder &amp; Lead Architect at NEXORA DIGITAL. If your site is slowing down sales, we engineer high-speed React 19 &amp; Shopify platforms with a guaranteed 99/100 Google PageSpeed score, 100% source code ownership, and signed NDA."
                </p>
                <div className="flex flex-wrap gap-2 pt-2 text-[11px] text-gray-400 font-sans">
                  <span className="bg-white/5 px-2 py-1 rounded border border-white/10">📷 Camera: 4K Center Framing</span>
                  <span className="bg-white/5 px-2 py-1 rounded border border-white/10">🎬 Lighting: 3-Point Studio Softbox</span>
                  <span className="bg-white/5 px-2 py-1 rounded border border-white/10">📜 Artifact: founder_video_script.md</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Flow diagram */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {FLOW_STEPS.map((step, idx) => (
              <ScrollReveal key={step} variant="scaleUp" delay={idx * 0.08}>
                <div className="flex items-center gap-3">
                  <div className="px-5 py-3 rounded-xl border border-[#E5EAF1] bg-[#F8FAFC] shadow-xs hover:border-[#0066FF]/30 hover:bg-blue-50/50 hover:scale-105 transition-all duration-300">
                    <span className="text-[#0B1020] font-semibold text-sm">{step}</span>
                  </div>
                  {idx < FLOW_STEPS.length - 1 && (
                    <ArrowRight
                      size={16}
                      className="text-[#0066FF] flex-shrink-0 hidden sm:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
