"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileText,
  Calendar,
  CalendarDays,
  LogOut,
  Menu,
  X,
  Home,
  Star,
  MessageSquare,
  BookOpen,
  Settings,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Availability", href: "/admin/availability", icon: Clock },
  { name: "Calendar", href: "/admin/calendar", icon: CalendarDays },
  { name: "Testimonials", href: "/admin/testimonials", icon: Star },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "Events", href: "/admin/events", icon: CalendarDays },
  { name: "Submissions", href: "/admin/submissions", icon: MessageSquare },
  { name: "Books", href: "/admin/books", icon: BookOpen },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login")
      } else if (session) {
        setIsAuthenticated(true)
        setUserEmail(session.user.email || "")
      }
      setIsLoading(false)
    }
    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session && pathname !== "/admin/login") {
          router.push("/admin/login")
        } else if (session) {
          setIsAuthenticated(true)
          setUserEmail(session.user.email || "")
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [pathname, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pearl-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-gold" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-espresso/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-espresso transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-warm-taupe/20">
            <Link href="/admin" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Ultimate Music Academy"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <div>
                <span className="font-serif text-pearl-white text-sm block">
                  Admin
                </span>
                <span className="text-pearl-white/40 text-xs truncate max-w-[120px] block">
                  {userEmail}
                </span>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-pearl-white hover:bg-warm-taupe/20"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm",
                    isActive
                      ? "bg-rose-gold text-pearl-white"
                      : "text-pearl-white/70 hover:bg-warm-taupe/20 hover:text-pearl-white"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-warm-taupe/20 space-y-1">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-pearl-white/70 hover:bg-warm-taupe/20 hover:text-pearl-white transition-colors text-sm"
            >
              <Home className="h-4 w-4" />
              <span>View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-pearl-white/70 hover:bg-warm-taupe/20 hover:text-pearl-white transition-colors w-full text-sm"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-blush-pink">
          <div className="flex items-center justify-between px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-espresso"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex-1 lg:flex-none">
              <h1 className="font-serif text-xl text-espresso lg:hidden text-center">
                Admin Portal
              </h1>
              <h1 className="font-serif text-xl text-espresso hidden lg:block">
                {navigation.find((n) => n.href === pathname)?.name || "Admin"}
              </h1>
            </div>
            <div className="w-10 lg:hidden" />
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}