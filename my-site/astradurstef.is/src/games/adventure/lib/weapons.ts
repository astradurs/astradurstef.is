import { type WeaponItem } from ".."
const weapons: { [key: string]: WeaponItem } = {
  "rusty-sword": {
    id: "rusty-sword",
    name: "Rusty Sword",
    description: "A rusty sword.",
    type: "weapon",
    attack: {
      min: 1,
      max: 6,
    },
    attackModifier: 0,
    slot: "right",
  },
  scimitar: {
    id: "scimitar",
    name: "Scimitar",
    description: "A curved sword.",
    type: "weapon",
    attack: {
      min: 1,
      max: 8,
    },
    attackModifier: 0,
    slot: "right",
  },
  "great-sword": {
    id: "great-sword",
    name: "Great Sword",
    description: "A large sword.",
    type: "weapon",
    attack: {
      min: 1,
      max: 10,
    },
    attackModifier: 0,
    slot: "right",
  },
}

export default weapons
