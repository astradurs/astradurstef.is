// library
import { gameData } from "./lib/game"

// logic
import { handleDamage, getDamage, getToHit } from "./logic/damage"
import { unequip, equipFromInventory } from "./logic/inventory"

// types and interfaces
import {
  type PlayerState,
  type Item,
  type ArmorItem,
  type WeaponItem,
  type ShieldItem,
  type InventoryType,
  type EquipmentType,
} from "./types/player"
import {
  GameChoice,
  GameScene,
  GameState,
  NPCType,
  StatusLogType,
} from "./types/game"

// exporting from index.ts
export {
  gameData,
  getToHit,
  handleDamage,
  getDamage,
  unequip,
  equipFromInventory,
  type PlayerState,
  type Item,
  type ArmorItem,
  type WeaponItem,
  type ShieldItem,
  type InventoryType,
  type EquipmentType,
  type GameChoice,
  type GameScene,
  type GameState,
  type NPCType,
  type StatusLogType,
}
