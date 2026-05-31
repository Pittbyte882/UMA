"use client"

import { useEffect, useState, useRef } from "react"

export function SplashScreen() {
  const [mounted, setMounted] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [done, setDone] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)

    // Auto play the video
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }

    // Start fade out after 5 seconds
    const t1 = setTimeout(() => setFadeOut(true), 5000)
    // Remove completely after fade
    const t2 = setTimeout(() => setDone(true), 6200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (!mounted || done) return null

  return (
    <>
      <style>{`
        .splash-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 1.2s ease-in-out;
        }
        .splash-root.fading {
          opacity: 0;
          pointer-events: none;
        }
        .splash-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>

      <div className={`splash-root${fadeOut ? " fading" : ""}`}>
        <video
          ref={videoRef}
          className="splash-video"
          src="/videos/splash.mov"
          autoPlay
          muted
          playsInline
          loop={false}
          onEnded={() => setFadeOut(true)}
        />
      </div>
    </>
  )
}