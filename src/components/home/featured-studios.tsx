
import { Suspense } from "react"
import { connection } from "next/server"

import { StudioCard } from "@/components/home/studio-card"
import { fetchFeaturedStudios } from "@/lib/studios-api"
import type { ExploreStudio } from "@/lib/studios-api"

function FeaturedStudiosSkeleton() {
  return (
    <div
      className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading featured studios"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div className="aspect-[4/3] w-full animate-pulse rounded-xl bg-[#0B1F3A]/10 dark:bg-white/10" />
          <div className="h-4 w-24 animate-pulse rounded bg-[#0B1F3A]/10 dark:bg-white/10" />
          <div className="h-6 w-3/4 animate-pulse rounded bg-[#0B1F3A]/10 dark:bg-white/10" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-[#0B1F3A]/10 dark:bg-white/10" />
        </div>
      ))}
    </div>
  )
}

async function FeaturedStudiosContent() {
  await connection()

  let studios: ExploreStudio[] = []
  let failed = false

  try {
    studios = await fetchFeaturedStudios(6)
  } catch {
    failed = true
  }

  if (failed) {
    return (
      <div className="mt-12 rounded-2xl border border-dashed border-[#0B1F3A]/20 bg-white px-6 py-12 text-center dark:border-white/15 dark:bg-[#1B2638]">
        <p className="text-sm leading-relaxed text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
          We couldn&apos;t reach the studio catalog right now. Explore the full
          listing page once the studio API is back online.
        </p>
      </div>
    )
  }

  if (studios.length === 0) {
    return (
      <div className="mt-12 rounded-2xl border border-dashed border-[#0B1F3A]/20 bg-white px-6 py-12 text-center dark:border-white/15 dark:bg-[#1B2638]">
        <p className="text-sm leading-relaxed text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
          No studios have been listed yet. Be the first host to publish a space.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {studios.map((studio) => (
        <StudioCard key={studio.id} studio={studio} />
      ))}
    </div>
  )
}

async function FeaturedStudios() {
  return (
    <Suspense fallback={<FeaturedStudiosSkeleton />}>
      <FeaturedStudiosContent />
    </Suspense>
  )
}

export { FeaturedStudios, FeaturedStudiosSkeleton }

