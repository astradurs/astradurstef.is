import { Skill } from "../swn/skills"
import { BackgroundInformation } from "./background"
import { ClassInformation } from "./class"
// Interface for a player character in the TTRPG Stars Without Number
export interface CharacterInformation {
  basicCharacterInformation: BasicCharacterInformation
  attributeInformation: AttributeInformation
  attributeScoreBonuses: AttributeScoreBonus[]
  attributeModifierBonuses: AttributeModifierBonus[]
  backgroundInformation?: BackgroundInformation
  classInformation?: ClassInformation
  skills: Skill[]
}
const firstRoll = {
  str: roll3d6(),
  dex: roll3d6(),
  con: roll3d6(),
  int: roll3d6(),
  wis: roll3d6(),
  cha: roll3d6(),
}
export const initialCharacterInformation: CharacterInformation = {
  basicCharacterInformation: {
    name: "",
    goals: "",
    origin: "",
    gift1: "",
    gift2: "",
  },
  attributeInformation: {
    method: "roll",
    attributeScores: firstRoll,
    originalScores: firstRoll,
    randomScores: firstRoll,
    attributeSetTo14: null,
    rerolls: 0,
  },
  attributeScoreBonuses: [],
  attributeModifierBonuses: [],
  backgroundInformation: {
    background: "",
    backgroundSkills: [],
    backgroundNotes: "",
    tableRolls: [],
  },
  classInformation: {
    className: "",
    classSkillChoices: [],
    classSkillPicks: [],
    notes: {
      description: "",
      abilities: [],
    },
  },
  skills: [],
}

export function changeAttributeMethod(
  method: "roll" | "assignment",
  character: CharacterInformation
): CharacterInformation {
  const characterClone = { ...character }
  characterClone.attributeInformation.method = method

  if (method === "roll") {
    const randomScores = {
      str: roll3d6(),
      dex: roll3d6(),
      con: roll3d6(),
      int: roll3d6(),
      wis: roll3d6(),
      cha: roll3d6(),
    }
    characterClone.attributeInformation.attributeScores = { ...randomScores }
    characterClone.attributeInformation.originalScores = { ...randomScores }
    characterClone.attributeInformation.randomScores = { ...randomScores }
    characterClone.attributeInformation.attributeSetTo14 = null
    characterClone.attributeInformation.rerolls = 0
  }

  if (method === "assignment") {
    characterClone.attributeInformation.attributeScores = {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
    }
    characterClone.attributeInformation.originalScores = {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
    }
    characterClone.attributeInformation.randomScores = {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
    }
    characterClone.attributeInformation.attributeSetTo14 = null
    characterClone.attributeInformation.rerolls = 0
  }

  return characterClone
}

export function assignAttributeScore(
  attribute: AttributeInformation["attributeSetTo14"],
  score: 14 | 12 | 11 | 10 | 9 | 7,
  character: CharacterInformation
) {
  const characterClone = { ...character }
  if (attribute === null) return characterClone

  if (characterClone.attributeInformation.method === "assignment") {
    const attributeScores = characterClone.attributeInformation.attributeScores
    for (const attributeString in attributeScores) {
      const attr = attributeString as
        | "str"
        | "dex"
        | "con"
        | "int"
        | "wis"
        | "cha"
      if (attr !== attribute) {
        if (attributeScores[attr] === score) {
          characterClone.attributeInformation.attributeScores[attr] = 0
        }
      }
    }

    characterClone.attributeInformation.originalScores[attribute] = score
    const originalScores = characterClone.attributeInformation.originalScores

    for (const attribute in originalScores) {
      const attr = attribute as "str" | "dex" | "con" | "int" | "wis" | "cha"
      const attributeScoreBonuses = characterClone.attributeScoreBonuses.filter(
        (bonus) => bonus.attribute !== attribute
      )

      const sumBonuses = attributeScoreBonuses.reduce(
        (sum, bonus) => sum + bonus.bonus,
        0
      )

      characterClone.attributeInformation.attributeScores[attr] =
        characterClone.attributeInformation.originalScores[attr] + sumBonuses
    }
  }

  return characterClone
}

export function rerollAttributeScores(
  character: CharacterInformation
): CharacterInformation {
  const characterClone = { ...character }
  if (character.attributeInformation.method === "roll") {
    const randomScores = {
      str: roll3d6(),
      dex: roll3d6(),
      con: roll3d6(),
      int: roll3d6(),
      wis: roll3d6(),
      cha: roll3d6(),
    }
    characterClone.attributeInformation.originalScores = { ...randomScores }
    characterClone.attributeInformation.randomScores = { ...randomScores }
    characterClone.attributeInformation.rerolls++

    for (const attribute in randomScores) {
      const attr = attribute as "str" | "dex" | "con" | "int" | "wis" | "cha"
      const attributeScoreBonuses = characterClone.attributeScoreBonuses.filter(
        (bonus) => bonus.attribute !== attribute
      )

      const sumBonuses = attributeScoreBonuses.reduce(
        (sum, bonus) => sum + bonus.bonus,
        0
      )

      characterClone.attributeInformation.attributeScores[attr] =
        characterClone.attributeInformation.originalScores[attr] + sumBonuses
    }
  }

  return characterClone
}

export function getAttributeScoreSetTo14(
  character: CharacterInformation
): "str" | "dex" | "con" | "int" | "wis" | "cha" | null {
  return character.attributeInformation.attributeSetTo14
}

export function setAttributeScoreTo14(
  attribute: "str" | "dex" | "con" | "int" | "wis" | "cha" | null,
  character: CharacterInformation
): CharacterInformation {
  const characterClone = { ...character }
  const previousAttributeSetTo14 =
    character.attributeInformation.attributeSetTo14

  if (previousAttributeSetTo14) {
    characterClone.attributeInformation.attributeScores[
      previousAttributeSetTo14
    ] =
      characterClone.attributeInformation.originalScores[
        previousAttributeSetTo14
      ]
  }

  characterClone.attributeInformation.attributeSetTo14 = attribute
  if (attribute) {
    characterClone.attributeInformation.attributeScores[attribute] = 14
  }

  return characterClone
}

export function setAttributeScore(
  attribute: "str" | "dex" | "con" | "int" | "wis" | "cha",
  score: number,
  character: CharacterInformation
): CharacterInformation {
  const characterClone = { ...character }
  characterClone.attributeInformation.attributeScores[attribute] = score
  const attributeScoreBonuses = characterClone.attributeScoreBonuses.filter(
    (bonus) => bonus.attribute !== attribute
  )

  const sumBonuses = attributeScoreBonuses.reduce(
    (sum, bonus) => sum + bonus.bonus,
    0
  )

  characterClone.attributeInformation.attributeScores[attribute] =
    score + sumBonuses

  return characterClone
}

export function getAttributeScore(
  attribute: "str" | "dex" | "con" | "int" | "wis" | "cha",
  character: CharacterInformation
): number {
  return character.attributeInformation.attributeScores[attribute]
}

export function getAttributeScoreWithBonuses(
  attribute: "str" | "dex" | "con" | "int" | "wis" | "cha",
  character: CharacterInformation
): number {
  const baseScore = getAttributeScore(attribute, character)

  const bonuses = character.attributeScoreBonuses.filter(
    (bonus) => bonus.attribute === attribute
  )

  const background = character.backgroundInformation
  if (background) {
    const bgAttrRolls = background.tableRolls.filter(
      (tableRoll) => tableRoll.result.attribute === attribute
    )
    const bgBonuses = bgAttrRolls.map((tableRoll) => ({
      attribute: attribute,
      bonus: tableRoll.result.bonus,
    })) as AttributeScoreBonus[]

    bonuses.push(...bgBonuses)
  }

  const sumBonuses = bonuses.reduce((sum, bonus) => sum + bonus.bonus, 0)

  return baseScore + sumBonuses
}

export function getModifier(score: number): number {
  if (score === 0) return 0
  if (score === 3) return -2
  if (score >= 4 && score <= 7) return -1
  if (score >= 8 && score <= 13) return 0
  if (score >= 14 && score <= 17) return 1
  if (score >= 18) return 2
  throw new Error("Invalid score")
}

export function getAttributeScores(
  character: CharacterInformation
): AttributeInformation["attributeScores"] {
  return character.attributeInformation.attributeScores
}

export function getRandomDiceRoll(sides: number): number {
  let array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return (array[0] % sides) + 1
}

export function rolld6(): number {
  return getRandomDiceRoll(6)
}

export function rolld8(): number {
  return getRandomDiceRoll(8)
}

export function roll3d6(): number {
  return rolld6() + rolld6() + rolld6()
}

export interface BasicCharacterInformation {
  name: string
  goals: string
  origin: string
  gift1: string
  gift2: string
}

export interface AttributeInformation {
  method: "roll" | "assignment"
  attributeScores: {
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
  }
  originalScores: {
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
  }
  randomScores: {
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
  }
  attributeSetTo14: "str" | "dex" | "con" | "int" | "wis" | "cha" | null
  rerolls: number
}

export interface AttributeScoreBonus {
  attribute: "str" | "dex" | "con" | "int" | "wis" | "cha"
  bonus: number
}

export interface AttributeModifierBonus {
  attribute: "str" | "dex" | "con" | "int" | "wis" | "cha"
  bonus: number
}
