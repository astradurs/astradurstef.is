"use client"
import { Link } from "@nextui-org/react"
export default function InlineLink({
  className,
  href,
  isExternal,
  children,
}: {
  className?: string
  href: string
  isExternal?: boolean
  children: React.ReactNode
}) {
  return (
    <Link className={className} href={href} isExternal={isExternal}>
      {children}
    </Link>
  )
}
