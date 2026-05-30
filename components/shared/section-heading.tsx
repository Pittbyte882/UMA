import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  alignment?: "left" | "center" | "right"
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  alignment = "center",
  className,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  return (
    <div className={cn("mb-12", alignmentClasses[alignment], className)}>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-espresso mb-4 text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-warm-taupe text-lg max-w-2xl mx-auto text-pretty">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-6 flex items-center gap-2",
          alignment === "center" && "justify-center",
          alignment === "right" && "justify-end"
        )}
      >
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-champagne-gold" />
        <span className="h-2 w-2 rounded-full bg-rose-gold" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-champagne-gold" />
      </div>
    </div>
  )
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-blush-pink/30", className)}>
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-espresso mb-4 text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="text-warm-taupe text-lg md:text-xl max-w-3xl mx-auto text-pretty">
            {subtitle}
          </p>
        )}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-champagne-gold" />
          <span className="h-3 w-3 rounded-full bg-rose-gold" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-champagne-gold" />
        </div>
      </div>
    </section>
  )
}
