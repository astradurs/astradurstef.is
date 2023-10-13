"use client"

import React from "react"
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react"
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher"
import { usePathname } from "next/navigation"

export function NextUINavbar() {
  const pathname = usePathname()
  const navigations = {
    "/app": "Home",
    "/app/posts": "Posts",
    "/app/uses": "Uses",
    "/app/games": "Games",
  }
  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      classNames={{
        item: [
          "flex",
          "relative",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {Object.entries(navigations).map(([path, name]) => (
          <NavbarItem key={path} isActive={pathname === path}>
            <Link
              href={path}
              aria-current={pathname === path ? "page" : undefined}
            >
              {name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
