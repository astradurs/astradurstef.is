import { revalidateTag } from "next/cache"
import { RestaurantForm } from "../create/components/restaurant-form"
export default async function EditRestaurantPage({
  params,
}: {
  params: { restaurantId: string }
}) {
  const restaurantId = params.restaurantId
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

  console.log({ restaurants })

  if (!restaurants) {
    return <p>No data</p>
  }

  const restaurant = restaurants.find(
    (restaurant) => restaurant.id === restaurantId
  )

  if (!restaurant) {
    return <p>Restaurant not found</p>
  }

  return <RestaurantForm restaurants={restaurants} restaurant={restaurant} />
}
