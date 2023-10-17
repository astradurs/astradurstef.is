// library
import { gameData } from "./lib/game"

// logic
import {
  handleDamageToNpc,
  getDamage,
  getToHit,
  handleDamageToPlayer,
} from "./logic/damage"
import {
  unequip,
  equipFromInventory,
  lootGold,
  lootItems,
} from "./logic/inventory"

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
  handleDamageToPlayer,
  handleDamageToNpc,
  getDamage,
  unequip,
  equipFromInventory,
  lootGold,
  lootItems,
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
