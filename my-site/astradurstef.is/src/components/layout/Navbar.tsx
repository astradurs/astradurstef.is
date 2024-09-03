import { siteConfig } from "@/config/site"
import { Flex, Grid, Link } from "@radix-ui/themes"
import { DesktopNavbar } from "./DesktopNavbar"
import { MobileNavbar } from "./MobileNavbar"
import { AuthButton } from "./auth-button"

export function Navbar({
  userAuthenticated,
  authKitUrl,
}: {
  userAuthenticated: boolean
  authKitUrl: string
}) {
  return (
    <Grid columns={{ initial: "4", sm: "3" }} justify="between" py="2">
      <Flex
        justify="start"
        display={{ initial: "none", sm: "flex" }}
        align="center"
      >
        <Link href="/" weight="bold" size="6" underline="none">
          {siteConfig.name}
        </Link>
      </Flex>
      <Flex display={{ sm: "none" }}>
        <MobileNavbar />
      </Flex>
      <Flex
        justify="center"
        display={{ initial: "flex", sm: "none" }}
        gridColumnStart="2"
        gridColumnEnd="4"
        align="end"
      >
        <Link href="/" weight="bold" size="6" underline="none">
          {siteConfig.name}
        </Link>
      </Flex>
      <Flex display={{ initial: "none", sm: "flex" }} justify="center" gap="2">
        <DesktopNavbar />
      </Flex>
      <Flex gap="4" justify="end" align="center">
        <AuthButton
          userAuthenticated={userAuthenticated}
          authKitUrl={authKitUrl}
        />
      </Flex>
    </Grid>
  )
}
