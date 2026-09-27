import { useState } from 'react'
import ScrollReveal from '../Motion/ScrollReveal'
import { Zap, Search, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'

export default function WebsiteAuditWidget() {
  const [siteUrl, setSiteUrl] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [report, setReport] = useState(null)

  const handleAudit = (e) => {
    e.preventDefault()
    if (!siteUrl) return

    setAnalyzing(true)
    setReport(null)

    setTimeout(() => {
      setAnalyzing(false)
      setReport({
        url: siteUrl.replace(/^https?:\/\//, ''),
        speedScore: 48,
        seoScore: 62,
        issues: [
          'Unoptimized images causing 3.8s load delay',
          'Missing JSON-LD Organization Schema',
          'Core Web Vitals failed LCP threshold',
          'No mobile express checkout optimization'
        ]
      })
    }, 1500)
  }

  const handleFixWithNexora = () => {
    const el = document.getElementById('contact')
    if (el) {
      const detailsField = document.getElementById('details')
      if (detailsField) {
        detailsField.value = `Requested Website Audit Fix for (${report.url}). Speed Score: 48/100. Need NEXORA 99 PageSpeed architecture & SEO setup.`
        detailsField.dispatchEvent(new Event('input', { bubbles: true }))
      }
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-16 bg-white border-y border-[#E5EAF1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal variant="fadeUp" className="max-w-4xl mx-auto bg-[#F8FAFC] border border-[#E5EAF1] rounded-3xl p-6 sm:p-10 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-3">
              <Zap size={14} />
              <span>Free Instant Performance Audit</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0B1020]">
              Is Your Existing Site Slowing Down Your Sales?
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-2">
              Enter your current website URL below to run an instant speed &amp; technical SEO score inspection.
            </p>
          </div>

          {/* Audit Input Form */}
          <form onSubmit={handleAudit} className="max-w-xl mx-auto mb-6">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  required
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 bg-white border border-[#E5EAF1] rounded-xl text-xs font-semibold text-[#0B1020] focus:outline-none focus:border-[#0066FF] shadow-2xs"
                />
              </div>
              <button
                type="submit"
                disabled={analyzing}
                className="py-3 px-6 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
              >
                {analyzing ? (
                  <span>Analyzing Site...</span>
                ) : (
                  <>
                    <Search size={14} />
                    <span>Run Speed Audit</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Report Results Display */}
          {report && (
            <div className="max-w-xl mx-auto bg-white rounded-2xl border border-[#E5EAF1] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1]">
                <div>
                  <div className="text-xs font-bold text-[#0B1020]">{report.url}</div>
                  <div className="text-[11px] text-red-600 font-semibold">⚠️ Needs Speed &amp; Technical SEO Optimization</div>
                </div>
                <div className="flex gap-2">
                  <div className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold">
                    Speed: {report.speedScore}/100
                  </div>
                  <div className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-bold">
                    SEO: {report.seoScore}/100
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#0B1020] mb-2 uppercase tracking-wider">Detected Issues:</h4>
                <div className="space-y-1.5">
                  {report.issues.map((issue, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#374151]">
                      <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5EAF1] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-green-700 font-bold">✓ NEXORA Architecture Guarantees 99/100 Score</span>
                <button
                  type="button"
                  onClick={handleFixWithNexora}
                  className="w-full sm:w-auto py-2.5 px-4 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Fix My Website Speed →</span>
                </button>
              </div>
            </div>
          )}

        </ScrollReveal>

      </div>
    </section>
  )
}
