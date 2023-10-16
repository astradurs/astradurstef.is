// Define a type for game choices
import { PlayerState, InventoryType, EquipmentType, Item } from "./player"

export type GameChoice = {
  text: string // Text displayed to the player for the choice
  nextScene: string | null // Identifier for the next scene after choosing this option
  type: "travel" | "action" | "end" | "wait" | "start" | "fight" | "flee" // Type of choice
}

// Define an interface for a game scene
export interface GameScene {
  id: string // Unique identifier for the scene
  title: string // Title of the scene
  description: string // Description of the scene
  choices: GameChoice[] // List of choices the player can make in this scene
  npcs: NPCType[]
  loot?: Item[]
}

// Define a type for the game state
export type GameState = {
  currentScene: string // Identifier for the current scene
  scenes: Record<string, GameScene> // A collection of all game scenes
  playerState: PlayerState
}

export type NPCType = {
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
}

export type AttitudeType = "friendly" | "neutral" | "hostile"
