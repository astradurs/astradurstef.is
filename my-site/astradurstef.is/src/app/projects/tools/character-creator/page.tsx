"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { set } from "lodash"
import { useEffect, useState } from "react"

type AbilityScores = {
  [key: string]: number
}

type Skills = {
  [key: string]: {
    name: string
    ability: string
    isProficient: boolean
  }
}

const baseSkills: Skills = {
  acrobatics: {
    name: "Acrobatics",
    ability: "Dexterity",
    isProficient: false,
  },
  animalHandling: {
    name: "Animal Handling",
    ability: "Wisdom",
    isProficient: false,
  },
  arcana: { name: "Arcana", ability: "Intelligence", isProficient: false },
  athletics: { name: "Athletics", ability: "Strength", isProficient: false },
  deception: { name: "Deception", ability: "Charisma", isProficient: false },
  history: { name: "History", ability: "Intelligence", isProficient: false },
  insight: { name: "Insight", ability: "Wisdom", isProficient: false },
  intimidation: {
    name: "Intimidation",
    ability: "Charisma",
    isProficient: false,
  },
  investigation: {
    name: "Investigation",
    ability: "Intelligence",
    isProficient: false,
  },
  medicine: { name: "Medicine", ability: "Wisdom", isProficient: false },
  nature: { name: "Nature", ability: "Intelligence", isProficient: false },
  perception: { name: "Perception", ability: "Wisdom", isProficient: false },
  performance: {
    name: "Performance",
    ability: "Charisma",
    isProficient: false,
  },
  persuasion: {
    name: "Persuasion",
    ability: "Charisma",
    isProficient: false,
  },
  religion: {
    name: "Religion",
    ability: "Intelligence",
    isProficient: false,
  },
  sleightOfHand: {
    name: "Sleight of Hand",
    ability: "Dexterity",
    isProficient: false,
  },
  stealth: { name: "Stealth", ability: "Dexterity", isProficient: true },
  survival: { name: "Survival", ability: "Wisdom", isProficient: false },
}

const baseAbilityScores: AbilityScores = {
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
}

export default function CharacterCreatorPage() {
  const [abilityScores, setAbilityScores] = useState(baseAbilityScores)
  const [skills, setSkills] = useState(baseSkills)
  const [proficiencyBonus, setProficiencyBonus] = useState(2)
  const max = 20
  const min = 0

  const onAbilityChangeHandler = (ability: string, value: number) => {
    const oldAbilityScores: AbilityScores = abilityScores

    if (value > max) {
      setAbilityScores({ ...oldAbilityScores, [ability]: max })
    } else if (value < min) {
      setAbilityScores({ ...oldAbilityScores, [ability]: min })
    } else {
      setAbilityScores({ ...oldAbilityScores, [ability]: value })
    }
  }

  // this is not causing a rerender
  const onProficiencyChangeHandler = (skill: string, proficient: boolean) => {
    console.log({ skill, proficient })
    const oldSkills: Record<
      string,
      { name: string; ability: string; isProficient: boolean }
    > = { ...skills }
    const newSkill: { name: string; ability: string; isProficient: boolean } = {
      ...oldSkills[skill],
      isProficient: proficient,
    }
    oldSkills[skill] = newSkill
    console.log({ oldSkills })
    setSkills(oldSkills)
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-6">
        <AttributeBox
          name="Strength"
          value={abilityScores.strength}
          min={min}
          max={max}
          onAbilityChangeHandler={onAbilityChangeHandler}
        />
        <AttributeBox
          name="Dexterity"
          value={abilityScores.dexterity}
          min={min}
          max={max}
          onAbilityChangeHandler={onAbilityChangeHandler}
        />
        <AttributeBox
          name="Constitution"
          value={abilityScores.constitution}
          min={min}
          max={max}
          onAbilityChangeHandler={onAbilityChangeHandler}
        />
        <AttributeBox
          name="Intelligence"
          value={abilityScores.intelligence}
          min={min}
          max={max}
          onAbilityChangeHandler={onAbilityChangeHandler}
        />
        <AttributeBox
          name="Wisdom"
          value={abilityScores.wisdom}
          min={min}
          max={max}
          onAbilityChangeHandler={onAbilityChangeHandler}
        />
        <AttributeBox
          name="Charisma"
          value={abilityScores.charisma}
          min={min}
          max={max}
          onAbilityChangeHandler={onAbilityChangeHandler}
        />
      </div>
      <div className="grid gap-2">
        <SkillsList
          skills={skills}
          abilityScores={abilityScores}
          proficiencyBonus={proficiencyBonus}
          onProficiencyChangeHandler={onProficiencyChangeHandler}
        />
        <PassiveScores
          skills={skills}
          abilityScores={abilityScores}
          proficiencyBonus={proficiencyBonus}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid grid-cols-1 justify-center">
          <div className="relative p-3 grid grid-cols-1 justify-center items-center h-20 w-20 rounded-3xl bg-secondary">
            <div className="absolute inset-x-4 top-0 text-center">AC</div>
            <div className="text-center text-3xl bg-secondary text-primary focus:outline-none ring-offset-secondary focus:ring-2 ring-primary ring-offset-4 rounded-3xl">
              {10 + Math.floor((abilityScores.dexterity - 10) / 2)}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-center">
          <div className="relative p-3 grid grid-cols-1 justify-center items-center h-20 w-20 rounded-3xl bg-secondary">
            <div className="absolute inset-x-4 top-0 text-center">Speed</div>
            <div className="text-center text-3xl bg-secondary text-primary focus:outline-none ring-offset-secondary focus:ring-2 ring-primary ring-offset-4 rounded-3xl">
              30ft
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-center">
        <div className="relative p-3 grid grid-cols-1 justify-center items-center h-20 w-20 rounded-3xl bg-secondary">
          <div className="absolute inset-x-4 top-0 text-center">HP</div>
          <div className="text-center text-3xl bg-secondary text-primary focus:outline-none ring-offset-secondary focus:ring-2 ring-primary ring-offset-4 rounded-3xl">
            20
          </div>
        </div>
      </div>
    </div>
  )
}

function PassiveScores({
  skills,
  abilityScores,
  proficiencyBonus,
}: {
  skills: Record<
    string,
    { name: string; ability: string; isProficient: boolean }
  >
  abilityScores: Record<string, number>
  proficiencyBonus: number
}) {
  const getPassiveScore = (skill: string): number => {
    const skillObject = skills[skill]
    const ability = skillObject.ability.toLowerCase()
    const score = abilityScores[ability]
    const modifier = Math.floor((score - 10) / 2)
    const proficiency = skillObject.isProficient ? proficiencyBonus : 0
    return 10 + modifier + proficiency
  }

  return (
    <div className="grid bg-secondary rounded-lg p-2 gap-2">
      <div>
        <div className="font-bold text-lg text-center">Passives</div>
        <Separator className="bg-primary" />
      </div>
      <div>
        <div className="flex justify-between">
          <div>Passive Perception</div>
          <div>{getPassiveScore("perception")}</div>
        </div>
        <div className="flex justify-between">
          <div>Passive Insight</div>
          <div>{getPassiveScore("insight")}</div>
        </div>
      </div>
    </div>
  )
}

function SkillsList({
  skills,
  abilityScores,
  proficiencyBonus,
  onProficiencyChangeHandler,
}: {
  skills: Record<
    string,
    { name: string; ability: string; isProficient: boolean }
  >
  abilityScores: Record<string, number>
  proficiencyBonus: number
  onProficiencyChangeHandler: (skill: string, proficient: boolean) => void
}) {
  const skillsList = Object.values(skills)
  return (
    <div className="grid bg-secondary rounded-lg p-2 gap-2">
      <div>
        <div className="font-bold text-lg text-center">Skills</div>
        <Separator className="bg-primary" />
      </div>
      <div className="grid">
        {skillsList.map((skill) => {
          return (
            <Skill
              key={`${skill.name.toLowerCase()}#${skill.isProficient}`}
              name={skill.name}
              ability={skill.ability}
              score={abilityScores[skill.ability.toLowerCase()]}
              proficient={skill.isProficient}
              proficiencyBonus={proficiencyBonus}
              onProficiencyChangeHandler={onProficiencyChangeHandler}
            />
          )
        })}
      </div>
    </div>
  )
}

function Skill({
  name,
  ability,
  score,
  proficient,
  proficiencyBonus,
  onProficiencyChangeHandler,
}: {
  name: string
  ability: string
  score: number
  proficient: boolean
  proficiencyBonus: number
  onProficiencyChangeHandler: (skill: string, proficient: boolean) => void
}) {
  const abilityShort = ability.slice(0, 3).toUpperCase()
  const modifier =
    Math.floor((score - 10) / 2) + (proficient ? proficiencyBonus : 0)
  const modifierString = modifier >= 0 ? `+${modifier}` : `${modifier}`
  return (
    <div className="flex justify-between gap-4">
      <div className="flex gap-2">
        <div className="w-12 text-right">({abilityShort})</div>
        <div>{name}</div>
      </div>
      <div className="flex gap-2">
        <div>{modifierString}</div>
        <input
          type="radio"
          className={`${proficient ? "bg-accent text-accent-foreground" : ""}`}
          checked={proficient}
          onClick={(e) => {
            onProficiencyChangeHandler(name.toLowerCase(), !proficient)
          }}
        />
      </div>
    </div>
  )
}

function AttributeBox({
  name,
  value,
  min,
  max,
  onAbilityChangeHandler,
}: {
  name: string
  min: number
  max: number
  value: number
  onAbilityChangeHandler: (ability: string, value: number) => void
}) {
  const modifier = Math.floor((value - 10) / 2)
  const modifierString = modifier >= 0 ? `+${modifier}` : `${modifier}`
  const shortName = name.slice(0, 3).toUpperCase()
  console.log({ name, value, min, max, modifierString })

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
    if (e.currentTarget.value === "") {
      onAbilityChangeHandler(name.toLowerCase(), 0)
    } else {
      const sliceLeadingZeroes = (str: string): string => {
        if (str.length === 1) return str
        if (str[0] === "0") return sliceLeadingZeroes(str.slice(1))
        return str
      }
      const value = sliceLeadingZeroes(e.currentTarget.value)
      onAbilityChangeHandler(name.toLowerCase(), parseInt(value))
    }
  }

  return (
    <div className="grid grid-cols-1 justify-center">
      <div className="relative p-3 grid grid-cols-1 justify-center h-20 w-20 rounded-3xl bg-secondary">
        <div className="absolute inset-x-4 text-center">
          <div>{shortName}</div>
        </div>
        <input
          className="text-center text-3xl bg-secondary text-primary focus:outline-none ring-offset-secondary focus:ring-2 ring-primary ring-offset-4 rounded-3xl"
          value={value}
          name={name}
          min={min}
          max={max}
          onChange={onChangeHandler}
        />
        <div className="absolute h-8 w-12 bg-primary text-secondary text-center text-2xl rounded-full top-16 inset-x-4">
          {modifierString}
        </div>
      </div>
    </div>
  )
}
