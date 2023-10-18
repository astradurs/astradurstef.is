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
  slot: "head" | "chest" | "legs" | "feet" | "right" | "left" | "both"
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

export function discardFromInventory({
  player,
  item,
}: {
  player: PlayerState
  item: Item
}): PlayerState {
  const inventory = player.inventory

  const newInventory = inventory.items.filter((i) => i.id !== item.id)

  return {
    ...player,
    inventory: {
      items: newInventory,
    },
  }
}

export function lootGold(player: PlayerState, gold: number): PlayerState {
  return {
    ...player,
    gold: player.gold + gold,
  }
}

export function lootItems(player: PlayerState, items: Item[]): PlayerState {
  const inventory = player.inventory
  const ids = inventory.items.map((i) => i.id)
  items.forEach((item) => {
    if (!ids.includes(item.id)) {
      ids.push(item.id)
    }
  })
  const newItems = items.map((item) => {
    if (ids.includes(item.id)) {
      return {
        ...item,
        id: `${item.id}-${ids.length + 1}`,
      }
    }

    return item
  })
  const newInventory = inventory.items.concat(newItems)

  return {
    ...player,
    inventory: {
      items: newInventory,
    },
  }
}
