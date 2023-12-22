import { Button } from "@/components/ui/button"
import { useState } from "react"

const NUM_OF_GUESSES_ALLOWED = 6
const answer = "PRIMA"

const range = (start: number, end?: number, step: number = 1) => {
  let output = []
  if (typeof end === "undefined") {
    end = start
    start = 0
  }
  for (let i = start; i < end; i += step) {
    output.push(i)
  }
  return output
}

function GuessGrid({
  guesses,
  cols,
  rows,
}: {
  guesses: Array<Array<{ letter: string; status: string }> | null>
  cols: number
  rows: number
}) {
  console.log({ rows, cols })
  return (
    <div className="flex flex-col justify-center items-center">
      {range(rows).map((_, i) => {
        const guessResult = guesses[i] ?? range(cols)
        return (
          <p key={`guess_${i}`} className="flex gap-2 mb-2">
            {guessResult.map((result, j) => {
              if (typeof result === "number") {
                return (
                  <span
                    key={`letter_${j}`}
                    className="relative w-10 grid place-content-center aspect-square border border-primary rounded-md"
                  ></span>
                )
              }
              return (
                <span
                  key={`letter_${j}`}
                  className={`relative w-10 grid place-content-center aspect-square	border border-primary rounded-md ${
                    result?.status === "correct"
                      ? "bg-forest"
                      : result?.status === "misplaced"
                      ? "bg-village"
                      : result?.status === "incorrect"
                      ? "bg-destructive"
                      : ""
                  }`}
                >
                  {result?.letter ?? ""}
                </span>
              )
            })}
          </p>
        )
      })}
    </div>
  )
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
      <p>You better do well in the next one or else no present for you!</p>
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

function Keyboard({
  guessResults,
  handleInputChange,
  handleSubmit,
}: {
  guessResults: Array<Array<{ letter: string; status: string }> | null>
  handleInputChange: (char: string | null) => void
  handleSubmit: () => void
}) {
  const row1: Array<string> = "QWERTYUIOP".split("")
  const row2: Array<string> = "ASDFGHJKL".split("")
  const row3: Array<string> = "ZXCVBNM".split("")

  const KeyboardButton = ({ char }: { char: string }) => {
    const isDisabled = guessResults.some((guess) =>
      guess?.some(
        (letter) => letter.letter === char && letter.status === "incorrect"
      )
    )

    const isCorrect = guessResults.some((guess) =>
      guess?.some(
        (letter) => letter.letter === char && letter.status === "correct"
      )
    )
    const isMisplaced = guessResults.some((guess) =>
      guess?.some(
        (letter) => letter.letter === char && letter.status === "misplaced"
      )
    )
    const className =
      "w-2 h-12" + (isCorrect ? " bg-forest" : isMisplaced ? " bg-village" : "")
    const variant = isDisabled ? "ghost" : "outline"
    return (
      <Button
        className={className}
        key={`char_${char}`}
        variant={variant}
        disabled={isDisabled}
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

function checkGuess(
  guess: string,
  answer: string
): Array<{ letter: string; status: string }> | null {
  // This constant is a placeholder that indicates we've successfully
  // dealt with this character (it's correct, or misplaced).
  const SOLVED_CHAR = "✓"

  if (!guess) {
    return null
  }

  const guessChars = guess.toUpperCase().split("")
  const answerChars = answer.split("")

  const result = []

  // Step 1: Look for correct letters.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = {
        letter: guessChars[i],
        status: "correct",
      }
      answerChars[i] = SOLVED_CHAR
      guessChars[i] = SOLVED_CHAR
    }
  }

  // Step 2: look for misplaced letters. If it's not misplaced,
  // it must be incorrect.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === SOLVED_CHAR) {
      continue
    }

    let status = "incorrect"
    const misplacedIndex = answerChars.findIndex(
      (char) => char === guessChars[i]
    )
    if (misplacedIndex >= 0) {
      status = "misplaced"
      answerChars[misplacedIndex] = SOLVED_CHAR
    }

    result[i] = {
      letter: guessChars[i],
      status,
    }
  }

  return result
}

export default function WordleGame({
  setWordleFinished,
}: {
  setWordleFinished: (arg0: boolean) => void
}) {
  const [guesses, setGuesses] = useState<Array<string>>([])

  const [guessInput, setGuessInput] = useState("")
  const rows = 6
  const cols = 5
  const guessResults: Array<Array<{ letter: string; status: string }> | null> =
    guesses.map((guess) => checkGuess(guess, answer))

  const totalGuesses = guesses.length
  const lastGuess = guessResults[totalGuesses - 1]
  const gameWon = lastGuess?.every((letter) => letter.status === "correct")
  const gameLost = !gameWon && guesses.length === NUM_OF_GUESSES_ALLOWED
  const gameEnd = gameWon || gameLost

  const handleInputChange = (char: string | null) => {
    if (char === null) {
      return setGuessInput(guessInput.slice(0, -1))
    }

    if (guessInput.length > cols) {
      return setGuessInput(guessInput.slice(0, 5))
    }
    return setGuessInput(guessInput + char)
  }

  const handleSubmit = () => {
    console.log("submit")
    if (guessInput.length === 5) {
      setGuesses([...guesses, guessInput])
      setGuessInput("")
    }
  }

  return (
    <>
      <div className="h-4" />
      <div className="flex flex-col">
        <h1 className="text-xl text-center font-bold">WORDLE</h1>
        <p className="text-center">
          Guess the word in {NUM_OF_GUESSES_ALLOWED} guesses or less
        </p>
      </div>
      <div className="h-4" />
      <div className="max-w-lg">
        <GuessGrid guesses={guessResults} cols={cols} rows={rows} />
        <div className="h-3 flex flex-col gap-4">
          {gameEnd ? (
            <div className="">
              <Button
                className="block w-full"
                type="button"
                onClick={() => setWordleFinished(true)}
              >
                NEXT PUZZLE
              </Button>
            </div>
          ) : (
            <p className="flex justify-center gap-2 mb-2">
              {[0, 1, 2, 3, 4].map((i) => {
                const char = guessInput[i] ?? ""
                return (
                  <span
                    key={`char_${i}`}
                    className="relative w-10 grid place-content-center aspect-square border border-primary rounded-md bg-primary/30"
                  >
                    {char}
                  </span>
                )
              })}
            </p>
          )}
          <Keyboard
            guessResults={guessResults}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>

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
