import { Button } from "@nextui-org/react"
import NPC from "../../../../../../games/adventure/logic/npc"
import {
  type GameChoice,
  type GameScene,
  type NPCType,
} from "../../../../../../games/adventure/types/game"
import { Choices } from "./Choices"
import Player from "../../../../../../games/adventure/logic/player"
import { useState } from "react"

export function Scene({ scene }: { scene: GameScene }) {
  return (
    <div className="w-full bg-default p-4 rounded-md flex flex-col gap-4">
      <h1 className="text-center uppercase font-bold">{scene.title}</h1>
      <p>{scene.description}</p>
    </div>
  )
}
