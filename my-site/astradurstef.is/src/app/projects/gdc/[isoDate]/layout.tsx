import { Container, Grid } from "@radix-ui/themes"

export default async function GDCEventLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container position="relative">
      <Grid columns={{ sm: "2" }} gap="4">
        {children}
      </Grid>
    </Container>
  )
}
