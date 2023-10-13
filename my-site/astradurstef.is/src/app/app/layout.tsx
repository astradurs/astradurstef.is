import { NextUINavbar } from "./components/NextUINavbar"
import { Footer } from "./components/Footer"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-background text-foreground">
      <div className="flex flex-col min-h-screen max-w-8xl">
        <NextUINavbar />
        <div className="flex justify-center w-full">
          <div className="flex px-6 pt-4 w-full max-w-5xl">{children}</div>
        </div>
        <div className="flex justify-center w-full mt-auto">
          <div className="flex px-6 pb-4 w-full max-w-5xl">
            <Footer />
          </div>
        </div>
      </div>
    </main>
  )
}
