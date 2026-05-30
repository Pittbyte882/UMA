"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/shared/section-heading"
import { WavyDivider } from "@/components/layout/wavy-divider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import Image from "next/image"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@ultimatemusicacademy.com",
    href: "mailto:info@ultimatemusicacademy.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(424) 230-2179",
    href: "tel:+14242302179",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Available for in-person",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Fri: 9am-6pm, Sat: 10am-3pm, Sun: Closed",
    href: null,
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission - replace with actual Resend integration
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>
        <PageHeader
          title="Contact Us"
          subtitle="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        />

        <section className="py-20 md:py-28 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/Marble_Back.png"
                alt=""
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-pearl-white/40" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-espresso mb-6">
                  Send a Message
                </h2>

                {isSubmitted ? (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-8 text-center">
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="font-serif text-xl text-espresso mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-warm-taupe mb-6">
                        Thank you for reaching out. We&apos;ll get back to you within
                        24-48 hours.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="border-espresso text-espresso hover:bg-espresso hover:text-pearl-white"
                      >
                        Send Another Message
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-espresso">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="border-blush-pink focus:border-rose-gold focus:ring-rose-gold"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-espresso">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="border-blush-pink focus:border-rose-gold focus:ring-rose-gold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-espresso">
                        Phone Number (Optional)
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className="border-blush-pink focus:border-rose-gold focus:ring-rose-gold"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-espresso">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="How can we help you?"
                        rows={6}
                        className="border-blush-pink focus:border-rose-gold focus:ring-rose-gold resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-rose-gold hover:bg-rose-gold/90 text-white w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-espresso mb-6">
                  Get in Touch
                </h2>
                <p className="text-warm-taupe mb-8 leading-relaxed">
                  Whether you have questions about our programs, want to discuss
                  your vocal goals, or are ready to start your journey, we&apos;re
                  here to help. Reach out using any of the methods below.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-blush-pink/30 hover:bg-blush-pink/50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-champagne-gold/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-rose-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-warm-taupe mb-1">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-espresso font-medium hover:text-rose-gold transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-espresso font-medium">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* FAQ Teaser */}
                <Card className="mt-8 bg-gradient-to-br from-champagne-gold/10 to-rose-gold/10 border-champagne-gold/30">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl text-espresso mb-2">
                      Ready to Start?
                    </h3>
                    <p className="text-warm-taupe text-sm mb-4">
                      Book a free consultation to discuss your goals and find the
                      perfect program for you.
                    </p>
                    <Button
                      asChild
                      className="bg-rose-gold hover:bg-rose-gold/90 text-white w-full"
                    >
                      <a href="/consultation">Book Free Consultation</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <WavyDivider variant="gradient" />

        {/* Map Placeholder */}
        <section className="py-16 bg-blush-pink/20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="font-serif text-2xl text-espresso mb-4">
              Serving Students Near and Far
            </h3>
            <p className="text-warm-taupe max-w-2xl mx-auto">
              Ultimate Music Academy offers in-person lessons in the greater
              metropolitan area.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
