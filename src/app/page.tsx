import Link from "next/link"
import { ArrowRight, Check, Clock, ShieldCheck } from "lucide-react"

import { CategoryCard } from "@/components/home/category-card"
import { HeroSlider } from "@/components/home/hero-slider"
import { SectionHeading } from "@/components/home/section-heading"
import { StudioCard } from "@/components/home/studio-card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  aboutStats,
  categories,
  featuredStudios,
  guarantees,
  howItWorksSteps,
} from "@/lib/home-data"

const trustPoints = [
  { icon: ShieldCheck, label: "Verified spaces" },
  { icon: Clock, label: "Instant confirmation" },
  { icon: Check, label: "Flexible cancellation" },
] as const

function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <HeroSlider />

      <section className="bg-[#0B1F3A]/5 py-20 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Featured studios"
              title="Spaces creators book again and again"
              description="Hand-picked rooms with transparent pricing and honest reviews."
            />
            <Button
              render={<Link href="/studios" />}
              nativeButton={false}
              variant="outline"
              className="border-[#0B1F3A]/20 bg-transparent font-medium tracking-[0.1em] text-[#0B1F3A] uppercase transition-all duration-300 hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 hover:text-[#3B82F6]"
            >
              View all studios
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredStudios.map((studio) => (
              <StudioCard key={studio.id} studio={studio} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Categories"
            title="Browse by categories"
            description="From daylight lofts to soundproofed booths — find the space that fits your craft."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-16 bg-[#0B1F3A] py-20 md:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How booking works"
            title="From search to studio in four steps"
            description="No endless email chains. No surprise fees. Just the space you need, when you need it."
            tone="dark"
            align="center"
          />
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step) => {
              const Icon = step.icon
              return (
                <li
                  key={step.number}
                  className="relative rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-[#3B82F6]/40"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#3B82F6]">
                      <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-sm font-medium tracking-[0.14em] text-[#3B82F6] tabular-nums">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="bg-[#0B1F3A]/5 py-20 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our promise"
            title="Host Guarantee & Creator Support"
            description="Every booking is backed by real protections — for the people who open their doors and the people who walk through them."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((guarantee) => {
              const Icon = guarantee.icon
              return (
                <div
                  key={guarantee.id}
                  className="flex flex-col items-start gap-4 rounded-xl border border-[#0B1F3A]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3B82F6]/40 hover:shadow-[0_16px_40px_-20px_rgba(59,130,246,0.5)]"
                >
                  <span className="flex size-12 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-heading text-base font-semibold text-[#0B1F3A]">
                    {guarantee.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#0B1F3A]/60">
                    {guarantee.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-16 bg-white py-20 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="About us"
                title="Built for creators, by creators"
                description="StudioSpace began with a simple frustration: finding a great studio shouldn't take longer than the session itself. We partner with independent hosts and professional facilities to put hundreds of verified spaces a few clicks away."
              />
              <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2">
                {aboutStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-[#0B1F3A]/10 bg-white p-5"
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="font-heading text-3xl font-semibold text-[#0B1F3A]">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-xs font-medium tracking-[0.1em] text-[#0B1F3A]/60 uppercase">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl bg-[#0B1F3A] p-8 md:p-12">
              <ul className="flex flex-col gap-5">
                {trustPoints.map((point) => {
                  const Icon = point.icon
                  return (
                    <li key={point.label} className="flex items-center gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#3B82F6]">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <span className="font-heading text-base font-medium text-white">
                        {point.label}
                      </span>
                    </li>
                  )
                })}
              </ul>
              <Separator className="my-8 bg-white/10" />
              <p className="text-sm leading-relaxed text-white/60">
                Every listing is reviewed by our team before it goes live, so
                what you see is what you get — accurate photos, honest
                amenities, and transparent hourly rates.
              </p>
              <Button
                render={<Link href="/studios" />}
                nativeButton={false}
                className="mt-8 w-full bg-[#3B82F6] font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all duration-300 hover:-translate-y-px hover:bg-[#2563EB] hover:shadow-[0_6px_22px_-6px_rgba(59,130,246,0.85)] active:translate-y-0"
              >
                Explore Studios
                <ArrowRight aria-hidden className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
