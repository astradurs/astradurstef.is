import { NPCType } from "../types/game"
import {
  type PlayerState,
  type InventoryType,
  type EquipmentType,
  type Item,
} from "../types/player"
import _ from "lodash"

export default class NPC {
  id: string
  name: string
  description: string
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
  attitude: "friendly" | "neutral" | "hostile"

  constructor(npc: NPCType) {
    console.log("NPC created")
    this.id = npc.id
    this.name = npc.name
    this.description = npc.description
    this.health = npc.health ?? 100
    this.attack = npc.attack ?? { min: 1, max: 1 }
    this.attackModifier = npc.attackModifier ?? 0
    this.defense = npc.defense ?? 0
    this.inventory = npc.inventory ?? { items: [] }
    this.maxInventorySize = npc.maxInventorySize ?? 10
    this.equipment = npc.equipment ?? {
      head: null,
      chest: null,
      legs: null,
      feet: null,
      left: null,
      right: null,
    }
    this.attitude = npc.attitude ?? "neutral"
  }

  getNPC(): NPCType {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      health: this.health,
      attack: this.attack,
      attackModifier: this.attackModifier,
      defense: this.defense,
      inventory: this.inventory,
      maxInventorySize: this.maxInventorySize,
      equipment: this.equipment,
      attitude: this.attitude,
    }
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getDescription(): string {
    return this.description
  }

  getHealth(): number {
    return this.health
  }

  getAttitude(): "friendly" | "neutral" | "hostile" {
    return this.attitude
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

    console.log("NPC defense", {
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

  static load(): NPC | null {
    const player = localStorage.getItem("player")
    if (player) {
      return new NPC(JSON.parse(player))
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
