"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function CreateBingoCardButton({
  email,
  eventSlug,
}: {
  email: string
  eventSlug: string
}) {
  const router = useRouter()
  const createBingoCard = async () => {
    await fetch(`/api/user/${email}/bingo/${eventSlug}`, {
      method: "POST",
      cache: "no-store",
    }).then((res) => res.json())

    router.refresh()
  }

  return <Button onClick={createBingoCard}>Create Bingo Card</Button>
}
