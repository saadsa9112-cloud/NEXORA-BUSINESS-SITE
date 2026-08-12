import { ArrowRight, ChevronDown } from 'lucide-react'
import { CONTACT } from '../../data/siteData'

/* ── Small reusable Device Mockup ───────────────────────────────────────── */
function BrowserMockup({ children, className = '' }) {
  return (
    <div className={`rounded-xl overflow-hidden border border-white/10 bg-[#0d1425] shadow-2xl ${className}`}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-[#0a0f1e] border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <div className="ml-3 flex-1 h-5 rounded bg-white/5 flex items-center px-3">
          <span className="text-[8px] text-white/20 font-mono truncate">nexoradigitalsol.com</span>
        </div>
      </div>
      {children}
    </div>
  )
}

/* ── Animated Hero Visual ───────────────────────────────────────────────── */
function HeroVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-3xl animate-pulse-slow"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Main desktop mockup */}
      <div className="relative w-full max-w-md animate-float">
        <BrowserMockup className="w-full">
          {/* Website UI simulation */}
          <div className="p-4 bg-[#0d1425]">
            {/* Nav bar simulation */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <div className="w-16 h-3 rounded bg-blue-500/40" />
              <div className="flex gap-2">
                {[1,2,3,4].map(i => <div key={i} className="w-8 h-2 rounded bg-white/10" />)}
                <div className="w-16 h-5 rounded bg-blue-500/50 flex items-center justify-center">
                  <span className="text-[6px] text-blue-300 font-semibold">Contact</span>
                </div>
              </div>
            </div>

            {/* Hero section simulation */}
            <div className="mb-4 py-3 px-1">
              <div className="w-20 h-1.5 rounded bg-blue-400/40 mb-2" />
              <div className="w-3/4 h-4 rounded bg-white/80 mb-1.5" />
              <div className="w-2/3 h-4 rounded bg-white/60 mb-3" />
              <div className="w-full h-2 rounded bg-white/20 mb-1.5" />
              <div className="w-5/6 h-2 rounded bg-white/15 mb-4" />
              <div className="flex gap-2">
                <div className="w-20 h-6 rounded bg-blue-500 flex items-center justify-center">
                  <span className="text-[6px] text-white font-semibold">Get Started</span>
                </div>
                <div className="w-20 h-6 rounded border border-white/20 flex items-center justify-center">
                  <span className="text-[6px] text-white/50 font-semibold">Learn More</span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: 'Traffic', val: '+124%', color: 'text-green-400' },
                { label: 'Leads', val: '+89%', color: 'text-blue-400' },
                { label: 'Revenue', val: '+67%', color: 'text-purple-400' },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 rounded-lg p-2 border border-white/5">
                  <div className={`text-[8px] font-bold ${s.color} mb-0.5`}>{s.val}</div>
                  <div className="text-[6px] text-white/30">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Services row */}
            <div className="grid grid-cols-2 gap-1.5">
              {['Web Design', 'SEO', 'E-Commerce', 'Branding'].map((s) => (
                <div key={s} className="bg-white/3 border border-white/5 rounded-md p-1.5 flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-blue-500/30 flex-shrink-0" />
                  <span className="text-[6px] text-white/40">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </BrowserMockup>

        {/* Floating analytics card */}
        <div className="absolute -right-4 top-8 w-32 bg-[#0a0f1e]/90 backdrop-blur-sm border border-white/10 rounded-xl p-3 shadow-xl">
          <div className="text-[7px] text-[#A7ADBB] mb-1 font-medium">Monthly Visitors</div>
          <div className="text-base font-bold text-white mb-1">14,280</div>
          <div className="flex items-center gap-1">
            <div className="flex-1 h-1.5 rounded-full bg-white/10">
              <div className="w-3/4 h-full rounded-full bg-blue-500" />
            </div>
            <span className="text-[6px] text-green-400 font-semibold">+23%</span>
          </div>
        </div>

        {/* Floating performance card */}
        <div className="absolute -left-4 bottom-8 w-28 bg-[#0a0f1e]/90 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 shadow-xl">
          <div className="text-[7px] text-[#A7ADBB] mb-1.5">Performance</div>
          <div className="flex items-end gap-0.5 h-6 mb-1">
            {[30, 50, 40, 65, 55, 80, 90].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-blue-500/60"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="text-[7px] text-green-400 font-semibold">Score: 98</div>
        </div>
      </div>
    </div>
  )
}

/* ── Hero Section ───────────────────────────────────────────────────────── */
export default function Hero() {
  const scrollToWork = () => {
    const el = document.getElementById('work')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      aria-label="Hero section"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 hero-grid opacity-60" />
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
                Digital Solutions for Growing Businesses
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              <span className="text-white">We Build</span>
              <br />
              <span className="text-white">Digital Solutions</span>
              <br />
              <span className="text-gradient-blue">That Help</span>
              <br />
              <span className="text-gradient-blue">Businesses Grow.</span>
            </h1>

            {/* Supporting copy */}
            <p className="text-[#A7ADBB] text-lg leading-relaxed mb-8 max-w-xl">
              Professional websites, e-commerce solutions, SEO and creative digital services
              designed to help your business build trust, attract customers and grow online.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-7 py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Get Free Consultation
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={scrollToWork}
                className="inline-flex items-center gap-2 px-7 py-4 border border-white/15 hover:border-white/30 text-white font-semibold rounded-xl transition-all duration-200 hover:bg-white/5"
              >
                View Our Work
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Tags strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[#A7ADBB] text-sm font-medium">
              {['Web Development', 'SEO', 'E-commerce', 'Design'].map((tag, i) => (
                <span key={tag} className="flex items-center gap-4">
                  {i > 0 && <span className="text-white/20" aria-hidden="true">•</span>}
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div className="hidden lg:block relative h-[520px]">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-60 transition-opacity" aria-hidden="true">
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/50 to-white/10" />
        <span className="text-[10px] text-white/60 tracking-widest uppercase font-medium">Scroll</span>
      </div>
    </section>
  )
}
