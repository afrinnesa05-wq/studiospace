export default function MyBookingsLoading() {
  return (
    <main
      className="flex-1 bg-[#0B1F3A]/5 px-4 py-12 md:px-8"
      aria-busy="true"
      aria-label="Loading your bookings"
    >
      <div className="mx-auto max-w-7xl">
        <div className="h-4 w-40 animate-pulse rounded bg-[#0B1F3A]/10" />
        <div className="mt-3 h-10 w-64 animate-pulse rounded bg-[#0B1F3A]/10" />
        <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-[#0B1F3A]/10" />

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-56 animate-pulse rounded-2xl bg-[#0B1F3A]/5"
            />
          ))}
        </div>
      </div>
    </main>
  )
}
