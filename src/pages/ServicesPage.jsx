import Services from '../components/Services/Services'
import Pricing from '../components/Pricing/Pricing'
import CostEstimator from '../components/Estimator/CostEstimator'
import ServiceGuarantees from '../components/Guarantees/ServiceGuarantees'
import PaymentBadges from '../components/PaymentBadges/PaymentBadges'
import QuoteForm from '../components/QuoteForm/QuoteForm'

export default function ServicesPage({ currency, setCurrency }) {
  return (
    <div className="pt-20 pb-12 space-y-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <span className="px-3.5 py-1 bg-blue-50 text-[#0066FF] border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider">
          Enterprise Services &amp; Packages
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B1020] mt-3">
          International Digital Agency Solutions
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-2">
          From high-converting business websites to headless e-commerce and full-stack web software with 100% source code ownership.
        </p>
      </div>

      <Services />
      <CostEstimator />
      <Pricing currency={currency} setCurrency={setCurrency} />
      <PaymentBadges />
      <ServiceGuarantees />
      <QuoteForm currency={currency} setCurrency={setCurrency} />
    </div>
  )
}
