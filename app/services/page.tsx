import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/shared/section-heading"
import { CTASection } from "@/components/sections/cta-section"
import { WavyDivider } from "@/components/layout/wavy-divider"
import { MarbleAccent } from "@/components/shared/marble-accent"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Check } from "lucide-react"
import { mockServices } from "@/lib/mock-data"

const serviceImages: Record<string, string> = {
  "1": "/images/home.png",
  "2": "/images/services/youth-program.jpg",
  "3": "/images/services/teen-training.jpg",
  "4": "/images/services/adult-development.png",
  "5": "/images/gospel.png",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>
        <PageHeader
          title="Vocal Programs"
          subtitle="From first notes to professional refinement, find the perfect program for your unique vocal journey."
        />

        {/* Services Grid */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Flowing marble accent along the side */}
          <MarbleAccent variant="wave-side" size="lg" opacity={0.2} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="space-y-16">
              {mockServices.map((service, index) => (
                <div key={service.id}>
                  <Card className="overflow-hidden border-none shadow-lg bg-white">
                    <div
                      className={`grid lg:grid-cols-2 ${
                        index % 2 === 1 ? "lg:grid-flow-dense" : ""
                      }`}
                    >
                      {/* Image */}
                      <div
                        className={`relative h-64 lg:h-auto ${
                          index % 2 === 1 ? "lg:col-start-2" : ""
                        }`}
                      >
                        <Image
                          src={serviceImages[service.id] || "/images/hero-bg.jpg"}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent lg:hidden" />
                      </div>

                      {/* Content */}
                      <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.forWho.map((who, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="bg-champagne-gold/20 text-espresso hover:bg-champagne-gold/30"
                            >
                              {who}
                            </Badge>
                          ))}
                        </div>
                        <h2 className="font-serif text-2xl md:text-3xl text-espresso mb-4">
                          {service.title}
                        </h2>
                        <p className="text-warm-taupe mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-warm-taupe mb-6">
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-rose-gold" />
                            {service.duration}
                          </span>
                          <span className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-rose-gold" />
                            Private Instruction
                          </span>
                        </div>
                        <div className="mb-8">
                          <h4 className="text-sm font-medium text-espresso mb-3">
                            What&apos;s Included:
                          </h4>
                          <ul className="grid sm:grid-cols-2 gap-2">
                            {service.features.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-sm text-warm-taupe"
                              >
                                <Check className="w-4 h-4 text-rose-gold flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            asChild
                            className="bg-rose-gold hover:bg-rose-gold/90 text-white"
                          >
                            <Link href="/consultation">Book Consultation</Link>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="border-espresso text-espresso hover:bg-[#E8CFCF]  hover:text-pearl-white"
                          >
                            <Link href="/calendar">View Availability</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>

                  {index < mockServices.length - 1 && (
                    <div className="flex justify-center my-8">
                      <div className="flex items-center gap-2">
                        <span className="h-px w-16 bg-gradient-to-r from-transparent to-champagne-gold" />
                        <span className="h-2 w-2 rounded-full bg-rose-gold" />
                        <span className="h-px w-16 bg-gradient-to-l from-transparent to-champagne-gold" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Note */}
        <section className="py-16 bg-blush-pink/30">
          <div className="container mx-auto px-4 text-center">
            <h3 className="font-serif text-2xl text-espresso mb-4">
              Flexible Pricing Options
            </h3>
            <p className="text-warm-taupe max-w-2xl mx-auto mb-6">
              I offer various lesson packages to accommodate different schedules
              and budgets. Book a free consultation to discuss which program and
              pricing structure works best for you.
            </p>
            <Button
              asChild
              className="bg-rose-gold hover:bg-rose-gold/90 text-white"
            >
              <Link href="/consultation">Discuss Pricing Options</Link>
            </Button>
          </div>
        </section>

        <WavyDivider variant="gradient" />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
