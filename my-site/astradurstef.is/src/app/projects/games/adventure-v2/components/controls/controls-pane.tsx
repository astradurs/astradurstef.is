import { ButtonControls } from "./button-controls"

export default function ControlsPane({
  playerPosition,
  setPlayerPosition,
}: {
  playerPosition: { x: number; y: number }
  setPlayerPosition: (position: { x: number; y: number }) => void
}) {
  return (
    <ButtonControls
      setPlayerPosition={setPlayerPosition}
      playerPosition={playerPosition}
    />
  )
}
