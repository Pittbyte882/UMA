import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>
        <section className="relative min-h-screen overflow-hidden pt-20">

          {/* Marble background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/Marble_Back.png"
              alt=""
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-pearl-white/40" />
          </div>

          <div className="container mx-auto px-4 relative z-10 py-16">
            <div className="grid lg:grid-cols-2 gap-12 min-h-[calc(100vh-80px)] items-center">

              {/* Content — framed card */}
              <div
                className="relative py-12 px-10 lg:px-12"
                style={{
                  background: "rgba(249,246,242,0.82)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(214,185,140,0.35)",
                  boxShadow: "0 8px 40px rgba(183,110,121,0.08), inset 0 0 0 1px rgba(255,255,255,0.6)",
                }}
              >
                {/* Gold corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-champagne-gold" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-champagne-gold" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-champagne-gold" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-champagne-gold" />

                {/* Header */}
                <div className="mb-8">
                  <p className="text-warm-taupe tracking-[0.3em] uppercase text-xs mb-2">
                    About
                  </p>
                  <h1 className="font-script text-6xl md:text-7xl lg:text-8xl text-rose-gold mb-4">
                    Samantha
                  </h1>
                  <div className="flex items-center  ml-2">
                    <div className="h-px bg-gradient-to-r from-rose-gold to-champagne-gold flex-1 max-w-md" />
                    <span className="text-champagne-gold text-lg">&#10022;</span>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-4 text-warm-taupe leading-relaxed text-sm md:text-base mb-8">
                  <p>
                    Samantha Nelson is a singer, songwriter, vocal coach, and creative
                    visionary with a passion for helping artists unlock their full potential — both
                    on and off the stage.
                  </p>
                  <p>
                    A graduate of Berklee College of Music, Samantha has spent years working
                    professionally throughout the music industry as a session singer, background
                    vocalist, songwriter, and creative collaborator. Her career has included work
                    with artists such as <strong>Demi Lovato, Kanye West, Kirk Franklin, Keith Urban,
                    Tyler, the Creator, Deborah Cox, Sean Kingston, and Duran Duran</strong>, among others.
                  </p>
                  <p>
                    In addition to performing, Samantha is also a published songwriter with
                    Universal Music Publishing Group, where she has developed music for
                    major artists and projects across multiple genres.
                  </p>
                  <p>
                    Through years of performing professionally, Samantha discovered that true
                    artistry is about more than just talent — it&apos;s about confidence, discipline,
                    mindset, emotional connection, and learning how to use your voice authentically.
                    That realization became the inspiration behind Ultimate Music Academy.
                  </p>
                  <p>
                    Samantha is also the author of{" "}
                    <em className="text-espresso font-medium">
                      Unlocked: Giving You the Keys to Sing Like a Pro!
                    </em>
                    , a book series designed to help aspiring vocalists understand the foundations
                    of professional singing, artistry, and vocal confidence.
                  </p>
                  <p>
                    Whether working with young beginners, aspiring professionals, worship leaders,
                    or seasoned vocalists, Samantha believes every student has something valuable
                    to say — and that with the right guidance, every voice can be unlocked.
                  </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    className="btn-rose-gold rounded-md font-medium px-6 py-5 uppercase tracking-luxury text-xs"
                  >
                    <Link href="/consultation">Book a Consultation →</Link>
                  </Button>
                  <Button
                    asChild
                    className="btn-rose-gold rounded-md font-medium px-6 py-5 uppercase tracking-luxury text-xs"
                  >
                    <Link href="/videos">Videos of Samantha</Link>
                  </Button>
                </div>

              </div>{/* end content card */}

              {/* Samantha photo — circular framed, centered */}
              <div className="relative hidden lg:flex items-center justify-center h-full" style={{ marginTop: "-40px" }}>
                <div className="relative flex flex-col items-center gap-6">

                  {/* Outer gold ring */}
                  <div
                    className="relative rounded-full p-1"
                    style={{
                      background: "linear-gradient(135deg, #D6B98C, #B76E79, #D6B98C)",
                      boxShadow: "0 0 40px rgba(214,185,140,0.3), 0 0 80px rgba(183,110,121,0.15)",
                    }}
                  >
                    {/* Inner white ring */}
                    <div className="rounded-full p-1 bg-pearl-white">
                      {/* Photo circle */}
                      <div
                        className="relative overflow-hidden rounded-full"
                        style={{ width: "480px", height: "580px" }}
                      >
                        <Image
                          src="/images/samantha-about.png"
                          alt="Samantha Nelson"
                          fill
                          className="object-cover object-top"
                          priority
                        />
                      </div>
                    </div>
                  </div>

                  {/* Name tag below circle */}
                  <div className="text-center">
                    <div
                      className="h-px w-16 mx-auto mb-3"
                      style={{ background: "linear-gradient(90deg, transparent, #D6B98C, transparent)" }}
                    />
                    <p className="font-script text-3xl text-rose-gold">
                      Samantha Nelson
                    </p>
                    <p
                      className="uppercase text-xs mt-1"
                      style={{ color: "#8A776B", letterSpacing: "0.2em" }}
                    >
                      Vocal Coach · Berklee Graduate · Songwriter
                    </p>
                    <div
                      className="h-px w-16 mx-auto mt-3"
                      style={{ background: "linear-gradient(90deg, transparent, #D6B98C, transparent)" }}
                    />
                  </div>

                </div>
              </div>

            </div>{/* end grid */}
          </div>{/* end container */}

          {/* Bottom gold line accent */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px z-10"
            style={{ background: "linear-gradient(90deg, transparent, #D6B98C, transparent)" }}
          />

        </section>

        {/* Mobile Image */}
        <section className="lg:hidden relative py-12 bg-gradient-to-b from-blush-pink/30 to-pearl-white">
          <div className="container mx-auto px-4">
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              <Image
                src="/images/samantha-about.png"
                alt="Samantha Nelson"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}