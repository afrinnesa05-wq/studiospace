
"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-white hover:bg-white/10"
    >
      <span className="text-xl dark:hidden" aria-hidden="true">
        🌙
      </span>

      <span className="hidden text-xl dark:inline" aria-hidden="true">
        ☀️
      </span>
    </Button>
  )
}

