import { MyLink } from "@/components/link"
import { Button } from "@/components/ui/button"

export default async function GDCLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="grid">{children}</div>
}
