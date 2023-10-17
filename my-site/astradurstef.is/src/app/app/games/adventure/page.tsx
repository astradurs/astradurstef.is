"use client"
import { useState } from "react"

import { Scene } from "./components/Scene"
import { Choices } from "./components/Choices"
import { PlayerPane } from "./components/PlayerPane"
import {
  gameData,
  unequip,
  equipFromInventory,
  handleDamage,
  getDamage,
  type PlayerState,
  type Item,
  type NPCType,
  type GameChoice,
  type GameScene,
} from "../../../../../games/adventure/index"

export default function AdventurePage() {
  const [game, setGame] = useState(gameData)

  const [lastScene, setLastScene] = useState<GameScene>(
    game.scenes[game.currentScene]
  )
  const [scene, setScene] = useState<GameScene>(game.scenes[game.currentScene])
  const [player, setPlayer] = useState(game.playerState)

  const handleChangeScene = (choice: GameChoice) => {
    console.log("handleChangeScene", { choice })
    console.log({ scene, lastScene })
    const { type, nextScene } = choice

    if (choice.loot) {
      handleLootChoice({ choice, player, setPlayer })
    }

    if (type === "fight") {
      handleFightScene({ player, scene, setScene, setPlayer })
      return
    }

    if (type === "end" || type === "start") {
      setScene(gameData.scenes["start"])
      setLastScene(gameData.scenes["start"])
      setPlayer(gameData.playerState)
      setGame(gameData)
      return
    }

    setLastScene(scene)
    if (nextScene === null) {
      setScene(lastScene)
      return
    }
    setScene(gameData.scenes[nextScene])
  }

  const handleEquipItemFrominventory = ({
    item,
    targetSlot,
  }: {
    item: Item
    targetSlot: "head" | "chest" | "legs" | "feet" | "left" | "right"
  }) => {
    if (item.slot !== targetSlot) {
      item.slot = targetSlot
    }
    setPlayer(equipFromInventory(player, item))
  }

  const handleUnequipItem = ({ item }: { item: Item }) => {
    setPlayer(unequip(player, item.slot))
  }

  return (
    <div className="grid sm:grid-cols-3 gap-2 w-full">
      <div className="sm:order-2">
        <Scene scene={scene} />
      </div>
      <div className="sm:order-3">
        <Choices
          choices={scene.choices}
          handleChangeScene={handleChangeScene}
        />
      </div>
      <div className="sm:order-1">
        <PlayerPane
          player={player}
          handleEquipItemFrominventory={handleEquipItemFrominventory}
          handleUnequipItem={handleUnequipItem}
        />
      </div>
    </div>
  )
}

function handleFightScene({
  player,
  scene,
  setScene,
  setPlayer,
}: {
  player: PlayerState
  scene: GameScene
  setScene: Function
  setPlayer: Function
}) {
  console.log("fight")
  const playerDamage = getDamage(player)

  const otherNpcs = scene.npcs.filter(
    (npc) => npc.attitude !== "hostile"
  ) as NPCType[]
  let enemyNpcs = scene.npcs.filter(
    (npc) => npc.attitude === "hostile"
  ) as NPCType[]

  console.log("NPCS Before damage", { enemyNpcs, otherNpcs })
  enemyNpcs[0] = handleDamage(enemyNpcs[0], playerDamage) as NPCType
  enemyNpcs = enemyNpcs.filter((npc) => npc.health > 0)
  console.log("NPCS After damage", { enemyNpcs })
  if (enemyNpcs.length === 0) {
    console.log("victory")
    const victoryScene = gameData.scenes[`${scene.id}-won`]

    setScene(victoryScene)
    return
  }
  console.log("NPCS not dead")

  let npcDamage = 0
  enemyNpcs.forEach((npc) => {
    npcDamage += getDamage(npc)
  })
  console.log("NPCS damage", { npcDamage })

  const newPlayerState = handleDamage(player, npcDamage)
  console.log("newPlayerState", { newPlayerState })

  setPlayer(newPlayerState)

  const newScene = {
    ...gameData.scenes[scene.id],
    npcs: [...enemyNpcs, ...otherNpcs],
  }
  setScene(newScene)
  return
}

function handleLootChoice({
  choice,
  player,
  setPlayer,
}: {
  choice: GameChoice
  player: PlayerState
  setPlayer: Function
}) {
  console.log("loot", { choice })
  const sceneLoot: Item[] = choice?.loot ?? []
  player.inventory.items.push(...sceneLoot)
  setPlayer(player)
  console.log({ player })
  return
}
