import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { skills } from "@/projects/tools/swn/skills"
export function SkillDisplay({
  skillId,
  skillLevel,
}: {
  skillId: string
  skillLevel?: null | 0 | 1 | 2 | 3 | 4
}) {
  const skill = skills[skillId]

  const { name, description, type } = skill

  const typeToColor = {
    "non-combat": "text-lime-400",
    combat: "text-red-600",
    psionics: "text-violet-600",
    general: "text-default",
  }

  const displayName = `${name}${
    skillLevel !== null && skillLevel !== undefined ? ` ${skillLevel}` : ""
  }`

  return (
    <HoverCard>
      <HoverCardTrigger>
        <span className={`text-md font-semibold ${typeToColor[type]}`}>
          {displayName}
        </span>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col">
          <span className="text-sm">{description}</span>
          <span className={`text-xs font-semibold ${typeToColor[type]}`}>
            {type}
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
