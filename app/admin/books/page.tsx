"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Download,
  Package,
  Link as LinkIcon,
  Save,
} from "lucide-react"

type Book = {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  digital_price: number
  physical_price: number
  digital_link: string
  physical_link: string
  is_active: boolean
}

const emptyBook = {
  title: "",
  subtitle: "",
  description: "",
  image: "",
  digital_price: 0,
  physical_price: 0,
  digital_link: "",
  physical_link: "",
  is_active: true,
}

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [form, setForm] = useState(emptyBook)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: true })
    setBooks(data || [])
    setIsLoading(false)
  }

  const openAdd = () => {
    setEditingBook(null)
    setForm(emptyBook)
    setShowDialog(true)
  }

  const openEdit = (book: Book) => {
    setEditingBook(book)
    setForm({
      title: book.title,
      subtitle: book.subtitle || "",
      description: book.description || "",
      image: book.image || "",
      digital_price: book.digital_price || 0,
      physical_price: book.physical_price || 0,
      digital_link: book.digital_link || "",
      physical_link: book.physical_link || "",
      is_active: book.is_active,
    })
    setShowDialog(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (editingBook) {
        await supabase
          .from("books")
          .update({
            title: form.title,
            subtitle: form.subtitle,
            description: form.description,
            image: form.image || null,
            digital_price: form.digital_price,
            physical_price: form.physical_price,
            digital_link: form.digital_link || null,
            physical_link: form.physical_link || null,
            is_active: form.is_active,
          })
          .eq("id", editingBook.id)
      } else {
        await supabase.from("books").insert([{
          title: form.title,
          subtitle: form.subtitle,
          description: form.description,
          image: form.image || null,
          digital_price: form.digital_price,
          physical_price: form.physical_price,
          digital_link: form.digital_link || null,
          physical_link: form.physical_link || null,
          is_active: form.is_active,
        }])
      }

      await loadBooks()
      setShowDialog(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error("Error saving book:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return
    await supabase.from("books").delete().eq("id", id)
    await loadBooks()
  }

  const toggleActive = async (book: Book) => {
    await supabase
      .from("books")
      .update({ is_active: !book.is_active })
      .eq("id", book.id)
    await loadBooks()
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
          <h2 className="font-serif text-2xl text-espresso">Books</h2>
          <p className="text-warm-taupe text-sm">
            Manage book listings, prices and purchase links
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={loadBooks}
            variant="outline"
            className="border-espresso text-espresso gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button
            onClick={openAdd}
            className="bg-rose-gold hover:bg-rose-gold/90 text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Book
          </Button>
        </div>
      </div>

      {saved && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          ✓ Book saved successfully!
        </div>
      )}

      {/* Books list */}
      <div className="space-y-4">
        {books.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-blush-pink mx-auto mb-3" />
              <p className="text-warm-taupe mb-4">No books added yet.</p>
              <Button
                onClick={openAdd}
                className="bg-rose-gold hover:bg-rose-gold/90 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Your First Book
              </Button>
            </CardContent>
          </Card>
        ) : (
          books.map((book) => (
            <Card
              key={book.id}
              className={`border ${
                book.is_active ? "border-blush-pink/30" : "border-gray-200 opacity-60"
              }`}
            >
              <CardContent className="p-5">
                <div className="flex gap-4">
                  {/* Book image */}
                  {book.image && (
                    <div className="relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-serif text-lg text-espresso">
                            {book.title}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              book.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {book.is_active ? "Active" : "Hidden"}
                          </span>
                        </div>
                        {book.subtitle && (
                          <p className="text-sm text-warm-taupe mb-2">
                            {book.subtitle}
                          </p>
                        )}
                        {book.description && (
                          <p className="text-xs text-warm-taupe line-clamp-2 mb-3">
                            {book.description}
                          </p>
                        )}

                        {/* Pricing */}
                        <div className="flex flex-wrap gap-4 mb-3">
                          <div className="flex items-center gap-1.5 text-sm">
                            <Download className="w-3.5 h-3.5 text-rose-gold" />
                            <span className="text-espresso font-medium">
                              Digital:
                            </span>
                            <span className="text-warm-taupe">
                              ${book.digital_price?.toFixed(2) || "—"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm">
                            <Package className="w-3.5 h-3.5 text-rose-gold" />
                            <span className="text-espresso font-medium">
                              Physical:
                            </span>
                            <span className="text-warm-taupe">
                              ${book.physical_price?.toFixed(2) || "—"}
                            </span>
                          </div>
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-3 text-xs">
                          {book.digital_link ? (
                            <a
                              href={book.digital_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-rose-gold hover:underline"
                            >
                              <LinkIcon className="w-3 h-3" />
                              Digital Link ✓
                            </a>
                          ) : (
                            <span className="text-warm-taupe flex items-center gap-1">
                              <LinkIcon className="w-3 h-3" />
                              No digital link
                            </span>
                          )}
                          {book.physical_link ? (
                            <a
                              href={book.physical_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-rose-gold hover:underline"
                            >
                              <LinkIcon className="w-3 h-3" />
                              Physical Link ✓
                            </a>
                          ) : (
                            <span className="text-warm-taupe flex items-center gap-1">
                              <LinkIcon className="w-3 h-3" />
                              No physical link
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          onClick={() => openEdit(book)}
                          variant="outline"
                          className="border-champagne-gold text-espresso hover:bg-champagne-gold/10 gap-1 text-xs"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => toggleActive(book)}
                          variant="outline"
                          className={`gap-1 text-xs ${
                            book.is_active
                              ? "border-gray-300 text-gray-600 hover:bg-gray-50"
                              : "border-green-300 text-green-700 hover:bg-green-50"
                          }`}
                        >
                          {book.is_active ? "Hide" : "Show"}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDelete(book.id)}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50 gap-1 text-xs"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-espresso">
              {editingBook ? "Edit Book" : "Add Book"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-espresso">Title *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                required
                placeholder="Unlocked Kids"
                className="border-blush-pink"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Subtitle</Label>
              <Input
                value={form.subtitle}
                onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                placeholder="Giving You the Keys to Sing Like a Superstar"
                className="border-blush-pink"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="Book description..."
                rows={3}
                className="border-blush-pink resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Image Path</Label>
              <Input
                value={form.image}
                onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                placeholder="/images/umakidsbook.png"
                className="border-blush-pink"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-espresso">Digital Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.digital_price}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      digital_price: parseFloat(e.target.value),
                    }))
                  }
                  className="border-blush-pink"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-espresso">Physical Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.physical_price}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      physical_price: parseFloat(e.target.value),
                    }))
                  }
                  className="border-blush-pink"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Digital Purchase Link</Label>
              <Input
                value={form.digital_link}
                onChange={(e) =>
                  setForm((p) => ({ ...p, digital_link: e.target.value }))
                }
                placeholder="https://gumroad.com/..."
                className="border-blush-pink"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Physical Purchase Link</Label>
              <Input
                value={form.physical_link}
                onChange={(e) =>
                  setForm((p) => ({ ...p, physical_link: e.target.value }))
                }
                placeholder="https://amazon.com/..."
                className="border-blush-pink"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-espresso">
                  Show on website
                </p>
                <p className="text-xs text-warm-taupe">
                  Toggle off to hide from the books page
                </p>
              </div>
              <Switch
                checked={form.is_active}
                onCheckedChange={(checked) =>
                  setForm((p) => ({ ...p, is_active: checked }))
                }
                className="data-[state=checked]:bg-rose-gold"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="flex-1 border-espresso text-espresso"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-rose-gold hover:bg-rose-gold/90 text-white gap-2"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? "Saving..." : "Save Book"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}