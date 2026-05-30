import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CTASectionProps {
  variant?: "primary" | "secondary"
}

export function CTASection({ variant = "primary" }: CTASectionProps) {
  if (variant === "secondary") {
    return (
      <section className="py-20 md:py-28 gradient-section relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-rose-gold font-medium tracking-luxury uppercase text-sm mb-4">
            Start Your Journey
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-espresso mb-6 max-w-3xl mx-auto">
            Ready to Discover Your Voice?
          </h2>
          {/* Diamond divider */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 bg-champagne-gold rotate-45"></span>
          </div>
          <p className="text-warm-taupe text-lg max-w-2xl mx-auto mb-8">
            Schedule a free consultation to discuss your goals and find the
            perfect program for your vocal journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="btn-rose-gold rounded-md font-medium px-8 py-6 uppercase tracking-luxury text-sm"
            >
              <Link href="/consultation">Book Free Consultation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="btn-outline-rose rounded-md font-medium px-8 py-6 uppercase tracking-luxury text-sm"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 md:py-28 cta-gradient relative overflow-hidden sparkle-overlay">
      {/* Decorative piano overlay could be added via background image */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-gold/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-espresso mb-4 max-w-3xl mx-auto">
          Your Voice Matters Here.
        </h2>
        {/* Diamond divider */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-2 h-2 bg-champagne-gold rotate-45"></span>
        </div>
        <p className="text-warm-taupe text-lg max-w-2xl mx-auto mb-8">
          Take the first step toward confidence, purpose, and your next level.
        </p>
        <Button
          asChild
          size="lg"
          className="btn-rose-gold rounded-md font-medium px-10 py-6 uppercase tracking-luxury text-sm"
        >
          <Link href="/consultation">Schedule Your Free Consultation</Link>
        </Button>
      </div>
    </section>
  )
}
