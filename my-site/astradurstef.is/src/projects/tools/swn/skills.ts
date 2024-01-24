import { z } from "zod"

export interface Skill {
  name: string
  id: string
  type: "combat" | "non-combat" | "psionics"
  level: null | 0 | 1 | 2 | 3 | 4
  description: string
}

export const combatSkills: { [key: string]: Skill } = {
  punch: {
    name: "Punch",
    id: "punch",
    type: "combat",
    level: null,
    description:
      "Use it as a combat skill when fighting unarmed. If your PC means to make a habit of this rather than as a recourse of desperation, you should take the Unarmed Fighter focus described later.",
  },
  shoot: {
    name: "Shoot",
    id: "shoot",
    type: "combat",
    level: null,
    description:
      "Use it as a combat skill when using ranged weap- onry, whether hurled rocks, bows, laser pistols, combat rifles, or ship’s gunnery.",
  },
  stab: {
    name: "Stab",
    id: "stab",
    type: "combat",
    level: null,
    description:
      "Use it as a combat skill when wielding melee weapons, whether primitive or complex.",
  },
}

export const nonCombatSkills: { [key: string]: Skill } = {
  administer: {
    name: "Administer",
    id: "administer",
    type: "non-combat",
    level: null,
    description:
      "Manage an organization, handle paper- work, analyze records, and keep an institution functioning on a daily basis. Roll it for bureau- cratic expertise, organizational management, le- gal knowledge, dealing with government agencies, and understanding how institutions really work.",
  },
  connect: {
    name: "Connect",
    id: "connect",
    type: "non-combat",
    level: null,
    description:
      "Find people who can be helpful to your pur- poses and get them to cooperate with you. Roll it to make useful connections with others, find people you know, know where to get illicit goods and services, and be familiar with foreign cultures and languages. You can use it in place of Talk for persuading people you find via this skill.",
  },
  exert: {
    name: "Exert",
    id: "exert",
    type: "non-combat",
    level: null,
    description:
      "Apply trained speed, strength, or stamina in some feat of physical exertion. Roll it to run, jump, lift, swim, climb, throw, and so forth. You can use it as a combat skill when throwing things, though it doesn’t qualify as a combat skill for other ends.",
  },
  fix: {
    name: "Fix",
    id: "fix",
    type: "non-combat",
    level: null,
    description:
      "Create and repair devices both simple and complex. How complex will depend on your character’s background; a lostworlder blacksmith is going to need some study time before he’s ready to fix that broken fusion reactor, though he can do it eventu- ally. Roll it to fix things, build things, and identify what something is supposed to do.",
  },
  heal: {
    name: "Heal",
    id: "heal",
    type: "non-combat",
    level: null,
    description:
      "Employ medical and psychological treatment for the injured or disturbed. Roll it to cure diseases, stabilize the critically injured, treat psychological disorders, or diagnose illnesses.",
  },
  know: {
    name: "Know",
    id: "know",
    type: "non-combat",
    level: null,
    description:
      "Know facts about academic or scientific fields. Roll it to understand planetary ecologies, remem- ber relevant history, solve science mysteries, and know the basic facts about rare or esoteric topics.",
  },
  lead: {
    name: "Lead",
    id: "lead",
    type: "non-combat",
    level: null,
    description:
      "Convince others to also do whatever it is you’re trying to do. Talk might persuade them that fol- lowing you is smart, but Lead can make them do it even when they think it’s a bad idea. Roll it to lead troops in combat, convince others to follow you, or maintain morale and discipline.",
  },
  notice: {
    name: "Notice",
    id: "notice",
    type: "non-combat",
    level: null,
    description:
      "Spot anomalies or interesting facts about your environment. Roll it for searching places, detect- ing ambushes, spotting things, and reading the emotional state of other people.",
  },
  perform: {
    name: "Perform",
    id: "perform",
    type: "non-combat",
    level: null,
    description:
      "Exhibit some performative skill. Roll it to dance, sing, orate, act, or otherwise put on a con- vincing or emotionally moving performance.",
  },
  pilot: {
    name: "Pilot",
    id: "pilot",
    type: "non-combat",
    level: null,
    description:
      "Use this skill to pilot vehicles or ride beasts. Roll it to fly spaceships, drive vehicles, ride animals, or tend to basic vehicle repair. This skill doesn’t help you with things entirely outside the scope of your background or experience, though with some practice a PC can expand their expertise.",
  },
  program: {
    name: "Program",
    id: "program",
    type: "non-combat",
    level: null,
    description:
      "Operating or hacking computing and com- munications hardware. Roll it to program or hack computers, control computer-operated hardware, operate communications tech, or decrypt things.",
  },
  sneak: {
    name: "Sneak",
    id: "sneak",
    type: "non-combat",
    level: null,
    description:
      "Move without drawing notice. Roll it for stealth, disguise, infiltration, manual legerdemain, pick- pocketing, and the defeat of security measures.",
  },
  survive: {
    name: "Survive",
    id: "survive",
    type: "non-combat",
    level: null,
    description:
      "Obtain the basics of food, water, and shelter in hostile environments, along with avoiding their natural perils. Roll it to handle animals, navigate difficult terrain, scrounge urban resources, make basic tools, and avoid wild beasts or gangs.",
  },
  talk: {
    name: "Talk",
    id: "talk",
    type: "non-combat",
    level: null,
    description:
      "Convince other people of the facts you want them to believe. What they do with that conviction may not be completely predictable. Roll it to persuade, charm, or deceive others in conversation.",
  },
  trade: {
    name: "Trade",
    id: "trade",
    type: "non-combat",
    level: null,
    description:
      "Find what you need on the market and sell what you have. Roll it to sell or buy things, figure out where to purchase hard-to-get or illicit goods, deal with customs agents, or run a business.",
  },
  work: {
    name: "Work",
    id: "work",
    type: "non-combat",
    level: null,
    description:
      "This is a catch-all skill for professions not repre- sented by other skills. Roll it to work at a particular profession, art, or trade.",
  },
}

export const psionicSkills: { [key: string]: Skill } = {
  biopsionics: {
    name: "Biopsionics",
    id: "biopsionics",
    type: "psionics",
    level: null,
    description:
      "Master powers of physical repair, body aug- mentation, and shapeshifting.",
  },
  metapsionics: {
    name: "Metapsionics",
    id: "metapsionics",
    type: "psionics",
    level: null,
    description:
      "Master the ability to sense future events and control probability.",
  },
  precognition: {
    name: "Precognition",
    id: "precognition",
    type: "psionics",
    level: null,
    description:
      "Master powers that reveal the future, alter the flow of time, and predict the actions of others.",
  },
  telekinesis: {
    name: "Telekinesis",
    id: "telekinesis",
    type: "psionics",
    level: null,
    description:
      "Master the remote control of kinetic energy to move objects and fabricate force constructs.",
  },
  telepathy: {
    name: "Telepathy",
    id: "telepathy",
    type: "psionics",
    level: null,
    description: "Master the reading and influencing of other sapient minds.",
  },
  teleportation: {
    name: "Teleportation",
    id: "teleportation",
    type: "psionics",
    level: null,
    description:
      "Master the arts of physical translocation of yourself and allies.",
  },
}

export const skills: { [key: string]: Skill } = {
  ...combatSkills,
  ...nonCombatSkills,
  ...psionicSkills,
}
