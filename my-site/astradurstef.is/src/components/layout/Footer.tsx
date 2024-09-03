"use client"
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import { Flex, Link, Text } from "@radix-ui/themes"
import { usePathname } from "next/navigation"
import { SpotifyCard } from "./SpotifyCard"

export function Footer() {
  const pathname = usePathname()

  const hideHeaderAndFooter =
    pathname.startsWith("/studio") ||
    pathname.includes("/projects/games/gudruns-xmas-wordle")

  if (hideHeaderAndFooter) {
    return null
  }

  return (
    <Flex justify="between" py="2">
      <Flex direction="column" justify="end">
        <Text size="3">Ástráður Stefánsson</Text>

        <Flex gap="1">
          <Link href="https://twitter.com/stradistef">
            <TwitterLogoIcon width="24" height="24" />
          </Link>
          <Link href="https://twitter.com/stradistef">
            <GitHubLogoIcon width="24" height="24" />
          </Link>
        </Flex>
      </Flex>
      <SpotifyCard />
    </Flex>
  )
}
