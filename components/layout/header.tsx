"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/services" },
  { name: "Lessons", href: "/calendar" },
  { name: "Books", href: "/books" },
  { name: "Student Life", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
  { name: "Pricing", href: "/pricing" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Ultimate Music Academy"
              width={140}
              height={140}
              className="h-[140px] w-[140px] object-contain bg-transparent"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-xs font-medium uppercase tracking-luxury transition-colors ${
                  index === 0
                    ? "text-rose-gold"
                    : "text-espresso hover:text-rose-gold"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button
              asChild
              className="btn-rose-gold rounded-md font-medium px-6 py-5 uppercase tracking-luxury text-xs"
            >
              <Link href="/consultation">Book a Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-espresso">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-pearl-white">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/" className="flex items-center justify-center" onClick={() => setIsOpen(false)}>
                  <Image
                    src="/images/logo.png"
                    alt="Ultimate Music Academy"
                    width={120}
                    height={120}
                    className="h-28 w-28 object-contain"
                  />
                </Link>
                <nav className="flex flex-col gap-1">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 text-sm font-medium uppercase tracking-luxury rounded-lg transition-colors ${
                        index === 0
                          ? "text-rose-gold bg-blush-pink/30"
                          : "text-espresso hover:text-rose-gold hover:bg-blush-pink/30"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <Button
                  asChild
                  className="btn-rose-gold rounded-md font-medium px-6 py-5 uppercase tracking-luxury text-xs mt-4"
                >
                  <Link href="/consultation" onClick={() => setIsOpen(false)}>
                    Book a Consultation
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}