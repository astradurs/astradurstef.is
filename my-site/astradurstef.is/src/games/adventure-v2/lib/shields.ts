import { type ShieldItem } from "@/games/adventure-v2/types/player"
const shields: { [key: string]: ShieldItem } = {
  "wooden-shield": {
    id: "wooden-shield",
    name: "Wooden Shield",
    description: "A simple wooden shield.",
    type: "shield",
    defense: 1,
    slot: "left",
  },
}

export default shields
