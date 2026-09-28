import { useState } from 'react'
import { ShieldCheck, Lock, CheckCircle2, Globe, FileText, CreditCard, Building, Smartphone } from 'lucide-react'
import ScrollReveal from '../Motion/ScrollReveal'

// SVG Payment Logos
const VisaMastercardIcon = () => (
  <div className="flex items-center justify-center gap-1 font-bold text-xs">
    <span className="text-blue-600 font-extrabold italic">VISA</span>
    <span className="text-gray-300">|</span>
    <div className="flex -space-x-1">
      <span className="w-3 h-3 rounded-full bg-red-500 inline-block opacity-90" />
      <span className="w-3 h-3 rounded-full bg-amber-400 inline-block opacity-90" />
    </div>
  </div>
)

const PaypalIcon = () => (
  <div className="font-extrabold italic text-sm text-[#003087]">
    <span className="text-[#003087]">Pay</span><span className="text-[#0079C1]">Pal</span>
  </div>
)

const TaptapSendIcon = () => (
  <div className="font-extrabold text-xs tracking-tight text-[#00D66C] flex items-center justify-center gap-1">
    <span className="px-1.5 py-0.5 rounded bg-[#00D66C] text-black font-black text-[10px]">TAP</span>
    <span>taptapsend</span>
  </div>
)

const WiseIcon = () => (
  <div className="font-black italic text-xs text-[#2575FC] flex items-center justify-center gap-1">
    <span className="text-[#00B9FF]">⚡ Wise</span>
  </div>
)

const PayoneerIcon = () => (
  <div className="font-bold text-xs text-[#FF4800] tracking-tight">
    <span>Payoneer</span>
  </div>
)

const JazzCashIcon = () => (
  <div className="font-black text-xs text-[#FF0000] tracking-tight flex items-center justify-center gap-1">
    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
    <span>JazzCash</span>
  </div>
)

const EasyPaisaIcon = () => (
  <div className="font-black text-xs text-[#00A859] tracking-tight">
    <span>easypaisa</span>
  </div>
)

const SadaPayIcon = () => (
  <div className="font-extrabold text-xs text-[#FF5A5F] tracking-tight">
    <span>SadaPay</span>
  </div>
)

const NayaPayIcon = () => (
  <div className="font-extrabold text-xs text-[#FF6B00] tracking-tight">
    <span>NayaPay</span>
  </div>
)

export default function PaymentBadges() {
  const [region, setRegion] = useState('international') // 'international' | 'domestic'

  return (
    <div className="py-14 bg-white border-y border-[#E5EAF1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal variant="fadeUp" className="max-w-4xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-2">
            <Lock size={13} />
            <span>100% Secure B2B Invoicing &amp; Milestone Payments</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-[#0B1020]">
            Accepted Payment Methods &amp; Client Guarantees
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1.5 max-w-xl mx-auto">
            Switch between International and Domestic payment gateways. 50% upfront deposit &amp; 50% final handoff terms.
          </p>

          {/* Region Switcher: Domestic vs International */}
          <div className="inline-flex items-center p-1.5 bg-[#F1F5F9] rounded-2xl border border-[#E5EAF1] mt-6">
            <button
              type="button"
              onClick={() => setRegion('international')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                region === 'international'
                  ? 'bg-[#0066FF] text-white shadow-md'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Globe size={14} />
              <span>International (Global USD)</span>
            </button>
            <button
              type="button"
              onClick={() => setRegion('domestic')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                region === 'domestic'
                  ? 'bg-[#0066FF] text-white shadow-md'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Smartphone size={14} />
              <span>Domestic (Pakistan PKR)</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Dynamic Payment Gateways Grid */}
        <ScrollReveal variant="fadeUp" delay={0.1} className="max-w-4xl mx-auto">
          {region === 'international' ? (
            /* INTERNATIONAL PAYMENT METHODS */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              
              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] text-center space-y-2 hover:border-[#0066FF]/40 transition-all flex flex-col justify-center items-center h-24">
                <VisaMastercardIcon />
                <span className="text-[11px] font-bold text-[#0B1020]">Debit &amp; Credit</span>
                <span className="text-[9px] text-gray-400">Instant Online Cards</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] text-center space-y-2 hover:border-[#0066FF]/40 transition-all flex flex-col justify-center items-center h-24">
                <PaypalIcon />
                <span className="text-[11px] font-bold text-[#0B1020]">PayPal</span>
                <span className="text-[9px] text-gray-400">Global Checkout</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] text-center space-y-2 hover:border-[#0066FF]/40 transition-all flex flex-col justify-center items-center h-24">
                <TaptapSendIcon />
                <span className="text-[11px] font-bold text-[#0B1020]">Taptap Send</span>
                <span className="text-[9px] text-gray-400">Zero Fee Transfer</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] text-center space-y-2 hover:border-[#0066FF]/40 transition-all flex flex-col justify-center items-center h-24">
                <WiseIcon />
                <span className="text-[11px] font-bold text-[#0B1020]">Wise (TransferWise)</span>
                <span className="text-[9px] text-gray-400">Bank Rate Exchange</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] text-center space-y-2 hover:border-[#0066FF]/40 transition-all flex flex-col justify-center items-center h-24">
                <PayoneerIcon />
                <span className="text-[11px] font-bold text-[#0B1020]">Payoneer</span>
                <span className="text-[9px] text-gray-400">B2B Commercial</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] text-center space-y-2 hover:border-[#0066FF]/40 transition-all flex flex-col justify-center items-center h-24">
                <Building size={20} className="text-blue-600" />
                <span className="text-[11px] font-bold text-[#0B1020]">Bank Wire</span>
                <span className="text-[9px] text-gray-400">Swift / IBAN Direct</span>
              </div>

            </div>
          ) : (
            /* DOMESTIC PAKISTAN PAYMENT METHODS */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              
              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] text-center space-y-2 hover:border-[#0066FF]/40 transition-all flex flex-col justify-center items-center h-24">
                <CreditCard size={20} className="text-[#0066FF]" />
                <span className="text-[11px] font-bold text-[#0B1020]">Debit / Credit</span>
                <span className="text-[9px] text-gray-400">Pakistani Bank Cards</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] text-center space-y-2 hover:border-[#0066FF]/40 transition-all flex flex-col justify-center items-center h-24">
                <JazzCashIcon />
                <span className="text-[11px] font-bold text-[#0B1020]">JazzCash</span>
                <span className="text-[9px] text-gray-400">Mobile Wallet</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] text-center space-y-2 hover:border-[#0066FF]/40 transition-all flex flex-col justify-center items-center h-24">
                <EasyPaisaIcon />
                <span className="text-[11px] font-bold text-[#0B1020]">EasyPaisa</span>
                <span className="text-[9px] text-gray-400">Telenor Microfinance</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] text-center space-y-2 hover:border-[#0066FF]/40 transition-all flex flex-col justify-center items-center h-24">
                <SadaPayIcon />
                <span className="text-[11px] font-bold text-[#0B1020]">SadaPay</span>
                <span className="text-[9px] text-gray-400">Free Instant Transfer</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] text-center space-y-2 hover:border-[#0066FF]/40 transition-all flex flex-col justify-center items-center h-24">
                <NayaPayIcon />
                <span className="text-[11px] font-bold text-[#0B1020]">NayaPay</span>
                <span className="text-[9px] text-gray-400">Digital Wallet IBAN</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E5EAF1] text-center space-y-2 hover:border-[#0066FF]/40 transition-all flex flex-col justify-center items-center h-24">
                <Building size={20} className="text-emerald-600" />
                <span className="text-[11px] font-bold text-[#0B1020]">Local Bank Transfer</span>
                <span className="text-[9px] text-gray-400">HBL, Meezan, UBL IBAN</span>
              </div>

            </div>
          )}

          {/* Legal Handoff & Security Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#374151] font-semibold pt-4 border-t border-[#E5EAF1]">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50/70 border border-blue-100 text-[#0066FF]">
              <CheckCircle2 size={14} /> Signed Mutual NDA (100% Data Privacy)
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50/70 border border-green-100 text-green-700">
              <CheckCircle2 size={14} /> 100% Full IP Source Code Handoff
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50/70 border border-purple-100 text-purple-700">
              <CheckCircle2 size={14} /> Milestone Escrow Protection (50 / 50)
            </span>
          </div>
        </ScrollReveal>

      </div>
    </div>
  )
}
