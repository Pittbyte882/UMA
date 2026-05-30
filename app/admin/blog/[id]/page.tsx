"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function EditBlogPostPage() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    published: false,
  })

  useEffect(() => {
    const loadPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", params.id)
        .single()

      if (data) {
        setForm({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || "",
          content: data.content || "",
          image: data.image || "",
          published: data.published,
        })
      }
      setIsLoading(false)
    }
    loadPost()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt,
          content: form.content,
          image: form.image || null,
          published: form.published,
        })
        .eq("id", params.id)

      if (error) throw error
      router.push("/admin/blog")
    } catch (error) {
      console.error("Error updating post:", error)
    } finally {
      setIsSubmitting(false)
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
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog">
          <Button variant="ghost" size="icon" className="text-espresso">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="font-serif text-2xl text-espresso">Edit Post</h2>
          <p className="text-warm-taupe text-sm">{form.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-blush-pink/30">
          <CardContent className="p-6 space-y-5">
            <div className="space-y-2">
              <Label className="text-espresso">Title *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                required
                className="border-blush-pink font-serif text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">URL Slug *</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-warm-taupe">/blog/</span>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                  required
                  className="border-blush-pink text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Excerpt</Label>
              <Textarea
                value={form.excerpt}
                onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                rows={2}
                className="border-blush-pink resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Featured Image Path</Label>
              <Input
                value={form.image}
                onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                className="border-blush-pink"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Content *</Label>
              <Textarea
                value={form.content}
                onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                required
                rows={16}
                className="border-blush-pink resize-none font-mono text-sm"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-espresso text-sm">Published</p>
                <p className="text-xs text-warm-taupe">Toggle off to unpublish</p>
              </div>
              <Switch
                checked={form.published}
                onCheckedChange={(checked) =>
                  setForm((p) => ({ ...p, published: checked }))
                }
                className="data-[state=checked]:bg-rose-gold"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Link href="/admin/blog" className="flex-1">
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
            disabled={isSubmitting}
            className="flex-1 bg-rose-gold hover:bg-rose-gold/90 text-white gap-2"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}