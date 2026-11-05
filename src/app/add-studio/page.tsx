
import { StudioForm } from "@/components/studios/studio-form"

export default function AddStudioPage() {
  return (
    <main className="flex-1 bg-[#0B1F3A]/5 px-4 py-12 dark:bg-[#101827] md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
            <span aria-hidden className="h-px w-8 bg-[#3B82F6]" />
            StudioSpace / Host Workspace
          </p>

          <h1 className="font-heading text-3xl font-semibold tracking-tight text-[#0B1F3A] dark:text-[#F8FAFC] md:text-4xl">
            List Your Creative Space
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#0B1F3A]/60 dark:text-[#CBD5E1] md:text-base">
            Bring your creative space to life. Share the details,
            showcase your facilities, and connect with creators.
          </p>
        </div>

        <StudioForm mode="create" />
      </div>
    </main>
  )
}
