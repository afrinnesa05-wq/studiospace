import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CalendarClock,
  Clapperboard,
  Search,
  Sparkles,
  Zap,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { SectionHeading } from "@/components/home/section-heading"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "How It Works — StudioSpace",
  description:
    "Four simple steps from discovering a studio to finishing your production: discover spaces, select shoot hours, book instantly, create and produce.",
}

type StepDetail = {
  number: string
  title: string
  summary: string
  details: string[]
  icon: LucideIcon
}

const bookingSteps: StepDetail[] = [
  {
    number: "01",
    title: "Discover Spaces",
    summary:
      "Search verified studios by craft, city, and budget — with clear hourly rates up front.",
    details: [
      "Filter by photography, sound stages, podcast rooms, music suites, and art workshops",
      "Compare locations, pricing, and amenities without hidden fees",
      "Open any listing for full host details and space specifications",
    ],
    icon: Search,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    summary:
      "Pick the exact date and hour slots your crew needs — morning call times to late-night sessions.",
    details: [
      "Choose a date and start / end hours that fit your schedule",
      "See the hourly rate update clearly before you confirm",
      "Plans change: cancel while your request is still pending",
    ],
    icon: CalendarClock,
  },
  {
    number: "03",
    title: "Book Instantly",
    summary:
      "Confirm your reservation in one flow. Approved bookings lock the room so no one else can overlap your hours.",
    details: [
      "Instant confirmation — no endless email chains with hosts",
      "Overlapping confirmed bookings are blocked automatically",
      "Track every request from your My Bookings dashboard",
    ],
    icon: Zap,
  },
  {
    number: "04",
    title: "Create & Produce",
    summary:
      "Arrive, plug in, and do your best work. The space is ready — the rest is up to you and your crew.",
    details: [
      "Host support throughout your reserved session",
      "Flexible cancellation policy while a booking is pending",
      "Leave with finished work, not logistics headaches",
    ],
    icon: Clapperboard,
  },
]

function HowItWorksPage() {
  return (
    <main className="flex-1">
      <section className="relative isolate overflow-hidden bg-[#0B1F3A]">
        <div
          aria-hidden
          className="absolute -top-40 right-[-12%] size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.28),transparent_65%)]"
        />
        <div
          aria-hidden
          className="absolute -bottom-52 left-[-8%] size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_65%)]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
            <span aria-hidden className="h-px w-8 bg-[#3B82F6]" />
            How it works
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-white text-balance md:text-5xl">
            From first search to final cut in four steps
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            StudioSpace keeps booking as simple as the work itself — transparent hours,
            instant confirmation, and a clear path from discovery to production.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              render={<Link href="/studios" />}
              nativeButton={false}
              size="lg"
              className="bg-[#3B82F6] px-6 font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:-translate-y-px hover:bg-[#2563EB] hover:shadow-[0_6px_22px_-6px_rgba(59,130,246,0.85)]"
            >
              Explore studios
              <ArrowRight aria-hidden className="size-4" />
            </Button>
            <Button
              render={<Link href="/register" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="border-white/40 bg-transparent px-6 font-medium tracking-[0.1em] text-white uppercase transition-all hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 hover:text-white"
            >
              Create account
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The booking flow"
            title="Four steps. Zero guesswork."
            description="Every reservation follows the same predictable path — whether you are booking a daylight loft or a soundstage."
            align="center"
          />

          <ol className="mt-14 flex flex-col gap-6">
            {bookingSteps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 1
              return (
                <li
                  key={step.number}
                  className={[
                    "grid items-stretch gap-0 overflow-hidden rounded-2xl border border-[#0B1F3A]/10 bg-white transition-all duration-300 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_48px_-28px_rgba(59,130,246,0.45)]",
                    "md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "flex flex-col justify-center gap-4 p-7 sm:p-9",
                      isEven ? "md:order-2" : "md:order-1",
                      "bg-[#0B1F3A]",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex size-12 items-center justify-center rounded-xl bg-[#3B82F6]/15 text-[#3B82F6]">
                        <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-sm font-medium tracking-[0.16em] text-[#3B82F6] tabular-nums">
                        {step.number}
                      </span>
                    </div>
                    <h2 className="font-heading text-2xl font-semibold tracking-tight text-white">
                      {step.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-white/60 md:text-base">
                      {step.summary}
                    </p>
                  </div>

                  <div
                    className={[
                      "flex items-center p-7 sm:p-9",
                      isEven ? "md:order-1 md:bg-[#0B1F3A]/[0.03]" : "md:order-2 bg-[#0B1F3A]/[0.03]",
                    ].join(" ")}
                  >
                    <ul className="flex flex-col gap-4">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3">
                          <span
                            aria-hidden
                            className="mt-1.5 size-2 shrink-0 rounded-full bg-[#3B82F6]"
                          />
                          <span className="text-sm leading-relaxed text-[#0B1F3A]/70">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="bg-[#0B1F3A]/5 py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 rounded-2xl border border-[#0B1F3A]/10 bg-white p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
                <Sparkles aria-hidden className="size-4" />
                Ready when you are
              </p>
              <h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-[#0B1F3A] md:text-3xl">
                Your next shoot is four clicks away
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#0B1F3A]/60 md:text-base">
                Browse the live catalog, lock your hours, and walk into a space that is
                ready for the work — not for negotiations.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Button
                render={<Link href="/studios" />}
                nativeButton={false}
                size="lg"
                className="flex-1 bg-[#3B82F6] font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB]"
              >
                Explore studios
              </Button>
              <Button
                render={<Link href="/about" />}
                nativeButton={false}
                variant="outline"
                size="lg"
                className="flex-1 border-[#0B1F3A]/20 text-[#0B1F3A] hover:border-[#3B82F6] hover:text-[#3B82F6]"
              >
                About us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HowItWorksPage
