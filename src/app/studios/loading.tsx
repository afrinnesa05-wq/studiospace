import { Skeleton } from "@/components/ui/skeleton"

export default function ExploreLoading() {
  return (
    <main className="flex-1 bg-[#0B1F3A]/5">
      <section className="border-b border-[#0B1F3A]/10 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-5 h-12 w-2/3 max-w-2xl" />
          <Skeleton className="mt-5 h-5 w-full max-w-xl" />
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8"
        aria-busy="true"
        aria-label="Loading studios"
      >
        <div className="rounded-2xl border border-[#0B1F3A]/10 bg-white p-6">
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

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-3">
              <Skeleton className="aspect-[16/10] w-full rounded-xl" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
