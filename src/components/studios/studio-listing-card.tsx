import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { StudioImage } from "@/components/studios/studio-image"
import type { ExploreStudio } from "@/lib/studios-api"

type CategoryIconProps = {
  category: string
  className?: string
}

function CategoryIcon({ category, className }: CategoryIconProps) {
  const value = category.toLowerCase()

  let symbol = "✦"

  if (value.includes("photo")) symbol = "▣"
  else if (value.includes("sound") || value.includes("film") || value.includes("video")) symbol = "▶"
  else if (value.includes("music") || value.includes("recording")) symbol = "♫"
  else if (value.includes("podcast") || value.includes("broadcast")) symbol = "◉"
  else if (value.includes("art") || value.includes("workshop")) symbol = "✿"

  return (
    <span aria-hidden className={className}>
      {symbol}
    </span>
  )
}

type StudioListingCardProps = {
  studio: ExploreStudio
}

function StudioListingCard({ studio }: StudioListingCardProps) {
  return (
    <Card className="group gap-0 overflow-hidden p-0 ring-1 ring-[#0B1F3A]/10 transition-all duration-300 hover:-translate-y-1 hover:ring-[#3B82F6]/40 hover:shadow-[0_20px_48px_-24px_rgba(59,130,246,0.55)]">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#0B1F3A]">
        <StudioImage
          src={studio.imageUrl}
          alt={studio.name}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {studio.rating > 0 ? (
          <Badge className="absolute top-4 left-4 gap-1 border-0 bg-[#3B82F6] text-white shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] hover:bg-[#3B82F6]">
            ★ {studio.rating.toFixed(1)}
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
            {studio.category}
          </p>

          <h3 className="mt-1.5 font-heading text-lg font-semibold text-[#0B1F3A]">
            {studio.name}
          </h3>

          {studio.location ? (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[#0B1F3A]/60">
              {studio.location}
            </p>
          ) : null}
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-[#0B1F3A]/55">
          {studio.description || "A curated space ready for your next shoot."}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-[#0B1F3A]/10 pt-4">
          <span className="text-sm text-[#0B1F3A]/60">
            <span className="font-heading text-lg font-semibold text-[#0B1F3A]">
              ৳{studio.pricePerHour}
            </span>
            /hour
          </span>

          {studio.maxCapacity ? (
            <span className="text-xs font-medium tracking-[0.08em] text-[#0B1F3A]/50 uppercase">
              Up to {studio.maxCapacity}
            </span>
          ) : null}
        </div>

        <Link
          href={`/studios/${studio.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-[#3B82F6] transition-colors hover:text-[#2563EB]"
        >
          View details →
        </Link>
      </div>
    </Card>
  )
}

export { CategoryIcon, StudioListingCard }