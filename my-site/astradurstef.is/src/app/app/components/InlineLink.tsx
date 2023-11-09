"use client"
import NextLink from "next/link"
export default function InlineLink({
  className,
  href,
  children,
  rel,
}: {
  className?: string
  href: string
  children: React.ReactNode
  rel?: string
}) {
  return (
    <NextLink className={className} href={href} rel={rel}>
      {children}
    </NextLink>
  )
}
