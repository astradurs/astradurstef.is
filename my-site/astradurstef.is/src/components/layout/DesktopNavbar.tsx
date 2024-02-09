"use client"

import React from "react"
import { MyLink } from "@/components/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export function DesktopNavbar({
  userAuthenticated,
}: {
  userAuthenticated: boolean
}) {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <MyLink
        to="/"
        isExternal={false}
        className="mr-6 flex items-center space-x-2"
      >
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </MyLink>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {docsConfig.mainNav?.map(
          (item) =>
            item.href && (
              <MyLink
                key={item.href}
                isExternal={item.external}
                to={item.href}
                className={cn(
                  "transition-colors hover:text-primary/80",
                  pathname === item.href
                    ? "text-primary border-b-2 border-primary"
                    : "text-primary/60"
                )}
              >
                {item.title}
              </MyLink>
            )
        )}
        {userAuthenticated && <GDCDropdown />}
      </nav>
    </div>
  )
}

function GDCDropdown() {
  const pathname = usePathname()

  const isActive = pathname.startsWith("/projects/gdc")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "transition-colors hover:text-primary/80",
          isActive
            ? "text-primary border-b-2 border-primary"
            : "text-primary/60"
        )}
      >
        GDC
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <MyLink to="/projects/gdc" isExternal={false}>
            Events
          </MyLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MyLink to="/projects/gdc/restaurants" isExternal={false}>
            Restaurants
          </MyLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MyLink to="/projects/gdc/profile" isExternal={false}>
            Profile
          </MyLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
