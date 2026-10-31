import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { Category } from "@/lib/home-data"

type CategoryCardProps = {
  category: Category
}

function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon
  return (
    <Link
      href="/studios"
      className="group flex flex-col items-start gap-4 rounded-xl border border-[#0B1F3A]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3B82F6]/40 hover:shadow-[0_16px_40px_-20px_rgba(59,130,246,0.5)]"
    >
      <span className="flex size-12 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] transition-colors duration-300 group-hover:bg-[#3B82F6] group-hover:text-white">
        <Icon aria-hidden className="size-5" strokeWidth={1.75} />
      </span>
      <span className="block">
        <span className="block font-heading text-base font-semibold text-[#0B1F3A]">
          {category.label}
        </span>
        <span className="mt-1 block text-sm text-[#0B1F3A]/60">
          {category.count} studios
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
