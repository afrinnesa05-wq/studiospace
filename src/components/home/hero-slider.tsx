"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { heroSlides } from "@/lib/home-data"

const AUTOPLAY_MS = 7000

function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = heroSlides.length

  useEffect(() => {
    if (paused) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [paused, count])

  const goTo = (next: number) => {
    setIndex((next + count) % count)
  }

  return (
    <section
      aria-label="Featured studios"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-[#0B1F3A]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-12%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.28),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-60 left-[-10%] size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_65%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid py-16 md:py-24">
          {heroSlides.map((slide, i) => {
            const Icon = slide.icon
            const isActive = i === index
            return (
              <div
                key={slide.id}
                aria-hidden={!isActive}
                inert={!isActive}
                className={cn(
                  "[grid-area:1/1] transition-opacity duration-700 ease-out",
                  isActive
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                )}
              >
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                  <div className="flex flex-col items-start">
                    <p className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
                      {slide.eyebrow}
                    </p>
                    <h1 className="mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-white text-balance md:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                      {slide.description}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button
                        render={<Link href="/studios" />}
                        size="lg"
                        className="bg-[#3B82F6] px-6 font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all duration-300 hover:-translate-y-px hover:bg-[#2563EB] hover:shadow-[0_6px_22px_-6px_rgba(59,130,246,0.85)] active:translate-y-0"
                      >
                        Explore Studios
                      </Button>
                      <Button
                        render={<Link href="#how-it-works" />}
                        variant="outline"
                        size="lg"
                        className="border-white/40 bg-transparent px-6 font-medium tracking-[0.1em] text-white uppercase transition-all duration-300 hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 hover:text-white hover:shadow-[0_0_18px_-6px_rgba(59,130,246,0.6)]"
                      >
                        How it works
                      </Button>
                    </div>
                  </div>

                  <div className="relative hidden size-80 shrink-0 items-center justify-center self-center justify-self-center lg:flex xl:size-96">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-white/10"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-8 rounded-full border border-[#3B82F6]/30"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-16 rounded-full border border-white/10"
                    />
                    <Icon
                      aria-hidden
                      className="relative size-20 text-[#3B82F6] drop-shadow-[0_0_24px_rgba(59,130,246,0.6)] xl:size-24"
                      strokeWidth={1.5}
                    />
                    <span className="absolute right-0 bottom-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur">
                      <Sparkles
                        aria-hidden
                        className="size-3.5 text-[#3B82F6]"
                      />
                      Hand-picked premium spaces
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 py-6">
          <div className="flex items-center gap-4">
            <p className="font-mono text-sm text-white/50 tabular-nums">
              <span className="text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(count).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-2">
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}: ${slide.eyebrow}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index
                      ? "w-8 bg-[#3B82F6]"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  )}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => goTo(index - 1)}
              className="flex size-10 items-center justify-center rounded-lg border border-white/20 text-white transition-all duration-300 hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 hover:text-[#3B82F6]"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => goTo(index + 1)}
              className="flex size-10 items-center justify-center rounded-lg border border-white/20 text-white transition-all duration-300 hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 hover:text-[#3B82F6]"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HeroSlider }
