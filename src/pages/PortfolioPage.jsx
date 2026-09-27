import Portfolio from '../components/Portfolio/Portfolio'
import QualitySecurity from '../components/QualitySecurity/QualitySecurity'
import FinalCTA from '../components/FinalCTA/FinalCTA'

export default function PortfolioPage() {
  return (
    <div className="pt-20 pb-12 space-y-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <span className="px-3.5 py-1 bg-purple-50 text-purple-600 border border-purple-200 rounded-full text-xs font-bold uppercase tracking-wider">
          Proven Track Record
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B1020] mt-3">
          Our Interactive Work &amp; Case Studies
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-2">
          Explore real-world client applications, WebGL 3D showcases, university systems, and full-stack developer hubs built by NEXORA DIGITAL.
        </p>
      </div>

      <Portfolio />
      <QualitySecurity />
      <FinalCTA />
    </div>
  )
}
