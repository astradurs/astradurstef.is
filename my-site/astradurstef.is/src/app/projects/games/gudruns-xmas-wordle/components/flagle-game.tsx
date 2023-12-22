import { Button } from "@/components/ui/button"
import { useState } from "react"
const answer = "PORTUGAL"
const NUM_OF_GUESSES_ALLOWED = 6

function checkGuess(
  guess: string,
  answer: string
): { guess: string; status: string } {
  return {
    guess,
    status: guess === answer ? "correct" : "incorrect",
  }
}

function FlagCell({
  placement,
  isClosed,
}: {
  placement: string
  isClosed: boolean
}) {
  // switch statement to return a cell that interperates the portugal flag
  // based on the placement prop
  if (isClosed)
    return (
      <div className="w-full h-full border border-gray-900 bg-gray-600"></div>
    )

  switch (placement) {
    case "top-left":
      return (
        <div className="w-full h-full border border-gray-900 bg-green-600"></div>
      )
    case "top-middle":
      return (
        <div className="w-full h-full flex justify-center items-center border border-gray-900">
          <div className="w-1/2 h-full bg-green-600"></div>
          <div className="w-1/2 h-full bg-red-600"></div>
        </div>
      )
    case "top-right":
      return (
        <div className="w-full h-full border border-gray-900 bg-red-600"></div>
      )
    case "bottom-left":
      return (
        <div className="w-full h-full border border-gray-900 bg-green-600"></div>
      )
    case "bottom-middle":
      return (
        <div className="w-full h-full flex justify-center items-center border border-gray-900">
          <div className="w-1/2 h-full bg-green-600"></div>
          <div className="w-1/2 h-full bg-red-600"></div>
        </div>
      )
    case "bottom-right":
      return (
        <div className="w-full h-full border border-gray-900 bg-red-600"></div>
      )
    default:
      return (
        <div className="w-full h-full border border-gray-900 bg-green-600"></div>
      )
  }
}

function GameEndBanner({
  gameWon,
  gameLost,
  totalGuesses,
  answer,
}: {
  gameWon: boolean | undefined
  gameLost: boolean
  totalGuesses: number
  answer: string
}) {
  if (gameWon) {
    return <GameWonBanner totalGuesses={totalGuesses} />
  }

  if (gameLost) {
    return <GameLostBanner answer={answer} />
  }

  return null
}

function GameLostBanner({ answer }: { answer: string }) {
  return (
    <div className="fixed left-0 right-0 bottom-0 w-full max-w-sm mx-auto p-16 text-center border rounded-md transform animate-bounce bg-destructive text-white">
      <p>
        Sorry, the answer is <strong>{answer}</strong>
      </p>
      <p>No present for you!</p>
    </div>
  )
}

function GameWonBanner({ totalGuesses }: { totalGuesses: number }) {
  return (
    <div className="fixed left-0 right-0 bottom-0 w-full max-w-sm mx-auto p-16 text-center border rounded-md transform animate-bounce bg-grass text-white">
      <p>
        <strong>Congratulations!</strong> Got it in{" "}
        <strong>{totalGuesses} guesses</strong>
      </p>
    </div>
  )
}

export default function FlagleGame({
  setFlagleFinished,
}: {
  setFlagleFinished: (finished: boolean) => void
}) {
  const [guesses, setGuesses] = useState<string[]>([])
  const [guessInput, setGuessInput] = useState("")

  const totalGuesses = guesses.length
  const guessResults = guesses.map((guess) => checkGuess(guess, answer))
  const lastGuess = guessResults[guessResults.length - 1]
  const gameWon = lastGuess?.status === "correct"
  const gameLost = !gameWon && guesses.length === NUM_OF_GUESSES_ALLOWED
  const gameEnd = gameWon || gameLost

  const handleInputChange = (event: any) => {
    event.preventDefault()
    const guess = event.target.value

    return setGuessInput(guess)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    setGuesses([...guesses, guessInput.toUpperCase()])
    setGuessInput("")
  }

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-xl text-center font-bold">FLAG PUZZLE</h1>
        <p className="text-center">
          Guess the country in {NUM_OF_GUESSES_ALLOWED} guesses or less
        </p>
      </div>
      <div className="max-w-md mx-auto flex flex-col gap-4 items-center">
        <div className="w-80 h-56 grid grid-cols-3">
          <FlagCell
            placement="top-left"
            isClosed={!gameEnd && guesses.length < 1}
          />
          <FlagCell
            placement="top-middle"
            isClosed={!gameEnd && guesses.length < 5}
          />
          <FlagCell
            placement="top-right"
            isClosed={!gameEnd && guesses.length < 3}
          />
          <FlagCell
            placement="bottom-left"
            isClosed={!gameEnd && guesses.length < 2}
          />
          <FlagCell
            placement="bottom-middle"
            isClosed={!gameEnd && guesses.length < 6}
          />
          <FlagCell
            placement="bottom-right"
            isClosed={!gameEnd && guesses.length < 4}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-3/4 mx-auto h-3 flex flex-col gap-4"
        >
          {gameEnd ? (
            <div className="">
              <Button
                className="block w-full"
                type="button"
                onClick={() => setFlagleFinished(true)}
              >
                THE PRIZE
              </Button>
            </div>
          ) : (
            <>
              <label htmlFor="guess-input" className="text-sm">
                Enter guess:
              </label>
              <input
                type="text"
                id="guess-input"
                value={guessInput}
                className="block w-full text-md border-1 border-gray-300 rounded-md py-4 px-8 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                disabled={gameWon || gameLost}
                onChange={handleInputChange}
              />
            </>
          )}
        </form>
        {gameEnd ? (
          <GameEndBanner
            gameWon={gameWon}
            gameLost={gameLost}
            totalGuesses={totalGuesses}
            answer={answer}
          />
        ) : null}
      </div>
    </>
  )
}
