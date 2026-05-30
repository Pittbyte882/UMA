"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  User,
  Mail,
  Phone,
  Trash2
} from "lucide-react"
import { mockAvailability, mockBookings } from "@/lib/mock-data"

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export default function AdminCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showSlotDialog, setShowSlotDialog] = useState(false)
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [bookings, setBookings] = useState(mockBookings)
  const [availability, setAvailability] = useState(mockAvailability)

  const [newSlot, setNewSlot] = useState({
    startTime: "09:00",
    endTime: "10:00",
    recurring: "none",
  })

  const [newBooking, setNewBooking] = useState({
    studentName: "",
    email: "",
    phone: "",
    time: "",
    service: "Private Lesson",
  })

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    return { daysInMonth, startingDay }
  }

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate)

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const getBookingsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return bookings.filter((b) => b.date === dateStr)
  }

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
  }

  const handleAddSlot = () => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0]
      setAvailability([
        ...availability,
        {
          id: Date.now().toString(),
          date: dateStr,
          startTime: newSlot.startTime,
          endTime: newSlot.endTime,
          isBooked: false,
        },
      ])
      setShowSlotDialog(false)
      setNewSlot({ startTime: "09:00", endTime: "10:00", recurring: "none" })
    }
  }

  const handleAddBooking = () => {
    if (selectedDate && newBooking.time) {
      const dateStr = selectedDate.toISOString().split("T")[0]
      setBookings([
        ...bookings,
        {
          id: Date.now().toString(),
          date: dateStr,
          time: newBooking.time,
          studentName: newBooking.studentName,
          email: newBooking.email,
          phone: newBooking.phone,
          service: newBooking.service,
          status: "confirmed",
        },
      ])
      setShowBookingDialog(false)
      setNewBooking({
        studentName: "",
        email: "",
        phone: "",
        time: "",
        service: "Private Lesson",
      })
    }
  }

  const handleDeleteBooking = (bookingId: string) => {
    setBookings(bookings.filter((b) => b.id !== bookingId))
  }

  const selectedDateBookings = selectedDate
    ? bookings.filter(
        (b) => b.date === selectedDate.toISOString().split("T")[0]
      )
    : []

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-espresso">Calendar Management</h1>
          <p className="text-warm-taupe mt-1">Manage availability and bookings</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedDate(new Date())
              setShowSlotDialog(true)
            }}
            className="border-champagne-gold text-espresso"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Availability
          </Button>
          <Button
            onClick={() => {
              setSelectedDate(new Date())
              setShowBookingDialog(true)
            }}
            className="bg-rose-gold hover:bg-rose-gold/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Booking
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 border-blush-pink/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-serif text-xl text-espresso">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-warm-taupe py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {[...Array(startingDay)].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Days of the month */}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1
                const dayBookings = getBookingsForDay(day)
                const hasBookings = dayBookings.length > 0
                const isSelected =
                  selectedDate?.getDate() === day &&
                  selectedDate?.getMonth() === currentDate.getMonth()

                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`aspect-square p-1 rounded-lg text-sm transition-colors relative ${
                      isToday(day)
                        ? "bg-rose-gold text-white"
                        : isSelected
                        ? "bg-champagne-gold/30 ring-2 ring-champagne-gold"
                        : "hover:bg-blush-pink/30"
                    }`}
                  >
                    <span className="block">{day}</span>
                    {hasBookings && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {dayBookings.slice(0, 3).map((_, idx) => (
                          <span
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${
                              isToday(day) ? "bg-white" : "bg-rose-gold"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Day Details */}
        <Card className="border-blush-pink/50">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-espresso">
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })
                : "Select a Date"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-4">
                {selectedDateBookings.length > 0 ? (
                  selectedDateBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 rounded-lg bg-blush-pink/20 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <Badge className="bg-champagne-gold">{booking.time}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-warm-taupe hover:text-red-500"
                          onClick={() => handleDeleteBooking(booking.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="font-medium text-espresso flex items-center gap-2">
                        <User className="w-4 h-4 text-rose-gold" />
                        {booking.studentName}
                      </p>
                      <p className="text-sm text-warm-taupe flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {booking.email}
                      </p>
                      {booking.phone && (
                        <p className="text-sm text-warm-taupe flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {booking.phone}
                        </p>
                      )}
                      <p className="text-sm text-champagne-gold">{booking.service}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-warm-taupe text-center py-8">
                    No bookings for this date
                  </p>
                )}

                <div className="pt-4 border-t border-blush-pink/50 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setShowSlotDialog(true)}
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    Add Slot
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-rose-gold hover:bg-rose-gold/90"
                    onClick={() => setShowBookingDialog(true)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Book
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-warm-taupe text-center py-8">
                Click a date to view details
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Bookings */}
      <Card className="border-blush-pink/50">
        <CardHeader>
          <CardTitle className="font-serif text-xl text-espresso">Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 rounded-lg bg-blush-pink/10 hover:bg-blush-pink/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-warm-taupe">
                      {new Date(booking.date).toLocaleDateString("en-US", { month: "short" })}
                    </p>
                    <p className="font-serif text-2xl text-espresso">
                      {new Date(booking.date).getDate()}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-espresso">{booking.studentName}</p>
                    <p className="text-sm text-warm-taupe">
                      {booking.time} - {booking.service}
                    </p>
                  </div>
                </div>
                <Badge
                  className={
                    booking.status === "confirmed"
                      ? "bg-green-500"
                      : booking.status === "pending"
                      ? "bg-champagne-gold"
                      : "bg-warm-taupe"
                  }
                >
                  {booking.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Slot Dialog */}
      <Dialog open={showSlotDialog} onOpenChange={setShowSlotDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif text-espresso">Add Availability Slot</DialogTitle>
            <DialogDescription className="text-warm-taupe">
              Add available time slots for {selectedDate?.toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-espresso">Start Time</Label>
                <Input
                  type="time"
                  value={newSlot.startTime}
                  onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                  className="border-blush-pink"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-espresso">End Time</Label>
                <Input
                  type="time"
                  value={newSlot.endTime}
                  onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                  className="border-blush-pink"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-espresso">Recurring</Label>
              <Select
                value={newSlot.recurring}
                onValueChange={(value) => setNewSlot({ ...newSlot, recurring: value })}
              >
                <SelectTrigger className="border-blush-pink">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">One-time</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSlotDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSlot} className="bg-rose-gold hover:bg-rose-gold/90">
              Add Slot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif text-espresso">Add Booking</DialogTitle>
            <DialogDescription className="text-warm-taupe">
              Manually add a booking for {selectedDate?.toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-espresso">Student Name</Label>
              <Input
                value={newBooking.studentName}
                onChange={(e) => setNewBooking({ ...newBooking, studentName: e.target.value })}
                placeholder="John Doe"
                className="border-blush-pink"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-espresso">Email</Label>
              <Input
                type="email"
                value={newBooking.email}
                onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                placeholder="john@example.com"
                className="border-blush-pink"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-espresso">Phone (optional)</Label>
              <Input
                value={newBooking.phone}
                onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                placeholder="(555) 123-4567"
                className="border-blush-pink"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-espresso">Time</Label>
                <Input
                  type="time"
                  value={newBooking.time}
                  onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                  className="border-blush-pink"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-espresso">Service</Label>
                <Select
                  value={newBooking.service}
                  onValueChange={(value) => setNewBooking({ ...newBooking, service: value })}
                >
                  <SelectTrigger className="border-blush-pink">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private Lesson">Private Lesson</SelectItem>
                    <SelectItem value="Youth Program">Youth Program</SelectItem>
                    <SelectItem value="Teen Training">Teen Training</SelectItem>
                    <SelectItem value="Adult Beginner">Adult Beginner</SelectItem>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddBooking} className="bg-rose-gold hover:bg-rose-gold/90">
              Add Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
