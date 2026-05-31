"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save, Loader2, Upload, ImageIcon } from "lucide-react"

const eventTypes = [
  "Recital", "Workshop", "Masterclass", "Open House", "Competition", "Community Event",
]

export default function NewEventPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    date: "",
    time: "",
    location: "",
    description: "",
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
        .from("event-images")
        .upload(fileName, file)
      if (uploadError) throw uploadError
      const { data: { publicUrl } } = supabase.storage
        .from("event-images")
        .getPublicUrl(fileName)
      setFormData((p) => ({ ...p, image: publicUrl }))
      setImagePreview(publicUrl)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { error: supabaseError } = await supabase
        .from("events")
        .insert([{
          title: formData.title,
          description: formData.description,
          date: formData.date,
          time: formData.time || null,
          location: formData.location || null,
          image: formData.image || null,
        }])
      if (supabaseError) throw supabaseError
      router.push("/admin/events")
    } catch (err) {
      console.error("Error creating event:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/events">
          <Button variant="ghost" size="icon" className="text-espresso">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="font-serif text-2xl text-espresso">New Event</h2>
          <p className="text-warm-taupe text-sm">Create a new event or performance</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-blush-pink/50">
          <CardHeader>
            <CardTitle className="font-serif text-lg text-espresso">Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
            )}

            <div className="space-y-2">
              <Label className="text-espresso">Title *</Label>
              <Input value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Spring Vocal Recital" className="border-blush-pink" required />
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Event Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="border-blush-pink">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-espresso">Date *</Label>
                <Input type="date" value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="border-blush-pink" required />
              </div>
              <div className="space-y-2">
                <Label className="text-espresso">Time</Label>
                <Input type="time" value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="border-blush-pink" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Location</Label>
              <Input value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ultimate Music Academy Studio" className="border-blush-pink" />
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Description</Label>
              <Textarea value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the event..." rows={5} className="border-blush-pink resize-none" />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-espresso">Event Image</Label>
              <div
                className="border-2 border-dashed border-blush-pink rounded-xl p-4 text-center cursor-pointer hover:border-rose-gold transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className="space-y-2">
                    <div className="relative w-full h-40 rounded-lg overflow-hidden">
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    </div>
                    <p className="text-xs text-warm-taupe">Click to change image</p>
                  </div>
                ) : (
                  <div className="py-4">
                    {uploadingImage ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-rose-gold" />
                        <span className="text-sm text-warm-taupe">Uploading...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-blush-pink mx-auto mb-2" />
                        <p className="text-sm text-warm-taupe">Click to upload an event image</p>
                        <p className="text-xs text-warm-taupe/60 mt-1">JPG, PNG up to 10MB</p>
                      </>
                    )}
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Link href="/admin/events" className="flex-1">
            <Button type="button" variant="outline" className="w-full border-espresso text-espresso">Cancel</Button>
          </Link>
          <Button type="submit" disabled={loading}
            className="flex-1 bg-rose-gold hover:bg-rose-gold/90 text-white gap-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Create Event</>}
          </Button>
        </div>
      </form>
    </div>
  )
}