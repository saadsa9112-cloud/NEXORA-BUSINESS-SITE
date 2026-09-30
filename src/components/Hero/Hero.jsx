import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import MagneticButton from '../Motion/MagneticButton'

/* ── Light Browser Mockup ───────────────────────────────────────── */
function BrowserMockup({ children, className = '' }) {
  return (
    <div className={`rounded-2xl overflow-hidden border border-[#E5EAF1] bg-white shadow-soft ${className}`}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-[#F1F5F9] border-b border-[#E5EAF1]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <div className="ml-3 flex-1 h-5 rounded-md bg-white border border-[#E5EAF1] flex items-center px-3 shadow-xs">
          <span className="text-[9px] text-[#6B7280] font-mono truncate">NEXORA DIGITAL</span>
        </div>
      </div>
      {children}
    </div>
  )
}

/* ── Animated 3D Interactive Hero Visual ─────────────────────────────────── */
function HeroVisual() {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mouse position values for parallax
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  // 3D rotations for visual mockup
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8])

  // Parallax offsets for floating badges
  const badge1X = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12])
  const badge1Y = useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10])

  const badge2X = useTransform(mouseXSpring, [-0.5, 0.5], [14, -14])
  const badge2Y = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12])

  const handleMouseMove = (e) => {
    if (isMobile || shouldReduceMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    if (isMobile || shouldReduceMotion) return
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center perspective-1000"
    >
      {/* Background ambient glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Main 3D Card Stack Mockup */}
      <motion.div
        style={{
          rotateX: isMobile || shouldReduceMotion ? 0 : rotateX,
          rotateY: isMobile || shouldReduceMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: shouldReduceMotion ? 0 : [-6, 6, -6],
        }}
        transition={{
          y: {
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className="relative w-full max-w-md shadow-2xl rounded-2xl"
      >
        <BrowserMockup className="w-full">
          {/* Website UI simulation */}
          <div className="p-5 bg-white">
            {/* Nav bar simulation */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#F1F5F9]">
              <div className="w-20 h-3.5 rounded-md bg-[#0066FF]/80" />
              <div className="flex gap-2.5">
                {[1, 2, 3].map(i => <div key={i} className="w-8 h-2 rounded bg-slate-200" />)}
                <div className="w-16 h-5 rounded-md bg-[#0066FF] flex items-center justify-center">
                  <span className="text-[7px] text-white font-semibold">Contact</span>
                </div>
              </div>
            </div>

            {/* Hero section simulation */}
            <div className="mb-5 py-2">
              <div className="w-24 h-2 rounded-full bg-blue-100 text-[#0066FF] mb-3 flex items-center px-2">
                <span className="text-[6px] font-bold">DIGITAL AGENCY</span>
              </div>
              <div className="w-5/6 h-4 rounded bg-[#0B1020] mb-2" />
              <div className="w-2/3 h-4 rounded bg-[#0066FF] mb-4" />
              <div className="w-full h-2 rounded bg-slate-200 mb-1.5" />
              <div className="w-4/5 h-2 rounded bg-slate-200 mb-4" />
              <div className="flex gap-2">
                <div className="w-20 h-6 rounded-md bg-[#0066FF] flex items-center justify-center">
                  <span className="text-[7px] text-white font-semibold">Get Started</span>
                </div>
                <div className="w-16 h-6 rounded-md border border-slate-200 flex items-center justify-center">
                  <span className="text-[7px] text-slate-600 font-medium">Learn More</span>
                </div>
              </div>
            </div>

            {/* Services cards simulation grid */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-[#F1F5F9]">
              {[
                { title: 'Websites', color: 'bg-blue-50 text-[#0066FF]' },
                { title: 'SEO', color: 'bg-indigo-50 text-indigo-600' },
                { title: 'E-commerce', color: 'bg-emerald-50 text-emerald-600' }
              ].map((card, i) => (
                <div key={i} className={`p-2 rounded-lg border border-slate-100 ${card.color}`}>
                  <div className="w-4 h-4 rounded bg-current opacity-20 mb-1" />
                  <div className="text-[7px] font-bold truncate">{card.title}</div>
                </div>
              ))}
            </div>
          </div>
        </BrowserMockup>

        {/* Floating badge top-right with independent parallax depth */}
        <motion.div
          style={{
            x: isMobile || shouldReduceMotion ? 0 : badge1X,
            y: isMobile || shouldReduceMotion ? 0 : badge1Y,
            translateZ: 30,
          }}
          className="absolute -top-4 -right-4 px-3.5 py-2.5 rounded-xl bg-white border border-[#E5EAF1] shadow-lg flex items-center gap-2.5 z-20"
        >
          <div className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#0B1020]">SEO Ready</div>
            <div className="text-[8px] text-[#6B7280]">Optimized Structure</div>
          </div>
        </motion.div>

        {/* Floating badge bottom-left with independent parallax depth */}
        <motion.div
          style={{
            x: isMobile || shouldReduceMotion ? 0 : badge2X,
            y: isMobile || shouldReduceMotion ? 0 : badge2Y,
            translateZ: 40,
          }}
          className="absolute -bottom-4 -left-4 px-3.5 py-2.5 rounded-xl bg-white border border-[#E5EAF1] shadow-lg flex items-center gap-2.5 z-20"
        >
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs">
            ⚡
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#0B1020]">Fast Performance</div>
            <div className="text-[8px] text-[#6B7280]">100% Responsive</div>
          </div>
        </motion.div>
      </motion.div>
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

  // Entrance variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section
      id="home"
      aria-label="Hero section"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#F7F9FC]"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl opacity-40"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0, 102, 255, 0.08) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy Entrance Animation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50 text-[#0066FF] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase">
                NEXORA DIGITAL • BUILDING DIGITAL SUCCESS
              </span>
            </motion.div>

            {/* H1 Headline */}
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0B1020] leading-[1.15] tracking-tight mb-5 sm:mb-6">
              Digital Solutions That <br className="hidden sm:inline" />
              <span className="text-gradient-blue">Move Your Business Forward.</span>
            </motion.h1>

            {/* Supporting copy */}
            <motion.p variants={itemVariants} className="text-[#4B5563] text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl">
              Professional website development, WordPress, Shopify, SEO, graphic design,
              hosting and maintenance services designed to help your business build trust and grow online.
            </motion.p>

            {/* CTAs with Magnetic Buttons — full-width touch friendly on mobile */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              <MagneticButton onClick={scrollToContact} className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold rounded-xl transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 text-sm sm:text-base cursor-pointer"
                >
                  <span>Get Free Quote</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </MagneticButton>

              <MagneticButton onClick={scrollToWork} className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 bg-white border border-[#E5EAF1] hover:border-gray-300 text-[#0B1020] font-semibold rounded-xl transition-all duration-200 hover:bg-gray-50 shadow-xs text-sm sm:text-base cursor-pointer"
                >
                  <span>View Our Work</span>
                  <ChevronDown size={17} aria-hidden="true" />
                </button>
              </MagneticButton>
            </motion.div>

            {/* Tags strip */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[#6B7280] text-xs sm:text-sm font-medium">
              {['Web Development', 'SEO', 'E-commerce', 'Graphic Design'].map((tag, i) => (
                <span key={tag} className="flex items-center gap-2.5 sm:gap-3">
                  {i > 0 && <span className="text-gray-300" aria-hidden="true">•</span>}
                  <span>{tag}</span>
                </span>
              ))}
            </motion.div>

            {/* MOBILE INTERACTIVE TECH SHOWCASE CARD — Instant High Attraction */}
            <motion.div variants={itemVariants} className="lg:hidden mt-8 w-full">
              <div className="relative rounded-2xl p-4 bg-gradient-to-br from-white via-blue-50/40 to-white border border-[#E5EAF1] shadow-xl overflow-hidden">
                {/* Subtle top ambient glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Header of mobile card */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9] mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black text-[#0B1020] tracking-wide">NEXORA ARCHITECTURE</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200 text-[10px] font-bold font-mono">
                    REACT 19 • ULTRA FAST
                  </span>
                </div>

                {/* 3 Live Telemetry Stat Pills */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-100 shadow-xs text-center">
                    <div className="text-[10px] text-gray-500 font-semibold">PageSpeed</div>
                    <div className="text-base font-black text-emerald-600 flex items-center justify-center gap-0.5">
                      <span>99+</span>
                      <span className="text-[9px] text-emerald-500">⚡</span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-100 shadow-xs text-center">
                    <div className="text-[10px] text-gray-500 font-semibold">Load Time</div>
                    <div className="text-base font-black text-[#0066FF]">0.8s</div>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-100 shadow-xs text-center">
                    <div className="text-[10px] text-gray-500 font-semibold">OWASP SSL</div>
                    <div className="text-base font-black text-indigo-600">100%</div>
                  </div>
                </div>

                {/* Interactive Mini Deliverables Preview Bar */}
                <div className="p-3 bg-[#0B1020] rounded-xl text-white flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center text-sm font-bold flex-shrink-0">
                      💎
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold">Enterprise Ready Delivery</div>
                      <div className="text-[10px] text-gray-400">Full Code Ownership • 3-Day Sprint</div>
                    </div>
                  </div>
                  <button
                    onClick={scrollToWork}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors flex-shrink-0 cursor-pointer"
                  >
                    <span>View Work</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Interactive 3D Visual for Large Screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative h-[480px]"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 hover:opacity-80 transition-opacity" aria-hidden="true">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#0066FF]" />
        <span className="text-[10px] text-[#6B7280] tracking-widest uppercase font-semibold">Scroll</span>
      </div>
    </section>
  )
}
