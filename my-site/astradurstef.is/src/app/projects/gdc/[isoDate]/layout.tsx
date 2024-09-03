import { Container, Flex, Grid, Spinner } from "@radix-ui/themes"
import { Suspense } from "react"

export default async function GDCEventLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container position="relative">
      <Suspense
        fallback={
          <Flex
            position="absolute"
            justify="center"
            align="center"
            inset="0"
            top="0"
            bottom="0"
          >
            <Spinner size="3" />
          </Flex>
        }
      >
        <Grid columns={{ sm: "2" }} gap="4">
          {children}
        </Grid>
      </Suspense>
    </Container>
  )
}
