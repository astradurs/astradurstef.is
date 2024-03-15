"use client"
import { useState } from "react"
import PaneContainer from "./components/PaneContainer"
import ContentPane from "./components/content/content-pane"
import ControlsPane from "./components/controls/controls-pane"
import PlayerPane from "./components/player/player-pane"

export default function AdventureV2Page() {
  const [playerPosition, setPlayerPosition] = useState<{
    x: number
    y: number
  }>({
    x: 0,
    y: 0,
  })

  return (
    <div className="sm:grid grid-cols-6">
      <div className="col-span-2">
        <PaneContainer>
          <PlayerPane />
        </PaneContainer>
      </div>
      <div className="col-span-3">
        <PaneContainer>
          <ContentPane playerPosition={playerPosition} />
        </PaneContainer>
      </div>
      <div className="col-span-1">
        <PaneContainer>
          <ControlsPane
            setPlayerPosition={setPlayerPosition}
            playerPosition={playerPosition}
          />
        </PaneContainer>
      </div>
    </div>
  )
}
