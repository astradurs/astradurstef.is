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
      {userEvents.futureEvents.length === 0 &&
        userEvents.pastEvents.length === 0 && (
          <div>
            <p>Þú hefur ekki skráð þig á neina viðburði.</p>
            <div className="h-4" />
            <Button asChild>
              <MyLink to="/projects/gdc">Skoða viðburði</MyLink>
            </Button>
          </div>
        )}
      {userEvents.futureEvents.length > 0 && (
        <div>
          <h2 className="text-lg font-bold">Næstu viðburðir</h2>
          <Separator />
          <div className="h-4" />
          <div className="grid gap-2">
            <EventsGrid events={userEvents.futureEvents} />
          </div>
        </div>
      )}
      {userEvents.pastEvents.length > 0 && (
        <div>
          <h2 className="text-lg font-bold">Liðnir viðburðir</h2>
          <Separator />
          <div className="h-4" />
          <div className="grid gap-2">
            <EventsGrid events={userEvents.pastEvents} />
          </div>
        </div>
      )}
    </div>
  )
}
