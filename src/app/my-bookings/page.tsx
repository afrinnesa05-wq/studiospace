
"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { CalendarDays, Clock, MapPin } from "lucide-react"
import { toast } from "sonner"
import { cn } from "cn"

import { authClient } from "@/lib/auth-client"
import {
  ApiError,
  cancelBooking,
  fetchMyBookings,
  type Booking,
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
  return error instanceof ApiError ? error.message : "Could not load your bookings."
}

const statusStyles: Record<Booking["status"], string> = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  Confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
  Cancelled: "bg-[#0B1F3A]/10 text-[#0B1F3A]/60 dark:bg-white/10 dark:text-[#CBD5E1]",
}

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function BookingsSkeleton() {
  return (
    <div
      className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      aria-busy="true"
      aria-label="Loading your bookings"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-56 animate-pulse rounded-2xl bg-[#0B1F3A]/5 dark:bg-white/10"
        />
      ))}
    </div>
  )
}

export default function MyBookingsPage() {
  const { data: session, isPending } = authClient.useSession()

  const [status, setStatus] = useState<Status>("loading")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [errorMessage, setErrorMessage] = useState("")
  const [pendingCancel, setPendingCancel] = useState<Booking | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)

  const fetchBookings = useCallback(
    (email: string, signal?: AbortSignal) =>
      fetchMyBookings(email, signal).then((data) => {
        setBookings(data)
        setStatus("ready")
      }),
    []
  )

  useEffect(() => {
    if (isPending || !session?.user.email) return

    const controller = new AbortController()

    fetchBookings(session.user.email, controller.signal).catch((error) => {
      if (controller.signal.aborted) return
      setErrorMessage(toErrorMessage(error))
      setStatus("error")
    })

    return () => controller.abort()
  }, [isPending, session?.user.email, fetchBookings])

  function handleRetry() {
    if (!session?.user.email) return
    setStatus("loading")
    setErrorMessage("")
    fetchBookings(session.user.email).catch((error) => {
      setErrorMessage(toErrorMessage(error))
      setStatus("error")
    })
  }

  async function handleCancel() {
    if (!pendingCancel || !session?.user.email) return

    try {
      setIsCancelling(true)
      await cancelBooking(pendingCancel.id, session.user.email)
      setBookings((previous) =>
        previous.map((booking) =>
          booking.id === pendingCancel.id
            ? { ...booking, status: "Cancelled" as const }
            : booking
        )
      )
      setPendingCancel(null)
      toast.success("Your booking request was cancelled.")
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "Could not cancel the booking. Please try again."
      )
    } finally {
      setIsCancelling(false)
    }
  }

  if (isPending) {
    return (
      <main className="flex-1 bg-[#0B1F3A]/5 p-8 dark:bg-[#101827]">
        <div className="mx-auto max-w-7xl animate-pulse space-y-5">
          <div className="h-10 w-64 rounded-lg bg-[#0B1F3A]/10 dark:bg-white/10" />
          <BookingsSkeleton />
        </div>
      </main>
    )
  }

  if (!session) {
    return (
      <main className="flex flex-1 items-center justify-center bg-[#0B1F3A]/5 px-4 py-16 dark:bg-[#101827]">
        <div className="max-w-md px-4 text-center">
          <h1 className="font-heading text-2xl font-semibold text-[#0B1F3A] dark:text-[#F8FAFC]">
            Please Sign In
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
            Your bookings are tied to your account. Sign in to view and manage
            them.
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
    <main className="flex-1 bg-[#0B1F3A]/5 px-4 py-12 dark:bg-[#101827] md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
              <span aria-hidden className="h-px w-8 bg-[#3B82F6]" />
              Creator Workspace
            </p>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[#0B1F3A] dark:text-[#F8FAFC] md:text-4xl">
              My Bookings
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
              Every reservation you&apos;ve requested, with its date, time, and
              price. Pending requests can be cancelled at any time.
            </p>
          </div>

          <Button
            render={<Link href="/studios" />}
            nativeButton={false}
            variant="outline"
            className="border-[#0B1F3A]/20 text-[#0B1F3A] hover:border-[#3B82F6] hover:text-[#3B82F6] dark:border-white/20 dark:text-[#F8FAFC] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
          >
            Explore Studios
          </Button>
        </div>

        <div className="mt-8">
          {status === "loading" ? <BookingsSkeleton /> : null}

          {status === "error" ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#0B1F3A]/10 bg-white px-6 py-16 text-center dark:border-white/15 dark:bg-[#1B2638]">
              <h2 className="font-heading text-lg font-semibold text-[#0B1F3A] dark:text-[#F8FAFC]">
                We couldn&apos;t load your bookings
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
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

          {status === "ready" && bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#0B1F3A]/20 bg-white px-6 py-16 text-center dark:border-white/20 dark:bg-[#1B2638]">
              <h2 className="font-heading text-lg font-semibold text-[#0B1F3A] dark:text-[#F8FAFC]">
                No bookings yet
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
                When you request a studio, the booking shows up here with its
                date, time, price, and status.
              </p>
              <Button
                render={<Link href="/studios" />}
                nativeButton={false}
                className="bg-[#3B82F6] px-6 text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB]"
              >
                Find a Studio
              </Button>
            </div>
          ) : null}

          {status === "ready" && bookings.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {bookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="gap-4 border border-[#0B1F3A]/10 bg-white p-6 ring-1 ring-[#0B1F3A]/10 dark:border-white/20 dark:bg-[#1B2638] dark:text-[#F8FAFC] dark:ring-white/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-heading text-lg font-semibold text-[#0B1F3A] dark:text-[#F8FAFC]">
                      {booking.studioTitle}
                    </h2>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.1em] uppercase",
                        statusStyles[booking.status]
                      )}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2.5 text-sm text-[#0B1F3A]/70 dark:text-[#CBD5E1]">
                    <li className="flex items-center gap-2.5">
                      <CalendarDays aria-hidden className="size-4 text-[#3B82F6]" />
                      {formatDate(booking.bookingDate)}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Clock aria-hidden className="size-4 text-[#3B82F6]" />
                      {booking.startTime} – {booking.endTime}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <MapPin aria-hidden className="size-4 text-[#3B82F6]" />
                      Hosted by {booking.userName || "the studio host"}
                    </li>
                  </ul>

                  <div className="flex items-center justify-between border-t border-[#0B1F3A]/10 pt-4 dark:border-white/15">
                    <span className="text-sm text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
                      Total price
                    </span>
                    <span className="font-heading text-xl font-semibold text-[#0B1F3A] dark:text-[#F8FAFC]">
                      ${booking.totalPrice}
                    </span>
                  </div>

                  {booking.status === "Pending" ? (
                    <Button
                      variant="outline"
                      onClick={() => setPendingCancel(booking)}
                      className="border-red-200 text-red-600 hover:border-red-400 hover:bg-red-50 hover:text-red-600 dark:border-red-400/40 dark:text-red-400 dark:hover:border-red-400 dark:hover:bg-red-400/10 dark:hover:text-red-300"
                    >
                      Cancel Booking
                    </Button>
                  ) : null}
                </Card>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <Dialog
        open={pendingCancel !== null}
        onOpenChange={(open) => {
          if (!open && !isCancelling) setPendingCancel(null)
        }}
      >
        <DialogContent className="dark:border-white/15 dark:bg-[#1B2638] dark:text-[#F8FAFC]">
          <DialogHeader>
            <DialogTitle className="dark:text-[#F8FAFC]">
              Cancel this booking?
            </DialogTitle>
            <DialogDescription className="dark:text-[#CBD5E1]">
              {pendingCancel
                ? `${pendingCancel.studioTitle} on ${formatDate(pendingCancel.bookingDate)} (${pendingCancel.startTime} – ${pendingCancel.endTime}) will be cancelled.`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>
            <Button
              variant="outline"
              onClick={() => setPendingCancel(null)}
              disabled={isCancelling}
              className="border-[#0B1F3A]/20 dark:border-white/20 dark:text-[#F8FAFC] dark:hover:bg-white/10"
            >
              Keep Booking
            </Button>
            <Button
              onClick={() => void handleCancel()}
              disabled={isCancelling}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isCancelling ? "Cancelling..." : "Cancel Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
