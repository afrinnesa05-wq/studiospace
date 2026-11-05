import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { StudioForm } from "@/components/studios/studio-form"
import { Button } from "@/components/ui/button"
import { fetchStudioById } from "@/lib/studios-api"

type EditStudioPageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: EditStudioPageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const studio = await fetchStudioById(id)
    if (!studio) {
      return { title: "Studio not found — StudioSpace" }
    }
    return {
      title: `Edit ${studio.name} — StudioSpace`,
      description: "Update your studio listing details, pricing, and amenities.",
    }
  } catch {
    return { title: "Edit studio — StudioSpace" }
  }
}

export default async function EditStudioPage({ params }: EditStudioPageProps) {
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
      <main className="flex flex-1 items-center justify-center bg-[#0B1F3A]/5 px-4 py-16">
        <div className="max-w-lg text-center">
          <h1 className="font-heading text-2xl font-semibold text-[#0B1F3A]">
            Studio unavailable
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#0B1F3A]/60">
            We couldn&apos;t reach the studio API. Make sure it is running on
            port 8000, then reload this page.
          </p>
          <Button
            render={<Link href="/my-listings" />}
            nativeButton={false}
            className="mt-6 bg-[#3B82F6] text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB]"
          >
            Back to My Listings
          </Button>
        </div>
      </main>
    )
  }

  if (!studio) {
    notFound()
  }

  return (
    <main className="flex-1 bg-[#0B1F3A]/5 px-4 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
            <span aria-hidden className="h-px w-8 bg-[#3B82F6]" />
            StudioSpace / Host Workspace
          </p>

          <h1 className="font-heading text-3xl font-semibold tracking-tight text-[#0B1F3A] md:text-4xl">
            Edit {studio.name}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#0B1F3A]/60 md:text-base">
            Update your listing&apos;s details, pricing, and facilities. Changes
            go live in the catalog as soon as you save.
          </p>
        </div>

        <StudioForm mode="edit" studio={studio} />
      </div>
    </main>
  )
}
