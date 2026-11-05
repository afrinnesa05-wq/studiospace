"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { CategoryIcon } from "@/components/studios/studio-listing-card"
import { authClient } from "@/lib/auth-client"
import {
  ApiError,
  deleteStudio,
  fetchMyStudios,
  type ExploreStudio,
} from "@/lib/studios-api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Status = "loading" | "ready" | "error"

function toErrorMessage(error: unknown) {
  return error instanceof ApiError ? error.message : "Could not load your listings."
}

function ListingsSkeleton() {
  return (
    <div
      className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      aria-busy="true"
      aria-label="Loading your listings"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div className="aspect-[16/10] w-full animate-pulse rounded-xl bg-[#0B1F3A]/5" />
          <div className="h-4 w-24 animate-pulse rounded bg-[#0B1F3A]/5" />
          <div className="h-6 w-3/4 animate-pulse rounded bg-[#0B1F3A]/5" />
          <div className="h-9 w-full animate-pulse rounded bg-[#0B1F3A]/5" />
        </div>
      ))}
    </div>
  )
}

export default function MyListingsPage() {
  const { data: session, isPending } = authClient.useSession()

  const [status, setStatus] = useState<Status>("loading")
  const [studios, setStudios] = useState<ExploreStudio[]>([])
  const [errorMessage, setErrorMessage] = useState("")
  const [pendingDelete, setPendingDelete] = useState<ExploreStudio | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchListings = useCallback(
    (email: string, signal?: AbortSignal) =>
      fetchMyStudios(email, signal).then((data) => {
        setStudios(data)
        setStatus("ready")
      }),
    []
  )

  useEffect(() => {
    if (isPending || !session?.user.email) return

    const controller = new AbortController()

    fetchListings(session.user.email, controller.signal).catch((error) => {
      if (controller.signal.aborted) return
      setErrorMessage(toErrorMessage(error))
      setStatus("error")
    })

    return () => controller.abort()
  }, [isPending, session?.user.email, fetchListings])

  function handleRetry() {
    if (!session?.user.email) return
    setStatus("loading")
    setErrorMessage("")
    fetchListings(session.user.email).catch((error) => {
      setErrorMessage(toErrorMessage(error))
      setStatus("error")
    })
  }

  async function handleDelete() {
    if (!pendingDelete) return

    try {
      setIsDeleting(true)
      await deleteStudio(pendingDelete.id)
      setStudios((previous) =>
        previous.filter((studio) => studio.id !== pendingDelete.id)
      )
      setPendingDelete(null)
      toast.success(`"${pendingDelete.name}" was deleted.`)
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "Could not delete the studio. Please try again."
      )
    } finally {
      setIsDeleting(false)
    }
  }

  if (isPending) {
    return (
      <main className="flex-1 bg-[#0B1F3A]/5 p-8">
        <div className="mx-auto max-w-7xl animate-pulse space-y-5">
          <div className="h-10 w-64 rounded-lg bg-[#0B1F3A]/10" />
          <ListingsSkeleton />
        </div>
      </main>
    )
  }

  if (!session) {
    return (
      <main className="flex flex-1 items-center justify-center bg-[#0B1F3A]/5 px-4 py-16">
        <div className="max-w-md px-4 text-center">
          <h1 className="font-heading text-2xl font-semibold text-[#0B1F3A]">
            Please Sign In
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#0B1F3A]/60">
            Your studio listings are tied to your host account. Sign in to
            manage them.
          </p>
          <Link
            href="/login"
            className="mt-5 inline-block rounded-lg bg-[#3B82F6] px-6 py-3 text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB]"
          >
            Go to Sign In
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 bg-[#0B1F3A]/5 px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
              <span aria-hidden className="h-px w-8 bg-[#3B82F6]" />
              Host Workspace
            </p>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[#0B1F3A] md:text-4xl">
              My Studio Listings
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#0B1F3A]/60">
              Every studio published under {session.user.email}. Edit details or
              remove listings you no longer offer.
            </p>
          </div>

          <Button
            render={<Link href="/add-studio" />}
            nativeButton={false}
            className="bg-[#3B82F6] text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB]"
          >
            + Add New Studio
          </Button>
        </div>

        <div className="mt-8">
          {status === "loading" ? <ListingsSkeleton /> : null}

          {status === "error" ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#0B1F3A]/10 bg-white px-6 py-16 text-center">
              <h2 className="font-heading text-lg font-semibold text-[#0B1F3A]">
                We couldn&apos;t load your listings
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-[#0B1F3A]/60">
                {errorMessage}
              </p>
              <Button
                onClick={handleRetry}
                className="bg-[#3B82F6] px-6 text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB]"
              >
                Try again
              </Button>
            </div>
          ) : null}

          {status === "ready" && studios.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#0B1F3A]/20 bg-white px-6 py-16 text-center">
              <h2 className="font-heading text-lg font-semibold text-[#0B1F3A]">
                You haven&apos;t listed a studio yet
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-[#0B1F3A]/60">
                Publish your first space and it will appear in the Explore
                catalog for creators to book.
              </p>
              <Button
                render={<Link href="/add-studio" />}
                nativeButton={false}
                className="bg-[#3B82F6] px-6 text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB]"
              >
                Add Your First Studio
              </Button>
            </div>
          ) : null}

          {status === "ready" && studios.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {studios.map((studio) => (
                <Card
                  key={studio.id}
                  className="gap-0 overflow-hidden p-0 ring-1 ring-[#0B1F3A]/10"
                >
                  <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#0B1F3A]">
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.4),transparent_65%)]"
                    />
                    <CategoryIcon
                      category={studio.category}
                      className="relative size-12 text-[#3B82F6]"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-[#3B82F6] px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.1em] text-white uppercase">
                      {studio.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div>
                      <h2 className="font-heading text-lg font-semibold text-[#0B1F3A]">
                        {studio.name}
                      </h2>
                      {studio.location ? (
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-[#0B1F3A]/60">
                          <MapPin aria-hidden className="size-3.5 text-[#3B82F6]" />
                          {studio.location}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-between border-t border-[#0B1F3A]/10 pt-4 text-sm">
                      <span className="font-heading text-lg font-semibold text-[#0B1F3A]">
                        ${studio.pricePerHour}
                        <span className="text-sm font-normal text-[#0B1F3A]/60">
                          /hour
                        </span>
                      </span>
                      {studio.maxCapacity ? (
                        <span className="text-xs font-medium tracking-[0.08em] text-[#0B1F3A]/40 uppercase">
                          Up to {studio.maxCapacity}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-auto flex gap-3">
                      <Button
                        render={<Link href={`/studios/edit/${studio.id}`} />}
                        nativeButton={false}
                        variant="outline"
                        className="flex-1 border-[#0B1F3A]/20 text-[#0B1F3A] hover:border-[#3B82F6] hover:text-[#3B82F6]"
                      >
                        <Pencil aria-hidden className="size-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setPendingDelete(studio)}
                        className="flex-1 border-red-200 text-red-600 hover:border-red-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 aria-hidden className="size-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <Dialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setPendingDelete(null)
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete this listing?</DialogTitle>
            <DialogDescription>
              &quot;{pendingDelete?.name}&quot; will be removed from the Explore
              catalog. This action can&apos;t be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>
            <Button
              variant="outline"
              onClick={() => setPendingDelete(null)}
              disabled={isDeleting}
              className="border-[#0B1F3A]/20"
            >
              Cancel
            </Button>
            <Button
              onClick={() => void handleDelete()}
              disabled={isDeleting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete Studio"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}

