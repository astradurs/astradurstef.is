import {
  type PlayerState,
  type InventoryType,
  type EquipmentType,
  type Item,
} from "../types/player"
import _ from "lodash"

export default class Player {
  name: string
  health: number
  attack: {
    min: number
    max: number
  }
  attackModifier: number
  defense: number
  inventory: InventoryType
  maxInventorySize: number
  equipment: EquipmentType

  constructor(player: PlayerState) {
    console.log("Player being created")
    this.name = player.name
    this.health = player.health ?? 100
    this.attack = player.attack ?? { min: 1, max: 1 }
    this.attackModifier = player.attackModifier ?? 0
    this.defense = player.defense ?? 0
    this.inventory = player.inventory ?? { items: [] }
    this.maxInventorySize = player.maxInventorySize ?? 10
    this.equipment = player.equipment ?? {
      head: null,
      chest: null,
      legs: null,
      feet: null,
      left: null,
      right: null,
    }
    console.log("Player created", this)
  }

  getPlayerState(): PlayerState {
    return {
      name: this.name,
      health: this.health,
      attack: this.attack,
      attackModifier: this.attackModifier,
      defense: this.defense,
      inventory: this.inventory,
      maxInventorySize: this.maxInventorySize,
      equipment: this.equipment,
    }
  }

  getName(): string {
    return this.name
  }

  getHealth(): number {
    return this.health
  }

  getAttack(): { min: number; max: number } {
    return this.attack
  }

  getAttackModifier(): number {
    return this.attackModifier
  }

  getDefense(): number {
    const defense = this.defense
    const head = this.equipment.head?.defense ?? 0
    const chest = this.equipment.chest?.defense ?? 0
    const legs = this.equipment.legs?.defense ?? 0
    const feet = this.equipment.feet?.defense ?? 0
    const left = this.equipment.left?.defense ?? 0

    const sum = head + chest + legs + feet + left + defense

    console.log("Player defense", {
      defense,
      head,
      chest,
      legs,
      feet,
      left,
      sum,
    })

    return sum
  }

  getInventory(): InventoryType {
    return this.inventory
  }

  getInventoryItem(id: string): Item | null {
    return this.inventory.items.find((item) => item.id === id) ?? null
  }

  removeInventoryItem(id: string): void {
    this.inventory.items = this.inventory.items.filter((item) => item.id !== id)
  }

  addItemToInventory(item: Item): void {
    this.inventory.items.push(item)
  }

  getMaxInventorySize(): number {
    return this.maxInventorySize
  }

  getEquipment(): EquipmentType {
    return this.equipment
  }

  getEquippedItem(
    slot: "head" | "chest" | "legs" | "feet" | "left" | "right"
  ): Item | null {
    return this.equipment[slot]
  }

  unequipItem(slot: "head" | "chest" | "legs" | "feet" | "left" | "right"): {
    item: Item | null
    inventory: InventoryType
    equipment: EquipmentType
  } {
    const item = this.equipment[slot]
    this.equipment[slot] = null
    return {
      item,
      inventory: this.inventory,
      equipment: this.equipment,
    }
  }

  save(): void {
    localStorage.setItem("player", JSON.stringify(this))
  }

  static load(): Player | null {
    const player = localStorage.getItem("player")
    if (player) {
      return new Player(JSON.parse(player))
    }

    return null
  }

  equipItemFromInventory(item: Item): {
    inventory: InventoryType
    equipment: EquipmentType
  } {
    const { item: equippedItem } = this.unequipItem(item.slot)
    if (equippedItem) {
      this.addItemToInventory(equippedItem)
    }
    this.removeInventoryItem(item.id)

    return {
      inventory: this.inventory,
      equipment: this.equipment,
    }
  }

  attackAction(): number {
    const weaponAttack = this.equipment.right
    const playerAttack = this.attack
    const attackModifier = this.attackModifier
    if (weaponAttack) {
      return (
        _.random(weaponAttack.attack.min, weaponAttack.attack.max) +
        attackModifier
      )
    }
    return (
      _.random(playerAttack.min, playerAttack.max + attackModifier) +
      attackModifier
    )
  }

  takeDamage(damage: number): number {
    if (damage < 0) {
      return this.health
    }

    const defense = this.getDefense()
    console.log("NPC damage v defense", { damage, defense })
    let defendedDamage = damage - defense
    if (defendedDamage <= 0) {
      console.log("NPC damage was defended")
      this.health -= 1
    }

    console.log("NPC took damage", {
      damage,
      health: this.health - damage,
    })

    if (damage - defendedDamage > this.health) {
      this.health = 0
      return 0
    }

    const realDamage = damage - defendedDamage
    return (this.health -= realDamage)
  }
}
