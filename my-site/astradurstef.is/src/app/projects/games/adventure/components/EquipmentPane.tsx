"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { EquipmentType, Item } from "@/games/adventure"
import { ItemPreviewPane } from "./ItemPreviewPane"

export function EquipmentPane({
  equipment,
  handleUnequipItem,
}: {
  equipment: EquipmentType
  handleUnequipItem: Function
}) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const { head, chest, legs, feet, left, right } = equipment

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex justify-center gap-1">
          <EquipmentSlot item={head} setSelectedItem={setSelectedItem} />
        </div>
        <div className="flex justify-center gap-1">
          <EquipmentSlot item={right} setSelectedItem={setSelectedItem} />
          <EquipmentSlot item={chest} setSelectedItem={setSelectedItem} />
          <EquipmentSlot item={left} setSelectedItem={setSelectedItem} />
        </div>
        <div className="flex justify-center gap-1">
          <EquipmentSlot item={legs} setSelectedItem={setSelectedItem} />
        </div>
        <div className="flex justify-center gap-1">
          <EquipmentSlot item={feet} setSelectedItem={setSelectedItem} />
        </div>
      </div>
      <div>
        <ItemPreviewPane item={selectedItem} />
        {selectedItem && (
          <Button
            onClick={() => {
              handleUnequipItem({
                item: selectedItem,
              })
              setSelectedItem(null)
              return
            }}
          >
            Unequip {selectedItem.slot}
          </Button>
        )}
      </div>
    </div>
  )
}

function ItemSlot({
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
      onClick={() => setSelectedItem(item)}
    />
  )
}

function EquipmentSlot({
  item,
  setSelectedItem,
}: {
  item: Item | null
  setSelectedItem: Function
}) {
  return <ItemSlot item={item} setSelectedItem={setSelectedItem} />
}
