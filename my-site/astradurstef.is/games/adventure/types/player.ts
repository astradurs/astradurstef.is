export type PlayerState = {
  name: string
  health: number
  attack: {
    min: number
    max: number
  }
  attackModifier: number
  defense: number
  inventory: InventoryType
  gold: number
  maxInventorySize: number
  equipment: EquipmentType
}

export type ArmorItem = {
  id: string
  name: string
  type: "armor"
  description: string
  defense: number
  slot: "head" | "chest" | "legs" | "feet"
}

export type ShieldItem = {
  id: string
  name: string
  type: "shield"
  description: string
  defense: number
  slot: "left"
}

export type WeaponItem = {
  id: string
  name: string
  type: "weapon"
  description: string
  attack: {
    min: number
    max: number
  }
  attackModifier: number
  slot: "right"
}

export type Item = ArmorItem | WeaponItem | ShieldItem

export type InventoryType = {
  items: Item[]
}

export type EquipmentType = {
  head: ArmorItem | null
  chest: ArmorItem | null
  legs: ArmorItem | null
  feet: ArmorItem | null
  left: ShieldItem | null
  right: WeaponItem | null
}
