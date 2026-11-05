
"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  PlusCircle,
  User,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "cn"

import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  if (link.href.includes("#")) {
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
        isActive ? "text-white after:scale-x-100" : "text-white/80"
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
      nativeButton={false}
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

const accountLinks = [
  { label: "My Profile", href: "/profile", icon: User },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Add New Studio", href: "/add-studio", icon: PlusCircle },
  { label: "My Studio Listings", href: "/my-listings", icon: ListChecks },
  { label: "My Bookings", href: "/my-bookings", icon: CalendarDays },
] as const

function DesktopNavLinks() {
  const pathname = usePathname()
  return navLinks.map((link) => (
    <DesktopNavLink key={link.href} link={link} pathname={pathname} />
  ))
}

function MobileNavLinks() {
  const pathname = usePathname()
  return navLinks.map((link) => (
    <MobileNavLink
      key={link.href}
      link={link}
      pathname={pathname}
      className="w-full"
    />
  ))
}

function Navbar() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    try {
      setIsSigningOut(true)
      await authClient.signOut()
      toast.success("Signed out successfully.")
      router.replace("/login")
      router.refresh()
    } catch {
      toast.error("Sign out failed. Please try again.")
    } finally {
      setIsSigningOut(false)
    }
  }

  const userName = session?.user.name || session?.user.email || "Account"
  const userInitial = userName.trim().charAt(0).toUpperCase() || "U"

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0B1F3A] shadow-[0_4px_30px_-12px_rgba(59,130,246,0.4)]">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="StudioSpace home"
        >
          <Logo variant="on-dark" priority />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <Suspense
            fallback={navLinks.map((link) => (
              <DesktopNavLink key={link.href} link={link} pathname="" />
            ))}
          >
            <DesktopNavLinks />
          </Suspense>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />

          {isPending ? (
            <div role="status" className="flex items-center gap-2">
              <span className="sr-only">Loading account</span>
              <span
                className="h-10 w-24 animate-pulse rounded-lg bg-white/10"
                aria-hidden
              />
              <span
                className="h-10 w-24 animate-pulse rounded-lg bg-white/10"
                aria-hidden
              />
            </div>
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-full border border-white/25 py-1.5 pr-3 pl-1.5 text-sm font-medium text-white transition-colors duration-300 outline-none hover:border-[#3B82F6]/60 hover:bg-[#3B82F6]/10 focus-visible:ring-2 focus-visible:ring-[#3B82F6]/60">
                <span className="flex size-8 items-center justify-center rounded-full bg-[#3B82F6] text-sm font-semibold text-white">
                  {userInitial}
                </span>
                <span className="max-w-32 truncate">{userName}</span>
                <ChevronDown aria-hidden className="size-4 text-white/70" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="min-w-64">
                <DropdownMenuLabel>
                  <span className="block truncate text-[#0B1F3A]">{userName}</span>
                  <span className="block truncate text-[#0B1F3A]/50">
                    {session.user.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {accountLinks.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    render={<Link href={item.href} />}
                  >
                    <item.icon aria-hidden className="text-[#3B82F6]" />
                    {item.label}
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  variant="destructive"
                  disabled={isSigningOut}
                  onClick={handleSignOut}
                >
                  <LogOut aria-hidden />
                  {isSigningOut ? "Signing out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                render={<Link href="/login" />}
                nativeButton={false}
                variant="outline"
                size="lg"
                className="border-white/40 bg-transparent font-medium tracking-[0.1em] text-white uppercase transition-all duration-300 hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 hover:text-white hover:shadow-[0_0_18px_-6px_rgba(59,130,246,0.6)]"
              >
                Sign In
              </Button>
              <Button
                render={<Link href="/register" />}
                nativeButton={false}
                size="lg"
                className="bg-[#3B82F6] font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all duration-300 hover:-translate-y-px hover:bg-[#2563EB] hover:shadow-[0_6px_22px_-6px_rgba(59,130,246,0.85)] active:translate-y-0"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  aria-label="Open navigation menu"
                  className="text-white transition-colors duration-300 hover:bg-white/10 hover:text-[#3B82F6]"
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
                <Suspense
                  fallback={navLinks.map((link) => (
                    <MobileNavLink
                      key={link.href}
                      link={link}
                      pathname=""
                      className="w-full"
                    />
                  ))}
                >
                  <MobileNavLinks />
                </Suspense>

                {!isPending && session ? (
                  <>
                    <p className="mt-3 px-3 text-[0.6875rem] font-semibold tracking-[0.14em] text-[#0B1F3A]/40 uppercase">
                      Your account
                    </p>

                    {accountLinks.map((item) => (
                      <SheetClose
                        nativeButton={false}
                        key={item.href}
                        render={
                          <Link
                            href={item.href}
                            className="rounded-md px-3 py-2.5 text-[0.8125rem] font-medium tracking-[0.14em] text-navy/70 uppercase transition-colors duration-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6]"
                          />
                        }
                      >
                        {item.label}
                      </SheetClose>
                    ))}
                  </>
                ) : null}
              </nav>

              <div className="mt-auto flex flex-col gap-2 border-t border-navy/10 px-6 py-5">
                {isPending ? (
                  <div role="status" className="flex flex-col gap-2">
                    <span className="sr-only">Loading account</span>
                    <span
                      className="h-10 w-full animate-pulse rounded-lg bg-navy/5"
                      aria-hidden
                    />
                    <span
                      className="h-10 w-full animate-pulse rounded-lg bg-navy/5"
                      aria-hidden
                    />
                  </div>
                ) : session ? (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="w-full rounded-lg border border-navy/20 bg-transparent px-4 py-2.5 text-center text-sm font-medium tracking-[0.1em] text-navy uppercase transition-colors duration-300 hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 disabled:opacity-60"
                  >
                    {isSigningOut ? "Signing out..." : "Logout"}
                  </button>
                ) : (
                  <>
                    <SheetClose
                      nativeButton={false}
                      render={
                        <Link
                          href="/login"
                          className="w-full rounded-lg border border-navy/20 bg-transparent px-4 py-2.5 text-center text-sm font-medium tracking-[0.1em] text-navy uppercase transition-colors duration-300 hover:border-[#3B82F6] hover:bg-[#3B82F3]/10"
                        />
                      }
                    >
                      Sign In
                    </SheetClose>

                    <SheetClose
                      nativeButton={false}
                      render={
                        <Link
                          href="/register"
                          className="w-full rounded-lg bg-[#3B82F6] px-4 py-2.5 text-center text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-colors duration-300 hover:bg-[#2563EB]"
                        />
                      }
                    >
                      Sign Up
                    </SheetClose>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export { Navbar }

