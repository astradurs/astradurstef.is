import { Footer } from "./Footer"
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
      <Header userAuthenticated={userAuthenticated} authKitUrl={authKitUrl} />

      <div className="h-full px-6 self-center w-full max-w-5xl">{children}</div>

      <Footer />
    </div>
  )
}
