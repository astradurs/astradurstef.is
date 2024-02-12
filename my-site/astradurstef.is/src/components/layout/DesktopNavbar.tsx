"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"
import Link from "next/link"
import { Separator } from "../ui/separator"

export function DesktopNavbar({
  userAuthenticated,
}: {
  userAuthenticated: boolean
}) {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="mr-6 flex items-center space-x-2">
                <span className="hidden font-bold sm:inline-block">
                  {siteConfig.name}
                </span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {userAuthenticated && <GDCDropdown />}
          <ProjectsDropdown />

          {docsConfig.mainNav?.map(
            (item) =>
              item.href && (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
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
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

function ProjectsDropdown() {
  const other = docsConfig.projects.other
  const hasOther = other.length > 0
  const games = docsConfig.projects.games
  const hasGames = games.length > 0
  const tools = docsConfig.projects.tools
  const hasTools = tools.length > 0

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
          {hasGames ? (
            <li>
              <ListItem title="Games" href="/projects/games" />
              <Separator />
              <ul>
                {games.map((game) => (
                  <ListItem
                    key={game.title}
                    title={game.title}
                    href={`/projects/games/${game.id}`}
                  >
                    {game.description}
                  </ListItem>
                ))}
              </ul>
            </li>
          ) : null}
          {hasTools ? (
            <li>
              <ListItem title="Tools" href="/projects/tools" />
              <Separator />
              <ul>
                {tools.map((tool) => (
                  <ListItem
                    key={tool.title}
                    title={tool.title}
                    href={`/projects/tools/${tool.id}`}
                  >
                    {tool.description}
                  </ListItem>
                ))}
              </ul>
            </li>
          ) : null}
          {hasOther ? (
            <li>
              <ListItem title="Other" href="/projects" />
              <Separator />
              <ul>
                {other.map((o) => (
                  <ListItem
                    key={o.title}
                    title={o.title}
                    href={`/projects/${o.id}`}
                  >
                    {o.description}
                  </ListItem>
                ))}
              </ul>
            </li>
          ) : null}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

function GDCDropdown() {
  const pathname = usePathname()

  const isActive = pathname.startsWith("/projects/gdc")

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Restaurants",
      href: "/projects/gdc/restaurants",
      description: "A list of restaurants we have or might visit",
    },
    {
      title: "Events",
      href: "/projects/gdc",
      description: "A list of past and future events",
    },
    {
      title: "Profile",
      href: "/projects/gdc/profile",
      description: "Your profile",
    },
  ]

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>GDC</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
          {components.map((component) => (
            <ListItem
              key={component.title}
              title={component.title}
              href={component.href}
            >
              {component.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}
