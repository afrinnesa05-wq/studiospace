"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react"
import { cn } from "cn"

import { StudioListingCard } from "@/components/studios/studio-listing-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ApiError,
  fetchStudios,
  studioCategories,
  type ExploreStudio,
  type Pagination,
} from "@/lib/studios-api"

type Status = "loading" | "ready" | "error"

type SortOption =
  | "newest"
  | "oldest"
  | "price_asc"
  | "price_desc"
  | "rating_asc"
  | "rating_desc"

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Recommended" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "rating_desc", label: "Top rated" },
  { value: "rating_asc", label: "Rating: low to high" },
  { value: "oldest", label: "Oldest first" },
]

const PAGE_SIZE = 9

const chipClass =
  "rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-300"

function normalizeCategory(value: string | null | undefined): string | null {
  if (!value) return null
  const match = studioCategories.find(
    (item) => item.toLowerCase() === value.trim().toLowerCase()
  )
  return match ?? null
}

type StudioExplorerProps = {
  initialCategory?: string | null
}

function StudioExplorer({ initialCategory = null }: StudioExplorerProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<string>(
    () => normalizeCategory(initialCategory) ?? "All"
  )
  const [location, setLocation] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [sort, setSort] = useState<SortOption>("newest")
  const [page, setPage] = useState(1)
  const [retryTick, setRetryTick] = useState(0)

  const [debouncedFilters, setDebouncedFilters] = useState({
    query: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  })

  const [status, setStatus] = useState<Status>("loading")
  const [studios, setStudios] = useState<ExploreStudio[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      const changed =
        debouncedFilters.query !== query ||
        debouncedFilters.location !== location ||
        debouncedFilters.minPrice !== minPrice ||
        debouncedFilters.maxPrice !== maxPrice
      if (!changed) return

      setDebouncedFilters({ query, location, minPrice, maxPrice })
      setPage(1)
      setStatus("loading")
    }, 300)
    return () => clearTimeout(timer)
  }, [query, location, minPrice, maxPrice, debouncedFilters])

  useEffect(() => {
    const controller = new AbortController()

    fetchStudios({
      search: debouncedFilters.query || undefined,
      category: category === "All" ? undefined : category,
      location: debouncedFilters.location || undefined,
      minPrice: debouncedFilters.minPrice
        ? Number(debouncedFilters.minPrice)
        : undefined,
      maxPrice: debouncedFilters.maxPrice
        ? Number(debouncedFilters.maxPrice)
        : undefined,
      sort,
      page,
      limit: PAGE_SIZE,
      signal: controller.signal,
    })
      .then((result) => {
        setStudios(result.studios)
        setPagination(result.pagination)
        setStatus("ready")
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setErrorMessage(
          error instanceof ApiError
            ? error.message
            : error instanceof Error
              ? error.message
              : "Could not reach the studio catalog."
        )
        setStatus("error")
      })

    return () => controller.abort()
  }, [debouncedFilters, category, sort, page, retryTick])

  const hasActiveFilters =
    query !== "" ||
    category !== "All" ||
    location !== "" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    sort !== "newest"

  function resetFilters() {
    setQuery("")
    setCategory("All")
    setLocation("")
    setMinPrice("")
    setMaxPrice("")
    setSort("newest")
    setDebouncedFilters({ query: "", location: "", minPrice: "", maxPrice: "" })
    setPage(1)
    setErrorMessage("")
    setStatus("loading")
  }

  const totalResults = pagination?.total ?? null
  const catalogIsEmpty =
    status === "ready" && totalResults === 0 && !hasActiveFilters

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl border border-[#0B1F3A]/10 bg-white p-5 shadow-[0_16px_40px_-28px_rgba(11,31,58,0.35)] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#0B1F3A]/50 uppercase">
            <SlidersHorizontal aria-hidden className="size-3.5 text-[#3B82F6]" />
            Filter studios
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#3B82F6] transition-colors hover:text-[#2563EB]"
            >
              <X aria-hidden className="size-3.5" />
              Reset filters
            </button>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Category filters">
          {["All", ...studioCategories].map((item) => {
            const active = category === item
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item)
                  setPage(1)
                  setStatus("loading")
                }}
                aria-pressed={active}
                className={cn(
                  chipClass,
                  active
                    ? "border-[#3B82F6] bg-[#3B82F6] text-white shadow-[0_4px_14px_-6px_rgba(59,130,246,0.65)]"
                    : "border-[#0B1F3A]/15 bg-white text-[#0B1F3A]/70 hover:border-[#3B82F6]/50 hover:text-[#3B82F6]"
                )}
              >
                {item}
              </button>
            )
          })}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-1.5 md:col-span-2 lg:col-span-1">
            <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-[#0B1F3A]/50 uppercase">
              Search
            </span>
            <span className="relative">
              <Search
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#0B1F3A]/35"
              />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Studio name or keyword"
                className="h-10 rounded-lg border-[#0B1F3A]/15 bg-white pl-9 text-sm text-[#0B1F3A] placeholder:text-[#0B1F3A]/35 focus-visible:border-[#3B82F6] focus-visible:ring-2 focus-visible:ring-[#3B82F6]/30"
              />
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-[#0B1F3A]/50 uppercase">
              Location
            </span>
            <Input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="City or neighborhood"
              className="h-10 rounded-lg border-[#0B1F3A]/15 bg-white text-sm text-[#0B1F3A] placeholder:text-[#0B1F3A]/35 focus-visible:border-[#3B82F6] focus-visible:ring-2 focus-visible:ring-[#3B82F6]/30"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-[#0B1F3A]/50 uppercase">
              Min $/hr
            </span>
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              placeholder="0"
              className="h-10 rounded-lg border-[#0B1F3A]/15 bg-white text-sm text-[#0B1F3A] placeholder:text-[#0B1F3A]/35 focus-visible:border-[#3B82F6] focus-visible:ring-2 focus-visible:ring-[#3B82F6]/30"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-[#0B1F3A]/50 uppercase">
              Max $/hr
            </span>
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="Any"
              className="h-10 rounded-lg border-[#0B1F3A]/15 bg-white text-sm text-[#0B1F3A] placeholder:text-[#0B1F3A]/35 focus-visible:border-[#3B82F6] focus-visible:ring-2 focus-visible:ring-[#3B82F6]/30"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-[#0B1F3A]/50 uppercase">
            Sort by
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as SortOption)
                setPage(1)
                setStatus("loading")
              }}
              className="h-9 rounded-lg border border-[#0B1F3A]/15 bg-white px-2.5 text-sm font-medium tracking-normal text-[#0B1F3A] normal-case outline-none transition-colors focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          {status === "ready" && totalResults !== null ? (
            <p className="text-sm text-[#0B1F3A]/55" aria-live="polite">
              {totalResults === 0
                ? "No studios match"
                : `${totalResults} studio${totalResults === 1 ? "" : "s"} found`}
            </p>
          ) : null}
        </div>
      </div>

      {status === "loading" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading studios">
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <div key={index} className="flex flex-col gap-3">
              <Skeleton className="aspect-[16/10] w-full rounded-xl" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      ) : null}

      {status === "error" ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#0B1F3A]/10 bg-white px-6 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-[#3B82F6]/10 text-[#3B82F6]">
            <AlertTriangle aria-hidden className="size-5" />
          </span>
          <div>
            <h3 className="font-heading text-lg font-semibold text-[#0B1F3A]">
              We couldn&apos;t load the catalog
            </h3>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[#0B1F3A]/60">
              {errorMessage} Make sure the studio API is running on port 8000,
              then try again.
            </p>
          </div>
          <Button
            onClick={() => {
              setStatus("loading")
              setErrorMessage("")
              setRetryTick((value) => value + 1)
            }}
            className="bg-[#3B82F6] px-6 text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB]"
          >
            Try again
          </Button>
        </div>
      ) : null}

      {catalogIsEmpty ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#0B1F3A]/20 bg-[#0B1F3A]/[0.03] px-6 py-16 text-center">
          <h3 className="font-heading text-lg font-semibold text-[#0B1F3A]">
            No studios listed yet
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-[#0B1F3A]/60">
            The catalog is empty right now. Once hosts publish their spaces,
            they&apos;ll appear here with search and filters.
          </p>
        </div>
      ) : null}

      {status === "ready" && !catalogIsEmpty && totalResults === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#0B1F3A]/20 bg-[#0B1F3A]/[0.03] px-6 py-16 text-center">
          <h3 className="font-heading text-lg font-semibold text-[#0B1F3A]">
            No matches for these filters
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-[#0B1F3A]/60">
            Try a different category, location, or price range.
          </p>
          <Button
            onClick={resetFilters}
            variant="outline"
            className="border-[#0B1F3A]/20 text-[#0B1F3A] hover:border-[#3B82F6] hover:text-[#3B82F6]"
          >
            Clear filters
          </Button>
        </div>
      ) : null}

      {status === "ready" && studios.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <StudioListingCard key={studio.id} studio={studio} />
          ))}
        </div>
      ) : null}

      {status === "ready" && pagination && pagination.totalPages > 1 ? (
        <nav
          className="flex flex-wrap items-center justify-center gap-4"
          aria-label="Pagination"
        >
          <Button
            variant="outline"
            disabled={!pagination.hasPrevPage}
            onClick={() => {
              const next = Math.max(1, page - 1)
              if (next === page) return
              setStatus("loading")
              setPage(next)
            }}
            className="border-[#0B1F3A]/20 text-[#0B1F3A] hover:border-[#3B82F6] hover:text-[#3B82F6] disabled:opacity-40"
          >
            <ChevronLeft aria-hidden className="size-4" />
            Previous
          </Button>
          <span className="text-sm font-medium text-[#0B1F3A]/60" aria-live="polite">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            disabled={!pagination.hasNextPage}
            onClick={() => {
              if (!pagination.hasNextPage) return
              setStatus("loading")
              setPage(page + 1)
            }}
            className="border-[#0B1F3A]/20 text-[#0B1F3A] hover:border-[#3B82F6] hover:text-[#3B82F6] disabled:opacity-40"
          >
            Next
            <ChevronRight aria-hidden className="size-4" />
          </Button>
        </nav>
      ) : null}
    </div>
  )
}

export { StudioExplorer }
