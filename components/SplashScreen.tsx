"use client"

import { useEffect, useState, useRef } from "react"

export function SplashScreen() {
  const [mounted, setMounted] = useState(false)
  const [started, setStarted] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [done, setDone] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleStart = async () => {
    // iOS requires audio to be resumed from an AudioContext
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContext) {
        const audioCtx = new AudioContext()
        await audioCtx.resume()
      }
    } catch {}

    // Play audio directly in click handler
    if (audioRef.current) {
      audioRef.current.volume = 1
      audioRef.current.muted = false
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {})
      }
    }

    // Play video
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }

    setStarted(true)
  }

  useEffect(() => {
    if (!started) return

    const t1 = setTimeout(() => {
      setFadeOut(true)
      if (audioRef.current) {
        const fadeAudio = setInterval(() => {
          if (audioRef.current && audioRef.current.volume > 0.05) {
            audioRef.current.volume -= 0.05
          } else {
            clearInterval(fadeAudio)
            if (audioRef.current) audioRef.current.pause()
          }
        }, 60)
      }
    }, 5000)

    const t2 = setTimeout(() => setDone(true), 6200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [started])

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
          background: #000;
        }
        .splash-tap {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: rgba(0,0,0,0.5);
        }
        .splash-tap-ring {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid #D6B98C;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          animation: pulse 2s ease-in-out infinite;
        }
        .splash-tap-triangle {
          width: 0;
          height: 0;
          border-top: 14px solid transparent;
          border-bottom: 14px solid transparent;
          border-left: 22px solid #D6B98C;
          margin-left: 6px;
        }
        .splash-tap-text {
          font-family: Georgia, serif;
          font-size: 13px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #D6B98C;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.8; }
        }
      `}</style>

      <div className={`splash-root${fadeOut ? " fading" : ""}`}>
        <video
          ref={videoRef}
          className="splash-video"
          src="/videos/splash.mov"
          playsInline
          loop={false}
          onEnded={() => setFadeOut(true)}
        />
        <audio
          ref={audioRef}
          src="/videos/uma.mp3"
          preload="auto"
          playsInline
        />

        {!started && (
          <div className="splash-tap" onClick={handleStart}>
            <div className="splash-tap-ring">
              <div className="splash-tap-triangle" />
            </div>
            <p className="splash-tap-text">Tap to Experience</p>
          </div>
        )}
      </div>
    </>
  )
}