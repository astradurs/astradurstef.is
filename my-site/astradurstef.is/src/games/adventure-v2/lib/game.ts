// Example game state
import { type GameState, type AttitudeType } from "../types/game"
import { Item, PlayerState, type WeaponItem } from "../types/player"
import weapons from "./weapons"
import shields from "./shields"
import armor from "./armor"

const goblins = {
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
      chest: armor["leather-vest"],
      legs: null,
      feet: armor["leather-boots"],
      left: null,
      right: weapons["rusty-sword"],
    },
    attitude: "hostile" as AttitudeType,
  },
  "goblin-chief": {
    id: "goblin-chief",
    name: "Goblin Chief",
    description: "A large green creature.",
    health: 20,
    attack: {
      min: 2,
      max: 4,
    },
    attackModifier: 1,
    defense: 1,
    inventory: {
      items: [],
    },
    maxInventorySize: 10,
    equipment: {
      head: null,
      chest: armor["leather-vest"],
      legs: null,
      feet: armor["leather-boots"],
      left: shields["wooden-shield"],
      right: weapons["scimitar"],
    },
    attitude: "hostile" as AttitudeType,
  },
}
const dragon = {
  id: "dragon",
  name: "Dragon",
  description: "A large red dragon.",
  health: 100,
  attack: {
    min: 5,
    max: 10,
  },
  attackModifier: 5,
  defense: 4,
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
}

const goblinEncounterNpcs = Array(2)
  .fill(goblins.goblin)
  .map((goblin, index) => ({
    ...goblin,
    id: `${goblin.id}-${index}`,
    name: `${goblin.name} ${index + 1}`,
  }))

goblinEncounterNpcs.push(goblins["goblin-chief"])

const goblinEncounterLoot: Item[] = []
goblinEncounterNpcs.forEach((goblin) => {
  const slots = Object.keys(goblin.equipment)
  const equippedItems = slots
    .map((slot) => goblin.equipment[slot])
    .filter((item) => item)
  for (const item of equippedItems) {
    const isInLoot = goblinEncounterLoot.find((loot) => loot.id === item.id)
    if (isInLoot) {
      continue
    }
    goblinEncounterLoot.push(item)
  }

  for (const item of goblin.inventory.items) {
    const isInLoot = goblinEncounterLoot.find((loot) => loot.id === item.id)
    if (isInLoot) {
      continue
    }
    goblinEncounterLoot.push(item)
  }
})

const playerState: PlayerState = {
  name: "Astradur",
  health: 100,
  attack: {
    min: 1,
    max: 1,
  },
  attackModifier: 2,
  defense: 0,
  inventory: {
    items: [],
  },
  maxInventorySize: 10,
  gold: 10,
  equipment: {
    head: armor["leather-cap"],
    chest: armor["leather-vest"],
    legs: armor["leather-pants"],
    feet: armor["leather-boots"],
    left: null,
    right: weapons["rusty-sword"],
  },
}

export const gameData: GameState = {
  currentScene: "start",
  playerState,
  scenes: {
    start: {
      id: "start",
      title: "Start of the Adventure",
      description:
        "You stand in the middle of Graymoor square. Your favorite inn is burning down. A dragon flies overhead, heading east towards the mountain. Your mind is made up. You will slay the dragon and save the village.",
      choices: [
        {
          text: "Leave the village",
          nextScene: "village-edge",
          type: "travel",
        },
        {
          text: "Change your mind and go back to bed...",
          nextScene: "bed",
          type: "travel",
        },
      ],
      touched: true,
    },
    village: {
      id: "village",
      title: "Back in the Village",
      description: "You return to the safety of your village... Why?",
      choices: [
        {
          text: "Go back to bed...",
          nextScene: "bed",
          type: "travel",
        },
        {
          text: "Leave the village",
          nextScene: "village-edge",
          type: "travel",
        },
      ],
      touched: false,
    },
    "village-edge": {
      id: "village-edge",
      title: "Edge of the Village",
      description:
        "You stand at the edge of the village. The forest lies ahead of you.",
      choices: [
        {
          text: "Head into the forest",
          nextScene: "forest-fork",
          type: "travel",
        },
        {
          text: "Go back to the village",
          nextScene: "village",
          type: "travel",
        },
      ],
      touched: false,
    },
    bed: {
      id: "bed",
      title: "Back in Bed",
      description:
        "You go back to bed and hope this all blows over. The end...",
      choices: [
        {
          text: "Start a new adventure",
          nextScene: "start",
          type: "start",
        },
      ],
      touched: false,
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
      touched: false,
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
      touched: false,
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
      touched: false,
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
      touched: false,
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
      touched: false,
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
          loot: goblinEncounterLoot as Item[],
          gold: 10,
        },
      ],
      touched: false,
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
      touched: false,
    },
    "goblin-fight": {
      id: "goblin-fight",
      title: "Goblin Fight",
      description: `You encounter ${
        goblinEncounterNpcs.length > 1
          ? `${goblinEncounterNpcs.length} goblins`
          : "a goblin"
      }!`,
      choices: [
        {
          text: "Fight the goblin",
          nextScene: "goblin-fight",
          type: "fight",
        },
      ],
      npcs: goblinEncounterNpcs,
      touched: false,
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
      touched: false,
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
      npcs: [dragon],
      touched: false,
    },
    death: {
      id: "death",
      title: "Death",
      description: "You died!",
      choices: [
        {
          text: "Try again?",
          nextScene: "start",
          type: "start",
        },
      ],
      touched: false,
    },
  },
}
