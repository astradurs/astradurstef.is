import { ToolCard } from "../components/ToolCard"

export default function ToolsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <ToolCard
          title="Character creator for DND"
          id="character-creator/dnd"
          description="A tool to create characters to print"
        >
          <p>I play DnD and other TTRPG and board games alot...</p>
        </ToolCard>
        <ToolCard
          title="Character creator for SWN"
          id="character-creator/swn"
          description="A tool to create characters to print"
        >
          <p>I play SWN and other TTRPG and board games alot...</p>
        </ToolCard>
        <ToolCard
          title="V2 Character creator for SWN"
          id="character-creator/swn-v2"
          description="A tool to create characters to print"
        >
          <p>I play SWN and other TTRPG and board games alot...</p>
        </ToolCard>
      </div>
    </div>
  )
}
