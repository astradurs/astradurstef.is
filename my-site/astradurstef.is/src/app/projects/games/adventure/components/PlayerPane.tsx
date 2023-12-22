"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  PlayerState,
  getAttackAndBonuses,
  getDefense,
} from "@/games/adventure/index"

export function PlayerPane({ player }: { player: PlayerState }) {
  const { health, name, gold } = player
  const { armorClass, defenseFrom } = getDefense(player)
  const { attack, attackModifier, attackFrom, damageFrom, damageModifier } =
    getAttackAndBonuses(player)

  const attackModifierTooltipContent = attackFrom.map((item) => {
    return (
      <div key={item.name}>
        <p>
          {item.name}: + {item.attackModifier}
        </p>
      </div>
    )
  })

  const defenseTooltipContent = defenseFrom.map((item) => {
    return (
      <div key={item.name}>
        <p>
          {item.name}: + {item.defense}
        </p>
      </div>
    )
  })

  const damageTooltipContent = (
    <div>
      <p>{damageFrom}</p>
      <p>min: {attack.min}</p>
      <p>max: {attack.max}</p>
      <p>avg: {(attack.min + attack.max) / 2}</p>
      <p>modifier: {damageModifier}</p>
    </div>
  )

  return (
    <div className="flex flex-col gap-2">
      <p>Name: {name}</p>
      <p>Health: {health}</p>
      <p>Gold: {gold}</p>
      <p>
        Attack modifier:{" "}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-green-500">+{attackModifier}</span>
            </TooltipTrigger>
            <TooltipContent>{attackModifierTooltipContent}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>
      <p>
        Damage:{" "}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-green-500">
                {attack.min} - {attack.max} +{damageModifier}
              </span>
            </TooltipTrigger>
            <TooltipContent>{damageTooltipContent}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>

      <p>
        Defense:{" "}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-green-500">+{armorClass}</span>
            </TooltipTrigger>
            <TooltipContent>{defenseTooltipContent}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>
    </div>
  )
}
