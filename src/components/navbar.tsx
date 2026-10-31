"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { cn } from "cn"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navLinks, type NavLink } from "@/lib/nav-links"

function isActiveLink(pathname: string, link: NavLink): boolean {
  if (link.href.startsWith("#")) {
    return false
  }
  if (link.href === "/") {
    return pathname === "/"
  }
  return pathname === link.href || pathname.startsWith(`${link.href}/`)
}

function DesktopNavLink({ link, pathname }: { link: NavLink; pathname: string }) {
  const isActive = isActiveLink(pathname, link)
  return (
    <Link
      href={link.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative px-3 py-2 text-[0.8125rem] font-medium tracking-[0.14em] uppercase transition-colors duration-300 after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-[#3B82F6] after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 hover:text-white",
        isActive
          ? "text-white after:scale-x-100"
          : "text-white/80"
      )}
    >
      {link.label}
    </Link>
  )
}

function MobileNavLink({
  link,
  pathname,
  className,
}: {
  link: NavLink
  pathname: string
  className?: string
}) {
  const isActive = isActiveLink(pathname, link)
  return (
    <SheetClose
      render={
        <Link
          href={link.href}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "rounded-md px-3 py-2.5 text-[0.8125rem] font-medium tracking-[0.14em] uppercase transition-colors duration-300",
            isActive
              ? "bg-[#3B82F6]/10 text-navy shadow-[inset_2px_0_0_#3B82F6]"
              : "text-navy/70 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6]",
            className
          )}
        />
      }
    >
      {link.label}
    </SheetClose>
  )
}

function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0B1F3A] shadow-[0_4px_30px_-12px_rgba(59,130,246,0.4)]">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="StudioSpace home"
        >
          <Logo wordmarkClassName="text-white" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <DesktopNavLink key={link.href} link={link} pathname={pathname} />
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="outline"
            size="lg"
            className="border-white/40 bg-transparent font-medium tracking-[0.1em] text-white uppercase transition-all duration-300 hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 hover:text-white hover:shadow-[0_0_18px_-6px_rgba(59,130,246,0.6)]"
          >
            Login
          </Button>
          <Button
            size="lg"
            className="bg-[#3B82F6] font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all duration-300 hover:-translate-y-px hover:bg-[#2563EB] hover:shadow-[0_6px_22px_-6px_rgba(59,130,246,0.85)] active:translate-y-0"
          >
            Register
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Open navigation menu"
                className="text-white transition-colors duration-300 hover:bg-white/10 hover:text-[#3B82F6] md:hidden"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="gap-0 border-navy/10 bg-white p-0">
            <SheetHeader className="border-b border-navy/10 px-6 py-5">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <Logo />
            </SheetHeader>
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <MobileNavLink
                  key={link.href}
                  link={link}
                  pathname={pathname}
                  className="w-full"
                />
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 border-t border-navy/10 px-6 py-5">
              <SheetClose
                render={
                  <Button
                    variant="outline"
                    className="w-full border-navy/20 bg-transparent font-medium tracking-[0.1em] text-navy uppercase transition-all duration-300 hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 hover:text-navy"
                  />
                }
              >
                Login
              </SheetClose>
              <SheetClose
                render={
                  <Button className="w-full bg-[#3B82F6] font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all duration-300 hover:bg-[#2563EB] hover:shadow-[0_6px_22px_-6px_rgba(59,130,246,0.85)]" />
                }
              >
                Register
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export { Navbar }
