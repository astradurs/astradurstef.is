import React from "react"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { MobileNavbar } from "./MobileNavbar"
import { DesktopNavbar } from "./DesktopNavbar"

export function Navbar({ userAuthenticated }: { userAuthenticated: boolean }) {
  return (
    <div className="flex py-4 justify-between">
      <MobileNavbar userAuthenticated={userAuthenticated} />
      <DesktopNavbar userAuthenticated={userAuthenticated} />
      <ThemeSwitcher />
    </div>
  )
}
