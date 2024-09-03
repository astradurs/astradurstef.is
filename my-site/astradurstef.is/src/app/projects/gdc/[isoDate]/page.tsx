import { getAuthorizationUrl, getUser } from "@/app/auth"
import { Grid, Heading } from "@radix-ui/themes"
import { redirect } from "next/navigation"
import EventDescription from "./components/event-description"
import GDCWaitlist from "./components/gdc-waitlist"

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
    },
  ).then((res) => res.json())

  return (
    <Grid gap="4">
      <Heading as="h2">{event.title}</Heading>
      <EventDescription event={event} />
      <GDCWaitlist
        email={authUser.email}
        limit={event.limit}
        isoDate={params.isoDate}
        name={authUser.firstName || "no name ?!"}
        registrationStatus={event.registrationStatus}
        registrationStart={event.registration_start}
      />
    </Grid>
  )
}
