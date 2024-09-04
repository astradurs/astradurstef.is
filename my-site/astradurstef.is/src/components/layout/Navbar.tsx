"use client"
import { siteConfig } from "@/config/site"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Box, Flex, Grid, Link, Switch } from "@radix-ui/themes"
import { useTheme } from "next-themes"
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
  const { theme, setTheme } = useTheme()
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
      <Flex display={{ sm: "none" }} align="center">
        <MobileNavbar />
      </Flex>
      <Flex
        justify="center"
        display={{ initial: "flex", sm: "none" }}
        gridColumnStart="2"
        gridColumnEnd="4"
        align="center"
      >
        <Link href="/" weight="bold" size="6" underline="none">
          {siteConfig.name}
        </Link>
      </Flex>
      <Flex display={{ initial: "none", sm: "flex" }} justify="center" gap="2">
        <DesktopNavbar />
      </Flex>
      <Flex gap="4" justify="end" align="center">
        <Flex align="center" gap="2" display={{ initial: "none", sm: "flex" }}>
          <Switch
            defaultChecked={theme === "dark"}
            onClick={(e) => {
              console.log(e)
              if (theme === "dark") {
                setTheme("light")
              } else {
                setTheme("dark")
              }
            }}
          />
          <Box>{theme === "dark" ? <MoonIcon /> : <SunIcon />}</Box>
        </Flex>
        <AuthButton
          userAuthenticated={userAuthenticated}
          authKitUrl={authKitUrl}
        />
      </Flex>
    </Grid>
  )
}
