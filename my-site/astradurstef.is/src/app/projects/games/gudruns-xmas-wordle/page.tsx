"use client"
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

export default function GudrunsXmasWordlePage() {
  const [wordleFinished, setWordleFinished] = useState(false)
  const [flagleFinished, setFlagleFinished] = useState(false)

  return (
    <div className="h-screen flex flex-col gap-12">
      <h1 className="text-4xl font-semibold text-center">Xmas Puzzle</h1>
      {wordleFinished ? null : (
        <WordleGame setWordleFinished={setWordleFinished} />
      )}
      {(!wordleFinished && !flagleFinished) || flagleFinished ? null : (
        <FlagleGame setFlagleFinished={setFlagleFinished} />
      )}
      {wordleFinished && flagleFinished ? <ThePrize /> : null}
    </div>
  )
}
