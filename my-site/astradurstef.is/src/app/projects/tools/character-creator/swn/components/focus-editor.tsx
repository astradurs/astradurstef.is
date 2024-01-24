import { useState } from "react"
import { Focus, focuses } from "@/projects/tools/swn/focuses"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { classes } from "@/projects/tools/swn/classes"
import { Skill, skills as baseSkills } from "@/projects/tools/swn/skills"
import { focuses as baseFocuses } from "@/projects/tools/swn/focuses"
import { set } from "lodash"
import { PlayerBackground } from "@/projects/tools/swn/backgrounds"

export function FocusEditor({ form }: { form: any }) {
  const selectedClass = form.watch("class")
  const formFocuses = form.watch("focuses") as Record<string, Focus>

  const leveledFocusesIds: string[] = Object.keys(formFocuses).filter((key) => {
    const focus = formFocuses[key]
    const level = focus.level || 0
    return level >= 1
  })

  const leveledFocuses: Record<string, Focus> = {}
  for (const id of leveledFocusesIds) {
    const focus = formFocuses[id]
    leveledFocuses[id] = focus
  }

  const selectedSkills = form.watch("skills")

  const classId = selectedClass.id
  const classFromId = classes.find((c) => c.id === classId)
  const classFreeFocuses: Focus[] = classFromId?.abilities.free_focuses || []
  const hasFreeFocuses = classFreeFocuses.length > 0
  const freeFocuses: Record<string, Focus> = {}
  if (hasFreeFocuses) {
    for (const freeFocus of classFreeFocuses) {
      const focusId = freeFocus.id
      const focus = formFocuses[focusId]
      freeFocuses[focusId] = focus
    }
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <FocusSelector form={form} formFocuses={formFocuses} />
      {hasFreeFocuses && (
        <FocusSelector form={form} formFocuses={freeFocuses} />
      )}
      <FocusesInfoDisplay
        focuses={leveledFocuses}
        focusIds={leveledFocusesIds}
        skills={selectedSkills}
      />
    </div>
  )
}

function FocusesInfoDisplay({
  focuses,
  focusIds,
  skills,
}: {
  focuses: Record<string, Focus>
  focusIds: string[]
  skills: any
}) {
  return (
    <div className="flex flex-col gap-2">
      {focusIds.map((id: string) => (
        <FocusInfoDisplay key={id} focus={focuses[id]} skills={skills} />
      ))}
    </div>
  )
}

function FocusInfoDisplay({ focus, skills }: { focus: Focus; skills: any }) {
  if (focus.level === null) {
    return <span>Focus unrecognized</span>
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xl font-bold">
        {focus.name} level {focus.level}
      </span>
      <span className="text-sm">{focus.description}</span>
      <span className="text-sm">
        {Object.entries(focus.levels).map(([key, value]) => {
          const { bonus_skills, description } = value

          const hasLevel = (focus.level || 0) >= parseInt(key)
          return (
            <div
              key={key}
              className={hasLevel ? "text-primary" : "text-primary/50"}
            >
              <h3 className="font-bold">Level {key}:</h3>
              <p>{description}</p>
              {bonus_skills.length > 0 ? (
                <div className="flex items-center gap-1">
                  <span className="font-bold">Bonus skills: </span>
                  {bonus_skills.map((skillId: string) => {
                    const skill = baseSkills[skillId]
                    const skillValue = skills[skillId]

                    return (
                      <div key={skillId}>
                        <span className="font-bold">{skill?.name}</span>
                      </div>
                    )
                  })}
                </div>
              ) : null}
            </div>
          )
        })}
      </span>
    </div>
  )
}

function FocusSelector({
  form,
  formFocuses,
}: {
  formFocuses: Record<string, Focus>
  form: any
}) {
  const [selectedFocusId, setSelectedFocusId] = useState<string | null>(null)

  const changeFocus = (
    focusId: string | null,
    byLevels: number
  ): Focus | null => {
    if (focusId === null) {
      return null
    }
    const focus = formFocuses[focusId]
    if (focus === undefined) {
      return null
    }
    const focusLevel = focus.level || 0
    const focusMaxLevel = Object.keys(focus.levels).length

    const newLevel = focusLevel + byLevels

    if (newLevel < 0) {
      return {
        ...focus,
        level: null,
      }
    } else if (newLevel > focusMaxLevel) {
      return {
        ...focus,
        level: focusMaxLevel,
      }
    } else {
      return {
        ...focus,
        level: newLevel === 0 ? null : newLevel,
      }
    }
  }

  const onFocusChange = (value: string) => {
    const previousFocusChange = changeFocus(selectedFocusId, -1)

    const newFocusChange = changeFocus(value, 1)

    const focusChanges: Record<string, Focus> = {}
    if (previousFocusChange !== null) {
      focusChanges[previousFocusChange.id] = previousFocusChange
    }
    if (newFocusChange !== null) {
      focusChanges[newFocusChange.id] = newFocusChange
    }

    form.setValue("focuses", {
      ...formFocuses,
      ...focusChanges,
    })

    if (newFocusChange === null) {
      setSelectedFocusId(null)
      return
    } else {
      setSelectedFocusId(value)
    }
  }

  return (
    <FormField
      control={form.control}
      name="focuses"
      render={({ field }) => {
        return (
          <FormItem className="flex flex-col gap-2">
            <Select
              value={selectedFocusId || "0"}
              onValueChange={(value) => {
                onFocusChange(value)
              }}
            >
              <SelectTrigger>
                <SelectValue>
                  {(formFocuses[selectedFocusId || "0"] as Focus)?.name || "--"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"0"}>{"--"}</SelectItem>
                {Object.entries(formFocuses).map(([key, focus]) => {
                  const isSelected = key === selectedFocusId
                  const displayLevel = isSelected
                    ? focus.level
                    : (focus.level || 0) + 1
                  return (
                    <SelectItem key={key} value={key}>
                      {focus.name}-{displayLevel}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </FormItem>
        )
      }}
    />
  )
}
