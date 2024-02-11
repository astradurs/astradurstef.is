import ToolsPage from "./tools/page"
import GamesPage from "./games/page"
import { Separator } from "@/components/ui/separator"
import { ToolCard } from "./tools/components/ToolCard"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Projects</h1>
        <p>
          Here are some of the projects I am currently working on or have been
          working on. I can be a bit all over the place so I can not promise
          that all or any of these work a 100% of the time. Mostly this is my
          own little playground where I can try out new things and ideas.
        </p>
      </div>
      <Separator />
      <GamesPage />
      {/** <Separator />
      <ToolsPage /> **/}
      <Separator />
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Other projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="flex flex-col justify-between">
            <div>
              <CardHeader className="flex justify-center">
                <CardTitle>GDC</CardTitle>
                <CardDescription>
                  A site to create events and keep track of visits and
                  head-count
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p>GDC (Gentlemen&apos;s Dining Club)</p>
                <p>
                  School buddies meet up to go to dinner. This tool is to help
                  us decide where to go and keep track of our visits. You need
                  to authenticate to access this tool for now.
                </p>
              </CardContent>
            </div>
            <CardFooter className="flex justify-center">
              <Button asChild color="primary" className="w-full">
                <Link href={`/projects/gdc`}>Open</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
