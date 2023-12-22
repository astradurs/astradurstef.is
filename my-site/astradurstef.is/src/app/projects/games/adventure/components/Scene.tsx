import { type GameScene } from "@/games/adventure/index"

export function Scene({ scene }: { scene: GameScene }) {
  return (
    <div className="w-full bg-default p-4 rounded-md flex flex-col gap-4">
      <h1 className="text-center uppercase font-bold">{scene.title}</h1>
      <p>{scene.description}</p>
      {scene.statusLog && (
        <div className="flex flex-col gap-2">
          {scene.statusLog.map((status, index) => {
            const statusTypeToColor = {
              "player-hit": "success",
              "player-miss": "warning",
              "enemy-hit": "danger",
              "enemy-miss": "success",
              loot: "success",
              "enemies-left": "warning",
            }
            return (
              <p
                className={`text-${statusTypeToColor[status.type]}`}
                key={index}
              >
                {status.text}
              </p>
            )
          })}
        </div>
      )}
    </div>
  )
}
