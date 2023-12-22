"use client"
import { type GameChoice } from "@/games/adventure/index"
import { Button } from "@/components/ui/button"

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
  travel: "secondary",
  action: "default",
  end: "secondary",
  wait: "secondary",
  start: "secondary",
  fight: "destructive",
  flee: "secondary",
}

export function Choice({
  choice,
  handleChangeScene,
}: {
  choice: GameChoice
  handleChangeScene: Function
}) {
  const variant = choiceTypeToTheme[choice.type] as
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined
  return (
    <Button variant={variant} onClick={() => handleChangeScene(choice)}>
      {choice.text}
    </Button>
  )
}
