import { cn } from "cn"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  tone?: "light" | "dark"
  align?: "left" | "center"
  className?: string
}

function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      <span className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
        <span aria-hidden className="h-px w-8 bg-[#3B82F6]" />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "font-heading text-3xl font-semibold tracking-tight md:text-4xl",
          tone === "dark" ? "text-white" : "text-[#0B1F3A]"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-base leading-relaxed",
            tone === "dark" ? "text-white/60" : "text-[#0B1F3A]/60"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

export { SectionHeading }
