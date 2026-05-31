import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ArrowRight, BookOpen, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

type BookData = {
  id: string
  title: string
  digital_price: number
  physical_price: number
  digital_link: string
  physical_link: string
}

const books = [
  {
    id: "adults",
    dbTitle: "Unlocked",
    title: "Unlocked",
    subtitle: "Giving You the Keys to Sing Like a Pro",
    description:
      "Whether you're a beginner or a working vocalist, Unlocked walks you through the foundations of professional singing — vocal technique, artistry, confidence, and the mindset it takes to perform at your best. Written by Berklee-trained vocal coach Samantha Nelson, this book is the guide every serious singer needs.",
    image: "/images/umaadultsbook.png",
    audience: "For Adult Singers & Vocalists",
    tagline: "Speak. Sing. Be Free.",
  },
  {
    id: "kids",
    dbTitle: "Unlocked Kids",
    title: "Unlocked Kids",
    subtitle: "Giving You the Keys to Sing Like a Superstar",
    description:
      "A vibrant, empowering guide designed specifically for young singers ready to find their voice. Unlocked Kids combines vocal fundamentals with confidence-building exercises, helping children discover their unique sound and fall in love with singing. The perfect first step for any young artist.",
    image: "/images/umakidsbook.png",
    audience: "For Young Singers & Beginners",
    tagline: "Speak. Sing. Be Free.",
  },
]

async function getBookPricing(): Promise<BookData[]> {
  const { data } = await supabase
    .from("books")
    .select("id, title, digital_price, physical_price, digital_link, physical_link")
    .eq("is_active", true)
  return data || []
}

export default async function BooksPage() {
  const pricing = await getBookPricing()

  const getPrice = (dbTitle: string, type: "digital" | "physical") => {
    const book = pricing.find((b) => b.title === dbTitle)
    if (!book) return "Coming Soon"
    const price = type === "digital" ? book.digital_price : book.physical_price
    return price ? `$${price.toFixed(2)}` : "Coming Soon"
  }

  const getLink = (dbTitle: string, type: "digital" | "physical") => {
    const book = pricing.find((b) => b.title === dbTitle)
    if (!book) return "#"
    return type === "digital"
      ? book.digital_link || "#"
      : book.physical_link || "#"
  }

  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>

        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-blush-pink/40 to-pearl-white">
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #D6B98C, transparent)" }}
          />
          <div
            className="absolute top-20 left-1/2 -translate-x-1/2 w-px h-16 opacity-30"
            style={{ background: "linear-gradient(180deg, #D6B98C, transparent)" }}
          />
          <div className="container mx-auto px-4 text-center">
            <p className="text-warm-taupe tracking-[0.3em] uppercase text-xs mb-4">
              By Samantha Nelson
            </p>
            <h1
              className="font-script mb-4"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "#B76E79", lineHeight: 1.1 }}
            >
              The Unlocked Series
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent to-champagne-gold w-24" />
              <span className="text-champagne-gold text-lg">&#10022;</span>
              <div className="h-px bg-gradient-to-l from-transparent to-champagne-gold w-24" />
            </div>
            <p className="text-warm-taupe max-w-xl mx-auto leading-relaxed text-base md:text-lg">
              A book series designed to help every voice — young and grown — find its power, confidence, and freedom.
            </p>
          </div>
        </section>

        {/* Books */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-28">
              {books.map((book, index) => (
                <div
                  key={book.id}
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Book Image */}
                  <div className="relative flex items-center justify-center">
                    <div
                      className="absolute inset-0 rounded-full blur-3xl opacity-20"
                      style={{
                        background:
                          index === 0
                            ? "radial-gradient(circle, #B76E79 0%, transparent 70%)"
                            : "radial-gradient(circle, #D6B98C 0%, transparent 70%)",
                      }}
                    />
                    <div className="relative z-10 hover:scale-105 transition-transform duration-500">
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={420}
                        height={560}
                        className="object-contain drop-shadow-2xl"
                        style={{ maxHeight: "520px", width: "auto" }}
                      />
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="relative">
                    <div
                      className="absolute -top-6 -left-4 w-6 h-6 border-t-2 border-l-2 hidden lg:block"
                      style={{ borderColor: "#D6B98C" }}
                    />

                    <p
                      className="uppercase text-xs tracking-[0.3em] mb-3"
                      style={{ color: "#8A776B" }}
                    >
                      {book.audience}
                    </p>

                    <h2
                      className="font-script mb-1"
                      style={{
                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                        color: "#B76E79",
                        lineHeight: 1.1,
                      }}
                    >
                      {book.title}
                    </h2>

                    <p
                      className="font-serif text-base md:text-lg mb-2"
                      style={{ color: "#6B4F3A" }}
                    >
                      {book.subtitle}
                    </p>

                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="h-px flex-1 max-w-[80px]"
                        style={{
                          background: "linear-gradient(90deg, #D6B98C, transparent)",
                        }}
                      />
                      <span
                        className="text-xs tracking-widest uppercase"
                        style={{ color: "#B76E79" }}
                      >
                        {book.tagline}
                      </span>
                    </div>

                    <p className="text-warm-taupe leading-relaxed mb-8 text-sm md:text-base">
                      {book.description}
                    </p>

                    {/* Purchase Options */}
                    <div className="space-y-3 mb-8">
                      <p
                        className="text-xs uppercase tracking-[0.2em]"
                        style={{ color: "#8A776B" }}
                      >
                        Available As
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {/* Digital */}
                        <Link
                          href={getLink(book.dbTitle, "digital")}
                          target={getLink(book.dbTitle, "digital") !== "#" ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between p-4 border rounded-xl transition-all hover:shadow-md"
                          style={{
                            borderColor: "rgba(214,185,140,0.4)",
                            background: "rgba(249,246,242,0.8)",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center"
                              style={{ background: "rgba(183,110,121,0.1)" }}
                            >
                              <Download
                                className="w-4 h-4"
                                style={{ color: "#B76E79" }}
                              />
                            </div>
                            <div>
                              <p
                                className="text-sm font-medium"
                                style={{ color: "#3D2B1F" }}
                              >
                                Digital Edition
                              </p>
                              <p
                                className="text-xs"
                                style={{ color: "#8A776B" }}
                              >
                                {getPrice(book.dbTitle, "digital")}
                              </p>
                            </div>
                          </div>
                          <ArrowRight
                            className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                            style={{ color: "#B76E79" }}
                          />
                        </Link>

                        {/* Physical */}
                        <Link
                          href={getLink(book.dbTitle, "physical")}
                          target={getLink(book.dbTitle, "physical") !== "#" ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between p-4 border rounded-xl transition-all hover:shadow-md"
                          style={{
                            borderColor: "rgba(214,185,140,0.4)",
                            background: "rgba(249,246,242,0.8)",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center"
                              style={{ background: "rgba(183,110,121,0.1)" }}
                            >
                              <BookOpen
                                className="w-4 h-4"
                                style={{ color: "#B76E79" }}
                              />
                            </div>
                            <div>
                              <p
                                className="text-sm font-medium"
                                style={{ color: "#3D2B1F" }}
                              >
                                Physical Copy
                              </p>
                              <p
                                className="text-xs"
                                style={{ color: "#8A776B" }}
                              >
                                {getPrice(book.dbTitle, "physical")}
                              </p>
                            </div>
                          </div>
                          <ArrowRight
                            className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                            style={{ color: "#B76E79" }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-gradient-to-b from-pearl-white to-blush-pink/30 relative">
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, #D6B98C, transparent)",
            }}
          />
          <div className="container mx-auto px-4 text-center">
            <p className="text-warm-taupe tracking-[0.3em] uppercase text-xs mb-3">
              Not sure where to start?
            </p>
            <h3
              className="font-script mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#B76E79" }}
            >
              Let&apos;s Find Your Path
            </h3>
            <p className="text-warm-taupe max-w-md mx-auto mb-8 text-sm md:text-base">
              Book a free consultation with Samantha and get a personalized
              recommendation for your vocal journey.
            </p>
            <Button
              asChild
              className="btn-rose-gold rounded-md font-medium px-8 py-5 uppercase tracking-luxury text-xs"
            >
              <Link href="/consultation">
                Book a Free Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, #D6B98C, transparent)",
            }}
          />
        </section>
      </main>
      <Footer />
    </div>
  )
}