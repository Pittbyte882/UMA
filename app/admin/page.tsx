"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  MessageSquare,
  Star,
  FileText,
  Clock,
  CheckCircle,
  Users,
} from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pendingBookings: 0,
    confirmedBookings: 0,
    pendingTestimonials: 0,
    contactSubmissions: 0,
    consultationRequests: 0,
    publishedPosts: 0,
  })
  const [recentBookings, setRecentBookings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      const [
        { count: pendingBookings },
        { count: confirmedBookings },
        { count: pendingTestimonials },
        { count: contactSubmissions },
        { count: consultationRequests },
        { count: publishedPosts },
      ] = await Promise.all([
        supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "confirmed"),
        supabase.from("testimonials").select("*", { count: "exact", head: true }).eq("is_approved", false),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase.from("consultation_requests").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
      ])

      setStats({
        pendingBookings: pendingBookings || 0,
        confirmedBookings: confirmedBookings || 0,
        pendingTestimonials: pendingTestimonials || 0,
        contactSubmissions: contactSubmissions || 0,
        consultationRequests: consultationRequests || 0,
        publishedPosts: publishedPosts || 0,
      })

      const { data: bookings } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)

      setRecentBookings(bookings || [])
      setIsLoading(false)
    }

    loadStats()
  }, [])

  const statCards = [
    { title: "Pending Bookings", value: stats.pendingBookings, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50", href: "/admin/bookings" },
    { title: "Confirmed Bookings", value: stats.confirmedBookings, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", href: "/admin/bookings" },
    { title: "Pending Testimonials", value: stats.pendingTestimonials, icon: Star, color: "text-rose-600", bg: "bg-rose-50", href: "/admin/testimonials" },
    { title: "Contact Submissions", value: stats.contactSubmissions, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50", href: "/admin/submissions" },
    { title: "Consultation Requests", value: stats.consultationRequests, icon: Users, color: "text-purple-600", bg: "bg-purple-50", href: "/admin/submissions" },
    { title: "Published Posts", value: stats.publishedPosts, icon: FileText, color: "text-espresso", bg: "bg-gray-50", href: "/admin/blog" },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-gold" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-espresso mb-1">Welcome back, Samantha!</h2>
        <p className="text-warm-taupe text-sm">Here's what's happening at Ultimate Music Academy.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mb-3`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <p className="text-2xl font-bold text-espresso">{card.value}</p>
                <p className="text-sm text-warm-taupe mt-1">{card.title}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-serif text-lg text-espresso">Recent Bookings</CardTitle>
          <Link href="/admin/bookings" className="text-sm text-rose-gold hover:underline">View all →</Link>
        </CardHeader>
        <CardContent>
          {recentBookings.length === 0 ? (
            <p className="text-warm-taupe text-sm text-center py-8">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-espresso text-sm">{booking.name}</p>
                    <p className="text-xs text-warm-taupe">{booking.date} at {booking.time} — {booking.lesson_type}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    booking.status === "confirmed" ? "bg-green-100 text-green-700" :
                    booking.status === "cancelled" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg text-espresso">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/admin/blog/new">
              <div className="p-4 rounded-lg border border-dashed border-champagne-gold/50 hover:bg-champagne-gold/5 transition-colors text-center cursor-pointer">
                <FileText className="w-5 h-5 text-rose-gold mx-auto mb-2" />
                <p className="text-xs text-espresso font-medium">New Blog Post</p>
              </div>
            </Link>
            <Link href="/admin/events/new">
              <div className="p-4 rounded-lg border border-dashed border-champagne-gold/50 hover:bg-champagne-gold/5 transition-colors text-center cursor-pointer">
                <Calendar className="w-5 h-5 text-rose-gold mx-auto mb-2" />
                <p className="text-xs text-espresso font-medium">New Event</p>
              </div>
            </Link>
            <Link href="/admin/availability">
              <div className="p-4 rounded-lg border border-dashed border-champagne-gold/50 hover:bg-champagne-gold/5 transition-colors text-center cursor-pointer">
                <Clock className="w-5 h-5 text-rose-gold mx-auto mb-2" />
                <p className="text-xs text-espresso font-medium">Update Availability</p>
              </div>
            </Link>
            <Link href="/admin/testimonials">
              <div className="p-4 rounded-lg border border-dashed border-champagne-gold/50 hover:bg-champagne-gold/5 transition-colors text-center cursor-pointer">
                <Star className="w-5 h-5 text-rose-gold mx-auto mb-2" />
                <p className="text-xs text-espresso font-medium">Review Testimonials</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}