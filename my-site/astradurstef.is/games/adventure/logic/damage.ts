import { type NPCType } from "../types/game"
import { type PlayerState } from "../types/player"
import _ from "lodash"

export function handleDamage(
  entity: PlayerState | NPCType,
  damage: number
): PlayerState {
  console.log("handleDamage", damage)
  console.log(entity)
  const equipment = entity.equipment
  const armor = [
    equipment.head,
    equipment.chest,
    equipment.legs,
    equipment.feet,
    equipment.left,
  ].filter(
    (item) => item !== null && (item.type === "armor" || item.type === "shield")
  )

  let totalDefense = entity.defense
  for (const item of armor) {
    totalDefense += item?.defense ?? 0
  }

  const totalDamage = _.max([1, damage - totalDefense]) ?? 1
  const newHealth = entity.health - totalDamage
  return {
    ...entity,
    health: newHealth < 0 ? 0 : newHealth,
  }
}

export function getDamage(entity: PlayerState | NPCType) {
  const equipment = entity.equipment
  const weapon = equipment.right

  if (weapon === null) {
    const baseDamage = _.floor(
      _.random() * (entity.attack.max - entity.attack.min + 1) +
        entity.attack.min
    )
    return baseDamage
  }

  const baseDamage = _.floor(
    _.random() * (entity.attack.max - entity.attack.min + 1) + entity.attack.min
  )

  const totalDamage = baseDamage + (weapon?.attack.max ?? 0)

  return totalDamage
}
