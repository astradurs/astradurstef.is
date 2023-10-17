import { GameCard } from "./components/GameCard"
export default function GamesPage() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <GameCard title="Adventure" id="adventure">
          <p>A simple text based adventure.</p>
          <p>For now it has a simple inventory and combat system.</p>
          <p>
            In the future I would like to add more features to it and even make
            a new game that has a map and is a bit more interactive.
          </p>
        </GameCard>
        <GameCard title="Chess" id="chess">
          <p>Chess, you know chess</p>
          <p>Ported over from my old site.</p>
          <p>Currently unavailable</p>
        </GameCard>
      </div>
    </div>
  )
}
