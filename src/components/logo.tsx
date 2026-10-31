import { cn } from "cn"

type LogoIconProps = {
  className?: string
}

type LogoWordmarkProps = {
  className?: string
}

type LogoProps = {
  className?: string
  iconClassName?: string
  wordmarkClassName?: string
}

function LogoIcon({ className }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn(
        "size-7 shrink-0 drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]",
        className
      )}
    >
      <defs>
        <linearGradient
          id="studiospace-aperture-grad"
          x1="3"
          y1="3"
          x2="21"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <g
        stroke="url(#studiospace-aperture-grad)"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path
          d="M15.2 12 13.6 14.77 10.4 14.77 8.8 12 10.4 9.23 13.6 9.23Z"
          fill="#3B82F6"
          fillOpacity={0.2}
        />
        <path d="M15.2 12 17 20.66" />
        <path d="M13.6 14.77 7 20.66" />
        <path d="M10.4 14.77 2 12" />
        <path d="M8.8 12 7 3.34" />
        <path d="M10.4 9.23 17 3.34" />
        <path d="M13.6 9.23 22 12" />
      </g>
    </svg>
  )
}

function LogoWordmark({ className }: LogoWordmarkProps) {
  return (
    <span
      className={cn(
        "font-heading text-[1.0625rem] tracking-tight text-navy",
        className
      )}
    >
      <span className="font-medium">Studio</span>
      <span className="font-semibold">Space</span>
    </span>
  )
}

function Logo({ className, iconClassName, wordmarkClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoIcon className={iconClassName} />
      <LogoWordmark className={wordmarkClassName} />
    </span>
  )
}

export { Logo, LogoIcon, LogoWordmark }
export type { LogoProps, LogoIconProps, LogoWordmarkProps }
