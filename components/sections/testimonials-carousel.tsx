"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { mockTestimonials } from "@/lib/mock-data"


export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === mockTestimonials.length - 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? mockTestimonials.length - 1 : prev - 1
    )
  }

  const currentTestimonial = mockTestimonials[currentIndex]

  return (
    <section className="py-20 md:py-28 bg-espresso relative overflow-hidden">
      {/* Decorative circle elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-rose-gold/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-champagne-gold/10 blur-3xl" />
      
      {/* Decorative circle photos */}
      <div className="absolute top-20 right-20 w-16 h-16 rounded-full overflow-hidden opacity-20 hidden xl:block">
        <Image src="/images/mc.jpg" alt="" fill className="object-cover" />
      </div>
      <div className="absolute bottom-20 left-20 w-20 h-20 rounded-full overflow-hidden opacity-20 hidden xl:block">
        <Image src="/images/steph.jpg" alt="" fill className="object-cover" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-champagne-gold font-medium tracking-wider uppercase text-sm mb-4">
            Student Stories
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-pearl-white mb-4 text-balance">
            Voices of Transformation
          </h2>
          <p className="text-pearl-white/70 text-lg max-w-2xl mx-auto text-pretty">
            Hear from students whose lives have been enriched through their vocal
            journey at Ultimate Music Academy.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-pearl-white/5 backdrop-blur-sm border-champagne-gold/20">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Avatar - Circle Photo */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-champagne-gold/50 shadow-lg">
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <Quote className="w-10 h-10 text-champagne-gold/50 mb-4 mx-auto md:mx-0" />
                  <p className="text-pearl-white text-lg md:text-xl leading-relaxed mb-6 italic">
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-champagne-gold text-champagne-gold"
                      />
                    ))}
                  </div>
                  <p className="font-serif text-xl text-pearl-white">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-champagne-gold text-sm">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="border-pearl-white/30 text-rose-gold hover:bg-pearl-white/10 hover:text-rose-gold"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {mockTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-champagne-gold"
                      : "bg-pearl-white/30"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="border-pearl-white/30 text-rose-gold hover:bg-pearl-white/10 hover:text-rose-gold"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Additional testimonial circle avatars row */}
        <div className="flex justify-center gap-4 mt-12">
          {mockTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-12 h-12 rounded-full overflow-hidden ring-2 transition-all duration-300 ${
                index === currentIndex
                  ? "ring-champagne-gold scale-110"
                  : "ring-pearl-white/20 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={mockTestimonials[index].image}
                alt=""
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
