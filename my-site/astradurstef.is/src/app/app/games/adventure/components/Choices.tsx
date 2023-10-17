"use client"
import { type GameChoice } from "../../../../../../games/adventure/index"
import { Button } from "@nextui-org/react"

export function Choices({
  choices,
  handleChangeScene,
}: {
  choices: GameChoice[]
  handleChangeScene: Function
}) {
  return (
    <div className="flex flex-col gap-2">
      {choices.map((choice: GameChoice, index: number) => {
        return (
          <Choice
            key={index}
            choice={choice}
            handleChangeScene={handleChangeScene}
          />
        )
      })}
    </div>
  )
}

const choiceTypeToTheme = {
  travel: "primary",
  action: "secondary",
  end: "danger",
  wait: "warning",
  start: "success",
  fight: "danger",
  flee: "warning",
}

export function Choice({
  choice,
  handleChangeScene,
}: {
  choice: GameChoice
  handleChangeScene: Function
}) {
  const color = choiceTypeToTheme[choice.type] as any
  return (
    <Button color={color} onClick={() => handleChangeScene(choice)}>
      {choice.text}
    </Button>
  )
}
