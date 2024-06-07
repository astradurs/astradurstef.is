import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { sanityFetch } from "@/lib/sanity/lib/fetch"
import { eventsQuery } from "@/lib/sanity/lib/queries"
import { SanityDocument } from "next-sanity"

interface GDCEvent extends SanityDocument {
  title: string
  date: string
  limit: number
  slug: {
    current: string
  }
}

export default async function EventsGrid({ events }: { events: GDCEvent[] }) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3">
      {events.map((event: GDCEvent) => (
        <Card key={event.slug.current}>
          <CardHeader>
            <span className="font-semibold group-hover:text-primary/70">
              {event.title}
            </span>
          </CardHeader>
          <CardContent className="grid">
            <span className="text-primary/70 group-hover:text-primary/40">
              Hvenær: {new Date(event.date).toISOString().slice(0, 10)}
            </span>
            <span className="text-primary/70 group-hover:text-primary/40">
              Max pax: {event.limit}
            </span>
          </CardContent>
          <CardFooter className="grid">
            <Button asChild>
              <Link href={`/projects/gdc/${event.slug.current}`}>
                Sjá nánar
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
