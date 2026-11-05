"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  LayoutDashboard,
  PlusCircle,
  Search,
  UserRound,
} from "lucide-react"

import { Logo } from "@/components/logo"
import { authClient } from "@/lib/auth-client"
import { fetchMyBookings, fetchMyStudios } from "@/lib/studios-api"

const navigation = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Studio Listings", href: "/my-listings", icon: Building2 },
  { label: "Add New Studio", href: "/add-studio", icon: PlusCircle },
  { label: "My Bookings", href: "/my-bookings", icon: CalendarDays },
  { label: "My Profile", href: "/profile", icon: UserRound },
]

type StatsState = {
  status: "loading" | "ready" | "error"
  studios: number
  bookings: number
  pending: number
}

const initialStats: StatsState = {
  status: "loading",
  studios: 0,
  bookings: 0,
  pending: 0,
}

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession()
  const [stats, setStats] = useState<StatsState>(initialStats)

  useEffect(() => {
    if (isPending || !session?.user.email) return

    const controller = new AbortController()
    const email = session.user.email

    Promise.all([
      fetchMyStudios(email, controller.signal),
      fetchMyBookings(email, controller.signal),
    ])
      .then(([studios, bookings]) => {
        if (controller.signal.aborted) return
        setStats({
          status: "ready",
          studios: studios.length,
          bookings: bookings.length,
          pending: bookings.filter((booking) => booking.status === "Pending")
            .length,
        })
      })
      .catch(() => {
        if (controller.signal.aborted) return
        setStats({ ...initialStats, status: "error" })
      })

    return () => controller.abort()
  }, [isPending, session?.user.email])

  if (isPending) {
    return (
      <main className="flex-1 bg-[#0B1F3A]/5 p-8">
        <div className="mx-auto max-w-7xl animate-pulse space-y-5">
          <div className="h-10 w-64 rounded-lg bg-[#0B1F3A]/10" />
          <div className="h-32 rounded-2xl bg-[#0B1F3A]/10" />
          <div className="grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-32 rounded-2xl bg-[#0B1F3A]/10" />
            ))}
          </div>
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
            Sign in to see your studios, bookings, and activity in one place.
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

  const user = session.user

  const statItems = [
    {
      title: "Total Studios",
      value: stats.status === "ready" ? String(stats.studios) : "—",
      note:
        stats.status === "error"
          ? "Couldn't reach the studio API"
          : "Your listed spaces",
      loading: stats.status === "loading",
    },
    {
      title: "Total Bookings",
      value: stats.status === "ready" ? String(stats.bookings) : "—",
      note:
        stats.status === "error"
          ? "Couldn't reach the studio API"
          : "All reservations",
      loading: stats.status === "loading",
    },
    {
      title: "Pending Bookings",
      value: stats.status === "ready" ? String(stats.pending) : "—",
      note:
        stats.status === "error"
          ? "Couldn't reach the studio API"
          : "Awaiting confirmation",
      loading: stats.status === "loading",
    },
  ]

  return (
    <main className="flex-1 bg-[#0B1F3A]/5 text-[#0B1F3A]">
      <div className="mx-auto flex w-full max-w-[1600px]">
        <aside className="hidden w-64 shrink-0 border-r border-[#0B1F3A]/10 bg-white p-6 md:block">
          <Link
            href="/"
            aria-label="StudioSpace home"
            className="inline-flex items-center"
          >
            <Logo />
          </Link>

          <p className="mb-8 mt-3 text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
            Creator Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  item.href === "/dashboard"
                    ? "bg-[#0B1F3A] text-white"
                    : "text-[#0B1F3A]/70 hover:bg-[#0B1F3A]/5 hover:text-[#0B1F3A]"
                }`}
              >
                <item.icon aria-hidden className="size-4 shrink-0" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-12 rounded-2xl border border-[#3B82F6]/20 bg-[#3B82F6]/5 p-4">
            <p className="text-sm font-semibold text-[#0B1F3A]">
              Create something amazing.
            </p>
            <p className="mt-2 text-xs leading-5 text-[#0B1F3A]/60">
              Your creative space journey starts here.
            </p>
            <Link
              href="/add-studio"
              className="mt-4 inline-block text-sm font-semibold text-[#3B82F6] transition-colors hover:text-[#2563EB]"
            >
              + Add a Studio
            </Link>
          </div>
        </aside>

        <section className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
                <span aria-hidden className="h-px w-8 bg-[#3B82F6]" />
                Creator Dashboard
              </p>
              <h1 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-[#0B1F3A] sm:text-3xl">
                Overview
              </h1>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#0B1F3A]/20 bg-white px-4 py-2.5 text-sm font-medium text-[#0B1F3A] transition hover:border-[#3B82F6] hover:text-[#3B82F6]"
            >
              Visit Website
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </header>

          <section className="mt-8 overflow-hidden rounded-2xl bg-[#0B1F3A] p-6 text-white sm:p-9">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
              Welcome to StudioSpace
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome back, {user.name || "Creator"}!
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
              Manage your creative spaces, keep track of bookings, and make
              room for your next great idea.
            </p>
            <Link
              href="/add-studio"
              className="mt-6 inline-block rounded-lg bg-[#3B82F6] px-5 py-3 text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB]"
            >
              + Add New Studio
            </Link>
          </section>

          <section className="mt-8">
            <h2 className="font-heading text-lg font-semibold text-[#0B1F3A]">
              Your Activity
            </h2>
            <p className="mt-1 text-sm text-[#0B1F3A]/60">
              A quick overview of your workspace activities.
            </p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {statItems.map((stat) => (
                <article
                  key={stat.title}
                  className="rounded-2xl border border-[#0B1F3A]/10 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(11,31,58,0.35)]"
                >
                  <p className="text-sm font-medium text-[#0B1F3A]/60">
                    {stat.title}
                  </p>
                  {stat.loading ? (
                    <div className="mt-4 h-9 w-16 animate-pulse rounded bg-[#0B1F3A]/10" />
                  ) : (
                    <p className="mt-4 font-heading text-3xl font-semibold text-[#0B1F3A]">
                      {stat.value}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-[#0B1F3A]/40">{stat.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[#0B1F3A]/10 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(11,31,58,0.35)]">
            <h2 className="font-heading text-lg font-semibold text-[#0B1F3A]">
              Quick Actions
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Link
                href="/studios"
                className="rounded-xl border border-[#0B1F3A]/10 p-5 transition hover:border-[#3B82F6]/60 hover:bg-[#3B82F6]/5"
              >
                <Search aria-hidden className="size-6 text-[#3B82F6]" />
                <h3 className="mt-3 font-heading font-semibold text-[#0B1F3A]">
                  Explore Studios
                </h3>
                <p className="mt-1 text-sm text-[#0B1F3A]/60">
                  Discover creative spaces for your next project.
                </p>
              </Link>

              <Link
                href="/my-bookings"
                className="rounded-xl border border-[#0B1F3A]/10 p-5 transition hover:border-[#3B82F6]/60 hover:bg-[#3B82F6]/5"
              >
                <CalendarDays aria-hidden className="size-6 text-[#3B82F6]" />
                <h3 className="mt-3 font-heading font-semibold text-[#0B1F3A]">
                  My Bookings
                </h3>
                <p className="mt-1 text-sm text-[#0B1F3A]/60">
                  View and manage your reservations.
                </p>
              </Link>
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}
