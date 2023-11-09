import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen max-w-8xl">
      <div className="flex my-4 justify-center w-full">
        <div className="flex flex-col gap-6 px-6 w-full max-w-5xl">
          <Navbar />
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
