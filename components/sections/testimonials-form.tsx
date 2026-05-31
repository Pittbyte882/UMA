"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Star, CheckCircle } from "lucide-react"

export function TestimonialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [form, setForm] = useState({
    name: "",
    role: "",
    quote: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const { error: supabaseError } = await supabase
        .from("testimonials")
        .insert([{
          name: form.name,
          role: form.role,
          quote: form.quote,
          rating,
          is_approved: false,
        }])

      if (supabaseError) throw supabaseError

      // Notify Samantha
      await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, role: form.role, quote: form.quote, rating }),
      })

      setIsSubmitted(true)
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="font-serif text-2xl text-espresso mb-2">
            Thank You!
          </h3>
          <p className="text-warm-taupe">
            Your testimonial has been submitted and is pending review. We
            appreciate you sharing your experience!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-blush-pink/50 shadow-lg">
      <CardContent className="p-8">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-espresso">Your Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
                placeholder="Your full name"
                className="border-blush-pink focus:border-rose-gold"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-espresso">Your Role</Label>
              <Input
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                placeholder="e.g. Adult Student, Parent"
                className="border-blush-pink focus:border-rose-gold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-espresso">Your Rating *</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-champagne-gold text-champagne-gold"
                        : "text-gray-200"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-espresso">Your Testimonial *</Label>
            <Textarea
              value={form.quote}
              onChange={(e) => setForm((p) => ({ ...p, quote: e.target.value }))}
              required
              placeholder="Share your experience at Ultimate Music Academy..."
              rows={5}
              className="border-blush-pink focus:border-rose-gold resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-rose-gold hover:bg-rose-gold/90 text-white"
            size="lg"
          >
            {isSubmitting ? "Submitting..." : "Submit Testimonial"}
          </Button>

          <p className="text-xs text-warm-taupe text-center">
            Your testimonial will be reviewed before appearing on the site.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}