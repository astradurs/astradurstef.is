"use client"
import { CreateBingoCardButton } from "./create-bingo-card-button"

export default function BingoHeader({
  email,
  bingocard,
}: {
  email: string
  bingocard: any
}) {
  return (
    <div className="grid w-full gap-4">
      <div>
        <h1 className="text-2xl font-bold">Primavera bingo!</h1>
      </div>
      {bingocard ? null : (
        <CreateBingoCardButton email={email} eventSlug="primavera-2024" />
      )}
    </div>
  )
}
