import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table"
import { VoteButtons } from "./vote-buttons"

export async function RestaurantsTable({
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
          <TableCell>Nafn</TableCell>
          <TableCell>Heimilisfang</TableCell>
          <TableCell>Votes</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedRestaurants.map((restaurant) => (
          <TableRow key={restaurant.id}>
            <TableCell>{restaurant.name}</TableCell>
            <TableCell>{restaurant.address}</TableCell>
            <TableCell>
              {restaurant.votes.filter((v) => v.vote).length -
                restaurant.votes.filter((v) => !v.vote).length}
            </TableCell>
            <TableCell>
              {userAuthenticated && authUser && (
                <VoteButtons
                  restaurantId={restaurant.id}
                  email={authUser.email}
                  userVote={restaurant.votes.find(
                    (vote) => vote.email === authUser.email
                  )}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
