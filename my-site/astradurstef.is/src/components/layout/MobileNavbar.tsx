"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ViewVerticalIcon } from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"
import { NavigationMenuTrigger } from "@radix-ui/react-navigation-menu"

export function MobileNavbar({
  userAuthenticated,
}: {
  userAuthenticated: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <ViewVerticalIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <NavigationMenu>
            <NavigationMenuList className="grid w-full">
              {docsConfig.mainNav?.map(
                (item) =>
                  item.href && (
                    <NavigationMenuItem key={item.href}>
                      <MobileLink
                        onOpenChange={setOpen}
                        href={item.href}
                        className={navigationMenuTriggerStyle()}
                      >
                        <span
                          className={cn(
                            "transition-colors hover:text-primary/80 sm:inline-block",
                            pathname === item.href
                              ? "border-b-2 border-primary"
                              : "text-primary/60"
                          )}
                        >
                          {item.title}
                        </span>
                      </MobileLink>
                    </NavigationMenuItem>
                  )
              )}
              <ProjectLinks setOpen={setOpen} pathname={pathname} />
            </NavigationMenuList>
          </NavigationMenu>
        </ScrollArea>
      </SheetContent>
    </Sheet>
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
                : "text-primary/60"
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
                    : "text-primary/60"
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
                        : "text-primary/60"
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
                    : "text-primary/60"
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
                        : "text-primary/60"
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
              "h-10 px-4 py-2 transition-colors text-primary/60 text-sm font-medium sm:inline-block"
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
                          : "text-primary/60"
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
                                : "text-primary/60"
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
