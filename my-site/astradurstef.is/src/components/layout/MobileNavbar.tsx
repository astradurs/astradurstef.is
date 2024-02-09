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
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-3">
            {docsConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                    className={
                      pathname === item.href
                        ? "text-foreground"
                        : "text-foreground/60"
                    }
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
            {userAuthenticated && (
              <>
                <Separator />
                <span>GDC</span>
                <MobileLink
                  href="/projects/gdc"
                  onOpenChange={setOpen}
                  className={
                    pathname === "/projects/gdc"
                      ? "text-foreground"
                      : "text-foreground/60"
                  }
                >
                  Events
                </MobileLink>
                <MobileLink
                  href="/projects/gdc/restaurants"
                  onOpenChange={setOpen}
                  className={
                    pathname === "/projects/gdc/restaurants"
                      ? "text-foreground"
                      : "text-foreground/60"
                  }
                >
                  Restaurants
                </MobileLink>
                <MobileLink
                  href="/projects/gdc/profile"
                  onOpenChange={setOpen}
                  className={
                    pathname === "/projects/gdc/profile"
                      ? "text-foreground"
                      : "text-foreground/60"
                  }
                >
                  Profile
                </MobileLink>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
