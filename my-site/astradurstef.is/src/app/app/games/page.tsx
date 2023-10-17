import { GameCard } from "./components/GameCard"
export default function GamesPage() {
  return (
    <div>
      <h1>Games</h1>
      <div className="grid grid-cols-3">
        <GameCard title="Adventure" id="adventure">
          <p>A simple text based adventure.</p>
          <p>For now it has a simple inventory and combat system.</p>
          <p>
            In the future I would like to add more features to it and even make
            a new game that has a map and is a bit more interactive.
          </p>
        </GameCard>
      </div>
    </div>
  )
}
