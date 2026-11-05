
import type { Metadata } from "next"
import Link from "next/link"

import { RegisterForm } from "@/components/auth/register-form"
import { Logo } from "@/components/logo"

export const metadata: Metadata = {
  title: "Register — StudioSpace",
  description: "Create your StudioSpace account.",
}

function RegisterPage() {
  return (
    <main className="flex-1 bg-[#F4F7FB] px-4 py-16 dark:bg-[#101827] sm:px-6 md:py-24">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-[#DCE4EF] bg-white p-6 shadow-[0_24px_60px_-32px_rgba(11,31,58,0.35)] sm:p-8 dark:border-[#405675] dark:bg-[#202F46] dark:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col items-center text-center">
            <Link
              href="/"
              aria-label="StudioSpace home"
              className="inline-flex items-center"
            >
              <Logo />
            </Link>

            <p className="mt-8 flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#3B82F6] uppercase dark:text-[#93C5FD]">
              <span aria-hidden className="h-px w-6 bg-[#3B82F6] dark:bg-[#60A5FA]" />
              Join StudioSpace
              <span aria-hidden className="h-px w-6 bg-[#3B82F6] dark:bg-[#60A5FA]" />
            </p>

            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[#0B1F3A] dark:text-[#F8FAFC]">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-[#52647D] dark:text-[#CBD5E1]">
              Fill in the details below to get started.
            </p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </main>
  )
}

export default RegisterPage
