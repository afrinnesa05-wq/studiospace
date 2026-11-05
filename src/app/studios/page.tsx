import { Suspense } from "react"
import type { Metadata } from "next"

import { StudioExplorer } from "@/components/studios/studio-explorer"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Explore Studios — StudioSpace",
  description:
    "Search and filter verified photography, soundstage, podcast, music, and art workshops by location and price.",
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

function ExplorerFallback() {
  return (
    <div
      className="flex flex-col gap-8"
      aria-busy="true"
      aria-label="Loading studios"
    >
      <div className="rounded-2xl border border-[#0B1F3A]/10 bg-white p-5 shadow-[0_16px_40px_-28px_rgba(11,31,58,0.35)] sm:p-6">
        <Skeleton className="h-4 w-32" />
        <div className="mt-4 flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-28 rounded-full" />
          ))}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full rounded-lg" />
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-3">
            <Skeleton className="aspect-[16/10] w-full rounded-xl" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}

async function CategoryExplorer({ searchParams }: { searchParams: SearchParams }) {
  const { category } = await searchParams
  const initialCategory = Array.isArray(category)
    ? category[0]
    : category ?? null

  return <StudioExplorer initialCategory={initialCategory} />
}

function ExploreStudiosPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="flex-1 bg-[#0B1F3A]/5">
      <section className="border-b border-[#0B1F3A]/10 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
            <span aria-hidden className="h-px w-8 bg-[#3B82F6]" />
            Explore studios
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-[#0B1F3A] text-balance md:text-5xl">
            Find the room that fits your next idea
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#0B1F3A]/60 md:text-lg">
            Browse the full StudioSpace catalog. Filter by craft, location, and hourly
            rate — then open any listing for the full details.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <Suspense fallback={<ExplorerFallback />}>
          <CategoryExplorer searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  )
}

export default ExploreStudiosPage
