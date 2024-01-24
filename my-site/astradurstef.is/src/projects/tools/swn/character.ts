import {
  Attribute,
  CONAttribute,
  DEXAttribute,
  INTAttribute,
  STRAttribute,
  WISAttribute,
} from "./attributes"
import { Background, PlayerBackground } from "./backgrounds"
import { CharacterClass } from "./classes"
import { focusesById as baseFocuses, Focus } from "./focuses"
import { skills as baseSkills, Skill } from "./skills"
import * as z from "zod"

export interface Character {
  name: string
  goal: string
  background: PlayerBackground
  attributes: {
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
  }
  skills: Record<string, Skill>
  maxHitPoints: number
  class: CharacterClass
  focuses: Record<string, Focus>
  effort: number | null
}

const skillsSchema = z
  .object({
    name: z.string(),
    id: z.string(),
    type: z.string(),
    level: z.nullable(z.number()),
    description: z.string(),
  })
  .strict()

const skillsObjectSchema = z.object({
  ...Object.keys(baseSkills).reduce((acc: any, key: string) => {
    acc[key] = skillsSchema
    return acc
  }, {}),
})

const focusesSchema = z.object({
  name: z.string(),
  id: z.string(),
  type: z.string(),
  description: z.string(),
  level: z.nullable(z.number()),
  levels: z.object({
    1: z.object({
      bonus_skills: z.array(z.string()),
      description: z.string(),
    }),
    2: z.object({
      bonus_skills: z.array(z.string()),
      description: z.string(),
    }),
  }),
})

const focusesObjectSchema = z.object({
  ...Object.keys(baseFocuses).reduce((acc: any, key: string) => {
    acc[key] = focusesSchema
    return acc
  }, {}),
})

export const characterSchema = z.object({
  name: z.string(),
  goal: z.string(),

  background: z.object({
    name: z.string(),
    id: z.string(),
    sp_left: z.number(),
    description: z.string(),
    skills: skillsObjectSchema,
  }),
  attributes: z.object({
    str: z.number(),
    dex: z.number(),
    con: z.number(),
    int: z.number(),
    wis: z.number(),
    cha: z.number(),
  }),
  skills: skillsObjectSchema,
  maxHitPoints: z.number(),
  class: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    abilities: z.object({
      description: z.object({
        title: z.string(),
        bullet_points: z.array(z.string()),
      }),
    }),
  }),
  focuses: focusesObjectSchema,
  effort: z.number().nullable(),
})

export const baseCharacter: Character = {
  name: "",
  goal: "",
  background: {
    name: "",
    id: "",
    sp_left: 0,
    description: "",
    skills: {},
  },
  attributes: {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  },
  skills: {
    ...baseSkills,
  },
  maxHitPoints: 0,
  class: {
    id: "",
    name: "",
    description: "",
    abilities: {
      description: {
        title: "",
        bullet_points: [],
      },
    },
  },
  focuses: {
    ...baseFocuses,
  },
  effort: null,
}
