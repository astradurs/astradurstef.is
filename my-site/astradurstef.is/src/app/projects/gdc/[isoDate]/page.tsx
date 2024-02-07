import { getAuthorizationUrl, getUser } from "@/app/auth"
import { redirect } from "next/navigation"
import _ from "lodash"
import GDCWaitlist from "./components/gdc-waitlist"
import EventDescription from "./components/event-description"

export default async function GDCEvent({
  params,
}: {
  params: { isoDate: string }
}) {
  const { isAuthenticated: userAuthenticated, user: authUser } = await getUser()

  if (!userAuthenticated || !authUser) {
    const authKitUrl = getAuthorizationUrl("projects/gdc")

    return redirect(authKitUrl)
  }

  const event = await fetch(
    `${process.env.HOST}/api/gdc/events/${params.isoDate}`,
    {
      method: "GET",
      cache: "no-store",
    }
  ).then((res) => res.json())

  console.log(event.registrationStatus)

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <EventDescription event={event} />
      </div>
      <div className="grid content-start">
        <GDCWaitlist
          email={authUser.email}
          limit={event.limit}
          isoDate={params.isoDate}
          name={authUser.firstName || "no name ?!"}
          registrationStatus={event.registrationStatus}
        />
      </div>
    </div>
  )
}
