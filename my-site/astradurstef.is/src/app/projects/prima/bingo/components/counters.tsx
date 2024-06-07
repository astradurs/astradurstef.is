"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Counters({ counters }) {
    const router = useRouter()
   


  return (
    <div className="flex gap-2">
      {counters.map((counter) => {
         const addCount = async () => {
            console.log(counter.id)
            await fetch(`/api/counters/${counter.id}`, {
                method: "POST",
                cache: "no-store",
            }).then((res) => res.json())
            router.refresh()
        }
        return (
          <Button onClick={addCount} key={counter.id}>
            <div>
              {counter.emoji}: {counter.count}
            </div>
          </Button>
        )
      })}
    </div>
  )
}