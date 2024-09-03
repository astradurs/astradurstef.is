import { client } from "@/lib/sanity/lib/client"
import { PortableText, PortableTextComponents } from "@portabletext/react"
import { Grid, Link, Text } from "@radix-ui/themes"
import { SanityDocument } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import Image from "next/image"

const builder = imageUrlBuilder(client)

const components: PortableTextComponents = {
  block: ({ children }) => {
    return <Text>{children}</Text>
  },
  marks: {
    b: ({ children }) => <Text className="font-semibold">{children}</Text>,
  },
}

export default function EventDescription({ event }: { event: SanityDocument }) {
  const eventDate = new Date(event.date)
  const eventDateFormatted = eventDate.toLocaleDateString("is-IS", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const timeFormatted = eventDate.toLocaleTimeString("is-IS", {
    hour: "numeric",
    minute: "numeric",
  })

  const locationQuery =
    event.location.title.split(" ").join("+") +
    "+" +
    event.location.address.split(" ").join("+")
  return (
    <Grid gap="4">
      {event?.image ? (
        <Image
          className="h-[300px] rounded-lg object-cover object-center"
          priority={true}
          src={builder.image(event.image).width(800).height(700).url()}
          width={800}
          height={500}
          alt={event?.image?.alt}
        />
      ) : null}
      <Grid gap="2">
        <PortableText value={event.body} components={components} />
      </Grid>
      <Grid className="grid">
        <Text weight="bold" size="4">
          HVAR?!
        </Text>
        <Link
          href={`https://maps.google.com/?q=${locationQuery}`}
          className="grid group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text weight="medium" size="4">
            {event.location.title}
          </Text>
          <Text size="2">{event.location.address}</Text>
        </Link>
      </Grid>
      <div className="grid">
        <Text weight="bold" size="4">
          HVENÆR?!
        </Text>

        <Text size="4">
          {eventDateFormatted} kl {timeFormatted}
        </Text>
      </div>
    </Grid>
  )
}
