"use client"
import { Link } from "@nextui-org/react"
export default function InlineLink({
  className,
  href,
  isExternal,
  children,
  rel,
}: {
  className?: string
  href: string
  isExternal?: boolean
  children: React.ReactNode
  rel?: string
}) {
  return (
    <Link className={className} href={href} isExternal={isExternal} rel={rel}>
      {children}
    </Link>
  )
}
