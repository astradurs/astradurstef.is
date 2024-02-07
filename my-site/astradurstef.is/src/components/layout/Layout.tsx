"use client"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { usePathname } from "next/navigation"

export function Layout({
  children,
  userAuthenticated,
}: {
  children: React.ReactNode
  userAuthenticated: boolean
}) {
  const pathname = usePathname()
  const hideHeaderAndFooter =
    pathname === "/studio" ||
    pathname.includes("/projects/games/gudruns-xmas-wordle")

  if (hideHeaderAndFooter) {
    return (
      <div className="flex flex-col min-h-screen max-w-8xl">
        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-6 px-2 w-full max-w-5xl">
            {children}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col min-h-screen max-w-8xl">
      <div className="flex justify-center w-full">
        <div className="flex flex-col px-6 w-full max-w-5xl">
          <Navbar userAuthenticated={userAuthenticated} />
          {children}
        </div>
      </div>

      <div className="flex justify-center w-full mt-auto">
        <div className="flex w-full max-w-5xl">
          <Footer />
        </div>
      </div>
    </div>
  )
}
