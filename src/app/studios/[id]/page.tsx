
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  MapPin,
  Star,
  Users,
} from "lucide-react"

import { BookingDialog } from "@/components/studios/booking-dialog"
import { StudioImage } from "@/components/studios/studio-image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { fetchStudioById } from "@/lib/studios-api"

type StudioDetailsPageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: StudioDetailsPageProps): Promise<Metadata> {
  const { id } = await params

  try {
    const studio = await fetchStudioById(id)

    if (!studio) {
      return { title: "Studio not found — StudioSpace" }
    }

    return {
      title: `${studio.name} — StudioSpace`,
      description: studio.description.slice(0, 160),
    }
  } catch {
    return { title: "Studio details — StudioSpace" }
  }
}

async function StudioDetailsPage({ params }: StudioDetailsPageProps) {
  const { id } = await params

  let studio = null
  let loadFailed = false

  try {
    studio = await fetchStudioById(id)
  } catch {
    loadFailed = true
  }

  if (loadFailed) {
    return (
      <main className="flex-1 bg-[#0B1F3A]/5 dark:bg-[#101827]">
        <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
          <h1 className="font-heading text-2xl font-semibold text-[#0B1F3A] dark:text-[#F8FAFC] md:text-3xl">
            Studio unavailable
          </h1>

          <p className="text-sm leading-relaxed text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
            We couldn&apos;t reach the studio API. Make sure it is running on
            port 8000, then reload this page.
          </p>

          <Button
            render={<Link href="/studios" />}
            nativeButton={false}
            className="mt-2 bg-[#3B82F6] text-sm font-medium tracking-[0.1em] text-white uppercase hover:bg-[#2563EB]"
          >
            Back to explore
          </Button>
        </div>
      </main>
    )
  }

  if (!studio) {
    notFound()
  }

  return (
    <main className="flex-1 bg-[#0B1F3A]/5 dark:bg-[#101827]">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <Link
          href="/studios"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3B82F6] transition-colors hover:text-[#2563EB]"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Back to all studios
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="flex flex-col gap-8 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-[#0B1F3A]/10 bg-white dark:border-white/15 dark:bg-[#1B2638]">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#0B1F3A]">
                <StudioImage
                  src={studio.imageUrl}
                  alt={`Photo of ${studio.name}`}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="border-0 bg-[#3B82F6]/10 text-[#3B82F6] hover:bg-[#3B82F6]/10">
                    {studio.category}
                  </Badge>

                  {studio.rating > 0 ? (
                    <span className="flex items-center gap-1 text-sm font-medium text-[#0B1F3A] dark:text-[#F8FAFC]">
                      <Star
                        aria-hidden
                        className="size-4 fill-[#3B82F6] text-[#3B82F6]"
                      />
                      {studio.rating.toFixed(1)}
                    </span>
                  ) : null}
                </div>

                <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-[#0B1F3A] dark:text-[#F8FAFC] md:text-4xl">
                  {studio.name}
                </h1>

                {studio.location ? (
                  <p className="mt-3 flex items-center gap-2 text-sm text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
                    <MapPin aria-hidden className="size-4 text-[#3B82F6]" />
                    {studio.location}
                  </p>
                ) : null}

                <p className="mt-6 text-base leading-relaxed text-[#0B1F3A]/70 dark:text-[#CBD5E1]">
                  {studio.description ||
                    "Full studio details will appear here once the host completes this listing."}
                </p>

                {studio.amenities.length > 0 ? (
                  <div className="mt-8">
                    <h2 className="text-xs font-semibold tracking-[0.14em] text-[#0B1F3A]/50 uppercase dark:text-[#94A3B8]">
                      Amenities
                    </h2>

                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {studio.amenities.map((amenity) => (
                        <li
                          key={amenity}
                          className="flex items-center gap-2.5 rounded-lg border border-[#0B1F3A]/10 bg-[#0B1F3A]/[0.03] px-3.5 py-3 text-sm text-[#0B1F3A]/75 dark:border-white/15 dark:bg-white/[0.04] dark:text-[#CBD5E1]"
                        >
                          <Check
                            aria-hidden
                            className="size-4 shrink-0 text-[#3B82F6]"
                          />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-2xl border border-[#0B1F3A]/10 bg-white p-6 dark:border-white/15 dark:bg-[#1B2638] sm:p-8">
              <h2 className="font-heading text-lg font-semibold text-[#0B1F3A] dark:text-[#F8FAFC]">
                About this space
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-[#0B1F3A]/65 dark:text-[#CBD5E1]">
                Every StudioSpace listing is published by an independent host.
                Check the details above, then request your hours from the booking
                panel — the host confirms each pending request.
              </p>

              <div className="mt-6 flex flex-wrap gap-6 border-t border-[#0B1F3A]/10 pt-6 dark:border-white/15">
                {studio.hostName ? (
                  <div>
                    <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-[#0B1F3A]/45 uppercase dark:text-[#94A3B8]">
                      Host
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#0B1F3A] dark:text-[#F8FAFC]">
                      {studio.hostName}
                    </p>
                  </div>
                ) : null}

                {studio.maxCapacity ? (
                  <div>
                    <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-[#0B1F3A]/45 uppercase dark:text-[#94A3B8]">
                      Capacity
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[#0B1F3A] dark:text-[#F8FAFC]">
                      <Users aria-hidden className="size-4 text-[#3B82F6]" />
                      Up to {studio.maxCapacity}
                    </p>
                  </div>
                ) : null}

                <div>
                  <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-[#0B1F3A]/45 uppercase dark:text-[#94A3B8]">
                    Rate
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[#0B1F3A] dark:text-[#F8FAFC]">
                    <Clock aria-hidden className="size-4 text-[#3B82F6]" />
                    ${studio.pricePerHour} per hour
                  </p>
                </div>

                {studio.securityDeposit ? (
                  <div>
                    <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-[#0B1F3A]/45 uppercase dark:text-[#94A3B8]">
                      Deposit
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#0B1F3A] dark:text-[#F8FAFC]">
                      ${studio.securityDeposit}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-[#0B1F3A]/10 bg-[#0B1F3A] p-6 text-white shadow-[0_24px_60px_-32px_rgba(11,31,58,0.55)] sm:p-7">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
                Hourly rate
              </p>

              <p className="mt-3 font-heading text-4xl font-semibold tracking-tight">
                ${studio.pricePerHour}
                <span className="text-lg font-medium text-white/50">
                  {" "}
                  /hour
                </span>
              </p>

              <ul className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/70">
                <li className="flex items-center gap-2.5">
                  <Check aria-hidden className="size-4 text-[#3B82F6]" />
                  Booking requests sent in seconds
                </li>

                <li className="flex items-center gap-2.5">
                  <Check aria-hidden className="size-4 text-[#3B82F6]" />
                  Flexible cancellation on pending requests
                </li>

                <li className="flex items-center gap-2.5">
                  <Check aria-hidden className="size-4 text-[#3B82F6]" />
                  Host support throughout your session
                </li>
              </ul>

              <BookingDialog
                studio={{
                  id: studio.id,
                  name: studio.name,
                  pricePerHour: studio.pricePerHour,
                }}
              />

              <p className="mt-3 text-xs leading-relaxed text-white/50">
                Bookings are created as pending and can be cancelled at any time
                before confirmation.
              </p>

              <Button
                render={<Link href="/studios" />}
                nativeButton={false}
                className="mt-6 w-full bg-[#3B82F6] text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB]"
              >
                Browse more studios
                <ArrowRight aria-hidden className="size-4" />
              </Button>
            </div>
          </aside>
        </div>

        <div className="mt-12 rounded-2xl border border-[#0B1F3A]/10 bg-white p-6 dark:border-white/15 dark:bg-[#1B2638] sm:p-8">
          <h2 className="font-heading text-lg font-semibold text-[#0B1F3A] dark:text-[#F8FAFC]">
            You might also like
          </h2>

          <p className="mt-1.5 text-sm text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
            Keep browsing the catalog for more premium spaces.
          </p>

          <div className="mt-6">
            <Button
              render={<Link href="/studios" />}
              nativeButton={false}
              variant="outline"
              className="border-[#0B1F3A]/20 text-[#0B1F3A] hover:border-[#3B82F6] hover:text-[#3B82F6] dark:border-white/20 dark:text-[#F8FAFC] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
            >
              View all studios
              <ArrowRight aria-hidden className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default StudioDetailsPage

