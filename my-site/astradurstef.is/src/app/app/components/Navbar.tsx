import React from "react"
import { ThemeSwitcher } from "../../components/ThemeSwitcher"
import { MobileNavbar } from "./MobileNavbar"
import { DesktopNavbar } from "./DesktopNavbar"

export function Navbar() {
  return (
    <div className="flex justify-between">
      <MobileNavbar />
      <DesktopNavbar />
      <ThemeSwitcher />
    </div>
  )
}
