import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/shared/section-heading"
import { CTASection } from "@/components/sections/cta-section"
import { WavyDivider } from "@/components/layout/wavy-divider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  Calendar,
  Award,
  Users,
  FileCheck,
  Clock,
  Check,
} from "lucide-react"

const programFeatures = [
  {
    icon: BookOpen,
    title: "Curriculum-Aligned",
    description:
      "Our vocal program complements homeschool and charter school curricula, with documentation for portfolio requirements.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Daytime lesson slots perfect for homeschool families, with scheduling that works around your educational calendar.",
  },
  {
    icon: FileCheck,
    title: "Progress Reports",
    description:
      "Regular assessments and detailed progress reports for educational records and portfolio documentation.",
  },
  {
    icon: Award,
    title: "Performance Opportunities",
    description:
      "Recitals and showcases that count toward fine arts requirements and build valuable performance skills.",
  },
]

const programOptions = [
  {
    title: "Individual Lessons",
    description:
      "One-on-one instruction tailored to your child's learning pace and musical interests.",
    features: [
      "Personalized curriculum",
      "Flexible scheduling",
      "Progress documentation",
      "Performance preparation",
    ],
    duration: "30, 45, or 60 minutes",
  },
  {
    title: "Semester Program",
    description:
      "Structured 16-week program with clear goals, assessments, and a culminating recital.",
    features: [
      "Semester syllabus",
      "Mid-term & final assessments",
      "Recital participation",
      "Completion certificate",
    ],
    duration: "Weekly lessons for 16 weeks",
  },
  {
    title: "Music Theory Add-On",
    description:
      "Complement vocal lessons with music theory instruction for a well-rounded music education.",
    features: [
      "Reading sheet music",
      "Music notation",
      "Ear training",
      "Written assignments",
    ],
    duration: "15-minute add-on",
  },
]

export default function CharterSchoolPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>
        <PageHeader
          title="Homeschool & Charter Programs"
          subtitle="Quality vocal education designed to meet the unique needs of homeschool and charter school families."
        />

        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div>
                <p className="text-rose-gold font-medium tracking-wider uppercase text-sm mb-4">
                  Music Education at Home
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-6 text-balance">
                  A Partner in Your Child&apos;s Education
                </h2>
                <p className="text-warm-taupe mb-6 leading-relaxed">
                  As a homeschool or charter school family, you&apos;ve chosen a
                  personalized approach to education. Ultimate Music Academy
                  shares that commitment to individualized learning. Our vocal
                  programs are designed to integrate seamlessly with your
                  educational goals while providing professional-quality music
                  instruction.
                </p>
                <p className="text-warm-taupe mb-8 leading-relaxed">
                  Whether your state requires documentation for fine arts credits
                  or you simply want to nurture your child&apos;s love of music, we
                  provide the structure, expertise, and support you need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    className="bg-rose-gold hover:bg-rose-gold/90 text-white"
                  >
                    <Link href="/consultation">Schedule Consultation</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-espresso text-espresso hover:bg-espresso hover:text-pearl-white"
                  >
                    <Link href="/services">View All Programs</Link>
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/charter-school.jpg"
                    alt="Homeschool music education"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-champagne-gold rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        <WavyDivider variant="gradient" />

        {/* Features */}
        <section className="py-20 md:py-28 bg-blush-pink/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-rose-gold font-medium tracking-wider uppercase text-sm mb-4">
                Why Choose Us
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-4 text-balance">
                Designed for Homeschool Success
              </h2>
              <p className="text-warm-taupe text-lg max-w-2xl mx-auto">
                Our programs address the unique needs of alternative education
                families.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {programFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-full bg-champagne-gold/20 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-rose-gold" />
                  </div>
                  <h3 className="font-serif text-xl text-espresso mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-warm-taupe text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WavyDivider variant="champagne" flip />

        {/* Program Options */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-rose-gold font-medium tracking-wider uppercase text-sm mb-4">
                Program Options
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-4 text-balance">
                Flexible Programs for Your Family
              </h2>
              <p className="text-warm-taupe text-lg max-w-2xl mx-auto">
                Choose the format that best fits your educational approach and
                schedule.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {programOptions.map((program, index) => (
                <Card
                  key={index}
                  className="border-blush-pink/50 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl text-espresso mb-3">
                      {program.title}
                    </h3>
                    <p className="text-warm-taupe text-sm mb-4">
                      {program.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-rose-gold mb-4">
                      <Clock className="w-4 h-4" />
                      {program.duration}
                    </div>
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-warm-taupe"
                        >
                          <Check className="w-4 h-4 text-champagne-gold flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section className="py-16 bg-espresso text-pearl-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <FileCheck className="w-12 h-12 text-champagne-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl mb-4">
                Documentation & Record-Keeping
              </h3>
              <p className="text-pearl-white/80 mb-6">
                We understand the importance of proper documentation for
                homeschool portfolios. All students receive attendance records,
                progress reports, syllabi, and completion certificates as needed
                for your educational records.
              </p>
              <Button
                asChild
                className="bg-champagne-gold text-espresso hover:bg-champagne-gold/90"
              >
                <Link href="/contact">Request More Information</Link>
              </Button>
            </div>
          </div>
        </section>

        <WavyDivider variant="rose-gold" />
        <CTASection variant="secondary" />
      </main>
      <Footer />
    </div>
  )
}
