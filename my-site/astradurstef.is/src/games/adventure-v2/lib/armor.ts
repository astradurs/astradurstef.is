import { type ArmorItem } from "@/games/adventure-v2/types/player"
const armor: { [key: string]: ArmorItem } = {
  "leather-vest": {
    id: "leather-vest",
    name: "Leather Vest",
    description: "A simple leather vest.",
    type: "armor",
    defense: 1,
    slot: "chest",
  },
  "leather-cap": {
    id: "leather-cap",
    name: "Leather Cap",
    description: "A simple leather cap.",
    type: "armor",
    defense: 1,
    slot: "head",
  },
  "leather-pants": {
    id: "leather-pants",
    name: "Leather Pants",
    description: "A simple pair of leather pants.",
    type: "armor",
    defense: 1,
    slot: "legs",
  },
  "leather-boots": {
    id: "leather-boots",
    name: "Leather Boots",
    description: "A simple pair of leather boots.",
    type: "armor",
    defense: 1,
    slot: "feet",
  },
  "chainmail-vest": {
    id: "chainmail-vest",
    name: "Chainmail Vest",
    description: "A simple chainmail vest.",
    type: "armor",
    defense: 2,
    slot: "chest",
  },
  "chainmail-cap": {
    id: "chainmail-cap",
    name: "Chainmail Cap",
    description: "A simple chainmail cap.",
    type: "armor",
    defense: 2,
    slot: "head",
  },
  "chainmail-pants": {
    id: "chainmail-pants",
    name: "Chainmail Pants",
    description: "A simple pair of chainmail pants.",
    type: "armor",
    defense: 2,
    slot: "legs",
  },
  "chainmail-boots": {
    id: "chainmail-boots",
    name: "Chainmail Boots",
    description: "A simple pair of chainmail boots.",
    type: "armor",
    defense: 2,
    slot: "feet",
  },
}

export default armor
