"use client"

import { HamburgerMenuIcon } from "@radix-ui/react-icons"

import { usePathname, useRouter } from "next/navigation"
import * as React from "react"

import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"

import { DropdownMenu, IconButton, Link } from "@radix-ui/themes"
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"

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
            const isActive = pathname === navItem.href
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

function ProjectLinks({
  setOpen,
  pathname,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  pathname: string
}) {
  const games = docsConfig.projects.games
  const hasGames = games.length > 0
  const tools = docsConfig.projects.tools
  const hasTools = tools.length > 0
  const other = docsConfig.projects.other
  const hasOther = other.length > 0

  return (
    <div>
      <NavigationMenuItem>
        <MobileLink onOpenChange={setOpen} href={`/projects`}>
          <span
            className={cn(
              "transition-colors hover:text-primary/80 sm:inline-block",
              pathname === `/projects`
                ? "border-b-2 border-primary"
                : "text-primary/60",
            )}
          >
            Projects
          </span>
        </MobileLink>
      </NavigationMenuItem>
      {hasGames ? (
        <div className="pl-2">
          <NavigationMenuItem>
            <MobileLink onOpenChange={setOpen} href={`/projects/games`}>
              <span
                className={cn(
                  "transition-colors hover:text-primary/80 sm:inline-block",
                  pathname === `/projects/games`
                    ? "border-b-2 border-primary"
                    : "text-primary/60",
                )}
              >
                Games
              </span>
            </MobileLink>
          </NavigationMenuItem>
          <ul className="grid pl-2">
            {games.map((game) => (
              <NavigationMenuItem key={game.href}>
                <MobileLink
                  onOpenChange={setOpen}
                  href={`/projects/games/${game.id}`}
                >
                  <span
                    className={cn(
                      "transition-colors hover:text-primary/80 sm:inline-block",
                      pathname === `/projects/games/${game.id}`
                        ? "border-b-2 border-primary"
                        : "text-primary/60",
                    )}
                  >
                    {game.title}
                  </span>
                </MobileLink>
              </NavigationMenuItem>
            ))}
          </ul>
        </div>
      ) : null}
      {hasTools ? (
        <div className="pl-2">
          <NavigationMenuItem>
            <MobileLink onOpenChange={setOpen} href={`/projects/tools`}>
              <span
                className={cn(
                  "transition-colors hover:text-primary/80 sm:inline-block",
                  pathname === `/projects/games`
                    ? "border-b-2 border-primary"
                    : "text-primary/60",
                )}
              >
                Tools
              </span>
            </MobileLink>
          </NavigationMenuItem>
          <ul className="grid pl-2">
            {tools.map((tool) => (
              <NavigationMenuItem key={tool.href}>
                <MobileLink
                  onOpenChange={setOpen}
                  href={`/projects/tools/${tool.id}`}
                >
                  <span
                    className={cn(
                      "transition-colors hover:text-primary/80 sm:inline-block",
                      pathname === `/projects/tools/${tool.id}`
                        ? "border-b-2 border-primary"
                        : "text-primary/60",
                    )}
                  >
                    {tool.title}
                  </span>
                </MobileLink>
              </NavigationMenuItem>
            ))}
          </ul>
        </div>
      ) : null}
      {hasOther ? (
        <div className="pl-2">
          <span
            className={cn(
              "h-10 px-4 py-2 transition-colors text-primary/60 text-sm font-medium sm:inline-block",
            )}
          >
            Other
          </span>
          <ul className="grid pl-2">
            {other.map((o) => (
              <div key={o.href}>
                <NavigationMenuItem>
                  <MobileLink onOpenChange={setOpen} href={`/projects/${o.id}`}>
                    <span
                      className={cn(
                        "transition-colors hover:text-primary/80 sm:inline-block",
                        pathname === `/projects/${o.id}`
                          ? "border-b-2 border-primary"
                          : "text-primary/60",
                      )}
                    >
                      {o.title}
                    </span>
                  </MobileLink>
                </NavigationMenuItem>

                {o.children && o.children.length > 0 ? (
                  <div className="pl-2">
                    {o.children.map((c) => (
                      <NavigationMenuItem key={o.href + c.href}>
                        <MobileLink
                          onOpenChange={setOpen}
                          href={`/projects/${o.id}/${c.id}`}
                        >
                          <span
                            className={cn(
                              "transition-colors hover:text-primary/80 sm:inline-block",
                              pathname === `/projects/${o.id}/${c.id}`
                                ? "border-b-2 border-primary"
                                : "text-primary/60",
                            )}
                          >
                            {c.title}
                          </span>
                        </MobileLink>
                      </NavigationMenuItem>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({ href, onOpenChange, children }: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        onClick={() => {
          router.push(href.toString())
          onOpenChange?.(false)
        }}
        className={navigationMenuTriggerStyle()}
      >
        {children}
      </NavigationMenuLink>
    </Link>
  )
}
