import { type GameScene } from "../../../../../../games/adventure/types/game"

export function Scene({ scene }: { scene: GameScene }) {
  return (
    <div className="w-full bg-default p-4 rounded-md flex flex-col gap-4">
      <h1 className="text-center uppercase font-bold">{scene.title}</h1>
      <p>{scene.description}</p>
    </div>
  )
}
