"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function BingoHeader({ email }: { email: string }) {
  const router = useRouter()
  const onDeleteBingoCard = async () => {
    await fetch(`/api/user/${email}/bingo/primavera-2024`, {
      method: "DELETE",
      cache: "no-store",
    })

    router.refresh()
  }

  const onCreateNewBingoCard = async () => {
    await fetch(`/api/user/${email}/bingo/primavera-2024`, {
      method: "UPDATE",
      cache: "no-store",
    })

    router.refresh()
  }

  return (
    <div className="grid w-full gap-4">
      <div>
        <h1 className="text-2xl font-bold">Primavera bingo!</h1>
      </div>
      <div className="w-1/2 mx-auto flex items-center justify-between">
        <Button variant="destructive" onClick={onDeleteBingoCard}>
          Delete bingo card
        </Button>
        <Button variant="outline" onClick={onCreateNewBingoCard}>
          Create new bingo card
        </Button>
      </div>
    </div>
  )
}
