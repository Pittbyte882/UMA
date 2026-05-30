import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { AboutPreview } from "@/components/sections/about-preview"
import { ServicesPreview } from "@/components/sections/services-preview"
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel"
import { CTASection } from "@/components/sections/cta-section"
import { WavyDivider, ElegantDivider } from "@/components/layout/wavy-divider"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>
        <Hero />
        <AboutPreview />
        <WavyDivider variant="subtle" />
        <ServicesPreview />
        <WavyDivider variant="subtle" flip />
        <TestimonialsCarousel />
        <ElegantDivider />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
