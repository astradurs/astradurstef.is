import { Separator } from "@/components/ui/separator"
import { docsConfig } from "@/config/docs"
import { Box, Grid, Heading, Text } from "@radix-ui/themes"
import GamesPage from "./games/page"
import OtherPage from "./other/page"

export default async function ProjectsPage() {
  const otherProjects = docsConfig.projects.other

  return (
    <Grid gap="4">
      <Box>
        <Heading className="text-xl font-semibold">Projects</Heading>
        <Text>
          Here are some of the projects I am currently working on or have been
          working on. I can be a bit all over the place so I can not promise
          that all or any of these work a 100% of the time. Mostly this is my
          own little playground where I can try out new things and ideas.
        </Text>
      </Box>
      <Separator />
      <OtherPage />
      {/** <Separator />
      <ToolsPage /> **/}
      <Separator />
      <GamesPage />
    </Grid>
  )
}
