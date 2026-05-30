"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface MarbleAccentProps {
  variant?: "wave-bottom" | "wave-top" | "wave-side" | "blob-center" | "flowing-diagonal" | "soft-corner"
  size?: "sm" | "md" | "lg" | "xl"
  opacity?: number
  className?: string
  flip?: boolean
}

export function MarbleAccent({
  variant = "wave-bottom",
  size = "md",
  opacity = 0.3,
  className,
  flip = false,
}: MarbleAccentProps) {
  const sizeClasses = {
    sm: "h-24 md:h-32",
    md: "h-32 md:h-48",
    lg: "h-48 md:h-64",
    xl: "h-64 md:h-96",
  }

  // Wavy, organic SVG clip paths
  const getVariantStyles = () => {
    switch (variant) {
      case "wave-bottom":
        // Flowing wave across the bottom of a section
        return {
          position: "absolute bottom-0 left-0 right-0",
          clipPath: "url(#wave-bottom-clip)",
          height: sizeClasses[size],
          width: "w-full",
        }
      case "wave-top":
        // Flowing wave across the top
        return {
          position: "absolute top-0 left-0 right-0",
          clipPath: "url(#wave-top-clip)",
          height: sizeClasses[size],
          width: "w-full",
        }
      case "wave-side":
        // Vertical wave along the side
        return {
          position: flip ? "absolute top-0 bottom-0 right-0" : "absolute top-0 bottom-0 left-0",
          clipPath: flip ? "url(#wave-side-right-clip)" : "url(#wave-side-left-clip)",
          height: "h-full",
          width: "w-32 md:w-48 lg:w-64",
        }
      case "blob-center":
        // Organic blob shape for center placement
        return {
          position: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          clipPath: "url(#blob-clip)",
          height: size === "xl" ? "h-96 md:h-[500px]" : size === "lg" ? "h-64 md:h-96" : size === "md" ? "h-48 md:h-64" : "h-32 md:h-48",
          width: size === "xl" ? "w-[500px] md:w-[700px]" : size === "lg" ? "w-96 md:w-[500px]" : size === "md" ? "w-64 md:w-96" : "w-48 md:w-64",
        }
      case "flowing-diagonal":
        // Diagonal flowing shape across page
        return {
          position: flip ? "absolute top-0 right-0" : "absolute bottom-0 left-0",
          clipPath: "url(#flowing-diagonal-clip)",
          height: size === "xl" ? "h-[400px] md:h-[600px]" : size === "lg" ? "h-72 md:h-96" : "h-48 md:h-72",
          width: size === "xl" ? "w-[500px] md:w-[800px]" : size === "lg" ? "w-80 md:w-[500px]" : "w-64 md:w-80",
        }
      case "soft-corner":
        // Soft curved corner accent
        return {
          position: flip ? "absolute bottom-0 right-0" : "absolute bottom-0 left-0",
          clipPath: flip ? "url(#soft-corner-right-clip)" : "url(#soft-corner-left-clip)",
          height: sizeClasses[size],
          width: size === "lg" ? "w-64 md:w-96" : size === "md" ? "w-48 md:w-64" : "w-32 md:w-48",
        }
      default:
        return {
          position: "absolute bottom-0 left-0 right-0",
          clipPath: "url(#wave-bottom-clip)",
          height: sizeClasses[size],
          width: "w-full",
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <>
      {/* SVG Definitions for clip paths */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Wave bottom - flowing horizontal wave */}
          <clipPath id="wave-bottom-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0.3 C0.15,0.1 0.35,0.5 0.5,0.3 C0.65,0.1 0.85,0.5 1,0.3 L1,1 L0,1 Z" />
          </clipPath>
          
          {/* Wave top - inverted flowing wave */}
          <clipPath id="wave-top-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0.7 C0.15,0.9 0.35,0.5 0.5,0.7 C0.65,0.9 0.85,0.5 1,0.7 L1,0 L0,0 Z" />
          </clipPath>
          
          {/* Wave side left - vertical flowing wave */}
          <clipPath id="wave-side-left-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L0.6,0 C0.4,0.15 0.8,0.35 0.6,0.5 C0.4,0.65 0.8,0.85 0.6,1 L0,1 Z" />
          </clipPath>
          
          {/* Wave side right - vertical flowing wave */}
          <clipPath id="wave-side-right-clip" clipPathUnits="objectBoundingBox">
            <path d="M1,0 L0.4,0 C0.6,0.15 0.2,0.35 0.4,0.5 C0.6,0.65 0.2,0.85 0.4,1 L1,1 Z" />
          </clipPath>
          
          {/* Organic blob shape */}
          <clipPath id="blob-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0 C0.75,0 0.9,0.15 0.95,0.35 C1,0.55 0.9,0.75 0.75,0.85 C0.6,0.95 0.4,1 0.25,0.9 C0.1,0.8 0,0.6 0.05,0.4 C0.1,0.2 0.25,0 0.5,0 Z" />
          </clipPath>
          
          {/* Flowing diagonal */}
          <clipPath id="flowing-diagonal-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0.4 C0.1,0.2 0.3,0.3 0.4,0.1 C0.5,0 0.6,0.05 0.7,0 L1,0 L1,0.6 C0.9,0.7 0.7,0.65 0.6,0.8 C0.5,0.95 0.3,0.9 0.2,1 L0,1 Z" />
          </clipPath>
          
          {/* Soft corner left */}
          <clipPath id="soft-corner-left-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0.2 C0.1,0.1 0.2,0.3 0.35,0.15 C0.5,0 0.65,0.1 0.8,0.25 C0.95,0.4 0.85,0.6 0.7,0.75 C0.55,0.9 0.3,0.85 0.15,1 L0,1 Z" />
          </clipPath>
          
          {/* Soft corner right */}
          <clipPath id="soft-corner-right-clip" clipPathUnits="objectBoundingBox">
            <path d="M1,0.2 C0.9,0.1 0.8,0.3 0.65,0.15 C0.5,0 0.35,0.1 0.2,0.25 C0.05,0.4 0.15,0.6 0.3,0.75 C0.45,0.9 0.7,0.85 0.85,1 L1,1 Z" />
          </clipPath>
        </defs>
      </svg>
      
      <div
        className={cn(
          "pointer-events-none z-0",
          styles.position,
          styles.height,
          styles.width,
          className
        )}
        style={{ opacity }}
      >
        <Image
          src="/images/marble-texture.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ clipPath: styles.clipPath }}
        />
      </div>
    </>
  )
}
