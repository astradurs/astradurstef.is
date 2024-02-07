import { getUser } from "@/app/auth"
import EventsGrid from "../components/events-grid"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRightIcon, PencilIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import { MyLink } from "@/components/link"

export default async function GDCProfile() {
  const { isAuthenticated, user: authUser } = await getUser()

  if (!isAuthenticated || !authUser) {
    return <div>Not authenticated</div>
  }

  const { email } = authUser
  const dbUserResult = await fetch(
    `${process.env.HOST}/api/gdc/user/${authUser.email}`,
    {
      method: "GET",
      cache: "no-store",
    }
  ).then((res) => res.json())

  const error = dbUserResult.error
  if (error) {
    return <div>Villa: {error}</div>
  }

  const dbUser = dbUserResult

  const { firstname, lastname } = dbUser
  const userEvents = dbUser.events

  const futureEventText =
    userEvents.futureEvents.length === 1 ? "viðburð" : "viðburði"
  const pastEventText =
    userEvents.pastEvents.length === 1 ? "viðburð" : "viðburðum"

  return (
    <div>
      <div>
        <div className="flex gap-1 items-center">
          <h1 className="text-xl font-bold">
            Hæ {firstname} {lastname}
          </h1>
          <MyLink to="profile/edit" className="hover:text-primary/60">
            <ArrowUpRightIcon className="h-6 w-6" />
          </MyLink>
        </div>
        <p>Email: {email}</p>
      </div>
      <div className="h-6" />
      <h2 className="text-lg font-bold">Viðburðir</h2>
      <Separator />
      <div className="h-4" />
      <div className="grid gap-4">
        <div className="grid gap-2">
          <p>
            Þú ert skráður á {userEvents.futureEvents.length} {futureEventText}
          </p>
          <EventsGrid events={userEvents.futureEvents} />
        </div>
        <div className="grid gap-2">
          <p>
            Þú hefur verið á {userEvents.pastEvents.length} {pastEventText}
          </p>
          <EventsGrid events={userEvents.pastEvents} />
        </div>
      </div>
      <Separator />
    </div>
  )
}
