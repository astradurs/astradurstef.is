import { PortableText, PortableTextComponents } from "@portabletext/react"
import Image from "next/image"
import imageUrlBuilder from "@sanity/image-url"
import { client } from "@/lib/sanity/lib/client"
import { SanityDocument } from "@sanity/client"

const builder = imageUrlBuilder(client)

const components: PortableTextComponents = {
  block: ({ children }) => {
    return <p>{children}</p>
  },
  marks: {
    b: ({ children }) => <span className="font-semibold">{children}</span>,
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
    <div className="grid gap-4">
      <h1 className="font-bold text-xl">{event.title}</h1>
      {event?.image ? (
        <Image
          className="h-[300px] rounded-lg object-cover object-center"
          src={builder.image(event.image).width(800).height(700).url()}
          width={800}
          height={500}
          alt={event?.image?.alt}
        />
      ) : null}
      <div className="grid gap-2">
        <PortableText value={event.body} components={components} />
      </div>
      <div className="grid">
        <span className="font-bold text-xl">HVAR?!</span>
        <a
          href={`https://maps.google.com/?q=${locationQuery}`}
          className="grid group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="font-semibold group-hover:text-primary/70">
            {event.location.title}
          </span>
          <span className="text-sm text-primary/70 group-hover:text-primary/40">
            {event.location.address}
          </span>
        </a>
      </div>
      <div className="grid">
        <span className="font-bold">HVENÆR?!</span>
        <div className="flex gap-1">
          <span>{eventDateFormatted}</span>
          <span>{timeFormatted}</span>
        </div>
      </div>
    </div>
  )
}
