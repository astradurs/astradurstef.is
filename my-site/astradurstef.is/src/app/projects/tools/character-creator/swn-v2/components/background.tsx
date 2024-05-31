"use-client"
import {
  BackgroundTableRow,
  TableRoll,
  backgrounds,
  getTableRollResult,
  setTableRollResult,
} from "@/projects/tools/swn-v2/background"
import { CharacterInformation } from "@/projects/tools/swn-v2/character"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { rolld6, rolld8 } from "@/projects/tools/swn-v2/character"
import { useState } from "react"
import { SkillId, skills } from "@/projects/tools/swn-v2/skills"

export default function Background({
  character,
  setCharacter,
}: {
  character: CharacterInformation
  setCharacter: (character: CharacterInformation) => void
}) {
  const maxTableRolls = 3
  const [tableRolls, setTableRolls] = useState<number>(0)

  return (
    <div className="grid gap-4">
      <BackgroundSelector character={character} setCharacter={setCharacter} />
      <div className="grid grid-cols-2 gap-12">
        <div>
          <BackgroundInformation character={character} />
          <BackgroundTableRoller
            character={character}
            setCharacter={setCharacter}
            maxTableRolls={maxTableRolls}
            tableRolls={tableRolls}
            setTableRolls={setTableRolls}
          />
        </div>
        <BackgroundTables character={character} setCharacter={setCharacter} />
      </div>
    </div>
  )
}

export function BackgroundSelector({
  character,
  setCharacter,
}: {
  character: CharacterInformation
  setCharacter: (character: CharacterInformation) => void
}) {
  const bgs = backgrounds

  const handleBackgroundChange = (n: string) => {
    const bg = bgs.find((bg) => bg.name === n)
    if (bg) {
      const characterClone = { ...character }
      characterClone.backgroundInformation = {
        background: bg.name,
        backgroundSkills: bg.skills,
        backgroundNotes: bg.notes,
        tableRolls: [],
      }
      setCharacter(characterClone)
    }
  }

  return (
    <Select onValueChange={(n) => handleBackgroundChange(n)}>
      <SelectTrigger>
        <SelectValue placeholder="Select a background">
          {character.backgroundInformation?.background}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {bgs.map((bg) => (
            <SelectItem key={bg.name} value={bg.name}>
              {bg.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function BackgroundInformation({
  character,
}: {
  character: CharacterInformation
}) {
  const characterBackground = character.backgroundInformation
  if (!characterBackground) return null

  const bg = backgrounds.find(
    (bg) => bg.name === characterBackground.background
  )

  if (!bg) return null

  return (
    <div>
      <h3 className="text-xl font-semibold">{bg.name}</h3>
      <p>{bg.notes}</p>
    </div>
  )
}

export function BackgroundTableRoller({
  character,
  setCharacter,
  maxTableRolls,
  tableRolls,
  setTableRolls,
}: {
  character: CharacterInformation
  setCharacter: (character: CharacterInformation) => void
  maxTableRolls: number
  tableRolls: number
  setTableRolls: (tableRolls: number) => void
}) {
  const characterBackground = character.backgroundInformation
  if (!characterBackground) return null

  const bg = backgrounds.find(
    (bg) => bg.name === characterBackground.background
  )

  if (!bg) return null

  const growthTable = bg.tables.growth
  const learningTable = bg.tables.learning

  const handleRoll = (
    table: BackgroundTableRow[],
    tableTitle: "growth" | "learning",
    roll: number
  ) => {
    console.log("roll", roll)
    const rollResult = table[roll - 1]
    const characterClone = { ...character }
    if (!characterClone.backgroundInformation) return
    let tableRoll: TableRoll = {
      table: tableTitle,
      rollResult: rollResult,
      result: {
        title: rollResult.title,
        bonus: rollResult.bonus,
      },
      attributeScoreBonuses: [],
    }

    if (rollResult.skill) {
      tableRoll.result.skill = rollResult.skill
      const backgroundSkills =
        characterClone.backgroundInformation.backgroundSkills
      const bgSkill = backgroundSkills.find(
        (skill) => skill.id === rollResult.skill
      )

      if (bgSkill) {
        const newLevel = bgSkill.level === null ? 0 : bgSkill.level + 1

        if (newLevel > 1) {
          tableRoll = {
            ...tableRoll,
            rollResult: {
              ...tableRoll.rollResult,
              bonus: null,
              title: "Any Skill",
              attributeChoices: null,
              skillChoices: ["exert", "shoot"],
              skill: null,
            },
            result: {
              ...tableRoll.result,
              title: "Any Skill",
              bonus: null,
            },
            attributeScoreBonuses: [],
          }
          characterClone.backgroundInformation.tableRolls.push(tableRoll)
          setCharacter(characterClone)
          setTableRolls(tableRolls + 1)
          return
        }

        backgroundSkills[backgroundSkills.indexOf(bgSkill)] = {
          ...bgSkill,
          level: newLevel,
        }
      } else {
        const newSkill = skills.find((skill) => skill.id === rollResult.skill)

        if (newSkill) {
          backgroundSkills.push({
            ...newSkill,
            level: 0,
          })
        }
      }

      characterClone.backgroundInformation.backgroundSkills = backgroundSkills
    }

    characterClone.backgroundInformation.tableRolls.push(tableRoll)
    setCharacter(characterClone)
    setTableRolls(tableRolls + 1)
  }

  return (
    <div className="grid gap-2">
      <TableRolls character={character} setCharacter={setCharacter} />
      {tableRolls < maxTableRolls ? (
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => handleRoll(growthTable, "growth", rolld6())}>
            Roll
          </Button>
          <Button
            onClick={() => handleRoll(learningTable, "learning", rolld8())}
          >
            Roll
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export function TableRolls({
  character,
  setCharacter,
}: {
  character: CharacterInformation
  setCharacter: (character: CharacterInformation) => void
}) {
  const characterBackground = character.backgroundInformation
  if (!characterBackground) return null

  const bg = backgrounds.find(
    (bg) => bg.name === characterBackground.background
  )

  if (!bg) return null

  const tableRolls = characterBackground.tableRolls

  if (tableRolls.length === 0) return null

  return (
    <div className="grid gap-2">
      {tableRolls.map((tableRoll, i) => (
        <TableRoll
          key={i}
          rollNumber={i}
          tableRoll={tableRoll}
          character={character}
          setCharacter={setCharacter}
        />
      ))}
    </div>
  )
}

export function TableRoll({
  tableRoll,
  rollNumber,
  character,
  setCharacter,
}: {
  tableRoll: TableRoll
  rollNumber: number
  character: CharacterInformation
  setCharacter: (character: CharacterInformation) => void
}) {
  const { table, rollResult, attributeScoreBonuses } = tableRoll

  const { roll, bonus, title, attributeChoices, skillChoices, skill } =
    rollResult

  const AttributeChoices = () =>
    attributeChoices && attributeChoices.length > 0 ? (
      <div className={`grid grid-cols-${attributeChoices.length} gap-1`}>
        {attributeChoices.map((attrChoice) => (
          <Button
            key={attrChoice}
            size="sm"
            disabled={
              getTableRollResult(rollNumber, character)?.attribute ===
              attrChoice
            }
            onClick={() => {
              console.log("choice", attrChoice)
              setCharacter(
                setTableRollResult(
                  rollNumber,
                  "attribute",
                  attrChoice,
                  character
                )
              )
            }}
          >
            {attrChoice.toUpperCase()}
          </Button>
        ))}
      </div>
    ) : null

  const SkillChoices = () =>
    skillChoices && skillChoices.length > 0 ? (
      <div className={`grid grid-cols-${skillChoices.length} gap-1`}>
        {skillChoices.map((skillChoice) => (
          <Button
            disabled={
              getTableRollResult(rollNumber, character)?.skill === skillChoice
            }
            key={skillChoice}
            size="sm"
            onClick={() => {
              console.log("choice", skillChoice)
              setCharacter(
                setTableRollResult(rollNumber, "skill", skillChoice, character)
              )
            }}
          >
            {skillChoice}
          </Button>
        ))}
      </div>
    ) : null

  const Skill = () => (skill ? <span>{skill}</span> : null)

  return (
    <div className="grid">
      <span>Result: {roll}</span>
      <Skill />
      <AttributeChoices />
      <SkillChoices />
    </div>
  )
}

export function BackgroundTables({
  character,
  setCharacter,
}: {
  character: CharacterInformation
  setCharacter: (character: CharacterInformation) => void
}) {
  const characterBackground = character.backgroundInformation
  if (!characterBackground) return null

  const bg = backgrounds.find(
    (bg) => bg.name === characterBackground.background
  )

  if (!bg) return null

  const growthTable = bg.tables.growth
  const learningTable = bg.tables.learning

  return (
    <div className="grid grid-cols-2 gap-12">
      <BgTable table={growthTable} tableTitle="growth" />
      <BgTable table={learningTable} tableTitle="learning" />
    </div>
  )
}

export function BgTable({
  table,
  tableTitle,
}: {
  table: BackgroundTableRow[]
  tableTitle: "growth" | "learning"
}) {
  const tableRows = table.sort((a, b) => a.roll - b.roll)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>d{tableRows[tableRows.length - 1].roll}</TableCell>
          <TableCell>{tableTitle}</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableRows.map((row) => (
          <TableRow key={row.roll}>
            <TableCell>{row.roll}</TableCell>
            <TableCell>
              {row.title.includes("Skill") || row.title.includes("Combat")
                ? row.title.includes("Any")
                  ? row.title
                  : row.skill
                : `+${row.bonus} ${row.title}`}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
