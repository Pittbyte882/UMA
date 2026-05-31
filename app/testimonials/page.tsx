import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/shared/section-heading"
import { CTASection } from "@/components/sections/cta-section"
import { WavyDivider } from "@/components/layout/wavy-divider"
import { MarbleAccent } from "@/components/shared/marble-accent"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"
import { mockTestimonials } from "@/lib/mock-data"
import { TestimonialForm } from "@/components/sections/testimonial-form"



export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>
        <PageHeader
          title="Student Testimonials"
          subtitle="Hear from the voices we've helped transform. Real stories from real students and families."
        />

        {/* Featured Testimonial */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Diagonal flowing marble across the page */}
          <MarbleAccent variant="flowing-diagonal" size="xl" opacity={0.2} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-champagne-gold/10 to-rose-gold/10 border-champagne-gold/30">
                <CardContent className="p-8 md:p-12">
                  <Quote className="w-12 h-12 text-rose-gold/50 mb-6" />
                  <p className="font-serif text-2xl md:text-3xl text-espresso leading-relaxed mb-8 italic">
                    &ldquo;Samantha didn&apos;t just teach me to sing—she helped me
                    find my voice in every sense of the word. The confidence I&apos;ve
                    gained extends far beyond the music studio.&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-champagne-gold/30">
                      <Image
                        src="/images/Adults.png"
                        alt="Sarah Mitchell"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-serif text-xl text-espresso">
                        Sarah Mitchell
                      </p>
                      <p className="text-warm-taupe">Adult Student, 33 years</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-champagne-gold text-champagne-gold"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
          {/* Submit a Testimonial */}
          <section className="py-20 md:py-28 bg-pearl-white">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                  <p className="text-rose-gold font-medium tracking-wider uppercase text-sm mb-4">
                    Share Your Experience
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-4">
                    Submit a Testimonial
                  </h2>
                  <p className="text-warm-taupe">
                    We'd love to hear about your experience at Ultimate Music Academy.
                  </p>
                </div>
                <TestimonialForm />
              </div>
            </div>
          </section>
        <WavyDivider variant="gradient" />

        {/* All Testimonials Grid */}
        <section className="py-20 md:py-28 bg-blush-pink/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-rose-gold font-medium tracking-wider uppercase text-sm mb-4">
                More Stories
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-4 text-balance">
                Voices of Transformation
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockTestimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className={`border-none shadow-lg hover:shadow-xl transition-shadow bg-white ${
                    index === 0 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-champagne-gold/30">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-serif text-lg text-espresso">
                          {testimonial.name}
                        </p>
                        <p className="text-warm-taupe text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-champagne-gold text-champagne-gold"
                        />
                      ))}
                    </div>
                    <p className="text-warm-taupe leading-relaxed italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <WavyDivider variant="champagne" flip />

        {/* Video Testimonials Placeholder */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-rose-gold font-medium tracking-wider uppercase text-sm mb-4">
                Watch & Listen
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-4 text-balance">
                Student Performances
              </h2>
              <p className="text-warm-taupe text-lg max-w-2xl mx-auto">
                See the transformation in action through student recital
                highlights.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="aspect-video rounded-2xl bg-espresso/10 flex items-center justify-center group cursor-pointer overflow-hidden relative"
                >
                  <Image
                    src="/images/events/recital.jpg"
                    alt="Student performance"
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-espresso/40 group-hover:bg-espresso/20 transition-colors" />
                  <div className="relative w-16 h-16 rounded-full bg-rose-gold/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-espresso text-pearl-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="font-serif text-4xl md:text-5xl text-champagne-gold mb-2">
                  500+
                </p>
                <p className="text-pearl-white/70 text-sm">Students Taught</p>
              </div>
              <div>
                <p className="font-serif text-4xl md:text-5xl text-champagne-gold mb-2">
                  15+
                </p>
                <p className="text-pearl-white/70 text-sm">Years Experience</p>
              </div>
              <div>
                <p className="font-serif text-4xl md:text-5xl text-champagne-gold mb-2">
                  98%
                </p>
                <p className="text-pearl-white/70 text-sm">Would Recommend</p>
              </div>
              <div>
                <p className="font-serif text-4xl md:text-5xl text-champagne-gold mb-2">
                  50+
                </p>
                <p className="text-pearl-white/70 text-sm">Recitals Hosted</p>
              </div>
            </div>
          </div>
        </section>

        <WavyDivider variant="rose-gold" />
        <CTASection variant="secondary" />
      </main>
      <Footer />
    </div>
  )
}
