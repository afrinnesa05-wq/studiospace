
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const router = useRouter()
  const [isLinking, setIsLinking] = useState(false)

  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login")
    }
  }, [isPending, session, router])

  if (isPending || !session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <p className="text-[#0B1F3A]/60">Loading profile...</p>
      </main>
    )
  }

  const user = session.user

  async function handleGoogleLink() {
    try {
      setIsLinking(true)

      const { error } = await authClient.linkSocial({
        provider: "google",
        callbackURL: "/profile",
      })

      if (error) {
        toast.error(error.message || "Google account linking failed.")
        setIsLinking(false)
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
      setIsLinking(false)
    }
  }

  async function handleSignOut() {
    await authClient.signOut()
    router.replace("/login")
    router.refresh()
  }

  return (
    <main className="min-h-[70vh] bg-[#0B1F3A]/5 px-4 py-16">
      <div className="mx-auto max-w-xl rounded-2xl border border-[#0B1F3A]/10 bg-white p-8 shadow-lg">
        <div className="text-center">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              className="mx-auto h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#3B82F6] text-3xl font-semibold text-white">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <h1 className="mt-5 text-2xl font-semibold text-[#0B1F3A]">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-[#0B1F3A]/60">
            Welcome to StudioSpace!
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0B1F3A]/50">
              Full Name
            </p>
            <p className="mt-1 text-base font-medium text-[#0B1F3A]">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0B1F3A]/50">
              Email Address
            </p>
            <p className="mt-1 text-base font-medium text-[#0B1F3A]">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0B1F3A]/50">
              Account ID
            </p>
            <p className="mt-1 break-all text-sm text-[#0B1F3A]">
              {user.id}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Button
            type="button"
            onClick={handleGoogleLink}
            disabled={isLinking}
            variant="outline"
            className="w-full"
          >
            {isLinking ? "Connecting Google..." : "Link Google Account"}
          </Button>

          <Link href="/dashboard">
            <Button className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]">
              Go to Dashboard
            </Button>
          </Link>

          <Button
            variant="outline"
            onClick={handleSignOut}
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </main>
  )
}
