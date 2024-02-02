import React from "react"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { MobileNavbar } from "./MobileNavbar"
import { DesktopNavbar } from "./DesktopNavbar"
import { Button } from "../ui/button"
import { MyLink } from "../link"

export function Navbar({ userAuthenticated }: { userAuthenticated: boolean }) {
  return (
    <div className="flex py-4 justify-between">
      <MobileNavbar userAuthenticated={userAuthenticated} />
      <DesktopNavbar userAuthenticated={userAuthenticated} />
      <div className="flex gap-4 items-center">
        <ThemeSwitcher />
        {userAuthenticated && (
          <Button asChild>
            <MyLink to="/projects/gdc/profile">Minn prófíll</MyLink>
          </Button>
        )}
      </div>
    </div>
  )
}
