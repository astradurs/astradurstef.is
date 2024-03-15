"use client"
import { useEffect, useState } from "react"
import { Grid } from "./grid"

export default function ContentPane({
  playerPosition,
}: {
  playerPosition: { x: number; y: number }
}) {
  const [grid, setGrid] = useState<
    {
      impassable: boolean
      bg: string
      value: number
    }[]
  >([])
  useEffect(() => {
    const variations: {
      [key: number]: { bg: string; value: number; impassable: boolean }
    } = {
      0: { impassable: true, value: 0, bg: "bg-amber-500" },
      1: { impassable: false, value: 1, bg: "bg-indigo-500" },
      2: { impassable: true, value: 1, bg: "bg-fuchsia-500" },
      3: { impassable: false, value: 1, bg: "bg-cyan-500" },
      4: { impassable: false, value: 1, bg: "bg-emerald-500" },
      5: { impassable: false, value: 1, bg: "bg-stone-500" },
    }
    const gridSize = 8 * 8
    const newArr = new Array(gridSize)
      .fill(0)
      .map(
        (_, i) => variations[crypto.getRandomValues(new Uint32Array(1))[0] % 6]
      )
    setGrid(newArr)
  }, [])

  return <Grid playerPosition={playerPosition} grid={grid} />
}
