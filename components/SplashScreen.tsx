"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function SplashScreen() {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<"enter" | "keyTurn" | "unlock" | "fadeOut" | "done">("enter")

  useEffect(() => {
    setMounted(true)
    const t1 = setTimeout(() => setPhase("keyTurn"), 1500)
    const t2 = setTimeout(() => setPhase("unlock"), 3000)
    const t3 = setTimeout(() => setPhase("fadeOut"), 4200)
    const t4 = setTimeout(() => setPhase("done"), 5400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  if (!mounted || phase === "done") return null
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Lato:wght@300;400&display=swap');

        .splash-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 1.2s ease-in-out;
        }

        .splash-root.fading { opacity: 0; }

        .splash-marble {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .splash-ring {
          position: absolute;
          width: min(520px, 85vw);
          height: min(520px, 85vw);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -58%);
          z-index: 1;
          mix-blend-mode: screen;
          animation: ringPulse 3s ease-in-out infinite;
        }

        @keyframes ringPulse {
          0%, 100% { opacity: 0.85; transform: translate(-50%, -58%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -58%) scale(1.03); }
        }

        .splash-lock {
          position: relative;
          z-index: 2;
          width: min(320px, 65vw);
          height: auto;
          margin-bottom: 32px;
          animation: lockFloat 3.5s ease-in-out infinite;
          filter:
            drop-shadow(0 18px 35px rgba(62, 49, 44, 0.22))
            drop-shadow(0 0 28px rgba(183, 110, 121, 0.35));
        }

        @keyframes lockFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.015); }
        }

        .splash-lock.key-turning {
          animation: lockFloat 3.5s ease-in-out infinite, keyTurnEffect 1.4s ease-in-out forwards;
        }

        @keyframes keyTurnEffect {
          0% { filter: drop-shadow(0 18px 35px rgba(62,49,44,0.22)) drop-shadow(0 0 28px rgba(183,110,121,0.35)); }
          50% { filter: drop-shadow(0 18px 35px rgba(62,49,44,0.3)) drop-shadow(0 0 55px rgba(214,185,140,0.8)) drop-shadow(0 0 80px rgba(214,185,140,0.4)); }
          100% { filter: drop-shadow(0 18px 35px rgba(62,49,44,0.22)) drop-shadow(0 0 28px rgba(183,110,121,0.35)); }
        }

        .splash-lock.unlocking {
          animation: unlockShake 0.5s ease-in-out forwards;
        }

        @keyframes unlockShake {
          0% { transform: translateY(0) rotate(0deg); }
          20% { transform: translateY(-4px) rotate(-2deg); }
          40% { transform: translateY(2px) rotate(2deg); }
          60% { transform: translateY(-6px) rotate(-1deg); }
          80% { transform: translateY(3px) rotate(1deg); }
          100% { transform: translateY(-20px) rotate(0deg); opacity: 0.6; }
        }

        .splash-branding {
          position: relative;
          z-index: 2;
          text-align: center;
          animation: brandFadeIn 1.2s ease-out 0.3s both;
        }

        @keyframes brandFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .splash-uma {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 300;
          letter-spacing: 0.55em;
          color: #7A3818;
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 6px;
          text-shadow: 0 2px 12px rgba(255,235,220,0.7);
        }

        .splash-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(10px, 1.5vw, 13px);
          font-weight: 300;
          letter-spacing: 0.4em;
          color: #9A5030;
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        .splash-tagline {
          font-family: 'Lato', sans-serif;
          font-size: clamp(8px, 1.2vw, 10px);
          font-weight: 300;
          letter-spacing: 0.22em;
          color: #B07050;
          text-transform: uppercase;
        }

        .splash-divider {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #C8907E, transparent);
          margin: 10px auto;
        }
      `}</style>

      <div className={`splash-root${phase === "fadeOut" ? " fading" : ""}`}>

        <div className="splash-marble">
          <Image
            src="/images/Marble_Back.png"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </div>

        <img
          className="splash-ring"
          src="/images/ring_transparent.png"
          alt=""
        />

        <img
          className={`splash-lock${phase === "keyTurn" ? " key-turning" : ""}${phase === "unlock" || phase === "fadeOut" ? " unlocking" : ""}`}
          src="/images/lock_and_key_transparent.png"
          alt="Rose gold lock and treble clef key"
        />

        <div className="splash-branding">
          <div className="splash-divider" />
          <div className="splash-uma">UMA</div>
          <div className="splash-subtitle">Ultimate Music Academy</div>
          <div className="splash-tagline">
            Unlock Your Voice &nbsp;·&nbsp; Unlock Your Future
          </div>
          <div className="splash-divider" />
        </div>

      </div>
    </>
  )
}