import ToolsPage from "./tools/page"
import GamesPage from "./games/page"
import { Separator } from "@/components/ui/separator"

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
      <Separator />
      <ToolsPage />
    </div>
  )
}
