"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Counters({ counters }: {
    counters: {
        id: string
        emoji: string
        count: number
    }[]
}) {
    const router = useRouter()
    const addCount = async (counter: { id: string, count: number}) => {
      console.log(counter.id)
      await fetch(`/api/counters/${counter.id}`, {
          method: "POST",
          cache: "no-store",
      }).then((res) => res.json())
      router.refresh()
  }


  return (
    <div className="flex gap-2">
      {counters.map((counter: {
        id: string
        emoji: string
        count: number

      }) => {
        return (
          <Button onClick={() => addCount(counter)} key={counter.id}>
            <div>
              {counter.emoji}: {counter.count}
            </div>
          </Button>
        )
      })}
    </div>
  )
}