import { GameCard } from "../components/cards"

import { docsConfig } from "@/config/docs"
import CategoryLayout from "../components/category-layout"
export default async function GamesPage() {
  const games = docsConfig.projects.games

  return (
    <CategoryLayout
      title="Games"
      cards={games.map((game) => (
        <GameCard
          key={game.id}
          title={game.title}
          id={game.id}
          description={game.description}
          longDescription={game.longDescription}
        />
      ))}
    />
  )
}
