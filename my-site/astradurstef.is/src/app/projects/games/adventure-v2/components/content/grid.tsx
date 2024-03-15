"use client"

import { useEffect, useState } from "react"

export function Grid({
  playerPosition,
  grid,
}: {
  playerPosition: {
    x: number
    y: number
  }
  grid: {
    impassable: boolean
    bg: string
    value: number
  }[]
}) {
  return (
    <div className={`grid grid-cols-8 grid-rows-8 gap-1`}>
      {grid.map((val, i) => {
        const player =
          playerPosition.x === i % 8 &&
          playerPosition.y === Math.floor(i / 8) ? (
            <span className="absolute w-6 h-6 rounded-lg bg-red-600"></span>
          ) : null
        return (
          <div
            key={i}
            className={`relative flex w-10 h-10 rounded-md items-center justify-center ${val.bg}`}
          >
            {player}
          </div>
        )
      })}
    </div>
  )
}
