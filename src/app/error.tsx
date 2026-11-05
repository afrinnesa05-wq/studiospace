"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex flex-1 items-center justify-center bg-[#0B1F3A]/[0.03] px-4 py-24">
      <div className="w-full max-w-lg text-center">
        <h1 className="font-heading text-2xl font-semibold text-[#0B1F3A] md:text-3xl">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#0B1F3A]/60">
          An unexpected error occurred while rendering this page. Try again, or
          head back to the homepage.
        </p>
        <Button
          onClick={reset}
          className="mt-8 bg-[#3B82F6] text-sm font-medium tracking-[0.1em] text-white uppercase hover:bg-[#2563EB]"
        >
          Try again
        </Button>
      </div>
    </main>
  )
}
