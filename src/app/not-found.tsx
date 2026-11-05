import Link from "next/link"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#0B1F3A]/[0.03] px-4 py-24">
      <div className="w-full max-w-lg text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <p className="mt-10 font-heading text-6xl font-semibold tracking-tight text-[#3B82F6] sm:text-7xl">
          404
        </p>
        <h1 className="mt-4 font-heading text-2xl font-semibold text-[#0B1F3A] md:text-3xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#0B1F3A]/60">
          The link may be outdated, or the studio you&apos;re looking for was
          removed from the catalog.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            render={<Link href="/" />}
            nativeButton={false}
            className="bg-[#3B82F6] text-sm font-medium tracking-[0.1em] text-white uppercase hover:bg-[#2563EB]"
          >
            Back to Home
          </Button>
          <Button
            render={<Link href="/studios" />}
            nativeButton={false}
            variant="outline"
            className="border-[#0B1F3A]/20 text-[#0B1F3A] hover:border-[#3B82F6] hover:text-[#3B82F6]"
          >
            Explore Studios
          </Button>
        </div>
      </div>
    </main>
  )
}
