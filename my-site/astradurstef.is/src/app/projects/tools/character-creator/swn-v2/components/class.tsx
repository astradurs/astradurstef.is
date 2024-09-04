import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CharacterInformation } from "@/projects/tools/swn-v2/character"
import { classes } from "@/projects/tools/swn-v2/class"

export default function Class({
  character,
  setCharacter,
}: {
  character: CharacterInformation
  setCharacter: (character: CharacterInformation) => void
}) {
  const handleClassChange = (n: string) => {
    const newClass = classes.find((c) => c.name === n)
    console.log(newClass, n)
    if (newClass) {
      setCharacter({
        ...character,
        classInformation: {
          className: newClass.name,
          classSkillChoices: newClass.skillChoices,
          classSkillPicks: [],
          notes: {
            description: newClass.notes.description,
            abilities: newClass.notes.abilities,
          },
        },
      })
      console.log(character)
    }
  }
  return (
    <div className="grid gap-4">
      <ClassSelector
        character={character}
        setCharacter={setCharacter}
        handleClassChange={handleClassChange}
      />
      <ClassInformation character={character} />
    </div>
  )
}

export function ClassSelector({
  character,
  setCharacter,
  handleClassChange,
}: {
  character: CharacterInformation
  setCharacter: (character: CharacterInformation) => void
  handleClassChange: (n: string) => void
}) {
  return (
    <Select onValueChange={(n) => handleClassChange(n)}>
      <SelectTrigger>
        <SelectValue placeholder="Select a class">
          {character.classInformation?.className}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {classes.map((c) => (
            <SelectItem key={c.name} value={c.name}>
              {c.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function ClassInformation({
  character,
}: {
  character: CharacterInformation
}) {
  const classInfo = character.classInformation
  if (!classInfo) return null
  const { description, abilities } = classInfo.notes

  return (
    <div className="grid gap-6">
      <div>
        <h3 className="text-xl font-semibold">{classInfo.className}</h3>
        <p>{description}</p>
      </div>
      <div>
        <ul className="grid gap-4 list-disc">
          {abilities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
