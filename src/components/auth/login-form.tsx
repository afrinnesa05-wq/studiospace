
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { GoogleButton } from "@/components/auth/google-button"
import { PasswordInput } from "@/components/auth/password-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormErrors = {
  email?: string
  password?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldClass =
  "h-11 rounded-lg border-[#DCE4EF] bg-white px-3.5 text-sm text-[#0B1F3A] placeholder:text-[#64748B] focus-visible:border-[#3B82F6] focus-visible:ring-2 focus-visible:ring-[#3B82F6]/30 dark:border-[#7189A8] dark:bg-[#172438] dark:text-[#F8FAFC] dark:placeholder:text-[#94A3B8] dark:focus-visible:border-[#60A5FA]"

const labelClass =
  "text-xs font-semibold tracking-[0.14em] text-[#0B1F3A] uppercase dark:text-[#E2E8F0]"

function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: FormErrors = {}

    if (email.trim() === "") {
      nextErrors.email = "Email is required."
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = "Enter a valid email address."
    }

    if (password === "") {
      nextErrors.password = "Password is required."
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields.")
      return
    }

    try {
      setIsLoading(true)

      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/profile",
      })

      if (error) {
        toast.error(error.message || "Sign in failed.")
        return
      }

      toast.success("Signed in successfully!")
      router.push("/profile")
      router.refresh()
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="login-email" className={labelClass}>
          Email
        </Label>

        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "login-email-error" : undefined}
          className={fieldClass}
        />

        {errors.email ? (
          <p id="login-email-error" className="text-xs text-destructive">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="login-password" className={labelClass}>
            Password
          </Label>

          <button
            type="button"
            onClick={() =>
              toast.info("Password reset isn't connected yet.")
            }
            className="text-xs font-medium text-[#3B82F6] transition-colors hover:text-[#2563EB] dark:text-[#93C5FD] dark:hover:text-[#BFDBFE]"
          >
            Forgot password?
          </button>
        </div>

        <PasswordInput
          id="login-password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? "login-password-error" : undefined}
          className={fieldClass}
        />

        {errors.password ? (
          <p id="login-password-error" className="text-xs text-destructive">
            {errors.password}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-1 h-11 w-full bg-[#3B82F6] text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all duration-300 hover:-translate-y-px hover:bg-[#2563EB] disabled:opacity-60"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-[#64748B] uppercase dark:text-[#CBD5E1]">
        <span aria-hidden className="h-px flex-1 bg-[#DCE4EF] dark:bg-[#526783]" />
        or
        <span aria-hidden className="h-px flex-1 bg-[#DCE4EF] dark:bg-[#526783]" />
      </div>

      <GoogleButton action="Login" />

      <p className="text-center text-sm text-[#52647D] dark:text-[#CBD5E1]">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-[#3B82F6] transition-colors hover:text-[#2563EB] dark:text-[#93C5FD] dark:hover:text-[#BFDBFE]"
        >
          Sign Up
        </Link>
      </p>
    </form>
  )
}

export { LoginForm }
