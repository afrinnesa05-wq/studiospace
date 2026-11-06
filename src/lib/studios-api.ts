
import { authClient } from "@/lib/auth-client"

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export type ExploreStudio = {
  id: string
  name: string
  category: string
  description: string
  location: string
  pricePerHour: number
  rating: number
  amenities: string[]
  hostName?: string
  hostEmail?: string
  maxCapacity?: number
  imageUrl?: string
  securityDeposit?: number
}

export type StudioSort =
  | "newest"
  | "oldest"
  | "price_asc"
  | "price_desc"
  | "rating_asc"
  | "rating_desc"

export type StudioListParams = {
  search?: string
  category?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  sort?: StudioSort
  page?: number
  limit?: number
  signal?: AbortSignal
}

export type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type StudioListResult = {
  studios: ExploreStudio[]
  pagination: Pagination
}

export type StudioInput = {
  title: string
  category: string
  description: string
  hourlyRate: number
  location: string
  hostName: string
  hostEmail: string
  securityDeposit?: number
  maxCapacity?: number
  imageUrl?: string
  amenities?: string[]
}

export type BookingStatus = "Pending" | "Confirmed" | "Cancelled"

export type Booking = {
  id: string
  studioId: string
  studioTitle: string
  userName: string
  userEmail: string
  bookingDate: string
  startTime: string
  endTime: string
  hourlyRate: number
  totalPrice: number
  status: BookingStatus
  createdAt?: string
  updatedAt?: string
}

export type BookingInput = {
  studioId: string
  bookingDate: string
  startTime: string
  endTime: string
  userName: string
  userEmail: string
}

export class ApiError extends Error {
  readonly status: number
  readonly errors?: string[]

  constructor(message: string, status: number, errors?: string[]) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.errors = errors
  }
}

type ApiEnvelope = {
  success?: boolean
  message?: string
  errors?: string[]
}

// Common API request function with JWT authentication
async function request<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  let res: Response

  try {
    let token: string | undefined

    const { data, error } = await authClient.token()

    if (error) {
      console.error("JWT token error:", error.message)
    } else {
      token = data?.token
    }

    const headers = new Headers(init?.headers)

    if (init?.body) {
      headers.set("Content-Type", "application/json")
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }

    res = await fetch(`${API_BASE}${path}`, {
      ...init,
      credentials: "include",
      cache: "no-store",
      headers,
    })
  } catch (error) {
    console.error("API request error:", error)

    throw new ApiError(
      `Could not reach the studio API at ${API_BASE}. Check the server or authentication.`,
      0
    )
  }

  let body: (ApiEnvelope & Record<string, unknown>) | null = null

  try {
    body = (await res.json()) as ApiEnvelope & Record<string, unknown>
  } catch {
    body = null
  }

  if (!res.ok || body?.success === false) {
    throw new ApiError(
      body?.message ||
        `The studio API returned an error (status ${res.status}).`,
      res.status,
      body?.errors
    )
  }

  if (body === null) {
    throw new ApiError(
      "The studio API returned an unexpected response.",
      res.status
    )
  }

  return body as T
}

type ApiStudioDoc = {
  _id: string
  title?: string
  category?: string
  description?: string
  location?: string
  hourlyRate?: number
  securityDeposit?: number
  maxCapacity?: number
  rating?: number
  amenities?: string[]
  hostName?: string
  hostEmail?: string
  imageUrl?: string
}

function mapStudio(doc: ApiStudioDoc): ExploreStudio {
  return {
    id: doc._id,
    name: doc.title || "Untitled studio",
    category: doc.category || "Uncategorized",
    description: doc.description || "",
    location: doc.location || "",
    pricePerHour:
      typeof doc.hourlyRate === "number" ? doc.hourlyRate : 0,
    rating: typeof doc.rating === "number" ? doc.rating : 0,
    amenities: Array.isArray(doc.amenities) ? doc.amenities : [],
    hostName: doc.hostName,
    hostEmail: doc.hostEmail,
    maxCapacity: doc.maxCapacity,
    imageUrl: doc.imageUrl || undefined,
    securityDeposit: doc.securityDeposit,
  }
}

const OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/

function buildQuery(params: StudioListParams): string {
  const query = new URLSearchParams()

  if (params.search?.trim()) {
    query.set("search", params.search.trim())
  }

  if (params.category?.trim()) {
    query.set("category", params.category.trim())
  }

  if (params.location?.trim()) {
    query.set("location", params.location.trim())
  }

  if (
    typeof params.minPrice === "number" &&
    !Number.isNaN(params.minPrice)
  ) {
    query.set("minPrice", String(params.minPrice))
  }

  if (
    typeof params.maxPrice === "number" &&
    !Number.isNaN(params.maxPrice)
  ) {
    query.set("maxPrice", String(params.maxPrice))
  }

  if (params.sort) query.set("sort", params.sort)
  if (params.page !== undefined) query.set("page", String(params.page))
  if (params.limit !== undefined) query.set("limit", String(params.limit))

  const value = query.toString()
  return value ? `?${value}` : ""
}

export async function fetchStudios(
  params: StudioListParams = {}
): Promise<StudioListResult> {
  const { signal, ...rest } = params

  const body = await request<{
    success: boolean
    data: ApiStudioDoc[]
    pagination?: Omit<Pagination, "hasNextPage" | "hasPrevPage">
  }>(`/api/studios${buildQuery(rest)}`, { signal })

  const data = Array.isArray(body.data) ? body.data : []
  const page = body.pagination?.page ?? rest.page ?? 1
  const limit = body.pagination?.limit ?? rest.limit ?? data.length ?? 10
  const total = body.pagination?.total ?? data.length

  const totalPages =
    body.pagination?.totalPages ??
    (limit > 0 ? Math.max(1, Math.ceil(total / limit)) : 1)

  return {
    studios: data.map(mapStudio),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  }
}

export async function fetchFeaturedStudios(
  limit = 6
): Promise<ExploreStudio[]> {
  const result = await fetchStudios({
    sort: "rating_desc",
    limit,
  })

  return result.studios
}

export async function fetchCategoryCounts(
  categories: readonly string[]
): Promise<Record<string, number>> {
  const entries = await Promise.all(
    categories.map(async (category) => {
      const result = await fetchStudios({
        category,
        limit: 1,
      })

      return [category, result.pagination.total] as const
    })
  )

  return Object.fromEntries(entries)
}

export async function fetchStudioById(
  id: string,
  signal?: AbortSignal
): Promise<ExploreStudio | null> {
  if (!OBJECT_ID_PATTERN.test(id)) return null

  try {
    const body = await request<{
      success: boolean
      data: ApiStudioDoc
    }>(`/api/studios/${encodeURIComponent(id)}`, { signal })

    return mapStudio(body.data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null
    }

    throw error
  }
}

export async function createStudio(
  input: StudioInput
): Promise<ExploreStudio> {
  const body = await request<{
    success: boolean
    data: ApiStudioDoc
  }>("/api/studios", {
    method: "POST",
    body: JSON.stringify(input),
  })

  return mapStudio(body.data)
}

export async function updateStudio(
  id: string,
  input: Partial<StudioInput>
): Promise<ExploreStudio> {
  const body = await request<{
    success: boolean
    data: ApiStudioDoc
  }>(`/api/studios/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(input),
  })

  return mapStudio(body.data)
}

export async function deleteStudio(id: string): Promise<void> {
  await request(`/api/studios/${encodeURIComponent(id)}`, {
    method: "DELETE",
  })
}

export async function fetchMyStudios(
  hostEmail: string,
  signal?: AbortSignal
): Promise<ExploreStudio[]> {
  const email = hostEmail.trim().toLowerCase()
  const owned: ExploreStudio[] = []
  const maxPages = 20

  for (let page = 1; page <= maxPages; page += 1) {
    const result = await fetchStudios({
      limit: 100,
      page,
      sort: "newest",
      signal,
    })

    owned.push(
      ...result.studios.filter(
        (studio) => studio.hostEmail?.trim().toLowerCase() === email
      )
    )

    if (!result.pagination.hasNextPage) break
  }

  return owned
}

type ApiBookingDoc = {
  _id: string
  studioId: string
  studioTitle?: string
  userName?: string
  userEmail?: string
  bookingDate: string
  startTime: string
  endTime: string
  hourlyRate?: number
  totalPrice?: number
  status?: string
  createdAt?: string
  updatedAt?: string
}

function mapBooking(doc: ApiBookingDoc): Booking {
  const status = doc.status

  return {
    id: doc._id,
    studioId: String(doc.studioId),
    studioTitle: doc.studioTitle || "Studio",
    userName: doc.userName || "",
    userEmail: doc.userEmail || "",
    bookingDate: doc.bookingDate,
    startTime: doc.startTime,
    endTime: doc.endTime,
    hourlyRate:
      typeof doc.hourlyRate === "number" ? doc.hourlyRate : 0,
    totalPrice:
      typeof doc.totalPrice === "number" ? doc.totalPrice : 0,
    status:
      status === "Confirmed" || status === "Cancelled"
        ? status
        : "Pending",
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }
}

export async function fetchMyBookings(
  email: string,
  signal?: AbortSignal
): Promise<Booking[]> {
  const query = new URLSearchParams({ email })

  const body = await request<{
    success: boolean
    data: ApiBookingDoc[]
  }>(
    `/api/bookings/my-bookings?${query.toString()}`,
    { signal }
  )

  return Array.isArray(body.data)
    ? body.data.map(mapBooking)
    : []
}

export async function createBooking(
  input: BookingInput
): Promise<Booking> {
  const body = await request<{
    success: boolean
    data: ApiBookingDoc
  }>("/api/bookings", {
    method: "POST",
    body: JSON.stringify(input),
  })

  return mapBooking(body.data)
}

export async function cancelBooking(
  id: string,
  email: string
): Promise<void> {
  await request(
    `/api/bookings/${encodeURIComponent(id)}/cancel`,
    {
      method: "PATCH",
      body: JSON.stringify({ email }),
    }
  )
}

export const studioCategories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
] as const
