import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, Heart, Music } from "lucide-react"
import { ArrowRight } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Professional training rooted in real-world experience.",
  },
  {
    icon: Heart,
    title: "Building confident singers inside and out.",
  },
  {
    icon: Music,
    title: "Inspiring the next generation of artists and leaders.",
  },
]

export function AboutPreview() {
  return (
    <section className="py-20 md:py-28 bg-pearl-white relative overflow-hidden">
      {/* Diagonal accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full">
        <div className="absolute inset-0 bg-gradient-to-bl from-blush-pink/40 to-transparent transform skew-x-12 origin-top-right" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Content Side */}
          <div>
            <p className="text-rose-gold font-medium tracking-luxury uppercase text-sm mb-4">
              Welcome to
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-espresso mb-6">
              Ultimate Music Academy
            </h2>
            <p className="text-warm-taupe text-base md:text-lg mb-6 leading-relaxed">
              Founded by Berklee College of Music graduate and professional vocalist 
              Samantha Nelson-Philipp, UMA helps singers of all ages develop strong technique, 
              confidence, artistry, and stage presence in a supportive and empowering environment.
            </p>
            <Button
              asChild
              variant="outline"
              className="btn-outline-rose rounded-md font-medium px-6 py-5 uppercase tracking-luxury text-xs group"
            >
              <Link href="/about">
                Meet Samantha 
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Features Side */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-xl bg-pearl-white border border-blush-pink/50 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-blush-pink/50 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-rose-gold" />
                </div>
                <p className="text-warm-taupe text-sm md:text-base leading-relaxed pt-2">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
