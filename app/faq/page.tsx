import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/shared/section-heading"
import { WavyDivider } from "@/components/layout/wavy-divider"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "Do students need previous singing experience?",
        a: "No! Ultimate Music Academy welcomes singers at every stage of their musical journey. At UMA, we believe there is a voice inside everyone just waiting to be unlocked. Whether you're stepping into your very first lesson or you're an experienced vocalist looking to refine your craft, you'll find a supportive environment designed to help you grow. No experience is required — just a willingness to learn and a love for music.",
      },
      {
        q: "What ages do you teach?",
        a: "UMA currently offers private vocal training for Ages 5–12, Ages 13–18, and Adults (19+). Each age group receives personalized, age-appropriate instruction tailored to their vocal development, confidence level, and musical goals.",
      },
      {
        q: "How do I enroll?",
        a: "Getting started is easy. Simply submit an inquiry through our Contact page or schedule a complimentary consultation. We'll discuss your goals, answer any questions, and recommend the program that's right for you or your student.",
      },
      {
        q: "Do you offer trial lessons?",
        a: "While UMA does not currently offer trial lessons, we do provide a complimentary 15-minute consultation for all prospective students and parents. During this consultation, we will discuss the student's goals and experience level, answer questions about the UMA program, determine the best lesson plan and placement, and ensure that UMA is the right fit for the student.",
      },
    ],
  },
  {
    category: "Lessons & Format",
    questions: [
      {
        q: "Are lessons in person or virtual?",
        a: "UMA offers both in-person and virtual lessons. In-person lessons are held in Lake Elsinore, California. Virtual lessons are conducted live online via Zoom. Both formats provide personalized one-on-one instruction and full access to the UMA curriculum.",
      },
      {
        q: "How long are lessons?",
        a: "Lesson lengths vary by age group. Ages 5–12 receive 30-minute lessons, Ages 13–18 receive 45-minute lessons, and Adults (19+) receive 60-minute lessons. Additional coaching sessions may be available for students preparing for auditions, performances, recordings, or special events.",
      },
      {
        q: "How often should students take lessons?",
        a: "For the best results, most students attend lessons once per week. Consistent weekly instruction allows students to build strong vocal habits, develop confidence, and make steady progress over time. Students preparing for auditions, recordings, performances, or professional opportunities may benefit from additional coaching sessions.",
      },
      {
        q: "What should students bring to lessons?",
        a: "Students should bring water, a positive attitude, a notebook or device for taking notes, and practice tracks or sheet music if applicable. For virtual lessons, students should also have a stable internet connection, headphones (recommended), and a quiet practice space.",
      },
    ],
  },
  {
    category: "Curriculum & Teaching",
    questions: [
      {
        q: "What styles of music do you teach?",
        a: "UMA teaches a wide variety of musical styles including Pop, R&B, Gospel, Musical Theatre, Worship, Soul, Jazz Foundations, and Singer-Songwriter Artistry. Lessons are customized to align with each student's interests, goals, and musical preferences.",
      },
      {
        q: "What makes UMA different from other vocal programs?",
        a: "UMA combines professional-level vocal training with mentorship, confidence building, artistry development, and real-world industry insight. Students learn through our signature Wake • Build • Shine™ method — Wake to warm up and strengthen the voice, Build to develop technique, artistry, and mindset, and Shine to perform with confidence and authenticity. Students also benefit from the Unlocked curriculum, created by UMA founder Samantha Nelson-Philipp. At UMA, we focus on developing the whole artist — not just the voice.",
      },
      {
        q: "Is the Unlocked book included with lessons?",
        a: "Yes! All enrolled students receive complimentary access to a digital PDF version of Unlocked: Giving You the Keys to Sing Like a Pro! as part of the UMA curriculum. Students and families who prefer a physical copy may also purchase paperback and Kindle editions. The Unlocked curriculum is integrated into the UMA learning experience and serves as a valuable resource for developing vocal technique, confidence, artistry, and performance skills.",
      },
      {
        q: "Do you teach students who want to sing professionally?",
        a: "Yes! Founder Samantha Nelson-Philipp brings years of professional industry experience as a singer, songwriter, session vocalist, and published songwriter. Students interested in pursuing music professionally may receive guidance in auditions, studio recording, live performance, background and session singing, artist development, stage presence, and music industry professionalism. That said, students do not need professional aspirations to enroll. UMA is equally committed to serving students who simply love music and want to grow in confidence and skill.",
      },
    ],
  },
  {
    category: "Performances & Events",
    questions: [
      {
        q: "Will students have opportunities to perform?",
        a: "Absolutely! UMA offers students the opportunity to perform at the end of each semester through our Spring Showcase, Summer Showcase, Fall Showcase, and Winter Showcase. Performance is an important part of the UMA experience and a key component of our Wake • Build • Shine™ method. While participation is never required, students are strongly encouraged to perform whenever possible. Live performance builds confidence, stage presence, musicianship, and artistry in ways that simply can't be replicated in the practice room.",
      },
    ],
  },
  {
    category: "Policies & Other Questions",
    questions: [
      {
        q: "Does UMA offer sibling discounts?",
        a: "UMA does not currently offer traditional sibling discounts. However, siblings within the same age bracket may choose to participate in lessons together when appropriate. This option allows families to receive instruction for multiple students during a single lesson while creating a fun, collaborative learning environment. Shared lessons are subject to scheduling availability, age compatibility, and individual student goals.",
      },
      {
        q: "Is UMA a record label?",
        a: "No. Ultimate Music Academy is a vocal training and artist development academy — not a record label, management company, or talent agency. While students benefit from Samantha Nelson-Philipp's professional music industry experience and mentorship, enrollment at UMA does not guarantee recording contracts, management representation, or employment opportunities. Our mission is to educate, equip, and empower artists at every stage of their journey.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>
        <PageHeader
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about Ultimate Music Academy."
        />

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-16">
              {faqs.map((section) => (
                <div key={section.category}>
                  {/* Category header */}
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-serif text-2xl text-espresso whitespace-nowrap">
                      {section.category}
                    </h2>
                    <div
                      className="h-px flex-1"
                      style={{
                        background:
                          "linear-gradient(90deg, #D6B98C, transparent)",
                      }}
                    />
                  </div>

                  {/* Questions */}
                  <div className="space-y-4">
                    {section.questions.map((faq, index) => (
                      <FAQItem
                        key={index}
                        question={faq.q}
                        answer={faq.a}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WavyDivider variant="gradient" />

        {/* CTA */}
        <section className="py-16 bg-blush-pink/20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="font-serif text-2xl text-espresso mb-4">
              Still have questions?
            </h3>
            <p className="text-warm-taupe max-w-md mx-auto mb-8">
              We'd love to hear from you. Reach out and we'll get back to you
              within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                className="bg-rose-gold hover:bg-rose-gold/90 text-white gap-2"
              >
                <Link href="/consultation">
                  Book a Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-espresso text-espresso hover:bg-espresso hover:text-pearl-white"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border border-blush-pink/50 rounded-xl overflow-hidden">
      <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-blush-pink/10 transition-colors">
        <span className="font-serif text-lg text-espresso pr-4">{question}</span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform group-open:rotate-45"
          style={{ background: "rgba(183,110,121,0.1)", color: "#B76E79" }}
        >
          +
        </span>
      </summary>
      <div className="px-5 pb-5 pt-2">
        <p className="text-warm-taupe leading-relaxed">{answer}</p>
      </div>
    </details>
  )
}