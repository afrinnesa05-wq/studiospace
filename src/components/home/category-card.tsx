
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { Category } from "@/lib/home-data"

type CategoryCardProps = {
  category: Category
  count?: number | null
}

function CategoryCard({ category, count = null }: CategoryCardProps) {
  const Icon = category.icon
  const countLabel =
    count === null
      ? "Browse studios"
      : count === 0
        ? "No studios yet"
        : `${count} studio${count === 1 ? "" : "s"}`

  return (
    <Link
      href={category.href}
      className="group flex flex-col items-start gap-4 rounded-xl border border-[#0B1F3A]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3B82F6]/40 hover:shadow-[0_16px_40px_-20px_rgba(59,130,246,0.5)] dark:border-white/20 dark:bg-[#1B2638] dark:hover:border-[#60A5FA] dark:hover:shadow-[0_16px_40px_-20px_rgba(96,165,250,0.25)]"
    >
      <span className="flex size-12 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] transition-colors duration-300 group-hover:bg-[#3B82F6] group-hover:text-white">
        <Icon aria-hidden className="size-5" strokeWidth={1.75} />
      </span>

      <span className="block">
        <span className="block font-heading text-base font-semibold text-[#0B1F3A] dark:text-[#F8FAFC]">
          {category.label}
        </span>
        <span className="mt-1 block text-sm text-[#0B1F3A]/60 dark:text-[#CBD5E1]">
          {countLabel}
        </span>
      </span>

      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#3B82F6]">
        Explore
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}

export { CategoryCard }
