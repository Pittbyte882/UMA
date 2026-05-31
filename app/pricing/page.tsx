import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WavyDivider } from "@/components/layout/wavy-divider"
import { Button } from "@/components/ui/button"
import { Check, Mic, Users, Music, Crown, Star, Calendar, BookOpen } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>

        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #fdf6f0 0%, #f9ece8 50%, #fdf6f0 100%)" }}>
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #D6B98C22 0%, transparent 50%), radial-gradient(circle at 80% 20%, #B76E7922 0%, transparent 50%)" }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #D6B98C, transparent)" }} />

          <div className="container mx-auto px-4 text-center relative z-10">
            <p className="text-warm-taupe tracking-[0.3em] uppercase text-xs mb-4">Ultimate Music Academy</p>
            <h1 className="font-script mb-3" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "#B76E79", lineHeight: 1.1 }}>
              Programs & Lessons
            </h1>
            <p className="uppercase tracking-[0.25em] text-sm font-medium mb-4" style={{ color: "#8A776B" }}>
              Unlock Your Voice. Inspire the World.
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #D6B98C)" }} />
              <Crown className="w-5 h-5" style={{ color: "#D6B98C" }} />
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #D6B98C, transparent)" }} />
            </div>
            <p className="text-warm-taupe max-w-2xl mx-auto leading-relaxed">
              At Ultimate Music Academy, every student follows our signature{" "}
              <span style={{ color: "#B76E79" }} className="font-medium">Wake • Build • Shine™ Method</span>,
              designed to help singers develop strong technique, confidence, artistry, and performance skills.
            </p>
          </div>
        </section>

        {/* Main Programs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">

              {/* Private Vocal Coaching */}
              <div className="rounded-2xl overflow-hidden shadow-xl border"
                style={{ borderColor: "rgba(183,110,121,0.2)", background: "white" }}>
                <div className="p-6 text-center" style={{ background: "linear-gradient(135deg, #B76E79, #c48a92)" }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ background: "rgba(255,255,255,0.2)" }}>
                    <Mic className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="font-serif text-2xl text-white font-bold mb-1">Private Vocal Coaching</h2>
                  <p className="text-white/80 text-sm italic">Personalized One-on-One Training</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 mb-6">
                    {[
                      "Customized lesson plans",
                      "Vocal technique training",
                      "Performance coaching",
                      "Artist development",
                      "Digital access to Unlocked curriculum",
                      "Eligibility for quarterly showcases",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-warm-taupe">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#B76E79" }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    {[
                      { age: "Ages 5–12", duration: "30 Min Weekly", price: "$200" },
                      { age: "Ages 13–18", duration: "45 Min Weekly", price: "$300" },
                      { age: "Adults 19+", duration: "60 Min Weekly", price: "$400" },
                    ].map((tier) => (
                      <div key={tier.age} className="flex items-center justify-between p-3 rounded-xl"
                        style={{ background: "#fdf6f0", border: "1px solid rgba(183,110,121,0.15)" }}>
                        <div>
                          <p className="text-sm font-medium text-espresso">{tier.age}</p>
                          <p className="text-xs text-warm-taupe">{tier.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold" style={{ color: "#B76E79" }}>{tier.price}</p>
                          <p className="text-xs text-warm-taupe">/month</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Group Vocal Workshops */}
              <div className="rounded-2xl overflow-hidden shadow-xl border"
                style={{ borderColor: "rgba(214,185,140,0.3)", background: "white" }}>
                <div className="p-6 text-center" style={{ background: "linear-gradient(135deg, #D6B98C, #c9a87a)" }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ background: "rgba(255,255,255,0.2)" }}>
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="font-serif text-2xl text-white font-bold mb-1">Group Vocal Workshops</h2>
                  <p className="text-white/80 text-sm italic">Learn. Grow. Perform.</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 mb-4">
                    {[
                      "12-week sessions (weekly classes)",
                      "Vocal warmups & technique training",
                      "Performance coaching",
                      "Confidence building",
                      "Digital access to Unlocked curriculum",
                      "Quarterly showcase opportunities",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-warm-taupe">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#D6B98C" }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-4 p-2 rounded-lg text-center text-xs font-medium uppercase tracking-wider"
                    style={{ background: "#B76E79", color: "white" }}>
                    Maximum 8 Students Per Workshop
                  </div>

                  <div className="space-y-3">
                    {[
                      { age: "Ages 5–12", duration: "60 Min Weekly", price: "$149" },
                      { age: "Ages 13–18", duration: "60 Min Weekly", price: "$179" },
                      { age: "Adults 19+", duration: "60 Min Weekly", price: "$199" },
                    ].map((tier) => (
                      <div key={tier.age} className="flex items-center justify-between p-3 rounded-xl"
                        style={{ background: "#fdf6f0", border: "1px solid rgba(214,185,140,0.2)" }}>
                        <div>
                          <p className="text-sm font-medium text-espresso">{tier.age}</p>
                          <p className="text-xs text-warm-taupe">{tier.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold" style={{ color: "#D6B98C" }}>{tier.price}</p>
                          <p className="text-xs text-warm-taupe">/month</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gospel Choir */}
              <div className="rounded-2xl overflow-hidden shadow-xl border"
                style={{ borderColor: "rgba(61,43,31,0.2)", background: "white" }}>
                <div className="p-6 text-center" style={{ background: "linear-gradient(135deg, #3D2B1F, #5a4030)" }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ background: "rgba(255,255,255,0.15)" }}>
                    <Music className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="font-serif text-2xl text-white font-bold mb-1">UMA Gospel Choir & Vocal Ensemble</h2>
                  <p className="text-white/70 text-sm italic">Sing Together. Shine Together.</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 mb-6">
                    {[
                      "Weekly 90-minute rehearsal",
                      "Vocal warmups & harmony training",
                      "Ensemble singing",
                      "Stage presence coaching",
                      "Performance opportunities",
                      "Quarterly showcases",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-warm-taupe">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#3D2B1F" }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl"
                      style={{ background: "#fdf6f0", border: "1px solid rgba(61,43,31,0.15)" }}>
                      <div>
                        <p className="text-sm font-medium text-espresso">Choir-Only Membership</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold" style={{ color: "#3D2B1F" }}>$99</p>
                        <p className="text-xs text-warm-taupe">/month</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl"
                      style={{ background: "#fdf6f0", border: "1px solid rgba(61,43,31,0.15)" }}>
                      <div>
                        <p className="text-sm font-medium text-espresso">Gospel Choir Add-On</p>
                        <p className="text-xs text-warm-taupe">For Current UMA Students</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold" style={{ color: "#3D2B1F" }}>$50</p>
                        <p className="text-xs text-warm-taupe">/month</p>
                      </div>
                    </div>
                    <p className="text-xs text-warm-taupe text-center italic">
                      Available to all private coaching and workshop students.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* One-Time Coaching */}
        <section className="py-16" style={{ background: "linear-gradient(135deg, #fdf6f0, #f9ece8)" }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-10 justify-center">
              <div className="h-px flex-1 max-w-32" style={{ background: "linear-gradient(90deg, transparent, #D6B98C)" }} />
              <p className="uppercase tracking-[0.3em] text-xs font-medium px-4 py-2 rounded-full"
                style={{ background: "#D6B98C", color: "white" }}>
                One-Time Coaching
              </p>
              <div className="h-px flex-1 max-w-32" style={{ background: "linear-gradient(90deg, #D6B98C, transparent)" }} />
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="rounded-2xl p-6 text-center shadow-lg"
                style={{ background: "white", border: "1px solid rgba(183,110,121,0.2)" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(183,110,121,0.1)" }}>
                  <Mic className="w-7 h-7" style={{ color: "#B76E79" }} />
                </div>
                <h3 className="font-serif text-xl text-espresso font-bold mb-1">60-Minute Vocal Coaching Session</h3>
                <p className="text-warm-taupe text-sm mb-4">
                  Perfect for auditions, worship leading, recording preparation, performances and more.
                </p>
                <div className="inline-block px-8 py-3 rounded-xl text-white text-2xl font-bold"
                  style={{ background: "#B76E79" }}>
                  $175
                </div>
              </div>

              <div className="rounded-2xl p-6 text-center shadow-lg"
                style={{ background: "white", border: "1px solid rgba(214,185,140,0.3)" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(214,185,140,0.15)" }}>
                  <Crown className="w-7 h-7" style={{ color: "#D6B98C" }} />
                </div>
                <h3 className="font-serif text-xl text-espresso font-bold mb-1">VIP Vocal Intensive</h3>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#D6B98C" }}>90-Minute Deep Dive</p>
                <p className="text-warm-taupe text-sm mb-4">
                  Vocal coaching, song interpretation, performance coaching and artist development guidance with a personalized action plan.
                </p>
                <div className="inline-block px-8 py-3 rounded-xl text-white text-2xl font-bold"
                  style={{ background: "#D6B98C" }}>
                  $250
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom 3 Info Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">

              {/* Unlocked Curriculum */}
              <div className="rounded-2xl p-6 shadow-lg" style={{ background: "white", border: "1px solid rgba(214,185,140,0.2)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(183,110,121,0.1)" }}>
                    <BookOpen className="w-5 h-5" style={{ color: "#B76E79" }} />
                  </div>
                  <h3 className="font-serif text-lg text-espresso font-bold uppercase tracking-wide">The Unlocked Curriculum</h3>
                </div>
                <p className="text-warm-taupe text-sm mb-4">
                  Created by Samantha Nelson, Unlocked is the official curriculum used throughout UMA.
                </p>
                <div className="grid grid-cols-2 gap-1 mb-4">
                  {["Breath Support", "Pitch", "Rhythm", "Tone", "Belting", "Range", "Confidence", "Performance", "Songwriting", "Artist Development"].map((item) => (
                    <div key={item} className="flex items-center gap-1 text-xs text-warm-taupe">
                      <Check className="w-3 h-3 flex-shrink-0" style={{ color: "#B76E79" }} />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t" style={{ borderColor: "rgba(214,185,140,0.2)" }}>
                  <p className="text-xs text-warm-taupe uppercase tracking-wider mb-2 font-medium">Included with</p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(183,110,121,0.1)", color: "#B76E79" }}>Private Coaching</span>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(214,185,140,0.15)", color: "#8A776B" }}>Vocal Workshops</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="text-center p-2 rounded-lg" style={{ background: "#fdf6f0" }}>
                      <p className="text-xs text-warm-taupe">Physical Book</p>
                      <p className="font-bold text-sm" style={{ color: "#B76E79" }}>$24.99</p>
                    </div>
                    <div className="text-center p-2 rounded-lg" style={{ background: "#fdf6f0" }}>
                      <p className="text-xs text-warm-taupe">Digital PDF</p>
                      <p className="font-bold text-sm" style={{ color: "#B76E79" }}>$14.99</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quarterly Showcases */}
              <div className="rounded-2xl p-6 shadow-lg" style={{ background: "white", border: "1px solid rgba(214,185,140,0.2)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(214,185,140,0.15)" }}>
                    <Star className="w-5 h-5" style={{ color: "#D6B98C" }} />
                  </div>
                  <h3 className="font-serif text-lg text-espresso font-bold uppercase tracking-wide">Quarterly UMA Showcases</h3>
                </div>
                <p className="text-warm-taupe text-sm mb-4">
                  Students have the opportunity to perform throughout the year at our signature showcases.
                </p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[
                    { season: "🌸", name: "March" },
                    { season: "☀️", name: "June" },
                    { season: "🍂", name: "September" },
                    { season: "❄️", name: "December" },
                  ].map((s) => (
                    <div key={s.name} className="text-center p-2 rounded-lg" style={{ background: "#fdf6f0" }}>
                      <p className="text-lg">{s.season}</p>
                      <p className="text-xs text-warm-taupe font-medium">{s.name}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-warm-taupe italic mb-4">
                  Featuring Private Students, Workshop Students & Gospel Choir Members
                </p>
                <div className="p-3 rounded-xl text-center mb-3" style={{ background: "rgba(183,110,121,0.08)" }}>
                  <p className="text-xs uppercase tracking-wider text-warm-taupe mb-1">Showcase Participation Fee</p>
                  <p className="text-xl font-bold" style={{ color: "#B76E79" }}>$35–$75 <span className="text-sm font-normal">per performer</span></p>
                  <p className="text-xs text-warm-taupe">(Varies based on venue and production costs)</p>
                </div>
                <div className="flex gap-2 text-xs text-warm-taupe">
                  <div className="flex-1 p-2 rounded-lg text-center" style={{ background: "#fdf6f0" }}>
                    <p>Each performer receives</p>
                    <p className="font-medium text-espresso">2 complimentary guest tickets</p>
                  </div>
                  <div className="flex-1 p-2 rounded-lg text-center" style={{ background: "#fdf6f0" }}>
                    <p>Additional guests</p>
                    <p className="font-medium text-espresso">$25 each</p>
                  </div>
                </div>
              </div>

              {/* Free Consultation */}
              <div className="rounded-2xl p-6 shadow-lg" style={{ background: "white", border: "1px solid rgba(214,185,140,0.2)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(61,43,31,0.08)" }}>
                    <Calendar className="w-5 h-5" style={{ color: "#3D2B1F" }} />
                  </div>
                  <h3 className="font-serif text-lg text-espresso font-bold uppercase tracking-wide">Free Vocal Discovery Consultation</h3>
                </div>
                <p className="text-warm-taupe text-sm mb-4">
                  Not sure which program is right for you? Schedule a complimentary consultation to discuss your goals and receive a personalized recommendation.
                </p>
                <div className="text-center mb-4">
                  <p className="text-4xl font-bold" style={{ color: "#B76E79" }}>FREE</p>
                  <p className="text-warm-taupe text-sm">15 Minutes</p>
                </div>
                <ul className="space-y-2 mb-6">
                  {["Goal Assessment", "Brief Vocal Evaluation", "Program Recommendations", "Q&A Session"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-warm-taupe">
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#B76E79" }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full text-white font-medium uppercase tracking-wider"
                  style={{ background: "#B76E79" }}>
                  <Link href="/consultation">Book Your Free Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #3D2B1F 0%, #5a4030 100%)" }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #D6B98C 0%, transparent 60%)" }} />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="font-script text-white mb-3" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              Ready to Wake, Build, Shine?
            </h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Take the first step toward discovering your voice. Book your free consultation today.
            </p>
            <Button asChild size="lg" className="font-medium uppercase tracking-wider px-10 py-6 text-white"
              style={{ background: "#B76E79" }}>
              <Link href="/consultation">Book Your Free Consultation Today!</Link>
            </Button>
            <div className="flex flex-wrap justify-center gap-8 mt-10 text-white/60 text-sm">
              <span>📍 Lake Elsinore, California</span>
              <span>🌐 In-Person & Online Lessons Available</span>
              <span>🌐 ultimatemusicacademy.com</span>
            </div>
          </div>
        </section>

        <WavyDivider variant="gradient" />
      </main>
      <Footer />
    </div>
  )
}
