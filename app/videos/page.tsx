import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/shared/section-heading"
import { WavyDivider } from "@/components/layout/wavy-divider"

const videos = [
  {
    id: "qBQaKDMjfCA",
    title: "Samantha Nelson — Performance",
  },
  {
    id: "KfdEVsk7yn8",
    title: "Samantha Nelson — Vocal Showcase",
  },
  {
    id: "KZJYEeRavQo",
    title: "Samantha Nelson — Live Performance",
  },
]

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>
        <PageHeader
          title="Videos of Samantha"
          subtitle="Watch Samantha in action — performing, teaching, and inspiring."
        />

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <div key={video.id} className="space-y-3">
                  <div className="relative w-full rounded-xl overflow-hidden shadow-lg"
                    style={{ paddingTop: "56.25%" }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="font-serif text-lg text-espresso text-center">
                    {video.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WavyDivider variant="gradient" />
      </main>
      <Footer />
    </div>
  )
}