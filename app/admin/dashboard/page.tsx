"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CalendarDays, Calendar, Users, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"

const stats = [
  { name: "Blog Posts", value: "12", icon: FileText, href: "/admin/blog", change: "+2 this month" },
  { name: "Upcoming Events", value: "5", icon: CalendarDays, href: "/admin/events", change: "Next: Spring Recital" },
  { name: "Bookings This Week", value: "28", icon: Calendar, href: "/admin/calendar", change: "+8 from last week" },
  { name: "Active Students", value: "47", icon: Users, href: "#", change: "+3 new enrollments" },
]

const recentActivity = [
  { type: "booking", message: "New lesson booking from Sarah M.", time: "2 hours ago" },
  { type: "blog", message: "Blog post 'Warm-Up Exercises' published", time: "1 day ago" },
  { type: "event", message: "Spring Recital registration opened", time: "2 days ago" },
  { type: "booking", message: "Consultation request from John D.", time: "3 days ago" },
]

const quickActions = [
  { name: "New Blog Post", href: "/admin/blog/new", icon: FileText },
  { name: "Add Event", href: "/admin/events/new", icon: CalendarDays },
  { name: "View Calendar", href: "/admin/calendar", icon: Calendar },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-3xl text-espresso">Dashboard</h1>
        <p className="text-warm-taupe mt-1">Welcome back to Ultimate Music Academy admin portal.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow border-blush-pink/50 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-warm-taupe">{stat.name}</p>
                    <p className="font-serif text-3xl text-espresso mt-1">{stat.value}</p>
                    <p className="text-xs text-rose-gold mt-1">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-champagne-gold/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-rose-gold" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="border-blush-pink/50">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-espresso">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-lg bg-blush-pink/20 hover:bg-blush-pink/40 transition-colors"
              >
                <action.icon className="w-5 h-5 text-rose-gold" />
                <span className="text-espresso font-medium">{action.name}</span>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-blush-pink/50">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-espresso">Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-blush-pink/30 last:border-0 last:pb-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === "booking" ? "bg-champagne-gold/20" :
                    activity.type === "blog" ? "bg-rose-gold/20" :
                    "bg-blush-pink/40"
                  }`}>
                    {activity.type === "booking" ? <Calendar className="w-5 h-5 text-champagne-gold" /> :
                     activity.type === "blog" ? <FileText className="w-5 h-5 text-rose-gold" /> :
                     <CalendarDays className="w-5 h-5 text-warm-taupe" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-espresso">{activity.message}</p>
                    <p className="text-sm text-warm-taupe">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Preview */}
      <Card className="border-blush-pink/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif text-xl text-espresso">Site Analytics</CardTitle>
              <CardDescription>Overview of your website performance</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-rose-gold">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">+12% this month</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-blush-pink/20">
              <Eye className="w-8 h-8 text-rose-gold mx-auto mb-2" />
              <p className="font-serif text-2xl text-espresso">1,247</p>
              <p className="text-sm text-warm-taupe">Page Views</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-champagne-gold/20">
              <Users className="w-8 h-8 text-champagne-gold mx-auto mb-2" />
              <p className="font-serif text-2xl text-espresso">89</p>
              <p className="text-sm text-warm-taupe">Unique Visitors</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-blush-pink/20">
              <Calendar className="w-8 h-8 text-rose-gold mx-auto mb-2" />
              <p className="font-serif text-2xl text-espresso">15</p>
              <p className="text-sm text-warm-taupe">Booking Requests</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
