
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import {
  ApiError,
  createStudio,
  studioCategories,
  updateStudio,
  type ExploreStudio,
} from "@/lib/studios-api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const amenitiesList = [
  "Professional Lighting",
  "Air Conditioning",
  "Soundproofing",
  "High-Speed Wi-Fi",
  "Parking",
  "Makeup Room",
  "Changing Room",
  "Equipment Included",
]

type StudioDraft = {
  title: string
  category: string
  description: string
  location: string
  hourlyRate: string
  securityDeposit: string
  maxCapacity: string
  imageUrl: string
  amenities: string[]
}

type StudioFormErrors = Partial<Record<keyof StudioDraft, string>>

type StudioFormProps = {
  mode: "create" | "edit"
  studio?: ExploreStudio
}

function emptyDraft(): StudioDraft {
  return {
    title: "",
    category: "",
    description: "",
    location: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    imageUrl: "",
    amenities: [],
  }
}

function draftFromStudio(studio: ExploreStudio): StudioDraft {
  return {
    title: studio.name,
    category: studio.category,
    description: studio.description,
    location: studio.location,
    hourlyRate: studio.pricePerHour ? String(studio.pricePerHour) : "",
    securityDeposit: studio.securityDeposit
      ? String(studio.securityDeposit)
      : "",
    maxCapacity: studio.maxCapacity ? String(studio.maxCapacity) : "",
    imageUrl: studio.imageUrl || "",
    amenities: studio.amenities,
  }
}

function validateDraft(draft: StudioDraft): StudioFormErrors {
  const errors: StudioFormErrors = {}

  if (!draft.title.trim()) {
    errors.title = "Studio name is required."
  }

  if (!draft.category.trim()) {
    errors.category = "Choose a category."
  }

  if (!draft.description.trim()) {
    errors.description = "Add a short description of your studio."
  }

  if (!draft.location.trim()) {
    errors.location = "Add the studio address or area."
  }

  const rate = Number(draft.hourlyRate)

  if (!draft.hourlyRate.trim() || !Number.isFinite(rate) || rate <= 0) {
    errors.hourlyRate = "Enter an hourly rate greater than 0."
  }

  if (draft.securityDeposit.trim()) {
    const deposit = Number(draft.securityDeposit)

    if (!Number.isFinite(deposit) || deposit < 0) {
      errors.securityDeposit = "Enter a valid deposit amount."
    }
  }

  const capacity = Number(draft.maxCapacity)

  if (
    !draft.maxCapacity.trim() ||
    !Number.isInteger(capacity) ||
    capacity < 1
  ) {
    errors.maxCapacity = "Enter a whole number of at least 1."
  }

  if (
    draft.imageUrl.trim() &&
    !/^https?:\/\/\S+$/i.test(draft.imageUrl.trim())
  ) {
    errors.imageUrl =
      "Enter a valid image URL starting with http:// or https://."
  }

  return errors
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null

  return (
    <p className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
      {message}
    </p>
  )
}

function FormSkeleton() {
  return (
    <div
      className="grid items-start gap-8 lg:grid-cols-[1fr_320px]"
      aria-busy="true"
    >
      <div className="space-y-7">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-64 animate-pulse rounded-2xl border border-[#0B1F3A]/10 bg-[#0B1F3A]/5 dark:border-[#526783] dark:bg-[#202F46]"
          />
        ))}
      </div>

      <div className="h-96 animate-pulse rounded-2xl bg-[#0B1F3A]/5 dark:border dark:border-[#526783] dark:bg-[#202F46]" />
    </div>
  )
}

function NoticePanel({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string
  description: string
  actionLabel: string
  actionHref: string
}) {
  return (
    <div className="rounded-2xl border border-[#0B1F3A]/10 bg-white p-10 text-center shadow-[0_16px_40px_-28px_rgba(11,31,58,0.35)] dark:border-[#526783] dark:bg-[#202F46]">
      <h2 className="font-heading text-xl font-semibold text-[#0B1F3A] dark:text-[#F8FAFC]">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
        {description}
      </p>

      <Button
        render={<Link href={actionHref} />}
        nativeButton={false}
        className="mt-6 bg-[#3B82F6] text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB]"
      >
        {actionLabel}
      </Button>
    </div>
  )
}

function StudioForm({ mode, studio }: StudioFormProps) {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  const [draft, setDraft] = useState<StudioDraft>(() =>
    studio ? draftFromStudio(studio) : emptyDraft()
  )

  const [errors, setErrors] = useState<StudioFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField<K extends keyof StudioDraft>(
    key: K,
    value: StudioDraft[K]
  ) {
    setDraft((previous) => ({
      ...previous,
      [key]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [key]: undefined,
    }))
  }

  function toggleAmenity(amenity: string) {
    setDraft((previous) => ({
      ...previous,
      amenities: previous.amenities.includes(amenity)
        ? previous.amenities.filter((item) => item !== amenity)
        : [...previous.amenities, amenity],
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateDraft(draft)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      const fieldLabels: Record<string, string> = {
        title: "Studio Name",
        category: "Category",
        description: "Studio Description",
        location: "Studio Address",
        hourlyRate: "Hourly Rate",
        securityDeposit: "Security Deposit",
        maxCapacity: "Maximum Capacity",
        imageUrl: "Studio Image URL",
      }

      const missingFields = Object.keys(nextErrors)
        .map((field) => fieldLabels[field] || field)
        .join(", ")

      toast.error(`Please check these fields: ${missingFields}`)

      const firstErrorField = Object.keys(nextErrors)[0]

      const fieldElement =
        document.getElementById(firstErrorField) ||
        document.querySelector(`[name="${firstErrorField}"]`)

      fieldElement?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })

      if (fieldElement instanceof HTMLElement) {
        fieldElement.focus({ preventScroll: true })
      }

      return
    }

    const payload = {
      title: draft.title.trim(),
      category: draft.category,
      description: draft.description.trim(),
      hourlyRate: Number(draft.hourlyRate),
      location: draft.location.trim(),
      securityDeposit: draft.securityDeposit.trim()
        ? Number(draft.securityDeposit)
        : 0,
      maxCapacity: Number(draft.maxCapacity),
      imageUrl: draft.imageUrl.trim() || undefined,
      amenities: draft.amenities,
    }

    try {
      setIsSubmitting(true)

      if (mode === "edit" && studio) {
        await updateStudio(studio.id, payload)

        toast.success("Studio updated successfully.")

        router.push("/my-listings")
        router.refresh()
      } else {
        await createStudio({
          ...payload,
          hostName: session?.user.name?.trim() || "StudioSpace Host",
          hostEmail: session?.user.email || "",
        })

        toast.success("Studio published successfully.")

        router.push("/my-listings")
        router.refresh()
      }
    } catch (error) {
      if (error instanceof ApiError) {
        const detail = error.errors?.length
          ? `${error.message} ${error.errors.join(" ")}`
          : error.message

        toast.error(detail)
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isPending) {
    return <FormSkeleton />
  }

  if (!session) {
    return (
      <NoticePanel
        title="Sign in to continue"
        description="Host accounts are required to publish or edit a studio listing. Sign in (or create an account) to continue."
        actionLabel="Go to Sign In"
        actionHref="/login"
      />
    )
  }

  if (
    mode === "edit" &&
    studio?.hostEmail &&
    session.user.email?.toLowerCase() !== studio.hostEmail.toLowerCase()
  ) {
    return (
      <NoticePanel
        title="This listing isn't yours"
        description="You can only edit studios published with your own host account."
        actionLabel="Back to My Listings"
        actionHref="/my-listings"
      />
    )
  }

  const cardClass =
    "overflow-hidden rounded-2xl border border-[#0B1F3A]/10 bg-white shadow-[0_16px_40px_-28px_rgba(11,31,58,0.35)] dark:border-[#526783] dark:bg-[#202F46]"

  const headerClass =
    "border-b border-[#0B1F3A]/10 bg-white px-6 py-6 md:px-8 dark:border-[#526783] dark:bg-[#263750]"

  const titleClass =
    "text-xl font-semibold text-[#0B1F3A] dark:text-[#F8FAFC]"

  const descriptionClass =
    "text-[#0B1F3A]/60 dark:text-[#CBD5E1]"

  const labelClass =
    "text-xs font-semibold tracking-[0.14em] text-[#0B1F3A] uppercase dark:text-[#E2E8F0]"

  const inputClass =
    "h-12 rounded-lg border-[#0B1F3A]/15 bg-white px-3.5 text-sm text-[#0B1F3A] placeholder:text-[#0B1F3A]/40 focus-visible:border-[#3B82F6] focus-visible:ring-2 focus-visible:ring-[#3B82F6]/30 dark:border-[#7189A8] dark:bg-[#172438] dark:text-[#F8FAFC] dark:placeholder:text-[#CBD5E1]/50 dark:focus-visible:border-[#60A5FA]"

  const optionClass =
    "flex cursor-pointer items-center gap-3 rounded-xl border border-[#0B1F3A]/15 bg-white p-4 transition hover:border-[#3B82F6]/60 hover:bg-[#3B82F6]/5 dark:border-[#526783] dark:bg-[#263750] dark:hover:border-[#60A5FA] dark:hover:bg-[#30435E]"

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-7">
          {/* 01 - Basic Details */}
          <Card className={cardClass}>
            <CardHeader className={headerClass}>
              <p className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
                01 — Basic Details
              </p>

              <CardTitle className={`mt-2 ${titleClass}`}>
                Tell us about your studio
              </CardTitle>

              <CardDescription className={descriptionClass}>
                Start with the essential information about your space.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 p-6 md:p-8">
              <div className="space-y-2">
                <Label className={labelClass} htmlFor="title">
                  Studio Name *
                </Label>

                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. The Creative Loft Studio"
                  required
                  value={draft.title}
                  onChange={(event) =>
                    updateField("title", event.target.value)
                  }
                  aria-invalid={errors.title ? true : undefined}
                  className={inputClass}
                />

                <FieldError message={errors.title} />
              </div>

              <div className="space-y-3">
                <Label className={labelClass}>
                  Choose a Category *
                </Label>

                <div className="grid gap-3 sm:grid-cols-2">
                  {studioCategories.map((category) => (
                    <label
                      key={category}
                      className={`${optionClass} ${
                        draft.category === category
                          ? "border-[#3B82F6] bg-[#3B82F6]/10 dark:border-[#60A5FA] dark:bg-[#30435E]"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        required
                        checked={draft.category === category}
                        onChange={() => updateField("category", category)}
                        className="h-4 w-4 accent-[#3B82F6]"
                      />

                      <span className="text-sm font-medium text-[#0B1F3A] dark:text-[#F8FAFC]">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>

                <FieldError message={errors.category} />
              </div>

              <div className="space-y-2">
                <Label className={labelClass} htmlFor="description">
                  Studio Description *
                </Label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your studio, its atmosphere, creative possibilities and what makes it special..."
                  required
                  value={draft.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  aria-invalid={errors.description ? true : undefined}
                  className="min-h-36 resize-y rounded-lg border-[#0B1F3A]/15 bg-white px-3.5 py-2.5 text-sm text-[#0B1F3A] placeholder:text-[#0B1F3A]/40 focus-visible:border-[#3B82F6] focus-visible:ring-2 focus-visible:ring-[#3B82F6]/30 dark:border-[#7189A8] dark:bg-[#172438] dark:text-[#F8FAFC] dark:placeholder:text-[#CBD5E1]/50 dark:focus-visible:border-[#60A5FA]"
                />

                <FieldError message={errors.description} />

                <p className="text-xs text-[#0B1F3A]/40 dark:text-[#94A3B8]">
                  Write a clear description to help creators understand your space.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 02 - Location */}
          <Card className={cardClass}>
            <CardHeader className={headerClass}>
              <p className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
                02 — Location
              </p>

              <CardTitle className={titleClass}>
                Where is your studio?
              </CardTitle>

              <CardDescription className={descriptionClass}>
                Help creators find your creative space.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 md:p-8">
              <div className="space-y-2">
                <Label className={labelClass} htmlFor="location">
                  Studio Address *
                </Label>

                <Input
                  id="location"
                  name="location"
                  placeholder="City, area or full address"
                  required
                  value={draft.location}
                  onChange={(event) =>
                    updateField("location", event.target.value)
                  }
                  aria-invalid={errors.location ? true : undefined}
                  className={inputClass}
                />

                <FieldError message={errors.location} />
              </div>
            </CardContent>
          </Card>

          {/* 03 - Pricing & Capacity */}
          <Card className={cardClass}>
            <CardHeader className={headerClass}>
              <p className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
                03 — Pricing & Capacity
              </p>

              <CardTitle className={titleClass}>
                Set your booking details
              </CardTitle>

              <CardDescription className={descriptionClass}>
                Let creators know your rates and studio capacity.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 p-6 sm:grid-cols-2 md:p-8">
              <div className="space-y-2">
                <Label className={labelClass} htmlFor="hourlyRate">
                  Hourly Rate (৳) *
                </Label>

                <Input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  min="1"
                  step="any"
                  placeholder="e.g. 1500"
                  required
                  value={draft.hourlyRate}
                  onChange={(event) =>
                    updateField("hourlyRate", event.target.value)
                  }
                  aria-invalid={errors.hourlyRate ? true : undefined}
                  className={inputClass}
                />

                <FieldError message={errors.hourlyRate} />
              </div>

              <div className="space-y-2">
                <Label className={labelClass} htmlFor="securityDeposit">
                  Security Deposit (৳)
                </Label>

                <Input
                  id="securityDeposit"
                  name="securityDeposit"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 2000"
                  value={draft.securityDeposit}
                  onChange={(event) =>
                    updateField("securityDeposit", event.target.value)
                  }
                  aria-invalid={errors.securityDeposit ? true : undefined}
                  className={inputClass}
                />

                <FieldError message={errors.securityDeposit} />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label className={labelClass} htmlFor="maxCapacity">
                  Maximum Capacity *
                </Label>

                <Input
                  id="maxCapacity"
                  name="maxCapacity"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="How many people can use this studio?"
                  required
                  value={draft.maxCapacity}
                  onChange={(event) =>
                    updateField("maxCapacity", event.target.value)
                  }
                  aria-invalid={errors.maxCapacity ? true : undefined}
                  className={inputClass}
                />

                <FieldError message={errors.maxCapacity} />
              </div>
            </CardContent>
          </Card>

          {/* 04 - Studio Visuals */}
          <Card className={cardClass}>
            <CardHeader className={headerClass}>
              <p className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
                04 — Studio Visuals
              </p>

              <CardTitle className={titleClass}>
                Showcase your space
              </CardTitle>

              <CardDescription className={descriptionClass}>
                Add a high-quality image that represents your studio.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 p-6 md:p-8">
              <div className="space-y-2">
                <Label className={labelClass} htmlFor="imageUrl">
                  Studio Image URL
                </Label>

                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/studio-image.jpg"
                  value={draft.imageUrl}
                  onChange={(event) =>
                    updateField("imageUrl", event.target.value)
                  }
                  aria-invalid={errors.imageUrl ? true : undefined}
                  className={inputClass}
                />

                <FieldError message={errors.imageUrl} />
              </div>

              {draft.imageUrl.trim() && (
                <div className="overflow-hidden rounded-xl border border-[#0B1F3A]/10 bg-[#0B1F3A]/5 p-2 dark:border-[#526783] dark:bg-[#263750]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={draft.imageUrl}
                    alt="Studio preview"
                    className="h-64 w-full rounded-lg object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none"
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* 05 - Facilities */}
          <Card className={cardClass}>
            <CardHeader className={headerClass}>
              <p className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
                05 — Facilities
              </p>

              <CardTitle className={titleClass}>
                What does your studio offer?
              </CardTitle>

              <CardDescription className={descriptionClass}>
                Select all facilities available in your space.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-3 p-6 sm:grid-cols-2 md:p-8">
              {amenitiesList.map((amenity) => {
                const isSelected = draft.amenities.includes(amenity)

                return (
                  <label
                    key={amenity}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      isSelected
                        ? "border-[#3B82F6] bg-[#3B82F6]/10 dark:border-[#60A5FA] dark:bg-[#30435E]"
                        : "border-[#0B1F3A]/15 bg-white hover:border-[#3B82F6]/60 dark:border-[#526783] dark:bg-[#263750] dark:hover:border-[#60A5FA] dark:hover:bg-[#30435E]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleAmenity(amenity)}
                      className="h-4 w-4 accent-[#3B82F6]"
                    />

                    <span className="text-sm font-medium text-[#0B1F3A] dark:text-[#F8FAFC]">
                      {amenity}
                    </span>
                  </label>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-8">
          <Card className="overflow-hidden rounded-2xl border border-[#405675] bg-[#0B1F3A] text-white shadow-lg dark:border-[#526783] dark:bg-[#172438]">
            <CardContent className="p-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#60A5FA] uppercase">
                StudioSpace Host
              </p>

              <h2 className="mt-4 font-heading text-2xl font-semibold leading-snug text-white">
                Your space. Their next big idea.
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/70">
                Create a detailed listing to help filmmakers,
                photographers and creators discover your studio.
              </p>

              <div className="my-6 h-px bg-white/15" />

              <p className="text-sm font-semibold text-white">
                Listing checklist
              </p>

              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li>01. Studio information</li>
                <li>02. Location details</li>
                <li>03. Pricing and capacity</li>
                <li>04. Studio photographs</li>
                <li>05. Available facilities</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-[#0B1F3A]/10 bg-white dark:border-[#526783] dark:bg-[#202F46]">
            <CardContent className="p-6">
              <p className="text-sm font-semibold text-[#0B1F3A] dark:text-[#F8FAFC]">
                A little tip
              </p>

              <p className="mt-2 text-sm leading-7 text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
                Use clear photos, accurate pricing and an honest
                description to make your listing more useful to creators.
              </p>
            </CardContent>
          </Card>

          <div className="rounded-2xl border border-[#3B82F6]/20 bg-[#3B82F6]/5 p-5 dark:border-[#526783] dark:bg-[#263750]">
            <p className="text-sm font-semibold text-[#0B1F3A] dark:text-[#F8FAFC]">
              Selected amenities
            </p>

            <p className="mt-2 font-heading text-3xl font-semibold text-[#3B82F6]">
              {draft.amenities.length}
            </p>

            <p className="mt-1 text-xs text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
              Facilities added to your listing
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full bg-[#3B82F6] text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all hover:bg-[#2563EB] disabled:opacity-60"
          >
            {isSubmitting
              ? mode === "edit"
                ? "Saving changes..."
                : "Publishing..."
              : mode === "edit"
                ? "Save Changes"
                : "Publish Studio"}
          </Button>

          <p className="text-center text-xs leading-5 text-[#0B1F3A]/40 dark:text-[#94A3B8]">
            {mode === "edit"
              ? "Your updates are saved to the live catalog."
              : "Your listing is published to the live catalog immediately."}
          </p>
        </aside>
      </div>
    </form>
  )
}

export { StudioForm }

