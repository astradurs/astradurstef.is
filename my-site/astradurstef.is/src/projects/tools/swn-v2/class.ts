import { Skill, skills } from "./skills"

export interface ClassInformation {
  className: string
  classSkillChoices: string[] // All classes get a choice of 3 skills at 1st level.
  classSkillPicks: string[] // Psychic and Partial Psychic classes get one or two free skill levels at 1st level.
  // classFocusLevelPick: FocusLevelPick;      // Expert, Warrior, Partial Expert and Partial Warrior get a free Focus level at 1st level.
  notes: {
    description: string
    abilities: string[]
  }
}

export interface Class {
  name: string
  skillChoices: string[]
  notes: {
    description: string
    abilities: string[]
  }
}

export const classes: Class[] = [
  {
    name: "Warrior",
    skillChoices: skills
      .filter((skill) => skill.type === "combat")
      .map((skill) => skill.id),
    notes: {
      description:
        "Whether a hiveworld thug, barbarian lostworlder, gengineered combat hominid, or a natural-born kill- er wasting their potential in a desk job, your hero has a real talent for inflicting mayhem. Combat in Stars Without Number is extremely dangerous, but your hero has the talents to survive situations that would kill a less martial adventurer. As a gifted purveyor of violence, you get to pick an extra combat-related focus associated with your special brand of havoc. While a character of any class can take these special combat talents, you get this ad- ditional pick and a better natural hit bonus than heroes of other classes. Most importantly, however, Warriors have an un- canny gift for making a shot when a hit is desperately needed, or dodging a bullet when their life is on the line. Once per scene, a Warrior can either automati- cally negate a successful combat hit they just received, taking no damage from it, or else they can turn one of their own missed attack rolls into an automatic hit. This versatility makes Warriors exceptionally danger- ous enemies in a one-on-one fight, and significantly more likely to survive the gory chaos of a general melee.",
      abilities: [
        "You gain a free level in a combat-related focus as- sociated with your background. The GM decides if a focus qualifies if it’s an ambiguous case.",
        "Warriors are lucky in combat. Once per scene, as an Instant ability, you can either choose to ne- gate a successful attack roll against you or turn a missed attack roll you made into a successful hit. You can use this ability after the dice are rolled, but it cannot be used against environmental dam- age, effects without an attack roll, or hits on a vehicle you’re occupying.",
        "You gain two extra maximum hit points at each character level.",
      ],
    },
  },
]
