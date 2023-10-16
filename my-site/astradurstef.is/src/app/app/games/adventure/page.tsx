"use client"
import { useEffect, useState } from "react"
import { gameData } from "../../../../../games/adventure/lib/game"
import {
  NPCType,
  type GameChoice,
  type GameScene,
} from "../../../../../games/adventure/types/game"
import { Scene } from "./components/Scene"
import { Choices } from "./components/Choices"
import { PlayerPane } from "./components/PlayerPane"
import Game from "../../../../../games/adventure/logic/game"
import Player from "../../../../../games/adventure/logic/player"
import NPC from "../../../../../games/adventure/logic/npc"

export default function AdventurePage() {
  const [game, setGame] = useState(new Game(gameData))
  const [scene, setScene] = useState(game.getCurrentScene())
  const [lastScene, setLastScene] = useState(scene)

  const handleChangeScene = (choice: GameChoice) => {
    const { type, nextScene } = choice
    if (type === "fight") {
      console.log("fighting")
      let npcs = scene.npcs.map((npc: NPCType) => new NPC(npc))
      const player = new Player(game.getPlayerState())
      const playerDamage = player.attackAction()
      console.log("playerDamage", playerDamage)
      const npcHealth = npcs[0].takeDamage(playerDamage)
      console.log("npc took damage", npcs[0].getHealth(), npcHealth)
      npcs = npcs.filter((npc) => npc.getHealth() > 0)
      const npcDamage = npcs.reduce((acc, npc) => acc + npc.attackAction(), 0)
      console.log("npcDamage", npcDamage, npcs)
      if (npcDamage > 0) {
        const playerHealth = player.takeDamage(npcDamage)
        console.log("playerHealth", playerHealth)
        game.setPlayerState(player.getPlayerState())
        console.log("player took damage", npcDamage)
        const sceneNpcs = scene.npcs.map((npc) => {
          const npcInstance = npcs.find((n) => n.getId() === npc.id)
          if (npcInstance) {
            return {
              ...npc,
              health: npcInstance.getHealth(),
            }
          }
          return npc
        })
        console.log("sceneNpcs", sceneNpcs)
        if (player.getHealth() <= 0) {
          setScene(game.getScene("death"))
          return
        }
        setScene({ ...scene, npcs: sceneNpcs })
        return
      }
      setScene(lastScene)
      return
    }
    if (type === "travel") {
      setLastScene(scene)
    }
    if (type === "end") {
      setScene(game.getScene("end"))
      return
    }
    if (type === "start") {
      setScene(game.getScene("start"))
      return
    }
    if (type === "wait") {
      setScene(lastScene)
      return
    }
    if (type === "action") {
      setLastScene(scene)
    }
    if (nextScene === null) {
      setScene(game.getScene("end"))
      return
    }
    setScene(game.getScene(nextScene))
  }

  return (
    <div className="grid grid-cols-3 gap-2 w-full justify-around">
      <PlayerPane playerState={gameData.playerState} />
      <Scene scene={scene} />
      <Choices choices={scene.choices} handleChangeScene={handleChangeScene} />
    </div>
  )
}
