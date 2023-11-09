"use client"
import { InventoryType } from "../../../../../../games/adventure"
import { useState } from "react"
import { Item } from "../../../../../../games/adventure"
import { ItemPreviewPane } from "./ItemPreviewPane"
import { Button } from "@/components/ui/button"

export function InventoryPane({
  inventory,
  maxInventorySize,
  handleEquipItemFrominventory,
}: {
  inventory: InventoryType
  maxInventorySize: number
  handleEquipItemFrominventory: Function
}) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  return (
    <div className="flex gap-4">
      <div className="grid grid-cols-2 gap-1">
        {Array.from({ length: maxInventorySize }).map((_, index) => {
          return (
            <InventorySlot
              key={index}
              item={inventory.items[index]}
              setSelectedItem={setSelectedItem}
            />
          )
        })}
      </div>
      <div>
        <ItemPreviewPane item={selectedItem} />
        {selectedItem && (
          <Button
            variant="default"
            onClick={() => {
              handleEquipItemFrominventory({
                item: selectedItem,
                targetSlot: selectedItem.slot,
              })
              setSelectedItem(null)
              return
            }}
          >
            Equip {selectedItem.slot}
          </Button>
        )}
      </div>
    </div>
  )
}

function InventorySlot({
  item,
  setSelectedItem,
}: {
  item: Item | null
  setSelectedItem: Function
}) {
  return (
    <Button
      variant={item ? "default" : "secondary"}
      className="w-10 h-10"
      disabled={!item}
      onClick={() => {
        setSelectedItem(item)
      }}
    />
  )
}
