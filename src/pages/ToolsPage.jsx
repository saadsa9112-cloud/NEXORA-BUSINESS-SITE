import WebsiteAuditWidget from '../components/WebsiteAudit/WebsiteAuditWidget'
import RoiCalculator from '../components/RoiCalculator/RoiCalculator'
import TechStack from '../components/TechStack/TechStack'

export default function ToolsPage() {
  return (
    <div className="pt-20 pb-12 space-y-16">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 text-center">
        <span className="px-3.5 py-1 bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/30 rounded-full text-xs font-bold uppercase tracking-wider">
          Interactive Engineering Tools &amp; Telemetry
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B1020] mt-3">
          Agency Speed Audit &amp; Interactive Calculators
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-2">
          Run an instant, 100% truthful Google PageSpeed Insights audit on your existing site, estimate project ROI across 5 currencies, and explore our 3D technology matrix.
        </p>
      </div>

      {/* Feature 1: Real-Time Google PageSpeed Insights API Tool (Truthful Audit) */}
      <WebsiteAuditWidget />

      {/* Feature 2: Realtime ROI Savings & Profit Calculator */}
      <RoiCalculator />

      {/* Feature 3: Interactive 3D Technology Stack Matrix */}
      <TechStack />
    </div>
  )
}
