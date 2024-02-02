import { getUser } from "@/app/auth"
import EventsGrid from "../components/events-grid"

export default async function GDCProfile() {
  const { isAuthenticated, user: authUser } = await getUser()

  if (!isAuthenticated || !authUser) {
    return <div>Not authenticated</div>
  }

  const { firstName, lastName, email } = authUser
  const userEvents = await fetch(
    `${process.env.HOST}/api/gdc/user/${authUser.email}/events`,
    {
      method: "GET",
      cache: "no-store",
    }
  ).then((res) => res.json())

  return (
    <div>
      <h1 className="text-xl font-bold">
        Hæ {firstName} {lastName}
      </h1>
      <p>Email: {email}</p>
      <EventsGrid events={userEvents.futureEvents} />
      <EventsGrid events={userEvents.pastEvents} />
    </div>
  )
}
