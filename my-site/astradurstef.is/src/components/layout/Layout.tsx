import { Container, Flex, Grid } from "@radix-ui/themes"
import { Footer } from "./Footer"
import { Header } from "./Header"

export function Layout({
  children,
  userAuthenticated,
  authKitUrl,
}: {
  children: React.ReactNode
  userAuthenticated: boolean
  authKitUrl: string
}) {
  return (
    <Container size="4" px="2">
      <Flex direction="column" justify="between" minHeight="100vh">
        <Grid>
          <Header
            userAuthenticated={userAuthenticated}
            authKitUrl={authKitUrl}
          />
          {children}
        </Grid>
        <Footer />
      </Flex>
    </Container>
  )
}
