import { GameCard } from "./components/GameCard"
import { docsConfig } from "@/config/docs"
export default async function GamesPage() {
  const games = docsConfig.projects.games
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {games.map((game) => (
          <GameCard
            title={game.title}
            id={game.id}
            description={game.description}
            key={game.id}
          >
            <p>{game.longDescription}</p>
          </GameCard>
        ))}

        {/** <GameCard
        title="Adventure V2"
        id="adventure-v2"
        description="V2 of the text based adventure"
      >
        <p>For now it has a simple inventory and combat system.</p>
        <p>
          In the future I would like to add more features to it and even make a
          new game that has a map and is a bit more interactive.
        </p>
      </GameCard>
      <GameCard title="Chess" id="chess" description="chess, you know chess!">
        <p>Ported over from my old site.</p>
        <p>Currently unavailable</p>
      </GameCard>  */}
      </div>
    </div>
  )
}
