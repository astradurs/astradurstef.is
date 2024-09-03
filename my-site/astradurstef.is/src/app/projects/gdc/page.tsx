import { getAuthorizationUrl, getUser } from "@/app/auth"
import { Grid, Heading, Text } from "@radix-ui/themes"
import { redirect } from "next/navigation"
import EventsGrid from "./components/events-grid"

export default async function GDC() {
  const { isAuthenticated: userAuthenticated, user: authUser } = await getUser()

  if (!userAuthenticated || !authUser) {
    const authKitUrl = getAuthorizationUrl("projects/gdc")

    return redirect(authKitUrl)
  }

  const { futureEvents, pastEvents } = await fetch(
    `${process.env.HOST}/api/gdc/events`,
    {
      method: "GET",
      cache: "no-store",
    },
  ).then((res) => res.json())

  return (
    <Grid gap="4">
      <Heading as="h2" className="text-xl font-bold">
        Hæ {authUser.firstName || null}
      </Heading>
      <Text>Hér eru næstu GDC viðburðir</Text>

      <EventsGrid events={futureEvents} />

      <Text>Hér eru liðnir GDC viðburðir</Text>

      <EventsGrid events={pastEvents} />
    </Grid>
  )
}
