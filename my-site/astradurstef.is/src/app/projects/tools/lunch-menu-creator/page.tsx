"use client"
import { Separator } from "@/components/ui/separator"
import { ItemCard } from "./components/ItemCard"
import React, { useState } from "react"
import { DayRow } from "./components/DayRow"

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

export default function LunchMenuCreatorPage() {
  const [menu, setMenu] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
  })

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Lunch Menu Creator</h1>
      <Separator />
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5, 6, 7].map((dayNumber) => (
          <>
            <DayRow
              key={dayNumber}
              day={dayNumber as 1 | 2 | 3 | 4 | 5 | 6 | 7}
              menu={menu}
              setMenu={setMenu}
            />
            <Separator />
          </>
        ))}
      </div>
    </div>
  )
}
