import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/shared/section-heading"
import { CTASection } from "@/components/sections/cta-section"
import { WavyDivider } from "@/components/layout/wavy-divider"
import { MarbleAccent } from "@/components/shared/marble-accent"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

export const revalidate = 0

const eventTypeColors: Record<string, string> = {
  Recital: "bg-rose-gold text-white",
  Workshop: "bg-champagne-gold text-espresso",
  Masterclass: "bg-espresso text-pearl-white",
  "Open House": "bg-blush-pink text-espresso",
  Competition: "bg-purple-500 text-white",
  "Community Event": "bg-green-500 text-white",
}

function formatDate(dateString: string) {
  if (!dateString || dateString === "TBD") {
    return { day: "TBD", date: "", month: "", year: "", time: "TBD" }
  }
  const date = new Date(dateString + "T12:00:00")
  return {
    day: date.toLocaleDateString("en-US", { weekday: "long" }),
    date: date.getDate(),
    month: date.toLocaleDateString("en-US", { month: "long" }),
    year: date.getFullYear(),
    time: date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  }
}

export default async function EventsPage() {
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true })

  const allEvents = events || []
  const featuredEvent = allEvents[0] || null
  const otherEvents = allEvents.slice(1)

  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>
        <PageHeader
          title="Events & Performances"
          subtitle="Recitals, workshops, masterclasses, and more. Join our vibrant musical community."
        />

        {/* Featured Event */}
        {featuredEvent && (
          <section className="py-20 md:py-28 relative overflow-hidden">
            <MarbleAccent variant="soft-corner" size="lg" opacity={0.25} flip />
            <div className="container mx-auto px-4 relative z-10">
              <div className="mb-8">
                <p className="text-rose-gold font-medium tracking-wider uppercase text-sm mb-2">
                  Featured Event
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-espresso">
                  Don&apos;t Miss Our Next Big Event
                </h2>
              </div>

              <Card className="overflow-hidden border-none shadow-xl">
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto min-h-[500px]" style={{ background: "#fdf6f0" }}>
                    <Image
                      src={featuredEvent.image || "/images/events/coming-soon.svg"}
                      alt={featuredEvent.title}
                      fill
                      className="object-contain"
                    />
                    {featuredEvent.type && (
                      <div className="absolute top-4 left-4">
                        <Badge className={eventTypeColors[featuredEvent.type] || "bg-rose-gold text-white"}>
                          {featuredEvent.type}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="font-serif text-2xl md:text-3xl text-espresso mb-4">
                      {featuredEvent.title}
                    </h3>
                    <p className="text-warm-taupe mb-6 leading-relaxed">
                      {featuredEvent.description}
                    </p>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-warm-taupe">
                        <Calendar className="w-5 h-5 text-rose-gold" />
                        <span>
                          {featuredEvent.date && featuredEvent.date !== "TBD"
                            ? `${formatDate(featuredEvent.date).day}, ${formatDate(featuredEvent.date).month} ${formatDate(featuredEvent.date).date}, ${formatDate(featuredEvent.date).year}`
                            : "Date TBD"
                          }
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-warm-taupe">
                        <Clock className="w-5 h-5 text-rose-gold" />
                        <span>{featuredEvent.time || "Time TBD"}</span>
                      </div>
                      <div className="flex items-start gap-3 text-warm-taupe">
                        <MapPin className="w-5 h-5 text-rose-gold flex-shrink-0 mt-0.5" />
                        <span>{featuredEvent.location || "Location TBD"}</span>
                      </div>
                    </div>
                    <Button
                      asChild
                      className="bg-rose-gold hover:bg-rose-gold/90 text-white w-fit"
                    >
                      <Link href="/contact">RSVP for This Event</Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        )}

        <WavyDivider variant="gradient" />

        {/* All Upcoming Events */}
        {otherEvents.length > 0 && (
          <section className="py-20 md:py-28 bg-blush-pink/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <p className="text-rose-gold font-medium tracking-wider uppercase text-sm mb-4">
                  Upcoming
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-4 text-balance">
                  All Upcoming Events
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {otherEvents.map((event) => {
                  const dateInfo = formatDate(event.date)
                  return (
                    <Card
                      key={event.id}
                      className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow bg-white group"
                    >
                      <div className="relative h-48">
                        <Image
                          src={event.image || "/images/events/coming-soon.svg"}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
                        {event.type && (
                          <div className="absolute top-4 left-4">
                            <Badge className={eventTypeColors[event.type] || "bg-rose-gold text-white"}>
                              {event.type}
                            </Badge>
                          </div>
                        )}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="font-serif text-xl text-pearl-white">
                            {event.title}
                          </h3>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <p className="text-warm-taupe text-sm mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-warm-taupe">
                            <Calendar className="w-4 h-4 text-rose-gold" />
                            <span>
                              {event.date && event.date !== "TBD"
                                ? `${dateInfo.month} ${dateInfo.date}, ${dateInfo.year} at ${dateInfo.time}`
                                : "Date TBD"
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-warm-taupe">
                            <MapPin className="w-4 h-4 text-rose-gold" />
                            <span className="truncate">{event.location || "Location TBD"}</span>
                          </div>
                        </div>
                        <Button
                          asChild
                          variant="ghost"
                          className="text-rose-gold hover:text-rose-gold/80 hover:bg-rose-gold/10 p-0 h-auto"
                        >
                          <Link href="/contact">
                            Learn More <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        <WavyDivider variant="champagne" flip />

        {/* Past Events */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-rose-gold font-medium tracking-wider uppercase text-sm mb-4">
                Memories
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-4 text-balance">
                Past Event Highlights
              </h2>
              <p className="text-warm-taupe text-lg max-w-2xl mx-auto">
                A glimpse into the magical moments from our previous events.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "/images/IMG_0054.jpeg",
                "/images/IMG_0055.jpeg",
                "/images/IMG_0056.jpeg",
              ].map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer"
                >
                  <Image
                    src={src}
                    alt="Past event"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/40 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-espresso text-pearl-white">
          <div className="container mx-auto px-4 text-center">
            <h3 className="font-serif text-2xl mb-4">Stay in the Loop</h3>
            <p className="text-pearl-white/70 max-w-2xl mx-auto mb-6">
              Be the first to know about upcoming events, workshops, and
              performance opportunities. Follow us on social media or contact us
              to join our mailing list.
            </p>
            <Button
              asChild
              className="bg-champagne-gold text-espresso hover:bg-champagne-gold/90"
            >
              <Link href="/contact">Join Our Mailing List</Link>
            </Button>
          </div>
        </section>

        <WavyDivider variant="rose-gold" />
        <CTASection variant="secondary" />
      </main>
      <Footer />
    </div>
  )
}