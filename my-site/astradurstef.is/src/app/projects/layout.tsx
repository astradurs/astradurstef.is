import React from "react"
import { Separator } from "@/components/ui/separator"

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>{children}</div>
    </div>
  )
}
