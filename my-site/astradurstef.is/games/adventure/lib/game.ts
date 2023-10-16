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
  dragon: {
    id: "dragon",
    name: "Dragon",
    description: "A large red dragon.",
    health: 100,
    attack: {
      min: 10,
      max: 20,
    },
    attackModifier: 0,
    defense: 2,
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
      right: null,
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
          nextScene: "dragon-fight",
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
    "goblin-fight-won": {
      id: "fight-won",
      title: "You Won!",
      description: "You won the fight!",
      choices: [
        {
          text: "Continue",
          nextScene: "forest",
          type: "travel",
        },
        {
          text: "Loot the goblins",
          nextScene: "goblin-loot",
          type: "action",
        },
      ],
      npcs: [],
    },
    "goblin-loot": {
      id: "goblin-loot",
      title: "Loot the Goblins",
      description: "You loot the goblins.",
      choices: [
        {
          text: "Continue",
          nextScene: "forest",
          type: "travel",
        },
      ],
      npcs: [],
      loot: [
        {
          id: "goblin-sword",
          name: "Goblin Sword",
          description: "A goblin sword.",
          type: "weapon",
          attack: {
            min: 1,
            max: 4,
          },
          slot: "right",
        },
        {
          id: "goblin-breastplate",
          name: "Goblin Breastplate",
          description: "A goblin breastplate armor.",
          type: "armor",
          defense: 10,
          slot: "chest",
        },
      ],
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
      ],
      npcs: [npcs.goblin],
    },
    "dragon-fight-won": {
      id: "dragon-fight-won",
      title: "You Won!",
      description: "You won the fight!",
      choices: [
        {
          text: "Continue",
          nextScene: "cave",
          type: "travel",
        },
      ],
      npcs: [],
    },
    "dragon-fight": {
      id: "dragon-fight",
      title: "Dragon Fight",
      description: "You encounter a dragon!",
      choices: [
        {
          text: "Fight the dragon",
          nextScene: "dragon-fight",
          type: "fight",
        },
      ],
      npcs: [npcs.dragon],
    },
  },
}
