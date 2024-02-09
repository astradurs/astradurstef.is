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
    waitlists: {
      restaurantid: string
      isodate: string
    }[]
  }[] = await fetch(`${process.env.HOST}/api/gdc/restaurant`, {
    method: "GET",
  }).then((res) => res.json())

  if (!restaurants) {
    return <p>No data</p>
  }

  return (
    <RestaurantsTable
      restaurants={restaurants}
      userAuthenticated={userAuthenticated}
      authUser={authUser}
    />
  )
}
