import type { LucideIcon } from "lucide-react"
import {
  BadgeCheck,
  Camera,
  Clapperboard,
  Clock,
  Headset,
  Lock,
  Mic,
  Music,
  Palette,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react"

export type HeroSlide = {
  id: string
  eyebrow: string
  title: string
  description: string
  image: string
  icon: LucideIcon
}

export const heroSlides: HeroSlide[] = [
  {
    id: "photography",
    eyebrow: "Photography Studios",
    title: "Light, space, and the perfect frame",
    description:
      "Daylight lofts, cyclorama stages, and editorial sets — booked by the hour, ready when inspiration strikes.",
    image: "/images/hero-1.jpg",
    icon: Camera,
  },
  {
    id: "music",
    eyebrow: "Music & Recording",
    title: "Where sound finds its home",
    description:
      "Acoustically treated rooms, live spaces, and rehearsal suites engineered for everything from demos to full albums.",
    image: "/images/hero-2.jpg",
    icon: Music,
  },
  {
    id: "film",
    eyebrow: "Film & Video",
    title: "Scenes come alive here",
    description:
      "Soundstages, green screens, and production-ready rooms with industry gear and on-site support for crews of every size.",
    image: "/images/hero-3.jpg",
    icon: Clapperboard,
  },
]

export type Category = {
  id: string
  label: string
  href: string
  icon: LucideIcon
}

export const categories: Category[] = [
  {
    id: "photo",
    label: "Photo Studios",
    href: "/studios?category=Photo%20Studios",
    icon: Camera,
  },
  {
    id: "sound",
    label: "Sound Stages",
    href: "/studios?category=Sound%20Stages",
    icon: Clapperboard,
  },
  {
    id: "podcast",
    label: "Podcast Rooms",
    href: "/studios?category=Podcast%20Rooms",
    icon: Mic,
  },
  {
    id: "music",
    label: "Music Suites",
    href: "/studios?category=Music%20Suites",
    icon: Music,
  },
  {
    id: "art",
    label: "Art Workshops",
    href: "/studios?category=Art%20Workshops",
    icon: Palette,
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
      "Browse studios with transparent pricing, clear amenities, and honest descriptions from independent hosts.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Book",
    description:
      "Pick your hours and send a booking request in minutes — no endless email chains, no hidden fees.",
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
      "Upload your shots, tag the studio, and help the next creator find their perfect space.",
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
      "Clear house rules and a straightforward cancellation policy protect both hosts and creators on every booking.",
    icon: ShieldCheck,
  },
  {
    id: "verified-listings",
    title: "Honest listings",
    description:
      "Every studio publishes the host's own photos, amenities, and hourly rate — what you see is what you get.",
    icon: BadgeCheck,
  },
  {
    id: "secure-payment",
    title: "Transparent pricing",
    description:
      "Hourly rates and security deposits are shown upfront before you book. No cash, no surprises.",
    icon: Lock,
  },
  {
    id: "creator-support",
    title: "Creator support",
    description:
      "Questions before or during your session? Reach out any time and we'll help sort things out with the host.",
    icon: Headset,
  },
]

