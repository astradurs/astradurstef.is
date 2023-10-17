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

export function handleDamage(
  entity: PlayerState | NPCType,
  damage: number,
  toHit: number
): { entity: PlayerState | NPCType; wasHit: boolean } {
  const f = "handleDamage"
  console.log(f, { entity, damage, toHit })
  console.log(f, entity)
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

  const armorClass = 10 + totalDefense
  console.log(f, { armor, totalDefense, armorClass })
  if (toHit < armorClass) {
    console.log(f, "miss")
    return { entity, wasHit: false }
  }
  console.log(f, "hit")

  const totalDamage = _.max([1, damage]) ?? 1
  const newHealth = entity.health - totalDamage
  console.log(f, { totalDamage, newHealth })
  return {
    entity: { ...entity, health: newHealth < 0 ? 0 : newHealth },
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
