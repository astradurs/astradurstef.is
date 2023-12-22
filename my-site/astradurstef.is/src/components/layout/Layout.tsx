"use client"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { usePathname } from "next/navigation"

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideHeaderAndFooter = pathname === "/studio"
  return (
    <div className="flex flex-col min-h-screen max-w-8xl">
      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-6 px-6 w-full max-w-5xl">
          {hideHeaderAndFooter ? null : <Navbar />}
          {children}
        </div>
      </div>
      {hideHeaderAndFooter ? null : (
        <div className="flex justify-center w-full mt-auto">
          <div className="flex w-full max-w-5xl">
            <Footer />
          </div>
        </div>
      )}
    </div>
  )
}
