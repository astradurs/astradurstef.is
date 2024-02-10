import { getUser } from "@/app/auth"
import { RestaurantsTable } from "./components/restaurants-table"
import { RestaurantForm } from "./create/components/restaurant-form"
import { Button } from "@/components/ui/button"
import { MyLink } from "@/components/link"

export default async function RestaurantsPage() {
  const { isAuthenticated: userAuthenticated, user: authUser } = await getUser()

  const restaurants: {
    id: string
    name: string
    address: string
    city: string
    zip: string
    websiteurl: string
    googlemapsurl: string
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
    next: {
      tags: ["get-restaurants"],
    },
  }).then((res) => res.json())

  if (!restaurants) {
    return <p>No data</p>
  }

  return (
    <div className="grid gap-4">
      <div className="flex">
        <Button asChild>
          <MyLink to="/projects/gdc/restaurants/create">
            Create Restaurant
          </MyLink>
        </Button>
      </div>
      <RestaurantsTable
        restaurants={restaurants}
        userAuthenticated={userAuthenticated}
        authUser={authUser}
      />
    </div>
  )
}
