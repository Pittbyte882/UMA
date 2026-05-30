import { cn } from "@/lib/utils"

interface WavyDividerProps {
  variant?: "rose-gold" | "champagne" | "blush" | "gradient" | "subtle"
  flip?: boolean
  className?: string
}

export function WavyDivider({
  variant = "subtle",
  flip = false,
  className,
}: WavyDividerProps) {
  const colors = {
    "rose-gold": "#B76E79",
    champagne: "#D6B98C",
    blush: "#E8CFCF",
    gradient: "url(#waveGradient)",
    subtle: "url(#subtleGradient)",
  }

  const fillColor = colors[variant]

  return (
    <div
      className={cn(
        "w-full overflow-hidden -my-px",
        flip && "rotate-180",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D6B98C" />
            <stop offset="50%" stopColor="#B76E79" />
            <stop offset="100%" stopColor="#D6B98C" />
          </linearGradient>
          <linearGradient id="subtleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8CFCF" stopOpacity="0.3" />
            <stop offset="30%" stopColor="#D6B98C" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#B76E79" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E8CFCF" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Main soft wave */}
        <path
          d="M0,40 C360,80 720,0 1080,40 S1440,80 1440,40 L1440,80 L0,80 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  )
}

export function WavyDividerAlt({
  variant = "subtle",
  className,
}: Omit<WavyDividerProps, "flip">) {
  return (
    <div className={cn("w-full overflow-hidden -my-px", className)}>
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="altGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8CFCF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#D6B98C" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E8CFCF" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M0,30 Q360,60 720,30 T1440,30 L1440,60 L0,60 Z"
          fill="url(#altGradient)"
        />
      </svg>
    </div>
  )
}

export function WavySeparator({ className }: { className?: string }) {
  return (
    <div className={cn("w-full py-6", className)}>
      <svg
        viewBox="0 0 1440 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0,20 C360,40 720,0 1080,20 C1260,30 1350,10 1440,20"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D6B98C" stopOpacity="0" />
            <stop offset="20%" stopColor="#D6B98C" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#B76E79" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#D6B98C" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D6B98C" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function ElegantDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 py-4", className)}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-champagne-gold/60" />
      <span className="w-2 h-2 bg-champagne-gold rotate-45" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-champagne-gold/60" />
    </div>
  )
}
