"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"

function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim() === "") return
    setSubscribed(true)
  }

  if (subscribed) {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-lg border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-4 py-3"
      >
        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#3B82F6] text-white">
          <Check aria-hidden className="size-3" strokeWidth={3} />
        </span>
        <p className="text-sm leading-relaxed text-white/80">
          You&apos;re subscribed — this is a frontend demo, so no email was
          actually sent.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row lg:flex-col"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        className="h-9 min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-3.5 text-sm text-white transition-colors placeholder:text-white/40 outline-none focus-visible:border-[#3B82F6] focus-visible:ring-2 focus-visible:ring-[#3B82F6]/40"
      />
      <Button
        type="submit"
        className="h-9 shrink-0 bg-[#3B82F6] px-5 font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all duration-300 hover:-translate-y-px hover:bg-[#2563EB] hover:shadow-[0_6px_22px_-6px_rgba(59,130,246,0.85)] active:translate-y-0"
      >
        Subscribe
      </Button>
    </form>
  )
}

export { NewsletterForm }
