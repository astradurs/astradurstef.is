"use client"

import { HamburgerMenuIcon } from "@radix-ui/react-icons"

import { usePathname } from "next/navigation"

import { docsConfig } from "@/config/docs"

import { DropdownMenu, IconButton, Link } from "@radix-ui/themes"

export function MobileNavbar() {
  const pathname = usePathname()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size="3">
          <HamburgerMenuIcon height="24" width="24" />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          {docsConfig.mainNav.map((navItem) => {
            const isActive =
              (navItem.href === "/" && pathname === navItem.href) ||
              pathname.startsWith(navItem.href)
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
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
