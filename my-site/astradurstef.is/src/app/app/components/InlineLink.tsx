"use client"
import NextLink from "next/link"
export default function InlineLink({
  className,
  href,
  children,
  rel,
  isExternal,
}: {
  className?: string
  href: string
  children: React.ReactNode
  rel?: string
  isExternal?: boolean
}) {
  return isExternal ? (
    <a className={className} href={href} rel={rel} target="_blank">
      {children}
    </a>
  ) : (
    <NextLink className={className} href={href} rel={rel}>
      {children}
    </NextLink>
  )
}
