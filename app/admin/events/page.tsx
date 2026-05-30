"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  RefreshCw,
} from "lucide-react"

type Event = {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  created_at: string
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true })
    setEvents(data || [])
    setIsLoading(false)
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await supabase.from("events").delete().eq("id", deleteId)
    setDeleteId(null)
    await loadEvents()
  }

  const getStatusBadge = (date: string) => {
    const eventDate = new Date(date + "T12:00:00")
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (eventDate < today) {
      return <Badge variant="secondary" className="bg-warm-taupe/20 text-warm-taupe">Past</Badge>
    } else if (eventDate.toDateString() === today.toDateString()) {
      return <Badge className="bg-green-500 text-white">Today</Badge>
    } else {
      return <Badge className="bg-champagne-gold text-espresso">Upcoming</Badge>
    }
  }

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location?.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-espresso">Events</h2>
          <p className="text-warm-taupe text-sm">
            Manage recitals, workshops, and performances
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={loadEvents}
            variant="outline"
            className="border-espresso text-espresso gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Link href="/admin/events/new">
            <Button className="bg-rose-gold hover:bg-rose-gold/90 text-white gap-2">
              <Plus className="w-4 h-4" />
              New Event
            </Button>
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-taupe" />
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-blush-pink"
        />
      </div>

      {/* Events list */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="w-12 h-12 text-blush-pink mx-auto mb-3" />
              <p className="text-warm-taupe mb-4">No events found.</p>
              <Link href="/admin/events/new">
                <Button className="bg-rose-gold hover:bg-rose-gold/90 text-white gap-2">
                  <Plus className="w-4 h-4" />
                  Create Your First Event
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          filtered.map((event) => (
            <Card
              key={event.id}
              className="border-blush-pink/50 hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusBadge(event.date)}
                    </div>
                    <h3 className="font-serif text-xl text-espresso mb-1">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-warm-taupe text-sm mb-3 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-warm-taupe">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-rose-gold" />
                        {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {event.time && ` at ${event.time}`}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-rose-gold" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/admin/events/${event.id}`}
                          className="flex items-center"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteId(event.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-espresso">
              Delete Event
            </AlertDialogTitle>
            <AlertDialogDescription className="text-warm-taupe">
              Are you sure you want to delete this event? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}