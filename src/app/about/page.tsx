import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Camera,
  Compass,
  Handshake,
  HeartHandshake,
  Layers,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

import { SectionHeading } from "@/components/home/section-heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "About Us — StudioSpace",
  description:
    "StudioSpace exists so creators can find premium production spaces without the friction — and so hosts can open their rooms to the people who need them.",
}

const values = [
  {
    icon: Compass,
    title: "Creator-first discovery",
    description:
      "Finding a great studio should take minutes, not days. We keep listings transparent, searchable, and honest about what you get.",
  },
  {
    icon: Handshake,
    title: "Hosts who care",
    description:
      "Our community is independent hosts and professional facilities who take pride in spaces that are ready when you arrive.",
  },
  {
    icon: ShieldCheck,
    title: "Trust by default",
    description:
      "Clear rates, confirmed hours, and protected bookings — so both sides know exactly what was agreed before the session starts.",
  },
  {
    icon: Layers,
    title: "Built for real production",
    description:
      "From daylight lofts to soundproofed suites, every category is organized around how creators actually work.",
  },
] as const

function AboutPage() {
  return (
    <main className="flex-1">
      <section className="relative isolate overflow-hidden bg-[#0B1F3A]">
        <div
          aria-hidden
          className="absolute -right-16 -bottom-40 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.26),transparent_65%)]"
        />
        <div
          aria-hidden
          className="absolute -top-32 left-[-10%] size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_65%)]"
        />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16 lg:px-8">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
              <span aria-hidden className="h-px w-8 bg-[#3B82F6]" />
              About StudioSpace
            </p>
            <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-white text-balance md:text-5xl">
              Premium spaces for people who make things
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
              StudioSpace is a peer-to-peer marketplace for creative workspaces —
              photography studios, sound stages, podcast rooms, music suites, and art
              workshops — booked by the hour.
            </p>
          </div>
          <blockquote className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur sm:p-8">
            <p className="font-heading text-lg leading-relaxed text-white md:text-xl">
              &ldquo;The right room removes friction from the work. Our job is to make
              that room easy to find, easy to book, and ready when you walk in.&rdquo;
            </p>
            <footer className="mt-5 flex items-center gap-3 text-sm text-white/55">
              <span aria-hidden className="h-px w-8 bg-[#3B82F6]" />
              The StudioSpace team
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Our mission"
                title="Make exceptional studios accessible"
                description="Great creative work deserves a great room — without the back-and-forth, opaque pricing, or guesswork that traditionally comes with renting production space."
              />
              <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-[#0B1F3A]/65 md:text-base">
                <p>
                  StudioSpace began with a simple frustration: finding a bookable,
                  professional studio took longer than the session itself. We built a
                  marketplace where hosts publish verified spaces and creators can see
                  rates, hours, and amenities before they commit.
                </p>
                <p>
                  Today the platform connects independent hosts with photographers,
                  filmmakers, musicians, podcasters, and event teams who need reliable
                  rooms by the hour — in one consistent, premium experience.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#0B1F3A]/10 bg-[#0B1F3A]/[0.03] p-7 sm:p-9">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
                Our purpose
              </p>
              <ul className="mt-6 flex flex-col gap-6">
                <li className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
                    <Sparkles aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-[#0B1F3A]">
                      Remove friction from booking
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#0B1F3A]/60">
                      Clear hourly pricing, instant confirmation, and one dashboard for
                      every request.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
                    <Users aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-[#0B1F3A]">
                      Grow the creator community
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#0B1F3A]/60">
                      Give hosts a dignified way to share their spaces and give creators
                      a reliable network of rooms.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
                    <HeartHandshake aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-[#0B1F3A]">
                      Keep both sides protected
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#0B1F3A]/60">
                      Confirmed bookings lock the room, pending requests stay cancellable,
                      and overlap is prevented server-side.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0B1F3A]/5 py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Creator community"
            title="Built with hosts and creators"
            description="StudioSpace is a two-sided community. Every booking is a collaboration between the people who open their doors and the people who walk through them."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-[#0B1F3A]/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_48px_-24px_rgba(59,130,246,0.4)] sm:p-9">
              <span className="flex size-12 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                <Camera className="size-5" aria-hidden strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-heading text-xl font-semibold text-[#0B1F3A]">
                For creators
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0B1F3A]/65 md:text-base">
                Photographers, directors, musicians, podcasters, and workshop hosts use
                StudioSpace to lock in professional rooms without negotiating every
                detail. Search by craft, compare rates, select your hours, and show up
                ready to work.
              </p>
              <ul className="mt-5 flex flex-col gap-2.5 text-sm text-[#0B1F3A]/65">
                <li className="flex items-center gap-2.5">
                  <span aria-hidden className="size-1.5 rounded-full bg-[#3B82F6]" />
                  Transparent hourly pricing before you commit
                </li>
                <li className="flex items-center gap-2.5">
                  <span aria-hidden className="size-1.5 rounded-full bg-[#3B82F6]" />
                  One dashboard for every booking request
                </li>
                <li className="flex items-center gap-2.5">
                  <span aria-hidden className="size-1.5 rounded-full bg-[#3B82F6]" />
                  Cancel pending requests when plans change
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#0B1F3A]/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_48px_-24px_rgba(59,130,246,0.4)] sm:p-9">
              <span className="flex size-12 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                <Handshake className="size-5" aria-hidden strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-heading text-xl font-semibold text-[#0B1F3A]">
                For hosts
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0B1F3A]/65 md:text-base">
                Independent owners and professional facilities list their spaces once and
                reach creators who are ready to book. You define the rate, the amenities,
                and the capacity — StudioSpace handles discovery and scheduling.
              </p>
              <ul className="mt-5 flex flex-col gap-2.5 text-sm text-[#0B1F3A]/65">
                <li className="flex items-center gap-2.5">
                  <span aria-hidden className="size-1.5 rounded-full bg-[#3B82F6]" />
                  Publish, edit, and manage listings from your dashboard
                </li>
                <li className="flex items-center gap-2.5">
                  <span aria-hidden className="size-1.5 rounded-full bg-[#3B82F6]" />
                  Overlapping confirmed bookings are blocked automatically
                </li>
                <li className="flex items-center gap-2.5">
                  <span aria-hidden className="size-1.5 rounded-full bg-[#3B82F6]" />
                  Reach creators actively searching by category and city
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we stand for"
            title="Principles behind every listing"
            description="These values shape how we design the product and how we treat the community that uses it."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className="flex flex-col items-start gap-4 rounded-xl border border-[#0B1F3A]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3B82F6]/40 hover:shadow-[0_16px_40px_-20px_rgba(59,130,246,0.5)]"
                >
                  <span className="flex size-12 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-heading text-base font-semibold text-[#0B1F3A]">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#0B1F3A]/60">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[#0B1F3A]/10 bg-[#0B1F3A]/[0.03] py-16 md:py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#0B1F3A] md:text-3xl">
              Join the StudioSpace community
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#0B1F3A]/60 md:text-base">
              Create an account to start booking hours, or list your space and meet the
              creators looking for it.
            </p>
            <Separator className="mt-6 bg-[#0B1F3A]/10" />
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              render={<Link href="/studios" />}
              nativeButton={false}
              size="lg"
              className="bg-[#3B82F6] px-6 font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB]"
            >
              Explore studios
              <ArrowRight aria-hidden className="size-4" />
            </Button>
            <Button
              render={<Link href="/register" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="border-[#0B1F3A]/25 px-6 font-medium tracking-[0.1em] text-[#0B1F3A] uppercase transition-all hover:border-[#3B82F6] hover:text-[#3B82F6]"
            >
              Register
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
