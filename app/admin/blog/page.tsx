"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Plus,
  Search,
  Eye,
  EyeOff,
  Trash2,
  Edit2,
  RefreshCw,
} from "lucide-react"

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  image: string
  published: boolean
  created_at: string
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all")

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false })
    setPosts(data || [])
    setIsLoading(false)
  }

  const togglePublish = async (post: BlogPost) => {
    await supabase
      .from("blog_posts")
      .update({ published: !post.published })
      .eq("id", post.id)
    await loadPosts()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return
    await supabase.from("blog_posts").delete().eq("id", id)
    await loadPosts()
  }

  const filtered = posts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === "all" ||
      (filter === "published" && p.published) ||
      (filter === "draft" && !p.published)
    return matchesSearch && matchesFilter
  })

  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.published).length,
    draft: posts.filter((p) => !p.published).length,
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-espresso">Blog Posts</h2>
          <p className="text-warm-taupe text-sm">
            Create and manage your blog content
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={loadPosts}
            variant="outline"
            className="border-espresso text-espresso gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Link href="/admin/blog/new">
            <Button className="bg-rose-gold hover:bg-rose-gold/90 text-white gap-2">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "published", "draft"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? "bg-rose-gold text-white"
                : "bg-gray-100 text-warm-taupe hover:bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-taupe" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="pl-10 border-blush-pink"
        />
      </div>

      {/* Posts list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-blush-pink mx-auto mb-3" />
              <p className="text-warm-taupe mb-4">No blog posts found.</p>
              <Link href="/admin/blog/new">
                <Button className="bg-rose-gold hover:bg-rose-gold/90 text-white gap-2">
                  <Plus className="w-4 h-4" />
                  Create Your First Post
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          filtered.map((post) => (
            <Card
              key={post.id}
              className="border-blush-pink/30 hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          post.published
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                      <span className="text-xs text-warm-taupe">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-espresso mb-1">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-warm-taupe line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="text-xs text-warm-taupe mt-1">
                      /{post.slug}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePublish(post)}
                      className={`gap-1 text-xs ${
                        post.published
                          ? "border-gray-300 text-gray-600 hover:bg-gray-50"
                          : "border-green-300 text-green-700 hover:bg-green-50"
                      }`}
                    >
                      {post.published ? (
                        <>
                          <EyeOff className="w-3 h-3" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="w-3 h-3" />
                          Publish
                        </>
                      )}
                    </Button>
                    <Link href={`/admin/blog/${post.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-champagne-gold text-espresso hover:bg-champagne-gold/10 gap-1 text-xs"
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(post.id)}
                      className="border-red-300 text-red-600 hover:bg-red-50 gap-1 text-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}