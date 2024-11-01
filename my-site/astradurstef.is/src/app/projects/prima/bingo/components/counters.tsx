"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

function Counter({
  counter,
  addCount,
  isLoading,
}: {
  counter: {
    id: string
    emoji: string
    count: number
    counterName: string
  }
  addCount: () => void
  isLoading: boolean
}) {
  return (
    <div>
      <Button variant="outline" onClick={addCount}>
        {isLoading ? "..." : `${counter.emoji} ${counter.count}`}
      </Button>
      <p className="text-xs text-center">{counter.counterName}</p>
    </div>
  )
}

export default function Counters({
  counters,
}: {
  counters: {
    id: string
    emoji: string
    count: number
    counterName: string
  }[]
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingCounter, setLoadingCounter] = useState<string | null>(null)
  const addCount = async (counter: { id: string; count: number }) => {
    setIsLoading(true)
    setLoadingCounter(counter.id)
    console.log(counter.id)
    await fetch(`/api/counters/${counter.id}`, {
      method: "POST",
      cache: "no-store",
    }).then((res) => res.json())
    setIsLoading(false)
    setLoadingCounter(null)
    router.refresh()
  }

  return (
    <div className="flex gap-2">
      {counters.map(
        (counter: {
          id: string
          emoji: string
          count: number
          counterName: string
        }) => {
          return (
            <Counter
              key={counter.id}
              counter={counter}
              addCount={() => addCount(counter)}
              isLoading={isLoading && loadingCounter === counter.id}
            />
          )
        },
      )}
    </div>
  )
}
