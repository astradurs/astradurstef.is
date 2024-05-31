import { AttributeScoreBonus, CharacterInformation } from "./character"
import { Skill, skills } from "./skills"

export interface BackgroundInformation {
  background: string
  backgroundSkills: Skill[]
  backgroundNotes: string
  tableRolls: TableRoll[]
}

export interface TableRoll {
  table: "growth" | "learning"
  rollResult: BackgroundTableRow
  result: {
    title: string
    skill?: string
    attribute?: string
    bonus: number | null
  }
  attributeScoreBonuses: AttributeScoreBonus[]
}

export function setTableRollResult(
  rollNumber: number,
  type: "skill" | "attribute",
  id: string,
  character: CharacterInformation
): CharacterInformation {
  const characterClone = { ...character }
  const bg = characterClone.backgroundInformation
  if (!bg) return characterClone

  const tableRoll = bg.tableRolls[rollNumber]
  if (!tableRoll) return characterClone

  const rollResult = tableRoll.rollResult

  if (type === "skill") {
    const { result } = tableRoll

    if (result.skill) {
      const bgSkill = bg.backgroundSkills.find((s) => s.id === result.skill)
      if (bgSkill) {
        const bgSkillLevel = bgSkill.level
        if (bgSkillLevel === null) {
          bg.backgroundSkills.splice(bg.backgroundSkills.indexOf(bgSkill), 1)
        } else {
          const newLevel = bgSkillLevel - 1
          if (newLevel < 0) {
            bg.backgroundSkills.splice(bg.backgroundSkills.indexOf(bgSkill), 1)
          }
        }
      }
    }

    tableRoll.result.skill = id
    tableRoll.result.bonus = rollResult.bonus
    const bgSkill = bg.backgroundSkills.find((s) => s.id === id)
    if (bgSkill) {
      bgSkill.level = !bgSkill.level ? 0 : bgSkill.level + 1
    } else {
      const newSkill = skills.find((skill) => skill.id === id)
      if (newSkill) {
        bg.backgroundSkills.push({
          ...newSkill,
          level: 0,
        })
      }
    }
  }

  if (type === "attribute") {
    tableRoll.result.attribute = id
    tableRoll.result.bonus = rollResult.bonus
    if (rollResult.bonus === 1) {
      tableRoll.attributeScoreBonuses.push({
        attribute: id,
        bonus: 1,
      } as AttributeScoreBonus)
    }

    if (rollResult.bonus === 2) {
      tableRoll.attributeScoreBonuses.push({
        attribute: id,
        bonus: 2,
      } as AttributeScoreBonus)
    }
  }

  return characterClone
}

export function getTableRollResult(
  rollNumber: number,
  character: CharacterInformation
) {
  const bg = character.backgroundInformation
  if (!bg) return null

  const tableRoll = bg.tableRolls[rollNumber]
  if (!tableRoll) return null

  return tableRoll.result
}

export interface BackgroundTableRow {
  roll: number
  bonus: number | null
  title: string
  attributeChoices: string[] | null
  skillChoices: string[] | null
  skill: string | null
}

export interface Background {
  name: string
  skills: Skill[]
  notes: string
  tables: {
    growth: BackgroundTableRow[]
    learning: BackgroundTableRow[]
  }
}

export const backgrounds: Background[] = [
  {
    name: "Barbarian",
    skills: [
      {
        level: 0,
        bonus: null,
        id: "survive",
        type: "general",
      },
    ],
    notes:
      "Standards of barbarism vary when many worlds are capable of interstellar spaceflight, but your hero comes from a savage world of low technology and high violence. Their planet may have survived an all-consuming war, or been deprived of critical materials or energy resources, or simply have been colonized by confirmed Luddites. Other barbarians might be drawn from the impoverished underclass of advanced worlds or the technologically-degen- erate inheritors of some high-tech space station or planetary hab.",
    tables: {
      growth: [
        {
          roll: 1,
          bonus: 1,
          title: "Any Stat",
          attributeChoices: ["str", "con", "dex", "wis", "int", "cha"],
          skillChoices: null,
          skill: null,
        },
        {
          roll: 2,
          bonus: 2,
          title: "Physical",
          attributeChoices: ["str", "con", "dex"],
          skillChoices: null,
          skill: null,
        },
        {
          roll: 3,
          bonus: 2,
          title: "Physical",
          attributeChoices: ["str", "con", "dex"],
          skillChoices: null,
          skill: null,
        },
        {
          roll: 4,
          bonus: 2,
          title: "Mental",
          attributeChoices: ["wis", "int", "cha"],
          skillChoices: null,
          skill: null,
        },
        {
          roll: 5,
          bonus: null,
          title: "Skill",
          attributeChoices: null,
          skillChoices: null,
          skill: "exert",
        },
        {
          roll: 6,
          bonus: null,
          title: "Any Skill",
          attributeChoices: null,
          skillChoices: ["exert", "shoot"],
          skill: null,
        },
      ],
      learning: [
        {
          roll: 1,
          bonus: null,
          attributeChoices: null,
          title: "Any Combat",
          skillChoices: ["punch", "shoot"],
          skill: null,
        },
        {
          roll: 2,
          bonus: null,
          attributeChoices: null,
          title: "Skill",
          skillChoices: null,
          skill: "survive",
        },
        {
          roll: 3,
          bonus: null,
          attributeChoices: null,
          title: "Skill",
          skillChoices: null,
          skill: "survive",
        },
        {
          roll: 4,
          bonus: null,
          attributeChoices: null,
          title: "Skill",
          skillChoices: null,
          skill: "survive",
        },
        {
          roll: 5,
          bonus: null,
          attributeChoices: null,
          title: "Skill",
          skillChoices: null,
          skill: "survive",
        },
        {
          roll: 6,
          bonus: null,
          attributeChoices: null,
          title: "Skill",
          skillChoices: null,
          skill: "survive",
        },
        {
          roll: 7,
          bonus: null,
          attributeChoices: null,
          title: "Skill",
          skillChoices: null,
          skill: "survive",
        },
        {
          roll: 8,
          bonus: null,
          attributeChoices: null,
          title: "Skill",
          skillChoices: null,
          skill: "survive",
        },
      ],
    },
  },
]
