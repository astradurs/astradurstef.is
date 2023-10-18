"use client"
import { useState } from "react"
import { Tabs, Tab, Button, Tooltip } from "@nextui-org/react"
import {
  PlayerState,
  InventoryType,
  EquipmentType,
  Item,
  getAttackAndBonuses,
  getDefense,
} from "../../../../../../games/adventure/index"

export function PlayerPane({
  player,
  handleEquipItemFrominventory,
  handleUnequipItem,
}: {
  player: PlayerState
  handleEquipItemFrominventory: Function
  handleUnequipItem: Function
}) {
  console.log({ player })

  return (
    <div className="flex flex-col gap-2">
      <Tabs aria-label="Options">
        <Tab key="player" title="Player">
          <Player player={player} />
        </Tab>
        <Tab key="inventory" title="Inventory">
          <Inventory
            inventory={player.inventory}
            maxInventorySize={player.maxInventorySize}
            handleEquipItemFrominventory={handleEquipItemFrominventory}
          />
        </Tab>
        <Tab key="equipment" title="Equipment">
          <Equipment
            equipment={player.equipment}
            handleUnequipItem={handleUnequipItem}
          />
        </Tab>
      </Tabs>
    </div>
  )
}

function Player({ player }: { player: PlayerState }) {
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
        <Tooltip color="primary" content={attackModifierTooltipContent}>
          <span className="text-green-500">+{attackModifier}</span>
        </Tooltip>
      </p>
      <p>
        Damage:{" "}
        <Tooltip color="primary" content={damageTooltipContent}>
          <span>
            {attack.min} - {attack.max} +{damageModifier}
          </span>
        </Tooltip>
      </p>

      <p>
        Defense:{" "}
        <Tooltip color="primary" content={defenseTooltipContent}>
          <span className="text-green-500">+{armorClass}</span>
        </Tooltip>
      </p>
    </div>
  )
}

function Inventory({
  inventory,
  maxInventorySize,
  handleEquipItemFrominventory,
}: {
  inventory: InventoryType
  maxInventorySize: number
  handleEquipItemFrominventory: Function
}) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const InventorySlot = ({ item }: { item: Item | null }) => {
    return <ItemSlot item={item} setSelectedItem={setSelectedItem} />
  }

  return (
    <div className="flex gap-4">
      <div className="grid grid-cols-2 gap-1">
        {Array.from({ length: maxInventorySize }).map((_, index) => {
          return <InventorySlot key={index} item={inventory.items[index]} />
        })}
      </div>
      <div>
        <ItemPreviewPane item={selectedItem} />
        {selectedItem && (
          <Button
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

function ItemSlot({
  item,
  setSelectedItem,
}: {
  item: Item | null
  setSelectedItem: Function
}) {
  if (!item) {
    return (
      <button
        className="w-10 h-10 bg-default"
        onClick={() => {
          setSelectedItem(null)
        }}
      ></button>
    )
  }
  return (
    <button
      className="w-10 h-10 bg-primary"
      onClick={() => {
        setSelectedItem(item)
      }}
    />
  )
}

function Equipment({
  equipment,
  handleUnequipItem,
}: {
  equipment: EquipmentType
  handleUnequipItem: Function
}) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const { head, chest, legs, feet, left, right } = equipment

  const EquipmentSlot = ({ item }: { item: Item | null }) => {
    return <ItemSlot item={item} setSelectedItem={setSelectedItem} />
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex justify-center gap-1">
          <EquipmentSlot item={head} />
        </div>
        <div className="flex justify-center gap-1">
          <EquipmentSlot item={left} />
          <EquipmentSlot item={chest} />
          <EquipmentSlot item={right} />
        </div>
        <div className="flex justify-center gap-1">
          <EquipmentSlot item={legs} />
        </div>
        <div className="flex justify-center gap-1">
          <EquipmentSlot item={feet} />
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

function ItemPreviewPane({ item }: { item: Item | null }) {
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
