import Link from "next/link"
import { ArrowRight, MapPin, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { Studio } from "@/lib/home-data"

type StudioCardProps = {
  studio: Studio
}

function StudioCard({ studio }: StudioCardProps) {
  const Icon = studio.icon
  return (
    <Card className="group gap-0 p-0 py-0 ring-1 ring-[#0B1F3A]/10 transition-all duration-300 hover:-translate-y-1 hover:ring-[#3B82F6]/40 hover:shadow-[0_20px_48px_-24px_rgba(59,130,246,0.55)]">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#0B1F3A]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.4),transparent_65%)]"
        />
        <Icon
          aria-hidden
          className="relative size-14 text-[#3B82F6] drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          strokeWidth={1.5}
        />
        {studio.badge ? (
          <Badge className="absolute top-4 left-4 border-0 bg-[#3B82F6] text-white shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] hover:bg-[#3B82F6]">
            {studio.badge}
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
          <p className="mt-1 flex items-center gap-1.5 text-sm text-[#0B1F3A]/60">
            <MapPin aria-hidden className="size-3.5 text-[#3B82F6]" />
            {studio.location}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-[#0B1F3A]/10 pt-4">
          <span className="text-sm text-[#0B1F3A]/60">
            <span className="font-heading text-lg font-semibold text-[#0B1F3A]">
              ${studio.pricePerHour}
            </span>
            /hour
          </span>
          <span className="flex items-center gap-1 text-sm font-medium text-[#0B1F3A]">
            <Star
              aria-hidden
              className="size-4 fill-[#3B82F6] text-[#3B82F6]"
            />
            {studio.rating.toFixed(1)}
            <span className="font-normal text-[#0B1F3A]/50">
              ({studio.reviews})
            </span>
          </span>
        </div>
        <Link
          href="/studios"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#3B82F6] transition-colors hover:text-[#2563EB]"
        >
          View details
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Card>
  )
}

export { StudioCard }
