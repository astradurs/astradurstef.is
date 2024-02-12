import {
  skills,
  combatSkills,
  nonCombatSkills,
  psionicSkills,
  type Skill,
} from "./skills"

type QuickSkills = {
  [key in "1" | "2" | "3"]: string | SkillsLearning
}

export interface Background {
  name: string
  id: string
  description: string
  freeSkill: string
  learning_sps: number
  quickSkills: QuickSkills
  learning: {
    1: SkillsLearning | string
    2: SkillsLearning | string
    3: SkillsLearning | string
    4: SkillsLearning | string
    5: SkillsLearning | string
    6: SkillsLearning | string
    7: SkillsLearning | string
    8: SkillsLearning | string
  }
  growth: {
    1: AttributeGrowth | AttributeTypeGrowth | SkillGrowth | SkillTypeGrowth
    2: AttributeGrowth | AttributeTypeGrowth | SkillGrowth | SkillTypeGrowth
    3: AttributeGrowth | AttributeTypeGrowth | SkillGrowth | SkillTypeGrowth
    4: AttributeGrowth | AttributeTypeGrowth | SkillGrowth | SkillTypeGrowth
    5: AttributeGrowth | AttributeTypeGrowth | SkillGrowth | SkillTypeGrowth
    6: AttributeGrowth | AttributeTypeGrowth | SkillGrowth | SkillTypeGrowth
  }
}

export type SkillsLearning = {
  type: "combat" | "non-combat" | "general" | "psionic"
  skills: string[]
}

export type AttributeGrowth = {
  type: "attribute"
  attribute: string
  amount: number
}

export type AttributeTypeGrowth = {
  type: "attribute_type"
  attribute_type: "physical" | "mental" | "general"
  attributes: string[]
  amount: number
}

export type SkillGrowth = {
  type: "skill"
  skill: string
  amount: number
}

export type SkillTypeGrowth = {
  type: "skill_type"
  skill_type: "combat" | "non-combat" | "general" | "psionic"
  skills: string[]
  amount: number
}

export interface PlayerBackground {
  name: string
  id: string
  sp_left: number
  description: string
  skills: Record<string, Skill>
}

export const backgrounds: Background[] = [
  {
    name: "Barbarian",
    id: "barbarian",
    description:
      "Standards of barbarism vary when many worlds are capable of interstellar spaceflight, but your hero comes from a savage world of low technology and high violence. Their planet may have survived an all-consuming war, or been deprived of critical materials or energy resources, or simply have been colonized by confirmed Luddites. Other barbarians might be drawn from the impoverished underclass of advanced worlds or the technologically-degen- erate inheritors of some high-tech space station or planetary hab.",
    freeSkill: skills.survive.id,
    quickSkills: {
      1: skills.survive.id,
      2: skills.notice.id,
      3: {
        type: "combat",
        skills: Object.keys(combatSkills),
      },
    },
    learning_sps: 2,
    learning: {
      1: {
        type: "combat",
        skills: Object.keys(combatSkills),
      },
      2: skills.connect.id,
      3: skills.exert.id,
      4: skills.lead.id,
      5: skills.notice.id,
      6: skills.punch.id,
      7: skills.sneak.id,
      8: skills.survive.id,
    },
    growth: {
      1: {
        type: "attribute_type",
        attribute_type: "general",
        attributes: ["str", "dex", "con", "int", "wis", "cha"],
        amount: 1,
      },
      2: {
        type: "attribute_type",
        attribute_type: "physical",
        attributes: ["str", "dex", "con"],
        amount: 2,
      },
      3: {
        type: "attribute_type",
        attribute_type: "physical",
        attributes: ["str", "dex", "con"],
        amount: 2,
      },
      4: {
        type: "attribute_type",
        attribute_type: "mental",
        attributes: ["int", "wis", "cha"],
        amount: 2,
      },
      5: {
        type: "skill",
        skill: "exert",
        amount: 1,
      },
      6: {
        type: "skill_type",
        skill_type: "general",
        skills: Object.keys(skills),
        amount: 1,
      },
    },
  },
]
