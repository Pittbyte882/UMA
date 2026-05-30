import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageFrameProps {
  src: string
  alt: string
  variant?: "square" | "circle" | "rounded"
  size?: "sm" | "md" | "lg" | "xl" | "full"
  className?: string
  priority?: boolean
}

const sizeClasses = {
  sm: "w-24 h-24",
  md: "w-40 h-40",
  lg: "w-64 h-64",
  xl: "w-80 h-80",
  full: "w-full aspect-square",
}

const variantClasses = {
  square: "rounded-none",
  circle: "rounded-full",
  rounded: "rounded-2xl",
}

export function ImageFrame({
  src,
  alt,
  variant = "rounded",
  size = "md",
  className,
  priority = false,
}: ImageFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden group",
        sizeClasses[size],
        variantClasses[variant],
        "ring-2 ring-transparent hover:ring-rose-gold/50 transition-all duration-300",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}

interface ImageFrameWithBorderProps extends ImageFrameProps {
  borderColor?: "rose-gold" | "champagne" | "blush"
}

const borderColors = {
  "rose-gold": "ring-rose-gold",
  champagne: "ring-champagne-gold",
  blush: "ring-blush-pink",
}

export function ImageFrameWithBorder({
  borderColor = "rose-gold",
  className,
  ...props
}: ImageFrameWithBorderProps) {
  return (
    <ImageFrame
      {...props}
      className={cn("ring-4", borderColors[borderColor], className)}
    />
  )
}

interface GalleryImageProps {
  src: string
  alt: string
  variant?: "square" | "circle" | "rounded"
  className?: string
}

export function GalleryImage({
  src,
  alt,
  variant = "rounded",
  className,
}: GalleryImageProps) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden group cursor-pointer",
        variantClasses[variant],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-all duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}
