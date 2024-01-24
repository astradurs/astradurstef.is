import { SkillDisplay } from "./skill-display"

export function SkillsEditor({ form }: { form: any }) {
  const formClass = form.watch("class")
  const formFocuses = form.watch("focuses")
  const formBackground = form.watch("background")
  const formSkills = form.watch("skills")

  const skillIds = Object.keys(formSkills)
  const formBGSpLeft = formBackground.sp_left
  const formBGSkills = formBackground.skills

  const formFociBonusSkills: Record<string, number> = {}
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {skillIds.map((skillId: string) => {
        const formBGSkill = formBGSkills[skillId]

        const effectiveLevel =
          formBGSkill !== undefined
            ? formBGSkill.level
            : formSkills[skillId].level
        return (
          <div
            key={skillId}
            className="flex items-center h-6 bg-secondary px-2.5 py-1 rounded-sm"
          >
            <SkillDisplay skillId={skillId} skillLevel={effectiveLevel} />
          </div>
        )
      })}
    </div>
  )
}
