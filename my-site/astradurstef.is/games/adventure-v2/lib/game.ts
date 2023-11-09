import {
  type World,
  type Player,
  type Coordinate,
  type Attributes,
  type Equipment,
  type Item,
  type Enemy,
  type CombatResult,
  type Tile,
  type NPC,
} from "../types/map"

enum TileType {
  Grass,
  Forest,
  Water,
  Mountain,
  Village,
  Dungeon,
  RelicShrine,
}

const tileTypes = [
  TileType.Grass,
  TileType.Forest,
  TileType.Water,
  TileType.Mountain,
  TileType.Village,
  TileType.Dungeon,
  TileType.RelicShrine,
]

const world: World = {
  tiles: [],
  player: {
    attributes: {
      health: 100,
      strength: 10,
      intelligence: 10,
      agility: 10,
    },
    equipment: {
      armor: "Leather",
      weapon: "Dagger",
      magicItems: [],
    },
    skills: [],
    position: {
      x: 0,
      y: 0,
    },
    inventory: [],
  },
  enemies: [],
  npcs: [],
}
