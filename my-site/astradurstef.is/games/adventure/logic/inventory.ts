import { Item, PlayerState } from "../types/player"

export function equipFromInventory(
  player: PlayerState,
  item: Item
): PlayerState {
  const inventory = player.inventory
  const equipment = player.equipment
  const slot = item.slot

  if (equipment[slot] !== null) {
    inventory.items.push(equipment[slot] as Item)
  }

  const newInventory = inventory.items.filter((i) => i.id !== item.id)

  return {
    ...player,
    inventory: {
      items: newInventory,
    },
    equipment: {
      ...equipment,
      [slot]: item,
    },
  }
}

export function unequip(
  player: PlayerState,
  slot: "head" | "chest" | "legs" | "feet" | "right" | "left"
): PlayerState {
  const equipment = player.equipment
  const inventory = player.inventory

  if (equipment[slot] === null) {
    return player
  }

  const newInventory = inventory.items.push(equipment[slot] as Item)

  return {
    ...player,
    inventory: {
      items: inventory.items,
    },
    equipment: {
      ...equipment,
      [slot]: null,
    },
  }
}
