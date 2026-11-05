import Link from "next/link"

import { Logo } from "@/components/logo"
import { NewsletterForm } from "@/components/newsletter-form"
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/social-icons"
import { navLinks } from "@/lib/nav-links"

const quickLinks = navLinks.map((link) => ({
  label: link.label,
  href: link.href.startsWith("#") ? `/${link.href}` : link.href,
}))

const popularCategories = [
  { label: "Photo Studios", href: "/studios?category=Photo%20Studios" },
  { label: "Sound Stages", href: "/studios?category=Sound%20Stages" },
  { label: "Podcast Rooms", href: "/studios?category=Podcast%20Rooms" },
  { label: "Music Suites", href: "/studios?category=Music%20Suites" },
  { label: "Art Workshops", href: "/studios?category=Art%20Workshops" },
] as const

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: FacebookIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: InstagramIcon,
  },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: LinkedinIcon },
  { label: "X", href: "https://x.com/", Icon: XIcon },
] as const

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B1F3A]">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="StudioSpace home"
            >
              <Logo variant="on-dark" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              StudioSpace connects creators with inspiring creative spaces —
              daylight lofts, soundproofed suites, and production-ready stages
              — so the perfect room for your next idea is always a few clicks
              away.
            </p>
            <ul className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3B82F6] hover:text-[#3B82F6] hover:shadow-[0_0_16px_-6px_rgba(59,130,246,0.6)]"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Quick navigation" className="lg:col-span-2">
            <h2 className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
              Quick navigation
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors duration-300 hover:text-[#3B82F6]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
              Popular categories
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {popularCategories.map((category) => (
                <li key={category.label}>
                  <Link
                    href={category.href}
                    className="text-sm text-white/70 transition-colors duration-300 hover:text-[#3B82F6]"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <h2 className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
              Newsletter
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              New studios, creator stories, and monthly picks — straight to
              your inbox.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © 2026 StudioSpace. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-xs text-white/50 transition-colors duration-300 hover:text-[#3B82F6]"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-white/50 transition-colors duration-300 hover:text-[#3B82F6]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
