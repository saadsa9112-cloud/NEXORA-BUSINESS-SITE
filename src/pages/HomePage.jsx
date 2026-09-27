import Hero from '../components/Hero/Hero'
import TrustStrip from '../components/TrustStrip/TrustStrip'
import Services from '../components/Services/Services'
import FeaturesSuite from '../components/FeaturesSuite/FeaturesSuite'
import Portfolio from '../components/Portfolio/Portfolio'
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs'
import Testimonials from '../components/Testimonials/Testimonials'
import Process from '../components/Process/Process'
import About from '../components/About/About'
import FAQ from '../components/FAQ/FAQ'
import QuoteForm from '../components/QuoteForm/QuoteForm'
import FinalCTA from '../components/FinalCTA/FinalCTA'

export default function HomePage({ currency, setCurrency }) {
  return (
    <div className="space-y-0">
      <Hero />
      <TrustStrip />
      <Services />
      <FeaturesSuite />
      <Portfolio />
      <WhyChooseUs />
      <Testimonials />
      <Process />
      <About />
      <FAQ />
      <QuoteForm currency={currency} setCurrency={setCurrency} />
      <FinalCTA />
    </div>
  )
}
