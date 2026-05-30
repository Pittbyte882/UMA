"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Loader2 } from "lucide-react"

export default function EditEventPage() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  })

  useEffect(() => {
    const loadEvent = async () => {
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("id", params.id)
        .single()

      if (data) {
        setFormData({
          title: data.title,
          date: data.date,
          time: data.time || "",
          location: data.location || "",
          description: data.description || "",
        })
      }
      setIsLoading(false)
    }
    loadEvent()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      const { error: supabaseError } = await supabase
        .from("events")
        .update({
          title: formData.title,
          description: formData.description,
          date: formData.date,
          time: formData.time || null,
          location: formData.location || null,
        })
        .eq("id", params.id)

      if (supabaseError) throw supabaseError
      router.push("/admin/events")
    } catch (err) {
      console.error("Error updating event:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-gold" />
      </div>
    )
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
          <h2 className="font-serif text-2xl text-espresso">Edit Event</h2>
          <p className="text-warm-taupe text-sm">{formData.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-blush-pink/50">
          <CardHeader>
            <CardTitle className="font-serif text-lg text-espresso">
              Event Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-espresso">Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border-blush-pink"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-espresso">Date *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="border-blush-pink"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-espresso">Time</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="border-blush-pink"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="border-blush-pink"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                className="border-blush-pink resize-none"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Link href="/admin/events" className="flex-1">
            <Button
              type="button"
              variant="outline"
              className="w-full border-espresso text-espresso"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSaving}
            className="flex-1 bg-rose-gold hover:bg-rose-gold/90 text-white gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}