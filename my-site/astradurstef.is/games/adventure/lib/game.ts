// Example game state
import { type GameState, type AttitudeType } from "../types/game"
import { type WeaponItem } from "../types/player"

const npcs = {
  goblin: {
    id: "goblin",
    name: "Goblin",
    description: "A small green creature.",
    health: 10,
    attack: {
      min: 1,
      max: 3,
    },
    attackModifier: 0,
    defense: 0,
    inventory: {
      items: [],
    },
    maxInventorySize: 10,
    equipment: {
      head: null,
      chest: null,
      legs: null,
      feet: null,
      left: null,
      right: {
        id: "3",
        name: "Rusty Dagger",
        description: "A rusty dagger.",
        type: "weapon",
        attack: {
          min: 1,
          max: 4,
        },
        slot: "right",
      } as WeaponItem,
    },
    attitude: "hostile" as AttitudeType,
  },
}

export const gameData: GameState = {
  currentScene: "start",
  playerState: {
    name: "Astradur",
    health: 100,
    attack: {
      min: 1,
      max: 1,
    },
    attackModifier: 0,
    defense: 0,
    inventory: {
      items: [],
    },
    maxInventorySize: 10,
    equipment: {
      head: {
        id: "1",
        name: "Leather Cap",
        description: "A simple leather cap.",
        type: "armor",
        defense: 1,
        slot: "head",
      },
      chest: null,
      legs: null,
      feet: null,
      left: null,
      right: {
        id: "2",
        name: "Rusty Sword",
        description: "A rusty sword.",
        type: "weapon",
        attack: {
          min: 1,
          max: 6,
        },
        slot: "right",
      },
    },
  },
  scenes: {
    start: {
      id: "start",
      title: "Start of the Adventure",
      description: "You find yourself in a mysterious forest.",
      choices: [
        {
          text: "Go deeper into the forest",
          nextScene: "forest-fork",
          type: "travel",
        },
        {
          text: "Return to the village",
          nextScene: "village",
          type: "travel",
        },
      ],
      npcs: [],
    },
    "forest-fork": {
      id: "forest-fork",
      title: "Deep in the Forest",
      description: "You discover a fork in the road.",
      choices: [
        {
          text: "Take the path to the left",
          nextScene: "forest",
          type: "travel",
        },
        {
          text: "Take the path to the right",
          nextScene: "goblin-fight",
          type: "travel",
        },
      ],
      npcs: [],
    },
    forest: {
      id: "forest",
      title: "Deep in the Forest",
      description: "You find a hidden cave.",
      choices: [
        {
          text: "Enter the cave",
          nextScene: "cave",
          type: "travel",
        },
        {
          text: "Stay in the forest",
          nextScene: "stay",
          type: "wait",
        },
      ],
      npcs: [],
    },
    cave: {
      id: "cave",
      title: "Inside the Cave",
      description: "You find a treasure chest!",
      choices: [
        {
          text: "Open the chest",
          nextScene: "treasure",
          type: "action",
        },
        {
          text: "Leave the cave",
          nextScene: "forest",
          type: "travel",
        },
      ],
      npcs: [],
    },
    treasure: {
      id: "treasure",
      title: "Treasure Found",
      description: "You are rich!",
      choices: [
        {
          text: "Start a new adventure",
          nextScene: "start",
          type: "start",
        },
      ],
      npcs: [],
    },
    village: {
      id: "village",
      title: "Back to the Village",
      description: "You return to the safety of your village.",
      choices: [
        {
          text: "Begin a new journey",
          nextScene: "start",
          type: "start",
        },
      ],
      npcs: [],
    },
    stay: {
      id: "stay",
      title: "You Stay in the Forest",
      description: "You decide to stay in the forest forever. The end.",
      choices: [
        {
          text: "Start a new adventure",
          nextScene: "start",
          type: "start",
        },
      ],
      npcs: [],
    },
    "goblin-fight": {
      id: "goblin-fight",
      title: "Goblin Fight",
      description: "You encounter a goblin!",
      choices: [
        {
          text: "Fight the goblin",
          nextScene: "goblin-fight",
          type: "fight",
        },
        {
          text: "Run away",
          nextScene: null,
          type: "flee",
        },
      ],
      npcs: [npcs.goblin],
    },
  },
}
