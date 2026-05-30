import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTASection } from "@/components/sections/cta-section"
import { WavyDivider } from "@/components/layout/wavy-divider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ArrowLeft, Share2, ArrowRight } from "lucide-react"
import { mockBlogPosts } from "@/lib/mock-data"

const blogImages: Record<string, string> = {
  "1": "/images/blog/warm-up.jpg",
  "2": "/images/blog/child-singing.jpg",
  "3": "/images/blog/vocal-range.jpg",
}

// Full blog content for demo
const blogContent: Record<string, string> = {
  "vocal-warm-up-exercises-beginners": `
    <p>Starting your vocal journey with proper warm-up exercises is essential for building a healthy, sustainable singing practice. Just as athletes stretch before a workout, singers need to prepare their vocal cords for the demands of singing.</p>
    
    <h2>Why Warm-Ups Matter</h2>
    <p>Your vocal cords are delicate muscles that need careful preparation. Jumping straight into demanding songs without warming up can lead to strain, fatigue, and even injury over time. A good warm-up routine increases blood flow to your vocal muscles, improves flexibility, and helps you achieve a fuller, more resonant sound.</p>
    
    <h2>5 Essential Warm-Up Exercises</h2>
    
    <h3>1. Lip Trills</h3>
    <p>Start by relaxing your lips and blowing air through them to create a "brrr" sound. Glide up and down your range while maintaining the trill. This exercise relaxes tension in your lips and jaw while gently engaging your breath support.</p>
    
    <h3>2. Humming</h3>
    <p>Close your mouth gently and hum a comfortable pitch. Feel the vibration in your face and chest. Slowly move up and down through your range. Humming warms up your voice without strain and helps you find your resonance.</p>
    
    <h3>3. Sirens</h3>
    <p>Using an "oo" or "ee" vowel, glide from your lowest comfortable note to your highest, like a siren. This stretches your vocal cords through their full range and helps identify any areas of tension.</p>
    
    <h3>4. Five-Note Scales</h3>
    <p>Sing "mah-may-mee-moh-moo" on a five-note ascending and descending scale. Start in a comfortable range and gradually move higher and lower. This exercise works on vowel consistency and smooth transitions.</p>
    
    <h3>5. Tongue Twisters</h3>
    <p>Speak and then sing simple tongue twisters like "red leather, yellow leather" or "unique New York." This warms up your articulation muscles and prepares you for clear diction while singing.</p>
    
    <h2>Tips for Success</h2>
    <ul>
      <li>Spend at least 10-15 minutes warming up before any singing session</li>
      <li>Start gently and gradually increase intensity</li>
      <li>Stay hydrated—drink room temperature water throughout</li>
      <li>Listen to your body and stop if you feel any pain or strain</li>
      <li>Be consistent—daily warm-ups lead to the best results</li>
    </ul>
    
    <p>Remember, these exercises are just the beginning. As you progress in your vocal journey, your instructor can introduce more advanced techniques tailored to your specific voice and goals.</p>
  `,
  "help-child-develop-love-singing": `
    <p>Music is a gift that can enrich your child's life in countless ways. As a parent, you play a crucial role in nurturing their musical interests. Here are practical strategies to help your child develop a genuine love for singing.</p>
    
    <h2>Create a Musical Home Environment</h2>
    <p>Children absorb the atmosphere around them. Fill your home with diverse music—play different genres during daily activities, sing together during car rides, and make music a natural part of family life rather than a chore or structured activity.</p>
    
    <h2>Sing Together, Often</h2>
    <p>Don't worry about being a "good" singer yourself. Children benefit more from seeing adults enjoy singing than from perfect technique. Sing during bath time, while cooking, or before bed. Make up silly songs about daily routines. The joy matters more than the pitch.</p>
    
    <h2>Follow Their Interests</h2>
    <p>Let your child's preferences guide their musical journey. If they love Disney songs, start there. If they're obsessed with a particular artist, explore that music together. Building on existing enthusiasm creates lasting engagement.</p>
    
    <h2>Praise Effort, Not Just Results</h2>
    <p>Focus your encouragement on their practice, creativity, and improvement rather than just performances. Saying "I love how you kept trying that difficult part" builds resilience better than "That was perfect!"</p>
    
    <h2>Make Practice Fun</h2>
    <ul>
      <li>Turn vocal exercises into games</li>
      <li>Use props and movement during practice</li>
      <li>Record them and let them hear their progress</li>
      <li>Create a special "practice space" they can personalize</li>
      <li>Keep sessions short—10-15 minutes for young children</li>
    </ul>
    
    <h2>Provide Performance Opportunities</h2>
    <p>Start small and low-pressure—singing for grandparents over video call, performing for stuffed animals, or family karaoke nights. Gradually expand to more formal settings as their confidence grows. Never force performances; always let them choose their comfort level.</p>
    
    <h2>Be Patient with Plateaus</h2>
    <p>Every child's musical development includes periods of rapid growth and apparent standstill. During slower times, maintain the routine without adding pressure. Their brain is often processing and consolidating skills during these phases.</p>
    
    <h2>Consider Professional Lessons</h2>
    <p>When the time is right, vocal lessons with a qualified instructor can accelerate their development while ensuring they learn healthy technique. Look for teachers who specialize in working with children and prioritize fun alongside fundamentals.</p>
    
    <p>Remember, the goal isn't to create a professional singer (unless that's their dream), but to give your child a lifelong source of joy, self-expression, and confidence through music.</p>
  `,
  "understanding-vocal-range": `
    <p>Understanding your vocal range is one of the most fundamental aspects of your singing journey. It helps you select appropriate songs, develop your technique strategically, and appreciate your unique vocal instrument.</p>
    
    <h2>What Is Vocal Range?</h2>
    <p>Your vocal range is the span between the lowest and highest notes you can sing. It's typically measured in octaves and semitones. While range is important, it's just one aspect of your voice—quality, tone, and control matter just as much.</p>
    
    <h2>The Main Voice Types</h2>
    
    <h3>Female Voices</h3>
    <ul>
      <li><strong>Soprano:</strong> The highest female voice type, typically ranging from C4 to C6</li>
      <li><strong>Mezzo-Soprano:</strong> The middle female voice, usually A3 to A5</li>
      <li><strong>Alto/Contralto:</strong> The lowest female voice, approximately F3 to F5</li>
    </ul>
    
    <h3>Male Voices</h3>
    <ul>
      <li><strong>Tenor:</strong> The highest common male voice type, typically C3 to C5</li>
      <li><strong>Baritone:</strong> The middle male voice, usually A2 to A4</li>
      <li><strong>Bass:</strong> The lowest male voice, approximately E2 to E4</li>
    </ul>
    
    <h2>How to Find Your Range</h2>
    <p>Finding your range is simple but should be done carefully:</p>
    <ol>
      <li>Warm up your voice thoroughly first</li>
      <li>Start at a comfortable middle pitch</li>
      <li>Gradually descend, note by note, until you can no longer produce a clear tone</li>
      <li>Note this lowest comfortable pitch</li>
      <li>Return to the middle and ascend until you reach your comfortable ceiling</li>
      <li>The span between these notes is your current usable range</li>
    </ol>
    
    <h2>Chest Voice vs. Head Voice</h2>
    <p>You likely have different "registers" or areas of your voice that feel and sound different:</p>
    <ul>
      <li><strong>Chest Voice:</strong> Your lower, fuller sound that resonates in your chest</li>
      <li><strong>Head Voice:</strong> Your higher, lighter sound that resonates in your head</li>
      <li><strong>Mixed Voice:</strong> A blend of both, crucial for seamless range</li>
    </ul>
    
    <h2>Can You Expand Your Range?</h2>
    <p>Yes! With proper training, most singers can extend both ends of their range. However, it's more important to develop quality and control within your natural range than to simply chase higher or lower notes. A well-developed two-octave range sounds far better than a strained three-octave range.</p>
    
    <h2>Working Within Your Range</h2>
    <p>Understanding your range helps you:</p>
    <ul>
      <li>Choose songs that showcase your strengths</li>
      <li>Know when and how to transpose music to fit your voice</li>
      <li>Set realistic goals for range expansion</li>
      <li>Identify areas that need technical development</li>
    </ul>
    
    <p>Remember, some of the most beloved singers in history have had modest ranges. What makes a voice compelling is not its span, but its character, emotion, and the skill with which it's used.</p>
  `,
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = mockBlogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const content = blogContent[slug] || "<p>Full article content coming soon...</p>"
  const otherPosts = mockBlogPosts.filter((p) => p.id !== post.id).slice(0, 2)

  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px]">
          <Image
            src={blogImages[post.id] || post.image_url || "/images/hero-bg.jpg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center text-pearl-white/80 hover:text-pearl-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-pearl-white max-w-4xl text-balance">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 mt-4 text-pearl-white/80">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.created_at)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <article className="lg:col-span-2">
                <div
                  className="prose prose-lg max-w-none 
                    prose-headings:font-serif prose-headings:text-espresso
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-warm-taupe prose-p:leading-relaxed
                    prose-li:text-warm-taupe
                    prose-strong:text-espresso
                    prose-ul:my-4 prose-ol:my-4
                  "
                  dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Share */}
                <div className="mt-12 pt-8 border-t border-blush-pink">
                  <div className="flex items-center justify-between">
                    <p className="text-warm-taupe">
                      Enjoyed this article? Share it with others!
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-espresso text-espresso hover:bg-espresso hover:text-pearl-white"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* About Author */}
                  <Card className="border-blush-pink/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <Image
                            src="/images/samantha-portrait.jpg"
                            alt="Samantha Nelson"
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="font-serif text-lg text-espresso">
                            Samantha Nelson
                          </p>
                          <p className="text-warm-taupe text-sm">
                            Vocal Instructor
                          </p>
                        </div>
                      </div>
                      <p className="text-warm-taupe text-sm">
                        With 15+ years of experience in vocal instruction,
                        Samantha shares insights to help students of all levels
                        improve their singing.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Related Posts */}
                  <div>
                    <h3 className="font-serif text-xl text-espresso mb-4">
                      Related Articles
                    </h3>
                    <div className="space-y-4">
                      {otherPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          href={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-4">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={blogImages[relatedPost.id] || relatedPost.image_url || "/images/hero-bg.jpg"}
                                alt={relatedPost.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-espresso group-hover:text-rose-gold transition-colors line-clamp-2">
                                {relatedPost.title}
                              </h4>
                              <p className="text-warm-taupe text-sm mt-1">
                                {formatDate(relatedPost.created_at)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Card className="bg-gradient-to-br from-champagne-gold/10 to-rose-gold/10 border-champagne-gold/30">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-serif text-xl text-espresso mb-2">
                        Ready to Learn More?
                      </h3>
                      <p className="text-warm-taupe text-sm mb-4">
                        Book a free consultation to discuss your vocal goals.
                      </p>
                      <Button
                        asChild
                        className="bg-rose-gold hover:bg-rose-gold/90 text-white w-full"
                      >
                        <Link href="/consultation">Book Consultation</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <WavyDivider variant="gradient" />
        <CTASection variant="secondary" />
      </main>
      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return mockBlogPosts.map((post) => ({
    slug: post.slug,
  }))
}
