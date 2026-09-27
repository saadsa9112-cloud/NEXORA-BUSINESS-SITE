import { useState } from 'react'
import ScrollReveal from '../Motion/ScrollReveal'
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'

const TESTIMONIALS = [
  {
    id: 1,
    quote: "NEXORA DIGITAL completely transformed our corporate web presence. Their attention to detail, fast load times, and custom React architecture exceeded our expectations. Our inbound client leads increased by over 140% within the first 30 days.",
    author: "Kamran Akram",
    role: "Managing Director",
    company: "Apex Global Logistics",
    rating: 5,
    location: "Karachi, PK"
  },
  {
    id: 2,
    quote: "Working with Saad and the NEXORA team was a breeze. They delivered our Shopify e-commerce store with full payment gateway integration, smooth mobile checkout, and high conversion rate optimization. Highly recommended!",
    author: "Tariq Mahmood",
    role: "CEO & Founder",
    company: "Modern Retail Brands",
    rating: 5,
    location: "Lahore, PK"
  },
  {
    id: 3,
    quote: "Exceptional speed and technical expertise! Their Technical SEO setup got us indexing on Google rapidly, and the custom WordPress admin training made managing our content effortless.",
    author: "Sarah Jenkins",
    role: "Marketing Director",
    company: "Global Digital Hub",
    rating: 5,
    location: "London, UK"
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))
  }

  const current = TESTIMONIALS[currentIndex]

  return (
    <section className="py-20 lg:py-28 bg-[#F7F9FC] border-b border-[#E5EAF1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <ScrollReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <span className="text-[#0066FF] ml-1">5.0 Star Client Rating</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1020] leading-tight tracking-tight mb-4">
              Trusted by Businesses <span className="text-[#0066FF]">Worldwide</span>
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed">
              Read real feedback from business owners and founders who scaled their digital presence with NEXORA DIGITAL.
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonial Card Slider */}
        <ScrollReveal variant="fadeUp" className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border border-[#E5EAF1] shadow-xl p-8 sm:p-12 relative overflow-hidden">
            {/* Top Quote Icon Background */}
            <Quote className="absolute top-6 right-8 text-blue-50/80 w-24 h-24 pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between min-h-[220px]">
              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-lg sm:text-xl text-[#0B1020] font-medium leading-relaxed italic mb-8">
                "{current.quote}"
              </p>

              {/* Author Info & Navigation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#F1F5F9]">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-[#0B1020]">{current.author}</h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-bold border border-green-200">
                      <CheckCircle size={10} /> Verified Client
                    </span>
                  </div>
                  <p className="text-xs text-[#4B5563]">
                    {current.role} • <strong className="text-[#0066FF]">{current.company}</strong> ({current.location})
                  </p>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="w-10 h-10 rounded-full border border-[#E5EAF1] bg-white text-[#4B5563] hover:text-[#0066FF] hover:border-[#0066FF] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-xs font-bold text-[#6B7280] px-2">
                    {currentIndex + 1} / {TESTIMONIALS.length}
                  </span>
                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="w-10 h-10 rounded-full border border-[#E5EAF1] bg-white text-[#4B5563] hover:text-[#0066FF] hover:border-[#0066FF] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
