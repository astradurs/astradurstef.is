export const skillIds: SkillId[] = [
  "administer",
  "connect",
  "exert",
  "fix",
  "heal",
  "know",
  "lead",
  "notice",
  "preform",
  "pilot",
  "program",
  "punch",
  "shoot",
  "sneak",
  "stab",
  "survive",
  "talk",
  "trade",
  "work",
  "biopsionics",
  "metapsionics",
  "precognition",
  "telekinesis",
  "telepathy",
  "teleportation",
]

export const skills: Skill[] = skillIds.map((id) => ({
  level: null,
  bonus: null,
  id,
  type: [
    "biopsionics",
    "metapsionics",
    "precognition",
    "telekinesis",
    "telepathy",
    "teleportation",
  ].includes(id)
    ? "psionic"
    : ["punch", "shoot", "stab"].includes(id)
    ? "combat"
    : "general",
}))

export type SkillId =
  | "administer"
  | "connect"
  | "exert"
  | "fix"
  | "heal"
  | "know"
  | "lead"
  | "notice"
  | "preform"
  | "pilot"
  | "program"
  | "punch"
  | "shoot"
  | "sneak"
  | "stab"
  | "survive"
  | "talk"
  | "trade"
  | "work"
  | "biopsionics"
  | "metapsionics"
  | "precognition"
  | "telekinesis"
  | "telepathy"
  | "teleportation"

export interface Skill {
  level: number | null
  bonus: number | null
  id: SkillId
  type: "psionic" | "combat" | "general"
}
