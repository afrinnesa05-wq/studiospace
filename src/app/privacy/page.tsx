import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy — StudioSpace",
}

function PrivacyPage() {
  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
          <span aria-hidden className="h-px w-8 bg-[#3B82F6]" />
          Legal
        </p>
        <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-[#0B1F3A] md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#0B1F3A]/60">
          This page is a placeholder so footer navigation works during
          development. The full privacy policy will be published here before
          launch.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-[#3B82F6] transition-colors hover:text-[#2563EB]"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Back to home
        </Link>
      </div>
    </main>
  )
}

export default PrivacyPage
