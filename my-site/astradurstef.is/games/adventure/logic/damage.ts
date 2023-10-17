import { type NPCType } from "../types/game"
import { WeaponItem, type PlayerState } from "../types/player"
import _ from "lodash"

export function getToHit(
  entity: PlayerState | NPCType,
  weapon: WeaponItem | null
) {
  const f = "getToHit"
  console.log(f, { entity, weapon })
  const d20Roll = _.random(1, 20)

  const attackModifier = entity.attackModifier
  const baseToHit = d20Roll + attackModifier

  if (weapon === null) {
    console.log(f, "no weapon", baseToHit)
    return baseToHit
  }

  const totalToHit = baseToHit + (weapon?.attackModifier ?? 0)
  console.log(f, "with weapon", totalToHit)
  return totalToHit
}

export function handleDamageToPlayer(
  player: PlayerState,
  enemyNpcs: NPCType[]
): { player: PlayerState; npcsThatHit: { npc: NPCType; damage: number }[] } {
  const f = "handleDamageToPlayer"
  console.log(f, { player, enemyNpcs })

  const equipmentSlots = Object.keys(player.equipment) as Array<
    "head" | "chest" | "legs" | "feet" | "left" | "right"
  >
  let equipmentDefense = 0
  for (const slot of equipmentSlots) {
    const item = player.equipment[slot]
    if (item !== null && item.type === "armor") {
      equipmentDefense += item.defense
    }
  }

  const playerArmorClass = 10 + player.defense + equipmentDefense
  console.log(f, { playerArmorClass })

  let npcsThatHit = []
  let newHealth = player.health
  for (const npc of enemyNpcs) {
    const damage = getDamage(npc)
    const toHit = getToHit(npc, npc.equipment.right)

    const wasHit = toHit >= playerArmorClass

    if (wasHit) {
      console.log(f, `player was hit for ${damage} damage`)
      newHealth -= damage
      npcsThatHit.push({ npc, damage })
    }
  }

  return {
    player: {
      ...player,
      health: newHealth < 0 ? 0 : newHealth,
    },
    npcsThatHit,
  }
}

export function handleDamageToNpc(
  npc: NPCType,
  damage: number,
  toHit: number
): { npc: PlayerState | NPCType; wasHit: boolean } {
  const f = "handleDamage"
  console.log(f, { npc, damage, toHit })
  console.log(f, npc)
  const equipment = npc.equipment
  const armor = [
    equipment.head,
    equipment.chest,
    equipment.legs,
    equipment.feet,
    equipment.left,
  ].filter(
    (item) => item !== null && (item.type === "armor" || item.type === "shield")
  )

  let totalDefense = npc.defense
  for (const item of armor) {
    totalDefense += item?.defense ?? 0
  }

  const armorClass = 10 + totalDefense
  console.log(f, { armor, totalDefense, armorClass })
  if (toHit < armorClass) {
    console.log(f, "miss")
    return { npc, wasHit: false }
  }
  console.log(f, "hit")

  const totalDamage = _.max([1, damage]) ?? 1
  const newHealth = npc.health - totalDamage
  console.log(f, { totalDamage, newHealth })
  return {
    npc: { ...npc, health: newHealth < 0 ? 0 : newHealth },
    wasHit: true,
  }
}

export function getDamage(entity: PlayerState | NPCType) {
  const f = "getDamage"
  const equipment = entity.equipment
  const weapon = equipment.right

  const attackModifier = entity.attackModifier

  if (weapon === null) {
    const damage =
      _.floor(
        _.random() * (entity.attack.max - entity.attack.min + 1) +
          entity.attack.min
      ) + attackModifier
    console.log(f, "no weapon", { damage, attackModifier })
    return damage
  }

  const damage =
    _.floor(
      _.random() * (entity.attack.max - entity.attack.min + 1) +
        entity.attack.min
    ) + attackModifier

  console.log(f, `With weapon ${weapon.name}`, { damage, attackModifier })
  return damage
}
