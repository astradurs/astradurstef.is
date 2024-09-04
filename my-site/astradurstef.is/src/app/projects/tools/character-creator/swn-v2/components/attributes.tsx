"use client"

import { Button } from "@/components/ui/button"
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
import {
  AttributeInformation,
  changeAttributeMethod,
  CharacterInformation,
  getAttributeScore,
  getAttributeScores,
  getAttributeScoreSetTo14,
  getAttributeScoreWithBonuses,
  getModifier,
  rerollAttributeScores,
  setAttributeScore,
  setAttributeScoreTo14,
} from "@/projects/tools/swn-v2/character"
import { useState } from "react"

export default function Attributes({
  character,
  setCharacter,
}: {
  character: CharacterInformation
  setCharacter: (character: CharacterInformation) => void
}) {
  const attrMethod = character.attributeInformation.method
  return (
    <div className="mx-auto">
      <div className="w-full flex gap-2">
        <Button
          onClick={() => setCharacter(changeAttributeMethod("roll", character))}
          className="w-full"
        >
          Roll
        </Button>
        <Button
          onClick={() =>
            setCharacter(changeAttributeMethod("assignment", character))
          }
          className="w-full"
        >
          Assign
        </Button>
      </div>
      {attrMethod === "roll" ? (
        <>
          <AttributesRolledTable
            character={character}
            setCharacter={setCharacter}
          />
          <Button
            className="w-full"
            onClick={() => {
              setCharacter(rerollAttributeScores(character))
            }}
          >
            Reroll
          </Button>
        </>
      ) : (
        <AttributesAssignedTable
          character={character}
          setCharacter={setCharacter}
        />
      )}
    </div>
  )
}

export function AttributesAssignedTable({
  character,
  setCharacter,
}: {
  character: CharacterInformation
  setCharacter: (character: CharacterInformation) => void
}) {
  const [selectedScores, setSelectedScores] = useState<number[]>([])
  const attributeScores = getAttributeScores(character)

  const handleSelectValueChange = (
    value: string,
    attr: "str" | "dex" | "con" | "int" | "wis" | "cha",
  ) => {
    const newSelectedScores = [...selectedScores]
    const index = newSelectedScores.indexOf(parseInt(value))
    if (index === -1) {
      if (value === "unset") {
        const attrScore = getAttributeScore(attr, character)
        const scoreIndex = newSelectedScores.indexOf(attrScore)
        newSelectedScores.splice(scoreIndex, 1)

        setSelectedScores(newSelectedScores)
        setCharacter(setAttributeScore(attr, 0, character))
        return
      }
      newSelectedScores.push(parseInt(value))
    } else {
      newSelectedScores.splice(index, 1)
    }
    setSelectedScores(newSelectedScores)
    setCharacter(setAttributeScore(attr, parseInt(value), character))
  }

  const AttributeRow = ({
    attr,
  }: {
    attr: AttributeInformation["attributeSetTo14"]
  }) => {
    if (!attr) return null
    return (
      <TableRow className="grid grid-cols-5 items-center">
        <TableCell>{attr.toUpperCase()}</TableCell>
        <TableCell>{attributeScores[attr]}</TableCell>
        <TableCell>{getModifier(attributeScores[attr])}</TableCell>
        <TableCell>
          <Select onValueChange={(val) => handleSelectValueChange(val, attr)}>
            <SelectTrigger>
              <SelectValue placeholder={getAttributeScore(attr, character)}>
                0
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem disabled={selectedScores.includes(14)} value={"14"}>
                  14
                </SelectItem>
                <SelectItem disabled={selectedScores.includes(12)} value={"12"}>
                  12
                </SelectItem>
                <SelectItem disabled={selectedScores.includes(11)} value={"11"}>
                  11
                </SelectItem>
                <SelectItem disabled={selectedScores.includes(10)} value={"10"}>
                  10
                </SelectItem>
                <SelectItem disabled={selectedScores.includes(9)} value={"9"}>
                  9
                </SelectItem>
                <SelectItem disabled={selectedScores.includes(7)} value={"7"}>
                  7
                </SelectItem>
                <SelectItem value={"unset"}>Unset</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>{getAttributeScoreWithBonuses(attr, character)}</TableCell>
      </TableRow>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="grid grid-cols-5">
          <TableCell>Attribute</TableCell>
          <TableCell>Score</TableCell>
          <TableCell>Modifier</TableCell>
          <TableCell>Set score</TableCell>
          <TableCell>With bonuses</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AttributeRow attr={"str"} />
        <AttributeRow attr={"dex"} />
        <AttributeRow attr={"con"} />
        <AttributeRow attr={"int"} />
        <AttributeRow attr={"wis"} />
        <AttributeRow attr={"cha"} />
      </TableBody>
    </Table>
  )
}

export function AttributesRolledTable({
  character,
  setCharacter,
}: {
  character: CharacterInformation
  setCharacter: (character: CharacterInformation) => void
}) {
  const attributeScores = getAttributeScores(character)
  const attributeScoreSetTo14 = getAttributeScoreSetTo14(character)

  const handleSetAttributeScoreTo14 = (
    attribute: AttributeInformation["attributeSetTo14"],
  ) => {
    if (attributeScoreSetTo14 === attribute) {
      setCharacter(setAttributeScoreTo14(null, character))
    } else {
      setCharacter(setAttributeScoreTo14(attribute, character))
    }
  }

  const getButtonText = (
    attribute: AttributeInformation["attributeSetTo14"],
  ) => {
    if (attributeScoreSetTo14 === attribute) {
      return "Unset"
    } else {
      return "Set"
    }
  }

  const AttributeRow = ({
    attr,
  }: {
    attr: AttributeInformation["attributeSetTo14"]
  }) => {
    if (!attr) return null
    return (
      <TableRow className="grid grid-cols-5 items-center">
        <TableCell>{attr.toUpperCase()}</TableCell>
        <TableCell>{attributeScores[attr]}</TableCell>
        <TableCell>{getModifier(attributeScores[attr])}</TableCell>
        <TableCell>
          <Button
            className="w-full"
            onClick={() => handleSetAttributeScoreTo14(attr)}
          >
            {getButtonText(attr)}
          </Button>
        </TableCell>
        <TableCell>{getAttributeScoreWithBonuses(attr, character)}</TableCell>
      </TableRow>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="grid grid-cols-5">
          <TableCell>Attribute</TableCell>
          <TableCell>Score</TableCell>
          <TableCell>Modifier</TableCell>
          <TableCell>Set to 14</TableCell>
          <TableCell>With bonuses</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AttributeRow attr={"str"} />
        <AttributeRow attr={"dex"} />
        <AttributeRow attr={"con"} />
        <AttributeRow attr={"int"} />
        <AttributeRow attr={"wis"} />
        <AttributeRow attr={"cha"} />
      </TableBody>
    </Table>
  )
}
