"use client"
import React from "react"
import Image from "next/image"

export default function HomePostBodyImage({
  src,
  alt,
  height,
  width,
}: {
  src: string
  alt: string
  height: number
  width: number
}) {
  return (
    <div className="flex flex-wrap gap-3 w-full">
      <Image
        className="mx-auto rounded-lg"
        src={src}
        width={width}
        height={height}
        alt={alt}
      />
    </div>
  )
}
