"use client"

import { HamburgerMenuIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"

import { usePathname } from "next/navigation"

import { docsConfig } from "@/config/docs"

import { DropdownMenu, Flex, IconButton, Link } from "@radix-ui/themes"
import { useTheme } from "next-themes"

export function MobileNavbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size="3" variant="ghost">
          <HamburgerMenuIcon height="24" width="24" />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          {docsConfig.mainNav.map((navItem) => {
            const isActive =
              (navItem.href === "/" && pathname === navItem.href) ||
              (navItem.href !== "/" && pathname.startsWith(navItem.href))
            return (
              <DropdownMenu.Item key={navItem.href}>
                <Link
                  size="4"
                  underline={isActive ? "always" : "auto"}
                  href={navItem.href}
                >
                  {navItem.title}
                </Link>
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item
            onClick={() => {
              if (theme === "dark") {
                setTheme("light")
              } else {
                setTheme("dark")
              }
            }}
          >
            <Flex gap="1" align="center">
              {theme === "dark" ? <MoonIcon /> : <SunIcon />}{" "}
              {theme === "dark" ? "Dark" : "Light"} mode
            </Flex>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
