import { Focus, combatFocuses, focuses } from "./focuses"
import { combatSkills, psionicSkills, nonCombatSkills, Skill } from "./skills"

export interface CharacterClass {
  id: string
  name: string
  description: string
  abilities: {
    description: {
      title: string
      bullet_points: string[]
    }
  }
}

export interface ClassInterface {
  id: string
  name: string
  description: string
  abilities: {
    description: {
      title: string
      bullet_points: string[]
    }
    free_focuses: Focus[]
    constrained_skills: {
      [key: string]: Skill
    }
    effort_score: number | null
    extra_hit_points: {
      count: number | null
      levels: number | null
    }
    extra_skills: {
      count: number | null
      skills: {
        [key: string]: string
      }
    }
    extra_skill_points: {
      count: number | null
      constrained_skills: {
        [key: string]: string
      }
      levels: number | null
    }
  }
  hit_points: {
    hit_die: number
    hit_die_count: number
    bonus: number
    attribute: string
    min: number
  }
  attack_bonus: {
    type: string
    divident: number
    roundDown: boolean
    roundUp: boolean
  }
}

export const classes: ClassInterface[] = [
  {
    id: "warrior",
    name: "Warrior",
    description:
      "Whether a hiveworld thug, barbarian lostworlder, gengineered combat hominid, or a natural-born kill- er wasting their potential in a desk job, your hero has a real talent for inflicting mayhem. Combat in Stars Without Number is extremely dangerous, but your hero has the talents to survive situations that would kill a less martial adventurer.\nAs a gifted purveyor of violence, you get to pick an extra combat-related focus associated with your special brand of havoc. While a character of any class can take these special combat talents, you get this ad- ditional pick and a better natural hit bonus than heroes of other classes.\nMost importantly, however, Warriors have an un- canny gift for making a shot when a hit is desperately needed, or dodging a bullet when their life is on the line. Once per scene, a Warrior can either automati- cally negate a successful combat hit they just received, taking no damage from it, or else they can turn one of their own missed attack rolls into an automatic hit. This versatility makes Warriors exceptionally danger- ous enemies in a one-on-one fight, and significantly more likely to survive the gory chaos of a general melee.",
    abilities: {
      description: {
        title: "Every Warrior PC has certain special abilities.",
        bullet_points: [
          "You gain a free level in a combat-related focus as- sociated with your background. The GM decides if a focus qualifies if it’s an ambiguous case.",
          "Warriors are lucky in combat. Once per scene, as an Instant ability, you can either choose to ne- gate a successful attack roll against you or turn a missed attack roll you made into a successful hit. You can use this ability after the dice are rolled, but it cannot be used against environmental dam- age, effects without an attack roll, or hits on a vehicle you’re occupying.",
          "You gain two extra maximum hit points at each character level.",
        ],
      },
      free_focuses: combatFocuses,
      constrained_skills: {
        ...combatSkills,
        ...nonCombatSkills,
      },
      effort_score: null,
      extra_hit_points: {
        count: 2,
        levels: 1,
      },
      extra_skills: {
        count: null,
        skills: {},
      },
      extra_skill_points: {
        count: null,
        constrained_skills: {},
        levels: null,
      },
    },
    hit_points: {
      hit_die: 6,
      hit_die_count: 1,
      bonus: 2,
      attribute: "constitution",
      min: 1,
    },
    attack_bonus: {
      type: "level",
      divident: 1,
      roundDown: true,
      roundUp: false,
    },
  },
]

const classAbilities = {
  free_focuses: [],
  constrained_skills: {},
  effort_score: null,
  extra_hit_points: {
    count: null,
    levels: null,
  },
  extra_skills: {
    count: null,
    skills: {},
  },
  extra_skill_points: {
    count: null,
    constrained_skills: {},
    levels: null,
  },
}
