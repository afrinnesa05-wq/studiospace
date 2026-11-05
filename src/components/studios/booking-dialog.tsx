
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CalendarDays, Clock } from "lucide-react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { ApiError, createBooking } from "@/lib/studios-api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type BookingDialogProps = {
  studio: {
    id: string
    name: string
    pricePerHour: number
  }
}

function todayIso(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function hoursBetween(
  startTime: string,
  endTime: string
): number | null {
  if (!startTime || !endTime) return null

  const [startHour, startMinute] = startTime.split(":").map(Number)
  const [endHour, endMinute] = endTime.split(":").map(Number)

  if (
    !Number.isInteger(startHour) ||
    !Number.isInteger(startMinute) ||
    !Number.isInteger(endHour) ||
    !Number.isInteger(endMinute)
  ) {
    return null
  }

  const start = startHour * 60 + startMinute
  const end = endHour * 60 + endMinute

  if (start < 0 || start >= 1440 || end < 0 || end >= 1440) {
    return null
  }

  if (end <= start) return null

  return (end - start) / 60
}

function formatAmount(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2)
}

function BookingDialog({ studio }: BookingDialogProps) {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  const [open, setOpen] = useState(false)
  const [bookingDate, setBookingDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{
    bookingDate?: string
    time?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const hours = hoursBetween(startTime, endTime)
  const total = hours !== null ? hours * studio.pricePerHour : null
   console.log("Start:", startTime)
console.log("End:", endTime)
console.log("Hours:", hours)
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!session?.user.email) {
      toast.error("Please sign in to request a booking.")
      return
    }

    const nextErrors: typeof fieldErrors = {}

    if (!bookingDate) {
      nextErrors.bookingDate = "Choose a booking date."
    }

    if (!startTime || !endTime) {
      nextErrors.time = "Choose both a start and an end time."
    } else if (hours === null) {
      nextErrors.time = "End time must be later than start time."
    }

    setFieldErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields.")
      return
    }

    try {
      setIsSubmitting(true)

      await createBooking({
        studioId: studio.id,
        bookingDate,
        startTime,
        endTime,
        userName: session.user.name || session.user.email,
        userEmail: session.user.email,
      })

      toast.success("Booking requested — track it in My Bookings.")

      setOpen(false)
      setBookingDate("")
      setStartTime("")
      setEndTime("")
      setFieldErrors({})

      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "Could not send the booking request. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isPending) {
    return (
      <span
        className="mt-7 block h-12 w-full animate-pulse rounded-xl bg-white/10"
        aria-hidden
      />
    )
  }

  if (!session) {
    return (
      <Button
        render={<Link href="/login" />}
        nativeButton={false}
        className="mt-7 w-full bg-[#3B82F6] text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB]"
      >
        Sign in to book
      </Button>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="mt-7 w-full bg-[#3B82F6] text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB]" />
        }
      >
        Book This Studio
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book {studio.name}</DialogTitle>
          <DialogDescription>
            Request your hours at ${studio.pricePerHour}/hour. The booking stays
            pending until it is confirmed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="booking-date" className="flex items-center gap-2">
              <CalendarDays aria-hidden className="size-4 text-[#3B82F6]" />
              Booking date
            </Label>

            <Input
              id="booking-date"
              type="date"
              min={todayIso()}
              value={bookingDate}
              onChange={(event) => {
                setBookingDate(event.target.value)
                setFieldErrors((previous) => ({
                  ...previous,
                  bookingDate: undefined,
                }))
              }}
              aria-invalid={fieldErrors.bookingDate ? true : undefined}
              required
            />

            {fieldErrors.bookingDate ? (
              <p className="text-xs font-medium text-red-600" role="alert">
                {fieldErrors.bookingDate}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="booking-start">Start time</Label>

              <Input
                id="booking-start"
                type="time"
                step={300}
                value={startTime}
                onChange={(event) => {
                  setStartTime(event.target.value)
                  setFieldErrors((previous) => ({
                    ...previous,
                    time: undefined,
                  }))
                }}
                aria-invalid={fieldErrors.time ? true : undefined}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="booking-end">End time</Label>

              <Input
                id="booking-end"
                type="time"
                step={300}
                min={startTime || undefined}
                value={endTime}
                onChange={(event) => {
                  setEndTime(event.target.value)
                  setFieldErrors((previous) => ({
                    ...previous,
                    time: undefined,
                  }))
                }}
                aria-invalid={fieldErrors.time ? true : undefined}
                required
              />
            </div>
          </div>

          {fieldErrors.time ? (
            <p className="text-xs font-medium text-red-600" role="alert">
              {fieldErrors.time}
            </p>
          ) : null}

          <div className="flex items-center justify-between rounded-xl border border-[#0B1F3A]/10 bg-[#0B1F3A]/[0.04] px-4 py-3 text-sm">
            <span className="flex items-center gap-2 text-[#0B1F3A]/60">
              <Clock aria-hidden className="size-4 text-[#3B82F6]" />

              {hours !== null
                ? `${formatAmount(hours)} hour${hours === 1 ? "" : "s"}`
                : "Select valid hours"}
            </span>

            <span className="font-heading text-lg font-semibold text-[#0B1F3A]">
              {total !== null ? `$${formatAmount(total)}` : "—"}
            </span>
          </div>

          <DialogFooter showCloseButton className="mt-1">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#3B82F6] text-sm font-medium tracking-[0.1em] text-white uppercase hover:bg-[#2563EB]"
            >
              {isSubmitting ? "Sending..." : "Request Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { BookingDialog }
