import React from "react"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { MobileNavbar } from "./MobileNavbar"
import { DesktopNavbar } from "./DesktopNavbar"

export function Navbar() {
  return (
    <div className="flex py-4 justify-between">
      <MobileNavbar />
      <DesktopNavbar />
      <ThemeSwitcher />
    </div>
  )
}
