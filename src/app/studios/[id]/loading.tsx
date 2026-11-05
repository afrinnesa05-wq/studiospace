import { Skeleton } from "@/components/ui/skeleton"

export default function StudioDetailsLoading() {
  return (
    <main
      className="flex-1 bg-[#0B1F3A]/5"
      aria-busy="true"
      aria-label="Loading studio details"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <Skeleton className="h-4 w-40" />

        <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="flex flex-col gap-8 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-[#0B1F3A]/10 bg-white">
              <Skeleton className="aspect-[16/9] w-full rounded-none" />
              <div className="space-y-4 p-6 sm:p-8">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-10 w-2/3" />
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
            <div className="rounded-2xl border border-[#0B1F3A]/10 bg-white p-6 sm:p-8">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="mt-4 h-16 w-full" />
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl bg-[#0B1F3A] p-6 sm:p-7">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-4 h-12 w-40" />
              <Skeleton className="mt-6 h-24 w-full" />
              <Skeleton className="mt-6 h-12 w-full" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
