"use client"
import React from "react"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { MobileNavbar } from "./MobileNavbar"
import { DesktopNavbar } from "./DesktopNavbar"
import { Button } from "../ui/button"
import { MyLink } from "../link"
import { getAuthorizationUrl } from "@/app/auth"
import { usePathname } from "next/navigation"

export function Navbar({
  userAuthenticated,
  authKitUrl,
}: {
  userAuthenticated: boolean
  authKitUrl: string
}) {
  const pathname = usePathname()
  const isGDCPath = pathname.includes("/projects/gdc")
  return (
    <div className="flex pt-4 justify-between">
      <MobileNavbar userAuthenticated={userAuthenticated} />
      <DesktopNavbar userAuthenticated={userAuthenticated} />
      <div className="flex gap-4 items-center">
        <ThemeSwitcher />
        {userAuthenticated && isGDCPath && (
          <Button asChild>
            <MyLink to="/projects/gdc/profile">Minn prófíll</MyLink>
          </Button>
        )}
        {!userAuthenticated && isGDCPath && (
          <Button asChild>
            <MyLink to={authKitUrl}>Innskráning</MyLink>
          </Button>
        )}
      </div>
    </div>
  )
}
