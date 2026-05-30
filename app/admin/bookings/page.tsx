"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  AlertCircle,
  RefreshCw,
} from "lucide-react"

type Booking = {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  lesson_type: string
  status: string
  notes: string
  created_at: string
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  released: "bg-gray-100 text-gray-600",
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("date", { ascending: true })
    setBookings(data || [])
    setIsLoading(false)
  }

  const updateBookingStatus = async (id: string, status: string) => {
    setIsUpdating(true)
    try {
      await supabase.from("bookings").update({ status }).eq("id", id)

      // Send email notification to student
      const booking = bookings.find((b) => b.id === id)
      if (booking) {
        await fetch("/api/admin/booking-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: booking.name,
            email: booking.email,
            date: booking.date,
            time: booking.time,
            lessonType: booking.lesson_type,
            status,
          }),
        })
      }

      await loadBookings()
      if (selectedBooking?.id === id) {
        setSelectedBooking((prev) => prev ? { ...prev, status } : null)
      }
    } catch (error) {
      console.error("Error updating booking:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRelease = async (booking: Booking) => {
    if (!confirm(`Release ${booking.name}'s slot back to available? This cannot be undone.`)) return
    await updateBookingStatus(booking.id, "released")
    setShowDetailDialog(false)
  }

  const handleConfirm = async (booking: Booking) => {
    await updateBookingStatus(booking.id, "confirmed")
  }

  const handleCancel = async (booking: Booking) => {
    if (!confirm(`Cancel ${booking.name}'s booking?`)) return
    await updateBookingStatus(booking.id, "cancelled")
    setShowDetailDialog(false)
  }

  const handleSendEmail = async (booking: Booking, type: "reminder" | "custom") => {
    setIsSendingEmail(true)
    try {
      await fetch("/api/admin/booking-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: booking.name,
          email: booking.email,
          date: booking.date,
          time: booking.time,
          lessonType: booking.lesson_type,
          type,
        }),
      })
      setEmailSent(true)
    } catch (error) {
      console.error("Error sending email:", error)
    } finally {
      setIsSendingEmail(false)
    }
  }

  const isPaymentOverdue = (booking: Booking) => {
    if (booking.status !== "pending") return false
    const bookingDate = new Date(booking.date)
    const createdAt = new Date(booking.created_at)
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // If lesson is tomorrow → 1 hour limit
    if (bookingDate.toDateString() === tomorrow.toDateString()) {
      const hoursPassed = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60)
      return hoursPassed > 1
    }
    // Standard → 24 hour limit
    const hoursPassed = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60)
    return hoursPassed > 24
  }

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || b.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    released: bookings.filter((b) => b.status === "released").length,
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-espresso">Bookings</h2>
          <p className="text-warm-taupe text-sm">Manage all lesson bookings</p>
        </div>
        <Button
          onClick={loadBookings}
          variant="outline"
          className="border-espresso text-espresso gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(counts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === status
                ? "bg-rose-gold text-white"
                : "bg-gray-100 text-warm-taupe hover:bg-gray-200"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-taupe" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="pl-10 border-blush-pink"
        />
      </div>

      {/* Overdue alerts */}
      {bookings.filter(isPaymentOverdue).length > 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-800 text-sm">
              {bookings.filter(isPaymentOverdue).length} booking(s) have overdue payment
            </p>
            <p className="text-yellow-700 text-xs mt-1">
              These slots can be released back for others to book.
            </p>
          </div>
        </div>
      )}

      {/* Bookings list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="w-12 h-12 text-blush-pink mx-auto mb-3" />
              <p className="text-warm-taupe">No bookings found.</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((booking) => (
            <Card
              key={booking.id}
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                isPaymentOverdue(booking) ? "border-yellow-300" : "border-blush-pink/30"
              }`}
              onClick={() => {
                setSelectedBooking(booking)
                setEmailSent(false)
                setShowDetailDialog(true)
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-espresso">{booking.name}</p>
                      {isPaymentOverdue(booking) && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                          Payment Overdue
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-warm-taupe">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(booking.date + "T12:00:00").toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {booking.time}
                      </span>
                      <span>{booking.lesson_type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[booking.status] || "bg-gray-100 text-gray-600"}`}>
                      {booking.status}
                    </span>
                    {booking.status === "pending" && (
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          size="sm"
                          onClick={() => handleConfirm(booking)}
                          disabled={isUpdating}
                          className="bg-green-600 hover:bg-green-700 text-white h-8 px-3 text-xs gap-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          Paid
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleRelease(booking)}
                          disabled={isUpdating}
                          variant="outline"
                          className="border-yellow-400 text-yellow-700 hover:bg-yellow-50 h-8 px-3 text-xs gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          Release
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-espresso">Booking Details</DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4 mt-2">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-espresso">{selectedBooking.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[selectedBooking.status]}`}>
                  {selectedBooking.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-warm-taupe">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${selectedBooking.email}`} className="hover:text-rose-gold">
                    {selectedBooking.email}
                  </a>
                </div>
                {selectedBooking.phone && (
                  <div className="flex items-center gap-2 text-warm-taupe">
                    <Phone className="w-4 h-4" />
                    {selectedBooking.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-warm-taupe">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedBooking.date + "T12:00:00").toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2 text-warm-taupe">
                  <Clock className="w-4 h-4" />
                  {selectedBooking.time} — {selectedBooking.lesson_type}
                </div>
                <div className="flex items-center gap-2 text-warm-taupe">
                  <Clock className="w-4 h-4" />
                  Booked: {new Date(selectedBooking.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
                {isPaymentOverdue(selectedBooking) && (
                  <div className="flex items-center gap-2 text-yellow-700 bg-yellow-50 p-2 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    Payment is overdue — slot can be released
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-2">
                {selectedBooking.status === "pending" && (
                  <>
                    <Button
                      onClick={() => handleConfirm(selectedBooking)}
                      disabled={isUpdating}
                      className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                    >
                      <DollarSign className="w-4 h-4" />
                      Mark as Paid & Confirmed
                    </Button>
                    <Button
                      onClick={() => handleRelease(selectedBooking)}
                      disabled={isUpdating}
                      variant="outline"
                      className="w-full border-yellow-400 text-yellow-700 hover:bg-yellow-50 gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Release Slot Back
                    </Button>
                  </>
                )}

                {selectedBooking.status === "confirmed" && (
                  <Button
                    onClick={() => handleCancel(selectedBooking)}
                    disabled={isUpdating}
                    variant="outline"
                    className="w-full border-red-300 text-red-600 hover:bg-red-50 gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel Booking
                  </Button>
                )}

                {/* Email button */}
                <Button
                  onClick={() => handleSendEmail(selectedBooking, "reminder")}
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

                <Button
                  onClick={() => setShowDetailDialog(false)}
                  className="w-full bg-rose-gold hover:bg-rose-gold/90 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}