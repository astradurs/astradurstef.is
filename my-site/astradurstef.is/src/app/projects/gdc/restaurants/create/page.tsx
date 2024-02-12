import { RestaurantForm } from "./components/restaurant-form"

export default async function CreateRestaurantPage() {
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

  return <RestaurantForm restaurants={restaurants} restaurant={null} />
}
