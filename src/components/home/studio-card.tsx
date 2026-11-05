
import Link from "next/link"

import { Card } from "@/components/ui/card"
import { StudioImage } from "@/components/studios/studio-image"
import type { ExploreStudio } from "@/lib/studios-api"

type StudioCardProps = {
  studio: ExploreStudio
}

function CategoryIcon({
  category,
  className,
}: {
  category: string
  className?: string
}) {
  const value = category.toLowerCase()

  let symbol = "✦"

  if (value.includes("photo")) symbol = "▣"
  else if (
    value.includes("sound") ||
    value.includes("film") ||
    value.includes("video")
  ) {
    symbol = "▶"
  } else if (
    value.includes("music") ||
    value.includes("recording")
  ) {
    symbol = "♫"
  } else if (
    value.includes("podcast") ||
    value.includes("broadcast")
  ) {
    symbol = "◉"
  } else if (
    value.includes("art") ||
    value.includes("workshop")
  ) {
    symbol = "✿"
  }

  return (
    <span aria-hidden className={className}>
      {symbol}
    </span>
  )
}

function StudioCard({ studio }: StudioCardProps) {
  return (
    <Card className="studio-featured-card group gap-0 border border-[#0B1F3A]/10 bg-white p-0 py-0 text-[#0B1F3A] ring-1 ring-[#0B1F3A]/10 transition-all duration-300 hover:-translate-y-1 hover:ring-[#3B82F6]/40 hover:shadow-[0_20px_48px_-24px_rgba(59,130,246,0.55)] dark:border-white/10 dark:bg-[#1B2638] dark:text-[#F8FAFC] dark:ring-white/10">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#0B1F3A]">
        <StudioImage
          src={studio.imageUrl}
          alt={studio.name}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {!studio.imageUrl && (
          <CategoryIcon
            category={studio.category}
            className="pointer-events-none absolute text-5xl text-[#3B82F6] drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
            {studio.category}
          </p>

          <h3 className="mt-1.5 font-heading text-lg font-semibold text-[#0B1F3A] dark:text-[#F8FAFC]">
            {studio.name}
          </h3>

          <p className="mt-1 flex items-center gap-1.5 text-sm text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
            <span aria-hidden>📍</span>
            {studio.location || "Location to be announced"}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[#0B1F3A]/10 pt-4 dark:border-white/10">
          <span className="text-sm text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
            <span className="font-heading text-lg font-semibold text-[#0B1F3A] dark:text-[#E0C18D]">
              ${studio.pricePerHour}
            </span>
            /hour
          </span>

          {studio.rating > 0 ? (
            <span className="flex items-center gap-1 text-sm font-medium text-[#0B1F3A] dark:text-[#F8FAFC]">
              <span
                aria-hidden
                className="text-[#3B82F6] dark:text-[#E0C18D]"
              >
                ★
              </span>
              {studio.rating.toFixed(1)}
            </span>
          ) : (
            <span className="text-xs font-medium tracking-[0.08em] text-[#0B1F3A]/50 uppercase dark:text-[#AAB7C8]">
              New listing
            </span>
          )}
        </div>

        <Link
          href={`/studios/${studio.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-[#3B82F6] transition-colors hover:text-[#2563EB] dark:text-[#E0C18D] dark:hover:text-[#F0D6A8]"
        >
          View details →
        </Link>
      </div>
    </Card>
  )
}

export { StudioCard }

