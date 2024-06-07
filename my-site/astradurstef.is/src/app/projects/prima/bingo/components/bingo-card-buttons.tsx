"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function UpdateBingoCardButton({ email }: { email: string }) {
  const router = useRouter()

  const onCreateNewBingoCard = async () => {
    await fetch(`/api/user/${email}/bingo/primavera-2024`, {
      method: "PUT",
      cache: "no-store",
    })

    router.refresh()
  }

  return (
    <Button variant="outline" onClick={onCreateNewBingoCard}>
      Update Bingo Card
    </Button>
  )
}

export function DeleteBingoCardButton({ email }: { email: string }) {
  const router = useRouter()

  const onDeleteBingoCard = async () => {
    await fetch(`/api/user/${email}/bingo/primavera-2024`, {
      method: "DELETE",
      cache: "no-store",
    })

    router.refresh()
  }

  return (
    <Button variant="destructive" onClick={onDeleteBingoCard}>
      Delete Bingo Card
    </Button>
  )
}
