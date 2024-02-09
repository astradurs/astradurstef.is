"use client"

import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table"
import { VoteButtons } from "./vote-buttons"
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MyLink } from "@/components/link"
import { ArrowUpRightIcon } from "@heroicons/react/24/solid"

export function RestaurantsTable({
  restaurants,
  userAuthenticated,
  authUser,
}: {
  restaurants: {
    id: string
    name: string
    address: string
    votes: {
      vote: boolean
      email: string
    }[]
    waitlists: {
      restaurantid: string
      isodate: string
    }[]
  }[]
  userAuthenticated: boolean
  authUser:
    | {
        email: string
      }
    | null
    | undefined
}) {
  const sortedRestaurants = restaurants.sort((a, b) => {
    const aVotes =
      a.votes.filter((vote) => vote.vote).length -
      a.votes.filter((vote) => !vote.vote).length
    const bVotes =
      b.votes.filter((vote) => vote.vote).length -
      b.votes.filter((vote) => !vote.vote).length

    return bVotes - aVotes
  })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Visits</TableCell>
          <TableCell>Votes</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedRestaurants.map((restaurant) => (
          <RestaurantRow
            key={restaurant.id}
            restaurant={restaurant}
            userAuthenticated={userAuthenticated}
            authUser={authUser}
          />
        ))}
      </TableBody>
    </Table>
  )
}

function RestaurantRow({
  restaurant,
  userAuthenticated,
  authUser,
}: {
  restaurant: {
    id: string
    name: string
    address: string
    votes: {
      vote: boolean
      email: string
    }[]
    waitlists: {
      restaurantid: string
      isodate: string
    }[]
  }
  userAuthenticated: boolean
  authUser:
    | {
        email: string
      }
    | null
    | undefined
}) {
  const [votes, setVotes] = useState(restaurant.votes)
  return (
    <TableRow key={restaurant.id}>
      <TableCell>
        <MyLink
          to={`${restaurant.id}`}
          isExternal
          className="hover:text-primary/70"
        >
          {restaurant.name}
        </MyLink>
      </TableCell>
      <TableCell>{restaurant.waitlists.length}</TableCell>
      <TableCell>
        <div className="flex items-center gap-6">
          <span>
            {votes.filter((v) => v.vote).length -
              votes.filter((v) => !v.vote).length}
          </span>

          {userAuthenticated && authUser && (
            <VoteButtons
              restaurantId={restaurant.id}
              email={authUser.email}
              setVotes={setVotes}
              votes={votes}
              userVote={restaurant.votes.find(
                (vote) => vote.email === authUser.email
              )}
            />
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}
