
import { connection } from "next/server"

import { CategoryCard } from "@/components/home/category-card"
import { categories } from "@/lib/home-data"
import { fetchCategoryCounts } from "@/lib/studios-api"

function CategoryGridSkeleton() {
  return (
    <div
      className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      aria-busy="true"
      aria-label="Loading categories"
    >
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col items-start gap-4 rounded-xl border border-[#0B1F3A]/10 bg-white p-6"
        >
          <div className="size-12 animate-pulse rounded-lg bg-[#0B1F3A]/10" />
          <div className="h-4 w-28 animate-pulse rounded bg-[#0B1F3A]/10" />
          <div className="h-3 w-20 animate-pulse rounded bg-[#0B1F3A]/10" />
        </div>
      ))}
    </div>
  )
}

async function CategoryGrid() {
  await connection()

  let counts: Record<string, number> | null = null

  try {
    counts = await fetchCategoryCounts(categories.map((item) => item.label))
  } catch {
    counts = null
  }

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          count={counts ? counts[category.label] : null}
        />
      ))}
    </div>
  )
}

export { CategoryGrid, CategoryGridSkeleton }
