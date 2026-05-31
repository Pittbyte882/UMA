"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
  Star,
  Search,
  RefreshCw,
  Upload,
  ImageIcon,
} from "lucide-react"

type Testimonial = {
  id: string
  name: string
  role: string
  image: string
  quote: string
  rating: number
  is_approved: boolean
  created_at: string
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all")
  const [search, setSearch] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    image: "",
    quote: "",
    rating: 5,
  })

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })
    setTestimonials(data || [])
    setIsLoading(false)
  }

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

      setNewTestimonial((p) => ({ ...p, image: publicUrl }))
      setImagePreview(publicUrl)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleApprove = async (id: string) => {
    await supabase.from("testimonials").update({ is_approved: true }).eq("id", id)
    await loadTestimonials()
  }

  const handleUnapprove = async (id: string) => {
    await supabase.from("testimonials").update({ is_approved: false }).eq("id", id)
    await loadTestimonials()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return
    await supabase.from("testimonials").delete().eq("id", id)
    await loadTestimonials()
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await supabase.from("testimonials").insert([{
        name: newTestimonial.name,
        role: newTestimonial.role,
        image: newTestimonial.image || null,
        quote: newTestimonial.quote,
        rating: newTestimonial.rating,
        is_approved: true,
      }])
      await loadTestimonials()
      setShowAddDialog(false)
      setNewTestimonial({ name: "", role: "", image: "", quote: "", rating: 5 })
      setImagePreview(null)
    } catch (error) {
      console.error("Error adding testimonial:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filtered = testimonials.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.quote.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === "all" ||
      (filter === "approved" && t.is_approved) ||
      (filter === "pending" && !t.is_approved)
    return matchesSearch && matchesFilter
  })

  const counts = {
    all: testimonials.length,
    pending: testimonials.filter((t) => !t.is_approved).length,
    approved: testimonials.filter((t) => t.is_approved).length,
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-gold" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-espresso">Testimonials</h2>
          <p className="text-warm-taupe text-sm">Approve, manage and add student testimonials</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadTestimonials} variant="outline" className="border-espresso text-espresso gap-2">
            <RefreshCw className="w-4 h-4" />Refresh
          </Button>
          <Button onClick={() => setShowAddDialog(true)} className="bg-rose-gold hover:bg-rose-gold/90 text-white gap-2">
            <Plus className="w-4 h-4" />Add Testimonial
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        {(["all", "pending", "approved"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? "bg-rose-gold text-white" : "bg-gray-100 text-warm-taupe hover:bg-gray-200"}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-taupe" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search testimonials..." className="pl-10 border-blush-pink" />
      </div>

      {counts.pending > 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 font-medium">{counts.pending} testimonial(s) waiting for approval</p>
        </div>
      )}

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card><CardContent className="p-12 text-center">
            <Star className="w-12 h-12 text-blush-pink mx-auto mb-3" />
            <p className="text-warm-taupe">No testimonials found.</p>
          </CardContent></Card>
        ) : (
          filtered.map((testimonial) => (
            <Card key={testimonial.id} className={`border ${!testimonial.is_approved ? "border-yellow-300 bg-yellow-50/30" : "border-blush-pink/30"}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Avatar */}
                    {testimonial.image ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-champagne-gold/30">
                        <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blush-pink/30 flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="w-5 h-5 text-warm-taupe" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${testimonial.is_approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {testimonial.is_approved ? "Approved" : "Pending"}
                        </span>
                        <span className="text-xs text-warm-taupe">{new Date(testimonial.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="font-serif text-lg text-espresso">{testimonial.name}</p>
                      {testimonial.role && <p className="text-sm text-warm-taupe mb-2">{testimonial.role}</p>}
                      <div className="flex gap-0.5 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? "fill-champagne-gold text-champagne-gold" : "text-gray-200"}`} />
                        ))}
                      </div>
                      <p className="text-warm-taupe text-sm italic leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {testimonial.is_approved ? (
                      <Button size="sm" variant="outline" onClick={() => handleUnapprove(testimonial.id)}
                        className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 gap-1 text-xs">
                        <XCircle className="w-3 h-3" />Unapprove
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => handleApprove(testimonial.id)}
                        className="bg-green-600 hover:bg-green-700 text-white gap-1 text-xs">
                        <CheckCircle className="w-3 h-3" />Approve
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => handleDelete(testimonial.id)}
                      className="border-red-300 text-red-600 hover:bg-red-50 gap-1 text-xs">
                      <Trash2 className="w-3 h-3" />Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={showAddDialog} onOpenChange={(open) => { setShowAddDialog(open); if (!open) { setImagePreview(null) } }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-espresso">Add Testimonial</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-espresso">Name *</Label>
                <Input value={newTestimonial.name}
                  onChange={(e) => setNewTestimonial((p) => ({ ...p, name: e.target.value }))}
                  required placeholder="Student name" className="border-blush-pink" />
              </div>
              <div className="space-y-2">
                <Label className="text-espresso">Role</Label>
                <Input value={newTestimonial.role}
                  onChange={(e) => setNewTestimonial((p) => ({ ...p, role: e.target.value }))}
                  placeholder="e.g. Adult Student" className="border-blush-pink" />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-espresso">Photo</Label>
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
                        <p className="text-sm text-warm-taupe">Click to upload a photo</p>
                        <p className="text-xs text-warm-taupe/60 mt-1">JPG, PNG up to 5MB</p>
                      </>
                    )}
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Rating</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setNewTestimonial((p) => ({ ...p, rating: star }))}>
                    <Star className={`w-6 h-6 transition-colors ${star <= newTestimonial.rating ? "fill-champagne-gold text-champagne-gold" : "text-gray-200"}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Quote *</Label>
              <Textarea value={newTestimonial.quote}
                onChange={(e) => setNewTestimonial((p) => ({ ...p, quote: e.target.value }))}
                required placeholder="Student's testimonial..." rows={4} className="border-blush-pink resize-none" />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}
                className="flex-1 border-espresso text-espresso">Cancel</Button>
              <Button type="submit" disabled={isSubmitting}
                className="flex-1 bg-rose-gold hover:bg-rose-gold/90 text-white">
                {isSubmitting ? "Adding..." : "Add Testimonial"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}