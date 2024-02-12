import { ToolCard } from "./components/ToolCard"
export default function ToolsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/** <ToolCard
          title="Lunch menu creator"
          id="lunch-menu-creator"
          description="A tool to create lunch menus"
        >
          <p>
            At my current job we create lunch menus which we send out to
            companies
          </p>
          <p>
            Our current tool leaves much to be desired so I intend to play
            around with this idea and see if I can make something better
          </p>
        </ToolCard>
         <ToolCard
          title="Card generator"
          id="card-generator"
          description="A tool to create cards to print"
        >
          <p>
            I play DnD and other TTRPG and board games alot, and I like to print
            out handouts and cards for my players
          </p>
          <p>
            I am hoping to make a tool that can help me with that and even have
            some neat customization options...
          </p>
        </ToolCard>
        <ToolCard
          title="Character creator"
          id="character-creator"
          description="A tool to create characters to print"
        >
          <p>I play DnD and other TTRPG and board games alot...</p>
      </ToolCard> **/}
      </div>
    </div>
  )
}
