import { useEffect, useMemo, useState } from "react"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { roll3d6 } from "@/projects/tools/swn/roll-utils"

function getModifier(score: number) {
  if (score === 0) return null
  if (score === 3) return -2
  if (score >= 4 && score <= 7) return -1
  if (score >= 8 && score <= 13) return 0
  if (score >= 14 && score <= 17) return 1
  if (score >= 18) return 2
  throw new Error("Invalid score")
}

export function AttributesEditor({ form }: { form: any }) {
  const [state, setState] = useState<string | null>("ROLL")
  const changeState = (newState: string) => {
    form.setValue("attributes", {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
    })
    setState(newState)
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        variant={state === "ROLL" ? "default" : "secondary"}
        type="button"
        onClick={() => {
          changeState("ROLL")
        }}
      >
        ROLL
      </Button>
      <Button
        variant={state === "POINT" ? "default" : "secondary"}
        type="button"
        onClick={() => {
          changeState("POINT")
        }}
      >
        POINT
      </Button>
      <div className="col-span-2">
        {state === "POINT" && <AttributesPointsEditor form={form} />}
        {state === "ROLL" && <AttributesRollEditor form={form} />}
      </div>
    </div>
  )
}

function AttributesPointsEditor({ form }: { form: any }) {
  const [pointsLeft, setPointsLeft] = useState([14, 12, 11, 10, 9, 7])

  const onAttributeChange = (attribute: string, value: number) => {
    const availablePoints = [14, 12, 11, 10, 9, 7]

    form.setValue("attributes", {
      ...form.getValues("attributes"),
      [attribute]: value,
    })
    const attributes = form.getValues("attributes")
    const newPointsLeft = availablePoints.filter(
      (p) => !Object.values(attributes).includes(p)
    )
    console.log("onAttributechange", {
      attribute,
      value,
      attributes,
      newPointsLeft,
    })
    setPointsLeft(newPointsLeft)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Attribute</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Modifier</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(form.watch("attributes")).map((attribute) => {
          return (
            <TableRow key={attribute}>
              <TableCell>{attribute.toUpperCase()}</TableCell>
              <TableCell className="p-2">
                <AttributesPointsField
                  form={form}
                  attribute={attribute}
                  pointsLeft={pointsLeft}
                  onAttributeChange={onAttributeChange}
                />
              </TableCell>
              <TableCell>
                {getModifier(form.watch("attributes")[attribute])}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

function AttributesPointsField({
  form,
  attribute,
  pointsLeft,
  onAttributeChange,
}: {
  form: any
  attribute: string
  pointsLeft: number[]
  onAttributeChange: (attribute: string, value: number) => void
}) {
  return (
    <FormField
      key={attribute}
      control={form.control}
      name="attributes"
      render={({ field }) => {
        return (
          <AttributesPointsFormItem
            attribute={attribute}
            pointsLeft={pointsLeft}
            onAttributeChange={onAttributeChange}
          />
        )
      }}
    />
  )
}

function AttributesPointsFormItem({
  attribute,
  pointsLeft,
  onAttributeChange,
}: {
  attribute: string
  pointsLeft: number[]
  onAttributeChange: (attribute: string, value: number) => void
}) {
  const [valueState, setValueState] = useState<string>("--")

  return (
    <FormItem>
      <FormControl>
        <Select
          onValueChange={(value: string) => {
            onAttributeChange(attribute, parseInt(value))
            if (value === "0") {
              setValueState("--")
              return
            }
            setValueState(value)
          }}
          defaultValue={valueState}
        >
          <SelectTrigger>
            <SelectValue>{valueState}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"0"}>{"--"}</SelectItem>
            {pointsLeft.map((value) => {
              return (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </FormControl>
    </FormItem>
  )
}

function AttributesRollEditor({ form }: { form: any }) {
  const [rolls, setRolls] = useState<number[]>([])
  const rolledScores = useMemo(() => {
    const rollChange = rolls.length
    if (rollChange === 0) {
      return {
        str: roll3d6(),
        dex: roll3d6(),
        con: roll3d6(),
        int: roll3d6(),
        wis: roll3d6(),
        cha: roll3d6(),
      }
    }
    return {
      str: roll3d6(),
      dex: roll3d6(),
      con: roll3d6(),
      int: roll3d6(),
      wis: roll3d6(),
      cha: roll3d6(),
    }
  }, [rolls])

  return (
    <div className="grid gap-4">
      <AttributesRollRadioGroupTable form={form} rolledScores={rolledScores} />
      <div className="mx-auto w-1/2">
        <Button
          type="button"
          className="w-full"
          onClick={() => {
            setRolls([...rolls, rolls.length + 1])
          }}
        >
          ROLL AGAIN
        </Button>
      </div>
    </div>
  )
}

function AttributesRollRadioGroupTable({
  form,
  rolledScores,
}: {
  form: any
  rolledScores: {
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
  }
}) {
  const [changedAttribute, setChangedAttribute] = useState<string | null>(null)
  const attributeKeys = Object.keys(rolledScores)

  return (
    <FormField
      control={form.control}
      name="attributes"
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={(attributeKey) => {
                  console.log("onValueChange", attributeKey)
                  const newScores = {
                    ...rolledScores,
                    [attributeKey]: 14,
                  }
                  form.setValue("attributes", newScores)
                  setChangedAttribute(attributeKey)
                }}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Attribute</TableHead>
                      <TableHead>Rolled score</TableHead>
                      <TableHead>Modifier</TableHead>
                      <TableHead>Set to 14</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attributeKeys.map((attribute) => {
                      const isChangedAttribute = changedAttribute === attribute
                      return (
                        <TableRow key={attribute}>
                          <TableCell>{attribute.toUpperCase()}</TableCell>
                          <TableCell>
                            {isChangedAttribute
                              ? 14
                              : rolledScores[
                                  attribute as keyof typeof rolledScores
                                ]}
                          </TableCell>
                          <TableCell>
                            {getModifier(
                              isChangedAttribute
                                ? 14
                                : rolledScores[
                                    attribute as keyof typeof rolledScores
                                  ]
                            )}
                          </TableCell>
                          <TableCell>
                            <FormItem key={attribute}>
                              <FormControl>
                                <RadioGroupItem value={attribute} />
                              </FormControl>
                            </FormItem>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )
      }}
    />
  )
}
