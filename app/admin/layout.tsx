"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  CalendarDays, 
  LogOut, 
  Menu,
  X,
  Home
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "Events", href: "/admin/events", icon: CalendarDays },
  { name: "Calendar", href: "/admin/calendar", icon: Calendar },
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

  useEffect(() => {
    // Check authentication (replace with Supabase auth check)
    const authStatus = localStorage.getItem("admin_authenticated")
    if (!authStatus && pathname !== "/admin") {
      router.push("/admin")
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    router.push("/admin")
  }

  // Show login page without layout
  if (pathname === "/admin") {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pearl-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-gold"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-pearl-white">
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
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Ultimate Music Academy"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-serif text-pearl-white text-lg">Admin</span>
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
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-rose-gold text-pearl-white"
                      : "text-pearl-white/70 hover:bg-warm-taupe/20 hover:text-pearl-white"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-warm-taupe/20 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-pearl-white/70 hover:bg-warm-taupe/20 hover:text-pearl-white transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-pearl-white/70 hover:bg-warm-taupe/20 hover:text-pearl-white transition-colors w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-pearl-white border-b border-blush-pink">
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
            </div>
            <div className="w-10 lg:hidden" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
