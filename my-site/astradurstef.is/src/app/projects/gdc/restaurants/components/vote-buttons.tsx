"use client"
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/20/solid"
import { useRouter } from "next/navigation"

export function VoteButtons({
  restaurantId,
  email,
  userVote,
}: {
  restaurantId: string
  email: string
  userVote: { vote: boolean; email: string } | undefined
}) {
  const router = useRouter()
  let hasVoted = userVote !== undefined
  let vote = userVote && hasVoted ? userVote.vote : null

  let upvote = hasVoted && vote === true
  let downvote = hasVoted && vote === false

  const submitVote = async (vote: boolean) => {
    let effectiveVote: boolean | null = vote
    if (hasVoted && vote === userVote?.vote) {
      effectiveVote = null
    }
    await fetch(`/api/gdc/restaurant/${restaurantId}`, {
      method: "POST",
      body: JSON.stringify({ email, vote: effectiveVote }),
      cache: "no-store",
    })
    router.refresh()
  }

  return (
    <div className="flex gap-1">
      <button onClick={() => submitVote(true)}>
        <ArrowUpCircleIcon
          className={`h-6 w-6 ${upvote ? "text-green-500" : ""}`}
        />
      </button>

      <button onClick={() => submitVote(false)}>
        <ArrowDownCircleIcon
          className={`h-6 w-6 ${downvote ? "text-red-500" : ""}`}
        />
      </button>
    </div>
  )
}
