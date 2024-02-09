import { RestaurantForm } from "./components/restaurant-form"

export default async function CreateRestaurantPage() {
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

  return <RestaurantForm restaurants={restaurants} />
}
