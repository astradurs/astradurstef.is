"use client"
import { useState } from "react"
import PaneContainer from "./components/PaneContainer"
export default function AdventureV2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const [playerPosition, setPlayerPosition] = useState<{
    x: number
    y: number
  }>({
    x: 0,
    y: 0,
  })

  return <div className="w-full">{children}</div>
}
