"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">

      {/* LEFT SIDE — Full marble background with diagonal clip */}
      <div
        className="absolute top-0 left-0 bottom-0 w-[55%] z-0"
        style={{ clipPath: "polygon(0 0, 88% 0, 100% 100%, 0 100%)" }}
      >
        {/* Marble base layer */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#F9F6F2",
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(249,246,242,0.98) 0%, rgba(249,246,242,0.7) 35%, transparent 65%),
              radial-gradient(circle at 8% 78%, rgba(183,110,121,0.35) 0%, rgba(232,207,207,0.4) 25%, transparent 50%),
              radial-gradient(circle at 85% 15%, rgba(232,207,207,0.4) 0%, transparent 40%),
              linear-gradient(135deg, rgba(249,246,242,1), rgba(232,207,207,0.5))
            `,
          }}
        />
        {/* Marble veins layer - softer, more organic */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(140deg, transparent 0%, transparent 38%, rgba(214,185,140,0.35) 39%, rgba(214,185,140,0.1) 41%, transparent 44%),
                linear-gradient(165deg, transparent 0%, transparent 55%, rgba(183,110,121,0.2) 56%, transparent 60%),
                linear-gradient(20deg, transparent 0%, transparent 62%, rgba(214,185,140,0.3) 63%, rgba(214,185,140,0.08) 65%, transparent 68%)
              `,
              opacity: 0.9,
            }}
          />
        {/* Marble sparkle dots layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 10% 75%, rgba(255,255,255,0.55) 0 2px, transparent 3px),
              radial-gradient(circle at 15% 82%, rgba(214,185,140,0.65) 0 2px, transparent 3px),
              radial-gradient(circle at 88% 14%, rgba(255,255,255,0.5) 0 2px, transparent 3px),
              radial-gradient(circle at 92% 20%, rgba(214,185,140,0.55) 0 2px, transparent 3px)
            `,
            opacity: 0.6,
          }}
        />
      </div>

      {/* RIGHT SIDE — Studio photo */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] z-0">
        <Image
          src="/images/home.png"
          alt="Ultimate Music Academy Studio"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, #F9F6F2 0%, rgba(249,246,242,0.5) 12%, transparent 35%)",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg">
          <p
            className="mb-4 uppercase font-medium"
            style={{ color: "#B76E79", letterSpacing: "0.2em", fontSize: "11px" }}
          >
            Berklee-Trained Vocal Coach
          </p>

          <h1
            className="font-serif leading-tight mb-1"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#2A1A1A", fontWeight: 300 }}
          >
            Unlock Your Voice.
          </h1>
          <h1
            className="font-serif leading-tight mb-2"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#2A1A1A", fontWeight: 300 }}
          >
            Build Your Confidence.
          </h1>

          <p
            className="mb-6"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "#B76E79",
              lineHeight: 1.2,
            }}
          >
            Shine With Purpose.
          </p>

          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-block w-2 h-2 rotate-45"
              style={{ background: "#D6B98C" }}
            />
            <span
              className="h-px flex-1 max-w-[80px]"
              style={{ background: "linear-gradient(90deg, #D6B98C, transparent)" }}
            />
          </div>

          <p
            className="mb-8 leading-relaxed max-w-sm"
            style={{ color: "#8A776B", fontSize: "1rem", fontWeight: 300 }}
          >
            Professional vocal training for kids, teens, and adults through
            confidence-building, artistry, and real-world music mentorship.
          </p>

          <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="btn-outline-rose rounded-md font-medium px-8 py-6 uppercase tracking-luxury text-sm"
          >
            <Link href="/services">Explore Programs</Link>
          </Button>
        </div>
        </div>
      </div>
    </section>
  )
}