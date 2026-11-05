
"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "cn"

type LogoProps = {
  className?: string
  variant?: "on-dark" | "on-light"
  priority?: boolean
}

function Logo({ className, variant, priority }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const logoVariant =
    variant ?? (mounted && resolvedTheme === "dark" ? "on-dark" : "on-light")

  return (
    <Image
      src={logoVariant === "on-dark" ? "/logo-on-dark.png" : "/logo.png"}
      alt="StudioSpace"
      width={750}
      height={144}
      priority={priority}
      className={cn("h-8 w-auto sm:h-9", className)}
    />
  )
}

export { Logo }
export type { LogoProps }

