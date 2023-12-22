"use client"

import React from "react"
import { MyLink } from "@/components/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"

export function DesktopNavbar() {
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
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground border-b-2 border-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.title}
              </MyLink>
            )
        )}
      </nav>
    </div>
  )
}
