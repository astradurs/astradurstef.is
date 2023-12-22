"use client"
import { Button } from "@/components/ui/button"
import FlagleGame from "./components/flagle-game"

import WordleGame from "./components/wordle-game"
import { useState } from "react"

function ThePrize() {
  return (
    <div className="max-w-md mx-auto px-6 py-12 flex flex-col content-center items-center bg-grass rounded-md font-bold">
      <h1 className="text-center text-lg">YOU HAVE WON A TICKET TO</h1>
      <span className="text-3xl">PRIMAVERA</span>
      <h2>CONGRATULATIONS AND MERRY CHRISTMAS</h2>
    </div>
  )
}

function TheGame() {
  const [started, setStarted] = useState(false)
  const [wordleFinished, setWordleFinished] = useState(false)
  const [flagleFinished, setFlagleFinished] = useState(false)

  if (!started) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold text-center">Xmas Puzzle</h1>
        <div className="bg-primary/30 rounded-md px-4 py-6">
          <p>
            {" "}
            You will need to solve two puzzles to see your xmas present. If you
            do not solve the puzzles{" "}
            <span className="text-village font-bold">
              you will not get your present.
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Button className="btn" onClick={() => setStarted(true)}>
            Start
          </Button>
        </div>
      </div>
    )
  }

  if (!wordleFinished) {
    return <WordleGame setWordleFinished={setWordleFinished} />
  }

  if (!flagleFinished) {
    return <FlagleGame setFlagleFinished={setFlagleFinished} />
  }

  return <ThePrize />
}

export default function GudrunsXmasWordlePage() {
  return (
    <div className="h-screen flex flex-col">
      <TheGame />
    </div>
  )
}
