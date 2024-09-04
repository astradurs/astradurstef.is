"use client"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { CharacterInformation } from "@/projects/tools/swn-v2/character"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import Attributes from "./attributes"
import Background from "./background"
import Class from "./class"

export default function SWNCharacterPage({
  initialCharacter,
}: {
  initialCharacter: CharacterInformation
}) {
  const [character, setCharacter] =
    useState<CharacterInformation>(initialCharacter)

  return (
    <div className="grid gap-4">
      <CollapsibleContainer title="Attributes">
        <Attributes character={character} setCharacter={setCharacter} />
      </CollapsibleContainer>
      <CollapsibleContainer title="Background">
        <Background character={character} setCharacter={setCharacter} />
      </CollapsibleContainer>
      <CollapsibleContainer title="Class">
        <Class character={character} setCharacter={setCharacter} />
      </CollapsibleContainer>
      <CollapsibleContainer title="DevTools">
        <pre className="max-w-xl">
          {JSON.stringify(character.classInformation, null, 2)}
        </pre>
      </CollapsibleContainer>
    </div>
  )
}

function CollapsibleContainer({
  closedOnMount = false,
  title,
  children,
}: {
  closedOnMount?: boolean
  title: string
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(!closedOnMount)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          <span>{title}</span>
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            {isOpen ? (
              <ChevronUpIcon className="w-6 h-6" />
            ) : (
              <ChevronDownIcon className="w-6 h-6" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="px-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
