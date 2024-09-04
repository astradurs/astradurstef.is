import { FormField, FormItem } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Background,
  backgrounds as availableBackgrounds,
} from "@/projects/tools/swn/backgrounds"

import { skills as baseSkills } from "@/projects/tools/swn/skills"
import _ from "lodash"
import { useState } from "react"

export function BackgroundEditor({ form }: { form: any }) {
  const formBackground = form.watch("background")
  const [selectedBackgroundId, setSelectedBackgroundId] = useState<string>("0")
  const selectedBackground: Background | null =
    availableBackgrounds.find((bg) => bg.id === selectedBackgroundId) || null

  return (
    <div className="flex flex-col w-full gap-4">
      <FormField
        control={form.control}
        name="background"
        render={({ field }) => {
          return (
            <FormItem className="flex flex-col gap-2">
              <Select
                value={selectedBackgroundId || "0"}
                onValueChange={(value) => {
                  if (value === "0") {
                    form.setValue("background", {
                      name: "",
                      id: "",
                      description: "",
                      sp_left: 0,
                      skills: {},
                    })
                    setSelectedBackgroundId("0")
                    return
                  }
                  const selectedBackground = availableBackgrounds.find(
                    (bg) => bg.id === value,
                  )
                  if (selectedBackground === undefined) {
                    return
                  } else {
                    const { name, id, description, freeSkill } =
                      selectedBackground

                    const freeSkillInfo = baseSkills[freeSkill]
                    const freeSkillLevel = freeSkillInfo.level
                    const freeSkillNewLevel =
                      freeSkillLevel === null ? 0 : freeSkillLevel + 1

                    form.setValue("background", {
                      name,
                      id,
                      description,
                      sp_left: 2,
                      skills: {
                        [freeSkill]: {
                          ...freeSkillInfo,
                          level: freeSkillNewLevel,
                        },
                      },
                    })
                    setSelectedBackgroundId(value)
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue>{selectedBackground?.name || "--"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"0"}>{"--"}</SelectItem>
                  {availableBackgrounds.map((bg) => {
                    return (
                      <SelectItem key={bg.id} value={bg.id}>
                        {bg.name}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )
        }}
      />
      <BackgroundInfoDisplay background={selectedBackground} />
      {selectedBackground === null ? null : <PickOrRollSkillsInformation />}
    </div>
  )
}

function GrowthTable({ growth }: { growth: Background["growth"] }) {
  return (
    <div>
      {Object.entries(growth).map(([key, value]) => {
        const type = value.type
        if (type === "skill") {
          return (
            <div key={key} className="flex flex-row gap-2">
              <span className="text-sm font-semibold">{key}</span>
              <span className="text-sm font-normal">
                {_.startCase(value.skill)}
              </span>
            </div>
          )
        }
        if (type === "attribute") {
          return (
            <div key={key} className="flex flex-row gap-2">
              <span className="text-sm font-semibold">{key}</span>
              <span className="text-sm font-normal">
                {_.startCase(value.attribute)}
              </span>
            </div>
          )
        }
        if (type === "attribute_type") {
          return (
            <div key={key} className="flex flex-row gap-2">
              <span className="text-sm font-semibold">{key}</span>
              <span className="text-sm font-normal">
                +{value.amount} {_.startCase(value.attribute_type)}
              </span>
            </div>
          )
        }
        if (type === "skill_type") {
          return (
            <div key={key} className="flex flex-row gap-2">
              <span className="text-sm font-semibold">{key}</span>
              <span className="text-sm font-normal">
                {_.startCase(value.skill_type)} skill
              </span>
            </div>
          )
        }
        return (
          <div key={key} className="flex flex-row gap-2">
            <span className="text-sm font-semibold">{key}</span>
            <span className="text-sm font-normal">{type}</span>
          </div>
        )
      })}
    </div>
  )
}

function QuickSkillsTable({
  quickSkills,
}: {
  quickSkills: Background["quickSkills"]
}) {
  return (
    <div className="flex flex-col">
      {Object.entries(quickSkills).map(([key, value]) => {
        if (typeof value === "string") {
          return (
            <span key={key} className="text-sm font-normal">
              {_.startCase(value)}
            </span>
          )
        }
        const type = value.type
        if (type === "combat") {
          return (
            <span key={key} className="text-sm font-normal">
              Any combat
            </span>
          )
        }
        if (type === "non-combat") {
          return (
            <span key={key} className="text-sm font-normal">
              Any non-combat
            </span>
          )
        }
        if (type === "psionic") {
          return (
            <span key={key} className="text-sm font-normal">
              Any psionic
            </span>
          )
        }
        if (type === "general") {
          return (
            <span key={key} className="text-sm font-normal">
              Any skill
            </span>
          )
        }
      })}
    </div>
  )
}

function LearningTable({ learning }: { learning: Background["learning"] }) {
  return (
    <div>
      {Object.entries(learning).map(([key, value]) => {
        if (typeof value === "string") {
          return (
            <div key={key} className="flex flex-row gap-2">
              <span className="text-sm font-semibold">{key}</span>
              <span className="text-sm font-normal">{_.startCase(value)}</span>
            </div>
          )
        }
        const type = value.type
        if (type === "combat") {
          return (
            <div key={key} className="flex flex-row gap-2">
              <span className="text-sm font-semibold">{key}</span>
              <span className="text-sm font-normal">Any combat</span>
            </div>
          )
        }
        if (type === "non-combat") {
          return (
            <div key={key} className="flex flex-row gap-2">
              <span className="text-sm font-semibold">{key}</span>
              <span className="text-sm font-normal">Any non-combat</span>
            </div>
          )
        }
        if (type === "psionic") {
          return (
            <div key={key} className="flex flex-row gap-2">
              <span className="text-sm font-semibold">{key}</span>
              <span className="text-sm font-normal">Any psionic</span>
            </div>
          )
        }
        if (type === "general") {
          return (
            <div key={key} className="flex flex-row gap-2">
              <span className="text-sm font-semibold">{key}</span>
              <span className="text-sm font-normal">Any skill</span>
            </div>
          )
        }
      })}
    </div>
  )
}

function BackgroundInfoDisplay({
  background,
}: {
  background: Background | null
}) {
  if (background === null) {
    return (
      <div className="h-60">
        <div className="h-full flex items-center justify-center">
          <span className="text-sm font-normal">
            Select a Background from the dropdown menu
          </span>
        </div>
      </div>
    )
  }
  const { name, description } = background
  const { quickSkills, freeSkill, learning, growth } = background

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-2">
        <div className="text-md font-medium">
          <span>{name} description</span>
        </div>
        <span className="text-sm font-normal space-y-2 indent-12">
          {description}
        </span>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div>
              <div className="flex flex-row gap-2 text-md font-medium">
                <span>d6</span>
                <span>Growth</span>
              </div>
              <GrowthTable growth={growth} />
            </div>
            <div className="h-2" />
            <div>
              <div className="flex flex-row gap-2 text-md font-medium">
                <span>Free skill</span>
              </div>
              <div className="flex flex-row gap-2 ">
                <span>{_.startCase(freeSkill)}</span>
              </div>
            </div>
            <div className="h-2" />
            <div>
              <div className="flex flex-row gap-2 text-md font-medium">
                <span>Quick skills</span>
              </div>
              <QuickSkillsTable quickSkills={quickSkills} />
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2 text-md font-medium">
              <span>d8</span>
              <span>Learning</span>
            </div>
            <LearningTable learning={learning} />
          </div>
        </div>
      </div>
    </div>
  )
}

function PickOrRollSkillsInformation() {
  return (
    <div className="grid gap-2">
      <div>
        <div>
          <span className="font-bold text-md">Picking skills:</span>{" "}
          <span className="font-normal">
            If you decide to pick skills, you get 2 skill points to spend on any
            skill from the<span className="font-bold mx-1">learning</span>
            table. You can select the same skill twice and level it up to a
            maximum of level 2.
          </span>
        </div>
        <div>
          <span className="font-bold text-md">Rolling skills:</span>{" "}
          <span className="font-normal">
            If you decide to roll for skills, you get 3 rolls which you can
            spread out over the<span className="font-bold mx-1">growth</span>
            table and
            <span className="font-bold mx-1">learning</span>table. Rolling on
            the<span className="font-bold mx-1">growth</span>table will give you
            a random skill or attribute to level up.
          </span>
        </div>
      </div>
    </div>
  )
}
