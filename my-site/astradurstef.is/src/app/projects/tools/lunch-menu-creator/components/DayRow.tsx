"use client"

import { ItemCard } from "./ItemCard"
import React, { useState } from "react"

type menuItem = {
  menuItemId: string
  shortDescription: {
    en: string
    is: string
  }
  description: {
    en: string
    is: string
  }
}

export function DayRow({
  day,
  menu,
  setMenu,
}: {
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7
  menu: {
    1: menuItem[]
    2: menuItem[]
    3: menuItem[]
    4: menuItem[]
    5: menuItem[]
    6: menuItem[]
    7: menuItem[]
  }
  setMenu: Function
}) {
  const dayMenuItems = menu[day]

  const [isEditing, setIsEditing] = useState(false) as [boolean, Function]

  const handleMenuItemSubmit = (menuItem: menuItem, isEdit: boolean) => {
    const newMenu = { ...menu }
    if (isEdit) {
      const newMenuItems = dayMenuItems.map((item) => {
        if (item.menuItemId === menuItem.menuItemId) {
          return menuItem
        }
        return item
      })
      newMenu[day] = newMenuItems
      setMenu(newMenu)
    } else {
      newMenu[day] = [...dayMenuItems, menuItem]
      setMenu(newMenu)
    }
  }

  return (
    <div className="grid grid-cols-4 gap-4 items-center ">
      {dayMenuItems.map((menuItem) => (
        <ItemCard
          key={menuItem.menuItemId}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          menuItem={menuItem}
          handleMenuItemSubmit={handleMenuItemSubmit}
        />
      ))}
      <ItemCard
        key="new"
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        menuItem={null}
        handleMenuItemSubmit={handleMenuItemSubmit}
      />
    </div>
  )
}
