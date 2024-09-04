"use client"

import { docsConfig } from "@/config/docs"
import { TabNav, Text } from "@radix-ui/themes"

import { usePathname } from "next/navigation"

export function DesktopNavbar() {
  const pathname = usePathname()

  return (
    <TabNav.Root size="2">
      {docsConfig.mainNav.map((navItem) => {
        const isActive =
          (navItem.href === "/" && pathname === navItem.href) ||
          (navItem.href !== "/" && pathname.startsWith(navItem.href))
        return (
          <TabNav.Link key={navItem.href} href={navItem.href} active={isActive}>
            <Text size="3" weight="medium">
              {navItem.title}
            </Text>
          </TabNav.Link>
        )
      })}
    </TabNav.Root>
  )
}
