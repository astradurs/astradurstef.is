import { Suspense } from "react"

export default async function GDCEventLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
