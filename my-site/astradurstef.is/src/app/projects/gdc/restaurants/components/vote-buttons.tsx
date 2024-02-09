"use client"
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/20/solid"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { effect } from "zod"

export function VoteButtons({
  restaurantId,
  email,
  userVote,
  setVotes,
  votes,
}: {
  restaurantId: string
  email: string
  userVote: { vote: boolean; email: string } | undefined
  setVotes: (votes: { vote: boolean; email: string }[]) => void
  votes: { vote: boolean; email: string }[]
}) {
  const [voteState, setVote] = useState<
    { vote: boolean; email: string } | undefined
  >(userVote)
  const router = useRouter()
  let hasVoted = voteState !== undefined
  let vote = voteState && hasVoted ? voteState.vote : null

  let upvote = hasVoted && vote === true
  let downvote = hasVoted && vote === false

  const submitVote = async (vote: boolean) => {
    let effectiveVote: boolean | null = vote
    if (hasVoted && vote === voteState?.vote) {
      effectiveVote = null
    }
    const oldVotes = votes.filter((v) => v.email !== email)
    const newVotes =
      effectiveVote === null
        ? oldVotes
        : [...oldVotes, { vote: effectiveVote, email }]
    setVote(effectiveVote === null ? undefined : { vote: effectiveVote, email })
    setVotes(newVotes)
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
