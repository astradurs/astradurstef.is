import { FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { CharacterClass, classes } from "@/projects/tools/swn/classes"

export function ClassEditor({ form }: { form: any }) {
  const [valueState, setValueState] = useState("--")

  return (
    <div className="flex flex-col w-full gap-4">
      <FormField
        control={form.control}
        name="class"
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={(id) => {
                    if (id === "0") {
                      form.setValue("class", {
                        id: "0",
                        name: "--",
                        description: "--",
                      })
                      setValueState("--")
                      return
                    } else {
                      const newClass: CharacterClass | undefined = classes.find(
                        (class_: CharacterClass) => class_.id === id
                      )
                      if (newClass === undefined) {
                        form.setValue("class", {
                          id: "0",
                          name: "--",
                          description: "--",
                        })
                        setValueState("--")
                        return
                      }
                      const {
                        name: cName,
                        id: cId,
                        description: cDesc,
                      }: {
                        name: string
                        id: string
                        description: string
                      } = newClass
                      form.setValue("class", {
                        id: cId,
                        name: cName,
                        description: cDesc,
                      })
                      setValueState(cName)
                    }
                  }}
                  defaultValue={valueState}
                >
                  <SelectTrigger>
                    <SelectValue>{valueState}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"0"}>{"--"}</SelectItem>
                    {classes.map((class_) => {
                      return (
                        <SelectItem key={class_.id} value={class_.id}>
                          {class_.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )
        }}
      />
      <ClassInfoDisplay
        class_={classes.find((class_) => class_.name === valueState) ?? null}
      />
    </div>
  )
}

export function ClassInfoDisplay({
  class_,
}: {
  class_: CharacterClass | null
}) {
  if (class_ === null || class_ === undefined) {
    return (
      <div className="h-60">
        <div className="h-full flex items-center justify-center">
          <span className="text-sm font-normal">
            Select a Class from the dropdown menu
          </span>
        </div>
      </div>
    )
  }
  const { name, description, abilities } = class_
  const descriptionParagraphs = description.split("\n")

  const abilitiesDescription = abilities.description
  const { title, bullet_points } = abilitiesDescription

  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <div className="text-md font-medium">
            <span>{name} description</span>
          </div>
          <div className="grid gap-2">
            {descriptionParagraphs.map((paragraph, index) => {
              return (
                <span
                  key={index}
                  className="text-sm font-normal space-y-2 indent-12"
                >
                  {paragraph}
                </span>
              )
            })}
          </div>
        </div>
        <div>
          <div className="grid gap-2">
            <div className="grid">
              <span className="text-md font-medium">Class Abilities</span>
              <span className="text-sm">{title}</span>
            </div>
            <div>
              <ul className="list-disc pl-6 space-y-4">
                {bullet_points.map((bullet_point, index) => {
                  return (
                    <li key={index} className="text-sm">
                      {bullet_point}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
