import { Footer } from "./Footer"
import { usePathname } from "next/navigation"
import { getAuthorizationUrl } from "@/app/auth"
import { Header } from "./Header"

export function Layout({
  children,
  userAuthenticated,
  authKitUrl,
}: {
  children: React.ReactNode
  userAuthenticated: boolean
  authKitUrl: string
}) {
  return (
    <div className="flex flex-col min-h-screen max-w-8xl">
      <div className="grid px-6 self-center w-full max-w-5xl">
        <Header userAuthenticated={userAuthenticated} authKitUrl={authKitUrl} />
      </div>
      <div className="h-full px-6 self-center w-full max-w-5xl">{children}</div>
      <div className="grid mt-auto px-6 self-center w-full max-w-5xl">
        <Footer />
      </div>
    </div>
  )
}
