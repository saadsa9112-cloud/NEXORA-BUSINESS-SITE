import { ShieldCheck, Lock, CreditCard, CheckCircle2 } from 'lucide-react'

const PAYMENT_METHODS = [
  { name: 'Stripe', desc: 'Credit & Debit Cards (Global)' },
  { name: 'PayPal', desc: 'Instant International Transfer' },
  { name: 'Wise', desc: 'Low-Fee Direct Wire Transfer' },
  { name: 'Payoneer', desc: 'B2B Invoice Payment' },
  { name: 'Bank Transfer', desc: 'Domestic PKR & Wire' }
]

export default function PaymentBadges() {
  return (
    <div className="bg-[#F8FAFC] border border-[#E5EAF1] rounded-2xl p-5 my-6 text-[#0B1020]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E5EAF1]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center font-bold">
            <CreditCard size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#0B1020] uppercase tracking-wider">Accepted Payment Methods</h4>
            <p className="text-[11px] text-[#6B7280]">100% Secure B2B Invoicing &amp; Milestone Payments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-green-700 font-bold bg-green-50 px-2.5 py-1 rounded-lg border border-green-200">
          <ShieldCheck size={12} />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
        {PAYMENT_METHODS.map((method) => (
          <div
            key={method.name}
            className="p-2.5 rounded-xl bg-white border border-[#E5EAF1] shadow-2xs hover:border-[#0066FF]/40 transition-colors"
          >
            <div className="text-xs font-bold text-[#0B1020] mb-0.5">{method.name}</div>
            <div className="text-[9px] text-[#6B7280] leading-tight">{method.desc}</div>
          </div>
        ))}
      </div>

      {/* NDA & IP Trust Guarantee */}
      <div className="mt-3 pt-3 border-t border-[#E5EAF1] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#4B5563]">
        <div className="flex items-center gap-1.5 text-[#0066FF] font-semibold">
          <CheckCircle2 size={13} />
          <span>Signed NDA First Before Project Discussion</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
          <Lock size={12} className="text-[#0066FF]" />
          <span>100% Full Source Code &amp; IP Ownership Handoff</span>
        </div>
      </div>
    </div>
  )
}
