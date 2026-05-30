"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/shared/section-heading"
import { WavyDivider } from "@/components/layout/wavy-divider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  Calendar as CalendarIcon,
} from "lucide-react"
import { mockAvailability } from "@/lib/mock-data"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
]

const lessonTypes = [
  { value: "30", label: "30-Minute Lesson" },
  { value: "45", label: "45-Minute Lesson" },
  { value: "60", label: "60-Minute Lesson" },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [lessonType, setLessonType] = useState("30")
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days: (Date | null)[] = []
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }, [currentDate])

  const isDateAvailable = (date: Date) => {
    const dayOfWeek = date.getDay()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (date < today) return false
    
    return mockAvailability.some(
      (a) => a.day_of_week === dayOfWeek && a.is_active
    )
  }

  const getAvailableSlots = (date: Date) => {
    const dayOfWeek = date.getDay()
    const availability = mockAvailability.find(
      (a) => a.day_of_week === dayOfWeek && a.is_active
    )
    
    if (!availability) return []

    const startHour = parseInt(availability.start_time.split(":")[0])
    const endHour = parseInt(availability.end_time.split(":")[0])
    
    return timeSlots.filter((slot) => {
      const hour = parseInt(slot.split(":")[0])
      const isPM = slot.includes("PM") && hour !== 12
      const hour24 = isPM ? hour + 12 : (hour === 12 && slot.includes("AM") ? 0 : hour)
      return hour24 >= startHour && hour24 < endHour
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleDateClick = (date: Date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date)
      setSelectedTime(null)
    }
  }

  const handleTimeClick = (time: string) => {
    setSelectedTime(time)
    setShowBookingDialog(true)
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate booking - replace with actual Supabase integration
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsBooked(true)
  }

  const handleBookingFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const resetBooking = () => {
    setShowBookingDialog(false)
    setIsBooked(false)
    setSelectedDate(null)
    setSelectedTime(null)
    setBookingForm({ name: "", email: "", phone: "" })
  }

  const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : []

  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>
        <PageHeader
          title="Book a Lesson"
          subtitle="Select an available date and time to schedule your vocal lesson."
        />

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <Card className="border-blush-pink/50">
                  <CardHeader className="border-b border-blush-pink/30">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigateMonth("prev")}
                        className="text-espresso hover:text-rose-gold"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <CardTitle className="font-serif text-xl text-espresso">
                        {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigateMonth("next")}
                        className="text-espresso hover:text-rose-gold"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-2">
                      {DAYS.map((day) => (
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
                      {calendarDays.map((date, index) => {
                        if (!date) {
                          return <div key={`empty-${index}`} className="p-2" />
                        }
                        
                        const isAvailable = isDateAvailable(date)
                        const isSelected = selectedDate?.toDateString() === date.toDateString()
                        const isToday = new Date().toDateString() === date.toDateString()
                        
                        return (
                          <button
                            key={date.toISOString()}
                            onClick={() => handleDateClick(date)}
                            disabled={!isAvailable}
                            className={`
                              p-2 rounded-lg text-sm font-medium transition-all
                              ${isAvailable 
                                ? "hover:bg-champagne-gold/20 cursor-pointer" 
                                : "text-gray-300 cursor-not-allowed"
                              }
                              ${isSelected 
                                ? "bg-rose-gold text-white hover:bg-rose-gold" 
                                : ""
                              }
                              ${isToday && !isSelected 
                                ? "ring-2 ring-champagne-gold" 
                                : ""
                              }
                              ${isAvailable && !isSelected 
                                ? "text-espresso" 
                                : ""
                              }
                            `}
                          >
                            {date.getDate()}
                          </button>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Time Slots */}
              <div>
                <Card className="border-blush-pink/50 sticky top-24">
                  <CardHeader className="border-b border-blush-pink/30">
                    <CardTitle className="font-serif text-xl text-espresso">
                      {selectedDate ? (
                        <>
                          {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </>
                      ) : (
                        "Select a Date"
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {selectedDate ? (
                      <>
                        <div className="mb-4">
                          <Label className="text-espresso mb-2 block">
                            Lesson Duration
                          </Label>
                          <Select value={lessonType} onValueChange={setLessonType}>
                            <SelectTrigger className="border-blush-pink">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {lessonTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Label className="text-espresso mb-2 block">
                          Available Times
                        </Label>
                        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                          {availableSlots.length > 0 ? (
                            availableSlots.map((time) => (
                              <Button
                                key={time}
                                variant="outline"
                                size="sm"
                                onClick={() => handleTimeClick(time)}
                                className={`
                                  border-blush-pink text-espresso hover:bg-rose-gold hover:text-white hover:border-rose-gold
                                  ${selectedTime === time ? "bg-rose-gold text-white border-rose-gold" : ""}
                                `}
                              >
                                <Clock className="w-3 h-3 mr-1" />
                                {time}
                              </Button>
                            ))
                          ) : (
                            <p className="col-span-2 text-warm-taupe text-sm text-center py-4">
                              No available times for this date.
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <CalendarIcon className="w-12 h-12 text-blush-pink mx-auto mb-3" />
                        <p className="text-warm-taupe">
                          Click on an available date to see time slots.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 mt-8 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-pearl-white border border-espresso" />
                <span className="text-warm-taupe">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-100" />
                <span className="text-warm-taupe">Unavailable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-rose-gold" />
                <span className="text-warm-taupe">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-pearl-white ring-2 ring-champagne-gold" />
                <span className="text-warm-taupe">Today</span>
              </div>
            </div>
          </div>
        </section>

        <WavyDivider variant="gradient" />

        {/* Info Section */}
        <section className="py-16 bg-blush-pink/20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="font-serif text-2xl text-espresso mb-4">
              Booking Information
            </h3>
            <p className="text-warm-taupe max-w-2xl mx-auto">
              Lessons can be booked up to 4 weeks in advance. If you need to
              reschedule, please give at least 24 hours notice. For your first
              lesson, please arrive 10 minutes early.
            </p>
          </div>
        </section>

        {/* Booking Dialog */}
        <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
          <DialogContent className="sm:max-w-md">
            {isBooked ? (
              <div className="text-center py-6">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <DialogTitle className="font-serif text-2xl text-espresso mb-2">
                  Booking Confirmed!
                </DialogTitle>
                <DialogDescription className="text-warm-taupe mb-4">
                  Your lesson has been scheduled for{" "}
                  {selectedDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {selectedTime}.
                </DialogDescription>
                <p className="text-sm text-warm-taupe mb-6">
                  A confirmation email has been sent to {bookingForm.email}.
                </p>
                <Button
                  onClick={resetBooking}
                  className="bg-rose-gold hover:bg-rose-gold/90 text-white"
                >
                  Done
                </Button>
              </div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="font-serif text-xl text-espresso">
                    Complete Your Booking
                  </DialogTitle>
                  <DialogDescription>
                    {selectedDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at {selectedTime} -{" "}
                    {lessonTypes.find((t) => t.value === lessonType)?.label}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleBookingSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="booking-name">Full Name *</Label>
                    <Input
                      id="booking-name"
                      name="name"
                      value={bookingForm.name}
                      onChange={handleBookingFormChange}
                      required
                      placeholder="Your name"
                      className="border-blush-pink"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="booking-email">Email Address *</Label>
                    <Input
                      id="booking-email"
                      name="email"
                      type="email"
                      value={bookingForm.email}
                      onChange={handleBookingFormChange}
                      required
                      placeholder="your@email.com"
                      className="border-blush-pink"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="booking-phone">Phone Number</Label>
                    <Input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      value={bookingForm.phone}
                      onChange={handleBookingFormChange}
                      placeholder="(555) 123-4567"
                      className="border-blush-pink"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowBookingDialog(false)}
                      className="flex-1 border-espresso text-espresso"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-rose-gold hover:bg-rose-gold/90 text-white"
                    >
                      {isSubmitting ? "Booking..." : "Confirm Booking"}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  )
}
