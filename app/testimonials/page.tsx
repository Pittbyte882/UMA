"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Star, CheckCircle, Upload } from "lucide-react"

export function TestimonialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    name: "",
    role: "",
    quote: "",
    image: "",
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from("testimonial-images")
        .upload(fileName, file)
      if (uploadError) throw uploadError
      const { data: { publicUrl } } = supabase.storage
        .from("testimonial-images")
        .getPublicUrl(fileName)
      setForm((p) => ({ ...p, image: publicUrl }))
      setImagePreview(publicUrl)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setUploadingImage(false)
    }
  }

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
          image: form.image || null,
          rating,
          is_approved: false,
        }])

      if (supabaseError) throw supabaseError

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
          <h3 className="font-serif text-2xl text-espresso mb-2">Thank You!</h3>
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

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label className="text-espresso">Your Photo (optional)</Label>
            <div
              className="border-2 border-dashed border-blush-pink rounded-xl p-4 text-center cursor-pointer hover:border-rose-gold transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-espresso font-medium">Photo uploaded!</p>
                    <p className="text-xs text-warm-taupe">Click to change</p>
                  </div>
                </div>
              ) : (
                <div className="py-2">
                  {uploadingImage ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-rose-gold" />
                      <span className="text-sm text-warm-taupe">Uploading...</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-blush-pink mx-auto mb-2" />
                      <p className="text-sm text-warm-taupe">Click to upload your photo</p>
                      <p className="text-xs text-warm-taupe/60 mt-1">JPG, PNG up to 5MB</p>
                    </>
                  )}
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
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
            disabled={isSubmitting || uploadingImage}
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