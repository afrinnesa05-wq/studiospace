
"use client"

import { useState } from "react"

type StudioImageProps = {
  src?: string
  alt: string
  className?: string
}

export function StudioImage({
  src,
  alt,
  className = "",
}: StudioImageProps) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-[radial-gradient(circle_at_center,#1e3a67_0%,#0b1f3a_75%)] ${className}`}
      >
        <div className="flex h-11 w-11 items-center justify-center border-[3px] border-[#3B82F6]">
          <div className="h-5 w-5 bg-[#3B82F6]" />
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  )
}
