
"use client"

import { useState } from "react"
import type { FormEvent } from "react"
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
  fullName?: string
  email?: string
  photoUrl?: string
  password?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_PATTERN = /^https?:\/\/.+/i

const fieldClass =
  "h-11 rounded-lg border-[#DCE4EF] bg-white px-3.5 text-sm text-[#0B1F3A] placeholder:text-[#64748B] focus-visible:border-[#3B82F6] focus-visible:ring-2 focus-visible:ring-[#3B82F6]/30 dark:border-[#7189A8] dark:bg-[#172438] dark:text-[#F8FAFC] dark:placeholder:text-[#94A3B8] dark:focus-visible:border-[#60A5FA]"

const labelClass =
  "text-xs font-semibold tracking-[0.14em] text-[#0B1F3A] uppercase dark:text-[#E2E8F0]"

function RegisterForm() {
  const router = useRouter()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const passwordRules = [
    { label: "Minimum 6 characters", met: password.length >= 6 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One lowercase letter", met: /[a-z]/.test(password) },
  ]

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: FormErrors = {}

    if (fullName.trim() === "") {
      nextErrors.fullName = "Full name is required."
    }

    if (email.trim() === "") {
      nextErrors.email = "Email is required."
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = "Enter a valid email address."
    }

    if (photoUrl.trim() !== "" && !URL_PATTERN.test(photoUrl.trim())) {
      nextErrors.photoUrl =
        "Enter a valid image URL starting with http(s)://."
    }

    if (password === "") {
      nextErrors.password = "Password is required."
    } else {
      const unmet = passwordRules.filter((rule) => !rule.met)

      if (unmet.length > 0) {
        nextErrors.password = `Password must include ${unmet
          .map((rule) => rule.label.toLowerCase())
          .join(", ")}.`
      }
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields.")
      return
    }

    try {
      setIsLoading(true)

      const { error } = await authClient.signUp.email({
        name: fullName.trim(),
        email: email.trim(),
        password,
        image: photoUrl.trim() || undefined,
      })

      if (error) {
        toast.error(error.message || "Registration failed.")
        return
      }

      toast.success("Account created successfully!")
      router.push("/login")
    } catch (error) {
      console.error("Registration error:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-8 flex flex-col gap-5"
    >
      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-name" className={labelClass}>
          Full Name
        </Label>

        <Input
          id="register-name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={
            errors.fullName ? "register-name-error" : undefined
          }
          className={fieldClass}
        />

        {errors.fullName && (
          <p id="register-name-error" className="text-xs text-destructive">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-email" className={labelClass}>
          Email
        </Label>

        <Input
          id="register-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={
            errors.email ? "register-email-error" : undefined
          }
          className={fieldClass}
        />

        {errors.email && (
          <p id="register-email-error" className="text-xs text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      {/* Photo URL */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-photo" className={labelClass}>
          Photo URL{" "}
          <span className="font-normal text-[#64748B] dark:text-[#94A3B8]">
            (optional)
          </span>
        </Label>

        <Input
          id="register-photo"
          type="url"
          placeholder="https://example.com/your-photo.jpg"
          value={photoUrl}
          onChange={(event) => setPhotoUrl(event.target.value)}
          aria-invalid={errors.photoUrl ? true : undefined}
          aria-describedby={
            errors.photoUrl ? "register-photo-error" : undefined
          }
          className={fieldClass}
        />

        {errors.photoUrl && (
          <p id="register-photo-error" className="text-xs text-destructive">
            {errors.photoUrl}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="register-password" className={labelClass}>
          Password
        </Label>

        <PasswordInput
          id="register-password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={
            errors.password
              ? "register-password-error"
              : "register-password-rules"
          }
          className={fieldClass}
        />

        <ul
          id="register-password-rules"
          className="flex flex-wrap gap-x-4 gap-y-1 text-xs"
        >
          {passwordRules.map((rule) => (
            <li
              key={rule.label}
              className={`flex items-center gap-1.5 transition-colors ${
                rule.met
                  ? "text-[#3B82F6] dark:text-[#93C5FD]"
                  : "text-[#64748B] dark:text-[#CBD5E1]"
              }`}
            >
              <span aria-hidden>
                {rule.met ? "✓" : "✕"}
              </span>
              {rule.label}
            </li>
          ))}
        </ul>

        {errors.password && (
          <p id="register-password-error" className="text-xs text-destructive">
            {errors.password}
          </p>
        )}
      </div>

      {/* Sign Up Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="mt-1 h-11 w-full bg-[#3B82F6] text-sm font-medium tracking-[0.1em] text-white uppercase shadow-[0_4px_16px_-6px_rgba(59,130,246,0.65)] transition-all duration-300 hover:-translate-y-px hover:bg-[#2563EB] hover:shadow-[0_6px_22px_-6px_rgba(59,130,246,0.85)] active:translate-y-0 disabled:opacity-60"
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-[#64748B] uppercase dark:text-[#CBD5E1]">
        <span aria-hidden className="h-px flex-1 bg-[#DCE4EF] dark:bg-[#526783]" />
        or
        <span aria-hidden className="h-px flex-1 bg-[#DCE4EF] dark:bg-[#526783]" />
      </div>

      {/* Google Sign Up */}
      <GoogleButton action="Register" />

      {/* Sign In Link */}
      <p className="text-center text-sm text-[#52647D] dark:text-[#CBD5E1]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#3B82F6] transition-colors hover:text-[#2563EB] dark:text-[#93C5FD] dark:hover:text-[#BFDBFE]"
        >
          Sign In
        </Link>
      </p>
    </form>
  )
}

export { RegisterForm }
