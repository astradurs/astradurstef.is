import Link from "next/link"

export function MyLink(props: {
  children: React.ReactNode
  to: string
  isExternal?: boolean
  className?: string
}) {
  const { children, to, isExternal, className } = props

  if (isExternal) {
    return (
      <a
        className={className}
        rel="noopener noreferrer"
        href={to}
        target="_blank"
      >
        {children}
      </a>
    )
  }

  return (
    <Link className={className} href={to}>
      {children}
    </Link>
  )
}
