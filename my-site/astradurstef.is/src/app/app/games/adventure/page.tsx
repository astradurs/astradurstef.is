"use client"
import { useState } from "react"

import { Scene } from "./components/Scene"
import { Choices } from "./components/Choices"
import { PlayerPane } from "./components/PlayerPane"
import {
  gameData,
  unequip,
  handleDamageToPlayer,
  equipFromInventory,
  handleDamageToNpc,
  getDamage,
  getToHit,
  lootGold,
  lootItems,
  type PlayerState,
  type Item,
  type NPCType,
  type GameChoice,
  type GameScene,
  type StatusLogType,
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
    let statusLog = null

    if (choice.loot) {
      const loot = handleLootChoice({ choice, player, setPlayer })
      statusLog = loot.map((item) => ({
        text: `You loot ${item.name}`,
        type: "loot",
      })) as StatusLogType[]
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
      if (statusLog) {
        lastScene.statusLog = statusLog
      }
      setScene(lastScene)
      return
    }
    if (statusLog) {
      gameData.scenes[nextScene].statusLog = statusLog
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
  const f = "handleFightScene"
  console.log(f, { player, scene })
  const playerDamage = getDamage(player)
  const playerToHit = getToHit(player, player.equipment.right)

  const otherNpcs =
    scene.npcs?.filter((npc) => npc.attitude !== "hostile") ?? ([] as NPCType[])
  let enemyNpcs =
    scene.npcs?.filter((npc) => npc.attitude === "hostile") ?? ([] as NPCType[])

  let statusLog: StatusLogType[] = []

  const { npc: enemyNpc, wasHit: enemyWasHit } = handleDamageToNpc(
    enemyNpcs[0],
    playerDamage,
    playerToHit
  ) as { npc: NPCType; wasHit: boolean }
  if (enemyWasHit) {
    statusLog.push({
      text: `You hit ${enemyNpc.name} for ${playerDamage} damage`,
      type: "player-hit",
    })
  } else {
    statusLog.push({
      text: `You missed ${enemyNpc.name}`,
      type: "player-miss",
    })
  }

  enemyNpcs[0] = enemyNpc

  enemyNpcs = enemyNpcs.filter((npc) => npc.health > 0)
  if (enemyNpcs.length === 0) {
    console.log("victory")
    const victoryScene = gameData.scenes[`${scene.id}-won`]
    victoryScene.statusLog = statusLog

    setScene(victoryScene)
    return
  }

  const enemiesLeft = enemyNpcs.length
  if (enemiesLeft > 1) {
    statusLog.push({
      text: `There are ${enemiesLeft} enemies left`,
      type: "enemies-left",
    })
  }

  const { player: newPlayer, npcsThatHit } = handleDamageToPlayer(
    player,
    enemyNpcs
  )

  for (const npcs of enemyNpcs) {
    const recordOfHit = npcsThatHit.find((entry) => entry.npc.id === npcs.id)
    if (recordOfHit) {
      statusLog.push({
        text: `${npcs.name} hit you for ${recordOfHit.damage} damage`,
        type: "enemy-hit",
      })
    } else {
      statusLog.push({
        text: `${npcs.name} missed you`,
        type: "enemy-miss",
      })
    }
  }

  setPlayer(newPlayer)

  let playerHealth = player.health
  if (playerHealth === 0) {
    const deathScene = gameData.scenes["death"]
    deathScene.statusLog = statusLog
    setScene(deathScene)
    return
  }

  const newScene = {
    ...gameData.scenes[scene.id],
    npcs: [...enemyNpcs, ...otherNpcs],
    statusLog,
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
}): Item[] {
  const f = "handleLootChoice"
  console.log(f, { choice })
  const sceneLoot: Item[] = choice?.loot ?? []
  const sceneGold: number = choice?.gold ?? 0

  const playerWithGold = lootGold(player, sceneGold)
  const playerWithLoot = lootItems(playerWithGold, sceneLoot)
  setPlayer(playerWithLoot)

  console.log(f, { player })

  return sceneLoot
}
