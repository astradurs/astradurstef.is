import { docsConfig } from "@/config/docs"
import { BaseCard } from "../components/cards"
import CategoryLayout from "../components/category-layout"

export default async function OtherPage() {
  const other = docsConfig.projects.other
  return (
    <CategoryLayout
      title="Other projects"
      cards={other.map((project) => (
        <BaseCard
          key={project.id}
          title={project.title}
          description={project.description}
          longDescription={project.longDescription}
          href={project.href}
        />
      ))}
    />
  )
}
