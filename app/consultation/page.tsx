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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, CheckCircle, Gift, Clock, MessageCircle } from "lucide-react"
import { MarbleAccent } from "@/components/shared/marble-accent"
import { supabase } from "@/lib/supabase"

const benefits = [
  {
    icon: MessageCircle,
    title: "Discuss Your Goals",
    description: "Share your musical aspirations and what you hope to achieve.",
  },
  {
    icon: Clock,
    title: "30 Minutes Free",
    description: "A no-pressure conversation to explore if we're the right fit.",
  },
  {
    icon: Gift,
    title: "No Obligation",
    description: "Learn about our programs with zero commitment required.",
  },
]

export default function ConsultationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentType: "",
    experienceLevel: "",
    preferredDate: "",
    goals: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Save to Supabase
      const { error: supabaseError } = await supabase
        .from("consultation_requests")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: `Student Type: ${formData.studentType} | Experience: ${formData.experienceLevel} | Preferred Date: ${formData.preferredDate} | Goals: ${formData.goals}`,
            status: "pending",
          },
        ])

      if (supabaseError) throw supabaseError

      // Send email notification via our API route
      await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      setIsSubmitted(true)
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>
        <PageHeader
          title="Free Consultation"
          subtitle="Take the first step toward discovering your voice. Book a complimentary 30-minute consultation to discuss your goals."
        />

        <section className="py-20 md:py-28 relative overflow-hidden">
          <MarbleAccent variant="blob-center" size="xl" opacity={0.15} />
          <div className="container mx-auto px-4 relative z-10">
            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-blush-pink/30"
                >
                  <div className="w-14 h-14 rounded-full bg-champagne-gold/20 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-rose-gold" />
                  </div>
                  <h3 className="font-serif text-xl text-espresso mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-warm-taupe text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto">
              {isSubmitted ? (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="font-serif text-2xl text-espresso mb-2">
                      Request Received!
                    </h3>
                    <p className="text-warm-taupe mb-4">
                      Thank you for your interest in Ultimate Music Academy.
                      We&apos;ll contact you within 24 hours to schedule your free
                      consultation.
                    </p>
                    <p className="text-sm text-warm-taupe">
                      Check your email for confirmation and next steps.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-blush-pink/50 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="font-serif text-2xl text-espresso mb-6 text-center">
                      Request Your Consultation
                    </h2>

                    {error && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                      </div>
                    )}

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
                          Phone Number
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

                      <div className="space-y-3">
                        <Label className="text-espresso">
                          Who is the student? *
                        </Label>
                        <RadioGroup
                          value={formData.studentType}
                          onValueChange={(value) =>
                            handleSelectChange("studentType", value)
                          }
                          className="flex flex-wrap gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="child" id="child" />
                            <Label htmlFor="child" className="font-normal cursor-pointer">
                              Child (5-12)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="teen" id="teen" />
                            <Label htmlFor="teen" className="font-normal cursor-pointer">
                              Teen (13-18)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="adult" id="adult" />
                            <Label htmlFor="adult" className="font-normal cursor-pointer">
                              Adult
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="group" id="group" />
                            <Label htmlFor="group" className="font-normal cursor-pointer">
                              Group
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experienceLevel" className="text-espresso">
                          Experience Level *
                        </Label>
                        <Select
                          value={formData.experienceLevel}
                          onValueChange={(value) =>
                            handleSelectChange("experienceLevel", value)
                          }
                        >
                          <SelectTrigger className="border-blush-pink focus:border-rose-gold focus:ring-rose-gold">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Complete Beginner</SelectItem>
                            <SelectItem value="some-experience">Some Experience</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced / Professional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferredDate" className="text-espresso">
                          Preferred Consultation Date
                        </Label>
                        <Input
                          id="preferredDate"
                          name="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="border-blush-pink focus:border-rose-gold focus:ring-rose-gold"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="goals" className="text-espresso">
                          What are your vocal goals? *
                        </Label>
                        <Textarea
                          id="goals"
                          name="goals"
                          value={formData.goals}
                          onChange={handleChange}
                          required
                          placeholder="Tell us about what you hope to achieve with vocal lessons..."
                          rows={4}
                          className="border-blush-pink focus:border-rose-gold focus:ring-rose-gold resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-rose-gold hover:bg-rose-gold/90 text-white w-full"
                        size="lg"
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            <Calendar className="w-4 h-4 mr-2" />
                            Request Consultation
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        <WavyDivider variant="gradient" />

        <section className="py-16 bg-blush-pink/20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="font-serif text-2xl text-espresso mb-4">
              What to Expect
            </h3>
            <p className="text-warm-taupe max-w-2xl mx-auto">
              During your free consultation, we&apos;ll discuss your musical
              background, goals, and any questions you have about the learning
              process. If we&apos;re a good fit, we&apos;ll work together to find the
              perfect lesson schedule and program for you.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}