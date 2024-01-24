export interface Focus {
  id: string
  name: string
  type: string
  description: string
  level: number | null
  levels: {
    [key: string]: {
      bonus_skills: string[]
      description: string
    }
  }
}

export const combatFocuses: Focus[] = [
  {
    name: "Alert",
    id: "alert",
    type: "combat",
    description:
      "You are keenly aware of your surroundings and virtually impossible to take unaware. You have an instinctive alacrity of response that helps you act before less wary persons can think to move.",
    level: null,
    levels: {
      1: {
        bonus_skills: ["notice"],
        description:
          "Gain Notice as a bonus skill. You cannot be surprised, nor can others use the Execution Attack option on you. When you roll initiative, roll twice and take the best result.",
      },
      2: {
        bonus_skills: [],
        description:
          "You always act first in a combat round unless someone else involved is also this Alert.",
      },
    },
  },
  {
    name: "Armsman",
    id: "armsman",
    type: "combat",
    description:
      "You have an unusual competence with thrown weap- ons and melee attacks. This focus’ benefits do not apply to unarmed attacks or projectile weapons. For thrown weapons, you can’t use the benefits of the Armsman focus at the same time as Gunslinger.",
    level: null,
    levels: {
      1: {
        bonus_skills: ["stab"],
        description:
          "Gain Stab as a bonus skill. You can draw or sheath a Stowed melee or thrown weapon as an Instant action. You may add your Stab skill level to a melee or thrown weapon’s damage roll or Shock damage, assuming it has any to begin with.",
      },
      2: {
        bonus_skills: [],
        description:
          "Your primitive melee and thrown weapons count as TL4 weapons for the purpose of over- coming advanced armors. Even on a miss with a melee weapon, you do an unmodified 1d4 damage to the target, plus any Shock damage. This bonus damage doesn't apply to thrown weapons or attacks that use the Punch skill.",
      },
    },
  },
]

export const focuses = [...combatFocuses]
export const focusesById = focuses.reduce(
  (acc: Record<string, Focus>, focus: Focus) => {
    acc[focus.id] = focus
    return acc
  },
  {}
)
