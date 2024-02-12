export interface Attribute {
  name:
    | "Strength"
    | "Dexterity"
    | "Constitution"
    | "Intelligence"
    | "Wisdom"
    | "Charisma"
  id: "str" | "dex" | "con" | "int" | "wis" | "cha"
  description: string
  type: "mental" | "physical"
  score: number
  bonuses: number | null
}

export interface STRAttribute extends Attribute {
  name: "Strength"
  id: "str"
  description: "Physical prowess, melee combat, carrying gear, brute force"
  type: "physical"
  score: number
  bonuses: number | null
}

export interface DEXAttribute extends Attribute {
  name: "Dexterity"
  id: "dex"
  description: "Speed, evasion, manual dexterity, reaction time, combat initiative"
  type: "physical"
  score: number
  bonuses: number | null
}

export interface CONAttribute extends Attribute {
  name: "Constitution"
  id: "con"
  description: "Hardiness, enduring injury, resisting toxins, going without food or sleep"
  type: "physical"
  score: number
  bonuses: number | null
}

export interface INTAttribute extends Attribute {
  name: "Intelligence"
  id: "int"
  description: "Memory, reasoning, technical skills, general education"
  type: "mental"
  score: number
  bonuses: number | null
}

export interface WISAttribute extends Attribute {
  name: "Wisdom"
  id: "wis"
  description: "Noticing things, making judgments, reading situations, intuition"
  type: "mental"
  score: number
  bonuses: number | null
}

export interface CHAAttribute extends Attribute {
  name: "Charisma"
  id: "cha"
  description: "Commanding, charming, attracting attention, being taken seriously"
  type: "mental"
  score: number
  bonuses: number | null
}

export type AttributeType =
  | STRAttribute
  | DEXAttribute
  | CONAttribute
  | INTAttribute
  | WISAttribute
  | CHAAttribute
