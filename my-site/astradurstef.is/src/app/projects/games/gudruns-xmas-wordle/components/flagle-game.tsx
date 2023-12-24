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
          <div className="w-1/4 h-full bg-green-600"></div>
          <div className="w-3/4 h-full bg-red-600"></div>
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
          <div className="w-1/4 h-full bg-green-600"></div>
          <div className="w-3/4 h-full bg-red-600"></div>
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
    <div className="w-full max-w-sm mx-auto p-16 text-center border rounded-md bg-destructive text-white">
      <p>
        Sorry, the answer is <strong>{answer}</strong>
      </p>
      <p>No present for you!</p>
    </div>
  )
}

function GameWonBanner({ totalGuesses }: { totalGuesses: number }) {
  return (
    <div className="w-full max-w-sm mx-auto p-16 text-center border rounded-md bg-grass text-white">
      <p>
        <strong>Congratulations!</strong> Got it in{" "}
        <strong>{totalGuesses} guesses</strong>
      </p>
    </div>
  )
}

function Keyboard({
  handleInputChange,
  handleSubmit,
}: {
  handleInputChange: (char: string | null) => void
  handleSubmit: () => void
}) {
  const row1: Array<string> = "QWERTYUIOP".split("")
  const row2: Array<string> = "ASDFGHJKL".split("")
  const row3: Array<string> = "ZXCVBNM".split("")

  const KeyboardButton = ({ char }: { char: string }) => {
    const className = "w-2 h-12"

    return (
      <Button
        className={className}
        key={`char_${char}`}
        variant="outline"
        onClick={() => handleInputChange(char)}
      >
        {char}
      </Button>
    )
  }

  return (
    <div>
      <div className="flex justify-center">
        {row1.map((char) => {
          return <KeyboardButton key={char} char={char} />
        })}
      </div>
      <div className="flex justify-center">
        {row2.map((char) => {
          return <KeyboardButton key={char} char={char} />
        })}
      </div>
      <div className="flex justify-center">
        <Button
          className="w-16 h-12"
          variant="outline"
          onClick={() => handleSubmit()}
        >
          ENTER
        </Button>
        {row3.map((char) => {
          return <KeyboardButton key={char} char={char} />
        })}
        <Button
          className="w-16 h-12"
          variant="outline"
          onClick={() => handleInputChange(null)}
        >
          CLEAR
        </Button>
      </div>
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

  const handleInputChange = (char: string | null) => {
    if (char === null) return setGuessInput(guessInput.slice(0, -1))
    return setGuessInput(guessInput + char)
  }

  const handleSubmit = () => {
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
        <div className="w-3/4 mx-auto h-3 flex flex-col gap-4">
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
            <p className="flex justify-center gap-1 mb-2">
              {guessInput.length > 0 ? (
                guessInput.split("").map((char, index) => {
                  return (
                    <span
                      key={`char_${char}_${index}`}
                      className="relative w-6 grid place-content-center aspect-square border border-primary rounded-md bg-primary/30"
                    >
                      {char}
                    </span>
                  )
                })
              ) : (
                <div className="h-6" />
              )}
            </p>
          )}
          {gameEnd ? (
            <GameEndBanner
              gameWon={gameWon}
              gameLost={gameLost}
              totalGuesses={totalGuesses}
              answer={answer}
            />
          ) : (
            <Keyboard
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </>
  )
}
