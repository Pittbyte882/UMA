import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const programs = [
  {
    id: "1",
    title: "Ages 5-12",
    subtitle: "Fun foundations.",
    image: "/images/ages 5-12.png",
  },
  {
    id: "2",
    title: "Ages 13-18",
    subtitle: "Technique. Artistry. Confidence.",
    image: "/images/ages 13-18.png",
  },
  {
    id: "3",
    title: "Adults (19+)",
    subtitle: "Professional & personal growth.",
    image: "/images/Adults.png",
  },
]

export function ServicesPreview() {
  return (
    <section className="py-20 md:py-28 gradient-section relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-rose-gold font-medium tracking-luxury uppercase text-sm mb-4">
            Programs for Every Stage
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-espresso mb-6">
            Find the Program That Fits You.
          </h2>
          {/* Diamond divider */}
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-champagne-gold rotate-45"></span>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {programs.map((program) => (
            <div key={program.id} className="program-card bg-white">
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl md:text-2xl text-rose-gold mb-2">
                  {program.title}
                </h3>
                <p className="text-warm-taupe text-sm mb-4">
                  {program.subtitle}
                </p>
                <Link 
                  href="/services" 
                  className="inline-flex items-center gap-2 text-sm font-medium text-espresso hover:text-rose-gold uppercase tracking-luxury transition-colors group"
                >
                  Learn More 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="btn-outline-rose rounded-md font-medium px-10 py-6 uppercase tracking-luxury text-sm"
          >
            <Link href="/services">View All Programs</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
