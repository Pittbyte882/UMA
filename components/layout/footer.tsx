import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Calendar", href: "/calendar" },
  ],
  programs: [
    { name: "Charter School", href: "/charter-school" },
    { name: "Events", href: "/events" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Blog", href: "/blog" },
  ],
  contact: [
    { name: "Contact Us", href: "/contact" },
    { name: "Free Consultation", href: "/consultation" },
  ],
}

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "YouTube", href: "#", icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-espresso text-pearl-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/images/logo.png"
                alt="Ultimate Music Academy"
                width={100}
                height={100}
                className="h-24 w-24 object-contain"
              />
            </Link>
            <h3 className="font-serif text-xl text-pearl-white mb-2">
              Ultimate Music Academy
            </h3>
            <p className="text-champagne-gold text-sm mb-4">by Samantha Nelson</p>
            <p className="text-pearl-white/70 text-sm leading-relaxed">
              Boutique vocal instruction for children and adults. Discover your
              voice in a warm, supportive environment.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-pearl-white/60 hover:text-champagne-gold transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-lg text-champagne-gold mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-pearl-white/70 hover:text-rose-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-serif text-lg text-champagne-gold mb-4">
              Programs
            </h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-pearl-white/70 hover:text-rose-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg text-champagne-gold mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-rose-gold flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@ultimatemusicacademy.com"
                  className="text-pearl-white/70 hover:text-rose-gold transition-colors text-sm"
                >
                  info@ultimatemusicacademy.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-rose-gold flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+14242302179"
                  className="text-pearl-white/70 hover:text-rose-gold transition-colors text-sm"
                >
                  (424) 230-2179
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-rose-gold flex-shrink-0 mt-0.5" />
                <span className="text-pearl-white/70 text-sm">
                  Available for in-person lessons
                </span>
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-2">
              {footerLinks.contact.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-rose-gold hover:text-champagne-gold transition-colors text-sm font-medium"
                >
                  {link.name} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-warm-taupe/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-pearl-white/50 text-sm">
              &copy; {new Date().getFullYear()} Ultimate Music Academy. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-pearl-white/50 hover:text-pearl-white/70 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-pearl-white/50 hover:text-pearl-white/70 text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
