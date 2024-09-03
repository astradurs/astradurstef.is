import { ToolCard } from "../components/cards"
import CategoryLayout from "../components/category-layout"

export default function ToolsPage() {
  return (
    <CategoryLayout
      title="Tools"
      cards={[
        <ToolCard
          key="character-creator"
          title="Character creators"
          id="character-creator"
          description="Tools to create characters to print (WIP)"
          longDescription="I play DnD and other TTRPG and board games alot..."
        />,
      ]}
    />
  )
}
