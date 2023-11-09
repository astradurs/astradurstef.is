enum TileType {
  Grass,
  Forest,
  Water,
  Mountain,
  Village,
  Dungeon,
  RelicShrine,
}

export type Coordinate = {
  x: number
  y: number
}

export type Attributes = {
  health: number
  strength: number
  intelligence: number
  agility: number
}

export interface Equipment {
  armor: string
  weapon: string
  magicItems: string[]
}

export interface Player {
  attributes: Attributes
  equipment: Equipment
  skills: string[]
  position: Coordinate
  inventory: Item[]
}

export interface Item {
  name: string
  type: "Weapon" | "Armor" | "Potion" | "RelicPiece"
  attributes: Partial<Attributes> // e.g., a weapon might have a "strength" attribute
}

export interface Enemy {
  name: string
  attributes: Attributes
  loot: Item[]
  position: Coordinate
}

export interface CombatResult {
  playerHealth: number
  enemyHealth: number
  loot: Item[]
}

export interface Tile {
  type: TileType
  position: Coordinate
}

export interface GrassTile extends Tile {
  type: TileType.Grass
}

export interface World {
  tiles: Tile[][]
  player: Player
  enemies: Enemy[]
  npcs: NPC[]
}

export interface NPC {
  name: string
  dialogue: string[]
  quests: Quest[]
  position: Coordinate
}

export interface Quest {
  name: string
  description: string
  rewards: Item[]
  objective: "RetrieveItem" | "DefeatEnemy"
}

export interface GameEvent {
  type: "Move" | "Attack" | "Interact" | "UseItem"
  payload: any // Depends on the event type; for "Move" it might be a direction, for "UseItem" it might be the item's ID, etc.
}

export interface GameControl {
  registerEvent(event: GameEvent): void
}
