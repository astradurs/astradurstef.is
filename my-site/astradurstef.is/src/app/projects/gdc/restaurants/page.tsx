import { getUser } from "@/app/auth"
import { RestaurantsTable } from "./components/restaurants-table"

export default async function RestaurantsPage() {
  const { isAuthenticated: userAuthenticated, user: authUser } = await getUser()

  const restaurants: {
    id: string
    name: string
    address: string
    votes: {
      vote: boolean
      email: string
    }[]
  }[] = await fetch(`${process.env.HOST}/api/gdc/restaurant`, {
    method: "GET",
    cache: "no-store",
  }).then((res) => res.json())

  if (!restaurants) {
    return <p>No data</p>
  }

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
    <RestaurantsTable
      restaurants={sortedRestaurants}
      userAuthenticated={userAuthenticated}
      authUser={authUser}
    />
  )
}
