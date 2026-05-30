"use client"

import { useState, useEffect, useMemo } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  Clock,
  Trash2,
  Edit2,
  Mail,
  LayoutGrid,
  List,
} from "lucide-react"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12
  const ampm = i < 12 ? "AM" : "PM"
  return `${hour}:00 ${ampm}`
})

// Color coding using UMA hex colors
const EVENT_COLORS = {
  lesson: {
    bg: "#B76E79",
    light: "#F5E6E8",
    label: "Lesson",
  },
  consultation: {
    bg: "#D6B98C",
    light: "#FBF5EC",
    label: "Consultation",
  },
  event: {
    bg: "#3D2B1F",
    light: "#EDE8E6",
    label: "Event/Performance",
  },
  manual: {
    bg: "#8A776B",
    light: "#F0EBE8",
    label: "Other",
  },
}

type CalendarEvent = {
  id: string
  title: string
  date: string
  time?: string
  end_time?: string
  type: "lesson" | "consultation" | "event" | "manual"
  student_name?: string
  student_email?: string
  notes?: string
  status?: string
}

const DAYS_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function AdminCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "day">("month")
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    end_time: "",
    type: "manual" as CalendarEvent["type"],
    student_name: "",
    student_email: "",
    notes: "",
  })

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setIsLoading(true)
    try {
      // Load confirmed bookings
      const { data: bookings } = await supabase
        .from("bookings")
        .select("*")
        .in("status", ["confirmed", "pending"])

      // Load consultation requests
      const { data: consultations } = await supabase
        .from("consultation_requests")
        .select("*")
        .eq("status", "confirmed")

      // Load events
      const { data: performanceEvents } = await supabase
        .from("events")
        .select("*")

      // Load manual calendar events
      const { data: manualEvents } = await supabase
        .from("calendar_events")
        .select("*")

      const allEvents: CalendarEvent[] = [
        ...(bookings || []).map((b: any) => ({
          id: `booking-${b.id}`,
          title: `${b.lesson_type} — ${b.name}`,
          date: b.date,
          time: b.time,
          type: "lesson" as const,
          student_name: b.name,
          student_email: b.email,
          status: b.status,
          notes: b.notes,
        })),
        ...(consultations || []).map((c: any) => ({
          id: `consultation-${c.id}`,
          title: `Consultation — ${c.name}`,
          date: c.preferred_date || new Date().toISOString().split("T")[0],
          type: "consultation" as const,
          student_name: c.name,
          student_email: c.email,
          notes: c.message,
        })),
        ...(performanceEvents || []).map((e: any) => ({
          id: `event-${e.id}`,
          title: e.title,
          date: e.date,
          time: e.time,
          type: "event" as const,
          notes: e.description,
        })),
        ...(manualEvents || []).map((e: any) => ({
          id: `manual-${e.id}`,
          title: e.title,
          date: e.date,
          time: e.time,
          end_time: e.end_time,
          type: e.type || "manual",
          student_name: e.student_name,
          student_email: e.student_email,
          notes: e.notes,
        })),
      ]

      setEvents(allEvents)
    } catch (error) {
      console.error("Error loading events:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days: (Date | null)[] = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i))
    return days
  }, [currentDate])

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return events.filter((e) => e.date === dateStr)
  }

  const getDayHours = () => {
    const dateStr = selectedDate.toISOString().split("T")[0]
    const dayEvents = events.filter((e) => e.date === dateStr)
    return HOURS.map((hour) => ({
      hour,
      events: dayEvents.filter((e) => e.time?.startsWith(hour.split(":")[0])),
    }))
  }

  const navigateDate = (direction: "prev" | "next") => {
    if (view === "month") {
      setCurrentDate((prev) => {
        const d = new Date(prev)
        d.setMonth(d.getMonth() + (direction === "next" ? 1 : -1))
        return d
      })
    } else {
      setSelectedDate((prev) => {
        const d = new Date(prev)
        d.setDate(d.getDate() + (direction === "next" ? 1 : -1))
        return d
      })
    }
  }

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
    if (view === "month") setView("day")
  }

  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation()
    setSelectedEvent(event)
    setEmailSent(false)
    setShowDetailDialog(true)
  }

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("calendar_events").insert([{
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time || null,
        end_time: newEvent.end_time || null,
        type: newEvent.type,
        student_name: newEvent.student_name || null,
        student_email: newEvent.student_email || null,
        notes: newEvent.notes || null,
      }])

      if (error) throw error

      await loadEvents()
      setShowEventDialog(false)
      setNewEvent({
        title: "",
        date: "",
        time: "",
        end_time: "",
        type: "manual",
        student_name: "",
        student_email: "",
        notes: "",
      })
    } catch (error) {
      console.error("Error adding event:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteEvent = async (event: CalendarEvent) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      if (event.id.startsWith("manual-")) {
        const realId = event.id.replace("manual-", "")
        await supabase.from("calendar_events").delete().eq("id", realId)
      } else if (event.id.startsWith("booking-")) {
        const realId = event.id.replace("booking-", "")
        await supabase.from("bookings").update({ status: "cancelled" }).eq("id", realId)
      }
      await loadEvents()
      setShowDetailDialog(false)
    } catch (error) {
      console.error("Error deleting event:", error)
    }
  }

  const handleSendEmail = async () => {
    if (!selectedEvent?.student_email) return
    setIsSendingEmail(true)

    try {
      await fetch("/api/admin/send-calendar-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: selectedEvent.student_name,
          studentEmail: selectedEvent.student_email,
          eventTitle: selectedEvent.title,
          date: selectedEvent.date,
          time: selectedEvent.time,
          notes: selectedEvent.notes,
        }),
      })
      setEmailSent(true)
    } catch (error) {
      console.error("Error sending email:", error)
    } finally {
      setIsSendingEmail(false)
    }
  }

  const headerTitle = view === "month"
    ? `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    : `${DAYS_FULL[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}`

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-espresso">Admin Calendar</h2>
          <p className="text-warm-taupe text-sm">Manage all your lessons, consultations and events</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView("month")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === "month"
                  ? "bg-white text-espresso shadow-sm"
                  : "text-warm-taupe hover:text-espresso"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Month
            </button>
            <button
              onClick={() => {
                setView("day")
                setSelectedDate(new Date())
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === "day"
                  ? "bg-white text-espresso shadow-sm"
                  : "text-warm-taupe hover:text-espresso"
              }`}
            >
              <List className="w-4 h-4" />
              Day
            </button>
          </div>

          <Button
            onClick={() => {
              setNewEvent((prev) => ({
                ...prev,
                date: selectedDate.toISOString().split("T")[0],
              }))
              setShowEventDialog(true)
            }}
            className="bg-rose-gold hover:bg-rose-gold/90 text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {Object.entries(EVENT_COLORS).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: val.bg }} />
            <span className="text-xs text-warm-taupe">{val.label}</span>
          </div>
        ))}
      </div>

      {/* Calendar Card */}
      <Card className="border-blush-pink/50">
        {/* Nav Header */}
        <CardHeader className="border-b border-blush-pink/30 pb-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateDate("prev")}
              className="text-espresso hover:text-rose-gold"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <CardTitle className="font-serif text-xl text-espresso">
              {headerTitle}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateDate("next")}
              className="text-espresso hover:text-rose-gold"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {/* MONTH VIEW */}
          {view === "month" && (
            <>
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-warm-taupe py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, index) => {
                  if (!date) return <div key={`empty-${index}`} className="h-24" />
                  const dayEvents = getEventsForDate(date)
                  const isToday = new Date().toDateString() === date.toDateString()
                  const isSelected = selectedDate.toDateString() === date.toDateString()

                  return (
                    <div
                      key={date.toISOString()}
                      onClick={() => handleDayClick(date)}
                      className={`h-24 p-1 rounded-lg border cursor-pointer transition-all hover:border-rose-gold/50 overflow-hidden ${
                        isToday ? "border-champagne-gold bg-champagne-gold/5" : "border-transparent"
                      } ${isSelected ? "ring-2 ring-rose-gold/30" : ""}`}
                    >
                      <p className={`text-xs font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                        isToday
                          ? "bg-rose-gold text-white"
                          : "text-espresso"
                      }`}>
                        {date.getDate()}
                      </p>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            onClick={(e) => handleEventClick(e, event)}
                            className="text-[10px] px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80"
                            style={{
                              backgroundColor: EVENT_COLORS[event.type]?.light,
                              color: EVENT_COLORS[event.type]?.bg,
                              borderLeft: `2px solid ${EVENT_COLORS[event.type]?.bg}`,
                            }}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <p className="text-[10px] text-warm-taupe pl-1">
                            +{dayEvents.length - 3} more
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* DAY VIEW */}
          {view === "day" && (
            <div className="space-y-2">
              {/* Jump to date */}
              <div className="flex justify-end mb-4">
                <Input
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value + "T12:00:00"))}
                  className="w-auto border-blush-pink text-sm"
                />
              </div>

              {/* All day events */}
              {getEventsForDate(selectedDate).filter((e) => !e.time).length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-warm-taupe mb-2">All Day</p>
                  <div className="space-y-1">
                    {getEventsForDate(selectedDate)
                      .filter((e) => !e.time)
                      .map((event) => (
                        <div
                          key={event.id}
                          onClick={(e) => handleEventClick(e, event)}
                          className="p-2 rounded-lg cursor-pointer hover:opacity-80 flex items-center gap-2"
                          style={{
                            backgroundColor: EVENT_COLORS[event.type]?.light,
                            borderLeft: `3px solid ${EVENT_COLORS[event.type]?.bg}`,
                          }}
                        >
                          <span className="text-sm font-medium" style={{ color: EVENT_COLORS[event.type]?.bg }}>
                            {event.title}
                          </span>
                          {event.student_name && (
                            <span className="text-xs text-warm-taupe">— {event.student_name}</span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Hourly slots */}
              <div className="border border-blush-pink/30 rounded-lg overflow-hidden">
                {HOURS.slice(7, 21).map((hour, index) => {
                  const dateStr = selectedDate.toISOString().split("T")[0]
                  const hourNum = index + 7
                  const hourEvents = events.filter((e) => {
                    if (e.date !== dateStr || !e.time) return false
                    const eventHour = parseInt(e.time.split(":")[0])
                    const isPM = e.time.includes("PM") && eventHour !== 12
                    const hour24 = isPM ? eventHour + 12 : eventHour
                    return hour24 === hourNum
                  })

                  return (
                    <div
                      key={hour}
                      className="flex border-b border-blush-pink/20 last:border-0 min-h-[56px]"
                    >
                      <div className="w-20 flex-shrink-0 p-2 text-xs text-warm-taupe border-r border-blush-pink/20 flex items-start pt-2">
                        {hour}
                      </div>
                      <div className="flex-1 p-1 space-y-1">
                        {hourEvents.map((event) => (
                          <div
                            key={event.id}
                            onClick={(e) => handleEventClick(e, event)}
                            className="p-2 rounded cursor-pointer hover:opacity-80"
                            style={{
                              backgroundColor: EVENT_COLORS[event.type]?.light,
                              borderLeft: `3px solid ${EVENT_COLORS[event.type]?.bg}`,
                            }}
                          >
                            <p className="text-sm font-medium" style={{ color: EVENT_COLORS[event.type]?.bg }}>
                              {event.title}
                            </p>
                            {event.student_name && (
                              <p className="text-xs text-warm-taupe">{event.student_name}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Event Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-espresso">Add Calendar Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddEvent} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-espresso">Event Title *</Label>
              <Input
                value={newEvent.title}
                onChange={(e) => setNewEvent((p) => ({ ...p, title: e.target.value }))}
                required
                placeholder="e.g. Private Lesson - John"
                className="border-blush-pink"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-espresso">Date *</Label>
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent((p) => ({ ...p, date: e.target.value }))}
                  required
                  className="border-blush-pink"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-espresso">Type</Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(v) => setNewEvent((p) => ({ ...p, type: v as CalendarEvent["type"] }))}
                >
                  <SelectTrigger className="border-blush-pink">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lesson">Lesson</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="event">Event/Performance</SelectItem>
                    <SelectItem value="manual">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-espresso">Start Time</Label>
                <Input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent((p) => ({ ...p, time: e.target.value }))}
                  className="border-blush-pink"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-espresso">End Time</Label>
                <Input
                  type="time"
                  value={newEvent.end_time}
                  onChange={(e) => setNewEvent((p) => ({ ...p, end_time: e.target.value }))}
                  className="border-blush-pink"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-espresso">Student Name</Label>
                <Input
                  value={newEvent.student_name}
                  onChange={(e) => setNewEvent((p) => ({ ...p, student_name: e.target.value }))}
                  placeholder="Optional"
                  className="border-blush-pink"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-espresso">Student Email</Label>
                <Input
                  type="email"
                  value={newEvent.student_email}
                  onChange={(e) => setNewEvent((p) => ({ ...p, student_email: e.target.value }))}
                  placeholder="Optional"
                  className="border-blush-pink"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-espresso">Notes</Label>
              <Textarea
                value={newEvent.notes}
                onChange={(e) => setNewEvent((p) => ({ ...p, notes: e.target.value }))}
                placeholder="Any additional notes..."
                rows={3}
                className="border-blush-pink resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEventDialog(false)}
                className="flex-1 border-espresso text-espresso"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-rose-gold hover:bg-rose-gold/90 text-white"
              >
                {isSubmitting ? "Adding..." : "Add Event"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Event Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-espresso">Event Details</DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-4 mt-2">
              {/* Type badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: EVENT_COLORS[selectedEvent.type]?.light,
                  color: EVENT_COLORS[selectedEvent.type]?.bg,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: EVENT_COLORS[selectedEvent.type]?.bg }}
                />
                {EVENT_COLORS[selectedEvent.type]?.label}
              </div>

              <h3 className="font-serif text-xl text-espresso">{selectedEvent.title}</h3>

              <div className="space-y-2">
                {selectedEvent.date && (
                  <div className="flex items-center gap-2 text-sm text-warm-taupe">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedEvent.date + "T12:00:00").toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                )}
                {selectedEvent.time && (
                  <div className="flex items-center gap-2 text-sm text-warm-taupe">
                    <Clock className="w-4 h-4" />
                    {selectedEvent.time}
                    {selectedEvent.end_time && ` — ${selectedEvent.end_time}`}
                  </div>
                )}
                {selectedEvent.student_name && (
                  <div className="flex items-center gap-2 text-sm text-warm-taupe">
                    <span className="font-medium text-espresso">Student:</span>
                    {selectedEvent.student_name}
                  </div>
                )}
                {selectedEvent.student_email && (
                  <div className="flex items-center gap-2 text-sm text-warm-taupe">
                    <Mail className="w-4 h-4" />
                    {selectedEvent.student_email}
                  </div>
                )}
                {selectedEvent.status && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-espresso">Status:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        selectedEvent.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : selectedEvent.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {selectedEvent.status}
                    </span>
                  </div>
                )}
                {selectedEvent.notes && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-espresso mb-1">Notes</p>
                    <p className="text-sm text-warm-taupe">{selectedEvent.notes}</p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2 pt-2">
                {/* Email button — only shows if student email exists */}
                {selectedEvent.student_email && (
                  <Button
                    onClick={handleSendEmail}
                    disabled={isSendingEmail || emailSent}
                    variant="outline"
                    className="w-full border-champagne-gold text-espresso hover:bg-champagne-gold/10 gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    {emailSent
                      ? "✓ Email Sent!"
                      : isSendingEmail
                      ? "Sending..."
                      : "Send Email to Student"}
                  </Button>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDeleteEvent(selectedEvent)}
                    variant="outline"
                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50 gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                  <Button
                    onClick={() => setShowDetailDialog(false)}
                    className="flex-1 bg-rose-gold hover:bg-rose-gold/90 text-white"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}