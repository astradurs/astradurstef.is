import { Container } from "@radix-ui/themes"

export default async function GDCEventLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Container position="relative">{children}</Container>
}
