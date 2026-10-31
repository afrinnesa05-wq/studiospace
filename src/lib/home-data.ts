import type { LucideIcon } from "lucide-react"
import {
  BadgeCheck,
  Camera,
  CalendarDays,
  Clapperboard,
  Clock,
  Headset,
  Lock,
  Mic,
  Music,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Star,
  Video,
} from "lucide-react"

export type HeroSlide = {
  id: string
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
}

export const heroSlides: HeroSlide[] = [
  {
    id: "photography",
    eyebrow: "Photography Studios",
    title: "Light, space, and the perfect frame",
    description:
      "Daylight lofts, cyclorama stages, and editorial sets — booked by the hour, ready when inspiration strikes.",
    icon: Camera,
  },
  {
    id: "music",
    eyebrow: "Music & Recording",
    title: "Where sound finds its home",
    description:
      "Acoustically treated rooms, live spaces, and rehearsal suites engineered for everything from demos to full albums.",
    icon: Music,
  },
  {
    id: "film",
    eyebrow: "Film & Video",
    title: "Scenes come alive here",
    description:
      "Soundstages, green screens, and production-ready rooms with industry gear and on-site support for crews of every size.",
    icon: Clapperboard,
  },
]

export type Category = {
  id: string
  label: string
  count: number
  href: string
  icon: LucideIcon
}

export const categories: Category[] = [
  {
    id: "photography",
    label: "Photography",
    count: 128,
    href: "/studios?category=photography",
    icon: Camera,
  },
  {
    id: "film",
    label: "Film & Video",
    count: 86,
    href: "/studios?category=film",
    icon: Video,
  },
  {
    id: "music",
    label: "Music & Recording",
    count: 74,
    href: "/studios?category=music",
    icon: Music,
  },
  {
    id: "events",
    label: "Events & Rehearsal",
    count: 52,
    href: "/studios?category=events",
    icon: CalendarDays,
  },
  {
    id: "podcasts",
    label: "Podcasts & Broadcast",
    count: 45,
    href: "/studios?category=podcasts",
    icon: Mic,
  },
]

export type Studio = {
  id: string
  name: string
  category: string
  location: string
  pricePerHour: number
  rating: number
  reviews: number
  badge?: string
  icon: LucideIcon
}

export const featuredStudios: Studio[] = [
  {
    id: "lumiere-photo-loft",
    name: "Lumière Photo Loft",
    category: "Photography",
    location: "SoHo, New York",
    pricePerHour: 85,
    rating: 4.9,
    reviews: 128,
    badge: "Popular",
    icon: Camera,
  },
  {
    id: "soundstage-42",
    name: "Soundstage 42",
    category: "Film & Video",
    location: "Burbank, Los Angeles",
    pricePerHour: 150,
    rating: 4.8,
    reviews: 94,
    badge: "New",
    icon: Clapperboard,
  },
  {
    id: "velvet-room",
    name: "Velvet Room Studio",
    category: "Music & Recording",
    location: "East Nashville",
    pricePerHour: 65,
    rating: 5.0,
    reviews: 76,
    badge: "Top rated",
    icon: Music,
  },
  {
    id: "atrium-events",
    name: "The Atrium",
    category: "Events & Rehearsal",
    location: "Wicker Park, Chicago",
    pricePerHour: 120,
    rating: 4.7,
    reviews: 61,
    icon: PartyPopper,
  },
  {
    id: "north-light-studio",
    name: "North Light Studio",
    category: "Photography",
    location: "Capitol Hill, Seattle",
    pricePerHour: 70,
    rating: 4.9,
    reviews: 112,
    icon: Sparkles,
  },
  {
    id: "the-cutting-room",
    name: "The Cutting Room",
    category: "Film & Video",
    location: "DUMBO, Brooklyn",
    pricePerHour: 95,
    rating: 4.8,
    reviews: 83,
    badge: "Popular",
    icon: Video,
  },
]

export type Step = {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

export const howItWorksSteps: Step[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Browse curated studios with transparent pricing, real photos, and honest reviews from creators like you.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Book",
    description:
      "Pick your slot, add any gear or add-ons, and check out in minutes. Instant confirmation, no back-and-forth.",
    icon: Clock,
  },
  {
    number: "03",
    title: "Create",
    description:
      "Show up, plug in, and do your best work. Every booking includes host support and flexible cancellation.",
    icon: Camera,
  },
  {
    number: "04",
    title: "Share",
    description:
      "Upload your shots, tag the studio, and help the next creator find their perfect space with an honest review.",
    icon: Star,
  },
]

export type Guarantee = {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export const guarantees: Guarantee[] = [
  {
    id: "host-guarantee",
    title: "Host Guarantee",
    description:
      "Every booking is covered up to $1M in damage protection, so both hosts and creators can book with confidence.",
    icon: ShieldCheck,
  },
  {
    id: "verified-listings",
    title: "Verified listings",
    description:
      "Each studio is inspected and photographed by our team before it goes live — what you see is what you get.",
    icon: BadgeCheck,
  },
  {
    id: "secure-payment",
    title: "Secure payments",
    description:
      "Funds are held safely and only released to the host 24 hours after check-in. No cash, no surprises.",
    icon: Lock,
  },
  {
    id: "creator-support",
    title: "Creator support",
    description:
      "Real humans, 7 days a week. If anything goes sideways before or during your session, we resolve it fast.",
    icon: Headset,
  },
]

export const aboutStats = [
  { value: "500+", label: "Curated studios" },
  { value: "40", label: "Cities covered" },
  { value: "24k", label: "Bookings completed" },
  { value: "4.9", label: "Average rating" },
] as const

export const studioAmenities = [
  "Hourly booking",
  "Verified spaces",
  "Instant confirmation",
  "Flexible cancellation",
] as const
