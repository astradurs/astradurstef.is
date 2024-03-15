import { Button } from "@/components/ui/button"
import { set } from "lodash"

export function ButtonControls({
  setPlayerPosition,
  playerPosition,
}: {
  setPlayerPosition: (position: { x: number; y: number }) => void
  playerPosition: { x: number; y: number }
}) {
  const handlePositionChange = (x: number, y: number) => {
    const newX = playerPosition.x + x
    const newY = playerPosition.y + y

    if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
      return
    }
    setPlayerPosition({ x: newX, y: newY })
  }
  return (
    <div className="grid">
      <Button
        className="mx-auto w-20"
        onClick={() => handlePositionChange(0, -1)}
      >
        Up
      </Button>
      <div className="grid grid-cols-2">
        <Button onClick={() => handlePositionChange(-1, 0)}>Left</Button>
        <Button onClick={() => handlePositionChange(1, 0)}>Right</Button>
      </div>

      <Button
        className="mx-auto w-20"
        onClick={() => handlePositionChange(0, 1)}
      >
        Down
      </Button>
    </div>
  )
}
