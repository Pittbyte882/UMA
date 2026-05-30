import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/shared/section-heading"
import { CTASection } from "@/components/sections/cta-section"
import { WavyDivider } from "@/components/layout/wavy-divider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import { mockBlogPosts } from "@/lib/mock-data"

const blogImages: Record<string, string> = {
  "1": "/images/blog/warm-up.jpg",
  "2": "/images/blog/child-singing.jpg",
  "3": "/images/blog/vocal-range.jpg",
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogPage() {
  // For demo, we'll add some additional posts
  const allPosts = [
    ...mockBlogPosts,
    {
      id: "4",
      title: "The Importance of Breath Control in Singing",
      slug: "importance-breath-control-singing",
      excerpt:
        "Learn how proper breathing technique forms the foundation of powerful, sustainable singing and how to develop it.",
      content: "",
      image_url: "/images/hero-bg.jpg",
      published: true,
      created_at: "2024-01-20T10:00:00Z",
      updated_at: "2024-01-20T10:00:00Z",
    },
    {
      id: "5",
      title: "Preparing for Your First Recital",
      slug: "preparing-first-recital",
      excerpt:
        "Nervous about your upcoming performance? Here are tips to help you prepare mentally and physically for the stage.",
      content: "",
      image_url: "/images/events/recital.jpg",
      published: true,
      created_at: "2024-01-05T10:00:00Z",
      updated_at: "2024-01-05T10:00:00Z",
    },
  ]

  const featuredPost = allPosts[0]
  const otherPosts = allPosts.slice(1)

  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>
        <PageHeader
          title="Vocal Tips & Insights"
          subtitle="Articles, tips, and resources to support your vocal journey from Ultimate Music Academy."
        />

        {/* Featured Post */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Badge className="bg-rose-gold text-white">Featured</Badge>
            </div>
            <Card className="overflow-hidden border-none shadow-xl">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto min-h-[300px]">
                  <Image
                    src={blogImages[featuredPost.id] || featuredPost.image_url || "/images/hero-bg.jpg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-sm text-warm-taupe mb-4">
                    <Calendar className="w-4 h-4" />
                    {formatDate(featuredPost.created_at)}
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-espresso mb-4 text-balance">
                    {featuredPost.title}
                  </h2>
                  <p className="text-warm-taupe mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center text-rose-gold hover:text-rose-gold/80 font-medium transition-colors"
                  >
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>

        <WavyDivider variant="gradient" />

        {/* All Posts */}
        <section className="py-20 md:py-28 bg-blush-pink/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-rose-gold font-medium tracking-wider uppercase text-sm mb-4">
                Latest Articles
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-4 text-balance">
                More from the Blog
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow bg-white group"
                >
                  <div className="relative h-48">
                    <Image
                      src={blogImages[post.id] || post.image_url || "/images/hero-bg.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-warm-taupe mb-3">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.created_at)}
                    </div>
                    <h3 className="font-serif text-xl text-espresso mb-3 line-clamp-2 group-hover:text-rose-gold transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-warm-taupe text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-rose-gold hover:text-rose-gold/80 text-sm font-medium transition-colors"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section className="py-16 bg-espresso text-pearl-white">
          <div className="container mx-auto px-4 text-center">
            <h3 className="font-serif text-2xl mb-6">Explore Topics</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Vocal Technique",
                "Beginners",
                "Children",
                "Performance",
                "Breathing",
                "Music Theory",
                "Practice Tips",
                "Auditions",
              ].map((topic) => (
                <Badge
                  key={topic}
                  className="bg-champagne-gold/20 text-pearl-white hover:bg-champagne-gold/30 cursor-pointer transition-colors px-4 py-2"
                >
                  {topic}
                </Badge>
              ))}
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
