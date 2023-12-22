"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  PlayerState,
  Item,
  equipFromInventory,
  unequip,
} from "@/games/adventure/index"
import { PlayerPane } from "./PlayerPane"
import { InventoryPane } from "./InventoryPane"
import { EquipmentPane } from "./EquipmentPane"

export function PlayerInfo({
  player,
  setPlayer,
}: {
  player: PlayerState
  setPlayer: Function
}) {
  const handleEquipItemFrominventory = ({
    item,
    targetSlot,
  }: {
    item: Item
    targetSlot: "head" | "chest" | "legs" | "feet" | "left" | "right"
  }) => {
    if (item.slot !== targetSlot) {
      item.slot = targetSlot
    }
    setPlayer(equipFromInventory(player, item))
  }

  const handleUnequipItem = ({ item }: { item: Item }) => {
    setPlayer(unequip(player, item.slot))
  }

  return (
    <div className="flex flex-col gap-2">
      <Tabs aria-label="Options" defaultValue="player">
        <TabsList>
          <TabsTrigger value="player">Player</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>
        <TabsContent value="player">
          <PlayerPane player={player} />
        </TabsContent>
        <TabsContent value="inventory">
          <InventoryPane
            inventory={player.inventory}
            maxInventorySize={player.maxInventorySize}
            handleEquipItemFrominventory={handleEquipItemFrominventory}
          />
        </TabsContent>
        <TabsContent value="equipment">
          <EquipmentPane
            equipment={player.equipment}
            handleUnequipItem={handleUnequipItem}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
