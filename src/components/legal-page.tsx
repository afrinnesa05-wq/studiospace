import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type LegalSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type LegalPageProps = {
  eyebrow: string
  title: string
  description: string
  updated: string
  sections: LegalSection[]
  contactTitle: string
  contactText: string
}

function LegalPage({
  eyebrow,
  title,
  description,
  updated,
  sections,
  contactTitle,
  contactText,
}: LegalPageProps) {
  return (
    <main className="flex-1">
      <section className="relative isolate overflow-hidden bg-[#0B1F3A]">
        <div
          aria-hidden
          className="absolute -top-36 right-[-10%] size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.26),transparent_65%)]"
        />
        <div
          aria-hidden
          className="absolute -bottom-48 left-[-8%] size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_65%)]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
            <span aria-hidden className="h-px w-8 bg-[#3B82F6]" />
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-white text-balance md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {description}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-[0.08em] text-white/70 uppercase">
            <span aria-hidden className="size-1.5 rounded-full bg-[#3B82F6]" />
            Last updated {updated}
          </p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14 lg:px-8">
          <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase">
              On this page
            </p>
            <ol className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-0">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-lg border border-[#0B1F3A]/10 bg-[#0B1F3A]/5 px-3 py-1.5 text-xs font-medium text-[#0B1F3A]/70 transition-colors hover:border-[#3B82F6]/60 hover:text-[#3B82F6] lg:rounded-none lg:border-0 lg:border-b lg:border-[#0B1F3A]/10 lg:bg-transparent lg:px-0 lg:py-2.5 lg:text-sm"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-heading text-xl font-semibold tracking-tight text-[#0B1F3A] sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-[#0B1F3A]/65 md:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="flex flex-col gap-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span
                            aria-hidden
                            className="mt-1.5 size-2 shrink-0 rounded-full bg-[#3B82F6]"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#0B1F3A]/10 bg-[#0B1F3A]/[0.03] py-16 md:py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#0B1F3A] md:text-3xl">
              {contactTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#0B1F3A]/60 md:text-base">
              {contactText}
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#0B1F3A]/20 bg-white px-5 py-3 text-sm font-medium tracking-[0.08em] text-[#0B1F3A] uppercase transition hover:border-[#3B82F6] hover:text-[#3B82F6]"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back to home
          </Link>
        </div>
      </section>
    </main>
  )
}

export { LegalPage }
export type { LegalPageProps, LegalSection }
