"use client"

import { useState } from "react"
import Link from "next/link"
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
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Calendar, MapPin, Users } from "lucide-react"
import { mockEvents } from "@/lib/mock-data"

export default function AdminEventsPage() {
  const [events, setEvents] = useState(mockEvents)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = () => {
    if (deleteId) {
      setEvents(events.filter((event) => event.id !== deleteId))
      setDeleteId(null)
    }
  }

  const getStatusBadge = (date: string) => {
    const eventDate = new Date(date)
    const today = new Date()
    if (eventDate < today) {
      return <Badge variant="secondary" className="bg-warm-taupe/50">Past</Badge>
    } else if (eventDate.toDateString() === today.toDateString()) {
      return <Badge className="bg-green-500">Today</Badge>
    } else {
      return <Badge className="bg-champagne-gold">Upcoming</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-espresso">Events</h1>
          <p className="text-warm-taupe mt-1">Manage recitals, workshops, and special events</p>
        </div>
        <Button asChild className="bg-rose-gold hover:bg-rose-gold/90 text-white">
          <Link href="/admin/events/new">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-taupe" />
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-blush-pink focus:border-rose-gold"
        />
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="border-blush-pink/50 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusBadge(event.date)}
                    <Badge variant="outline" className="border-champagne-gold text-champagne-gold">
                      {event.type}
                    </Badge>
                  </div>
                  <h3 className="font-serif text-xl text-espresso mb-2">{event.title}</h3>
                  <p className="text-warm-taupe text-sm mb-3 line-clamp-2">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-warm-taupe">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-rose-gold" />
                      {event.date} at {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-rose-gold" />
                      {event.location}
                    </span>
                    {event.capacity && (
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-rose-gold" />
                        {event.registrations || 0}/{event.capacity} registered
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/events`}>
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/events/${event.id}`} className="flex items-center">
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-warm-taupe">No events found</p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-espresso">Delete Event</AlertDialogTitle>
            <AlertDialogDescription className="text-warm-taupe">
              Are you sure you want to delete this event? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
