import { Item } from "@/games/adventure/index"

export function ItemPreviewPane({ item }: { item: Item | null }) {
  if (!item) {
    return null
  }

  if (item.type === "weapon") {
    return (
      <div className="flex flex-col gap-2">
        <p className="uppercase text-center">{item.name}</p>
        <p>{item.description}</p>
        <p>
          ⚔ {item.attack.min} - {item.attack.max}
        </p>
      </div>
    )
  }

  if (item.type === "armor") {
    return (
      <div className="flex flex-col gap-2">
        <p className="uppercase text-center">{item.name}</p>
        <p>{item.description}</p>
        <p>🛡️ {item.defense}</p>
      </div>
    )
  }

  if (item.type === "shield") {
    return (
      <div className="flex flex-col gap-2">
        <p className="uppercase text-center">{item.name}</p>
        <p>{item.description}</p>
        <p>🛡️ {item.defense}</p>
      </div>
    )
  }

  return null
}
