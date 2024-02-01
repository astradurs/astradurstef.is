import { PortableText, PortableTextComponents } from "@portabletext/react"

const components: PortableTextComponents = {
  block: ({ children }) => {
    return <p>{children}</p>
  },
  marks: {
    b: ({ children }) => <span className="font-semibold">{children}</span>,
  },
}

export default async function EventDescription({
  event,
}: {
  event: {
    title: string
    body: any
    date: string
    location: {
      title: string
      address: string
    }
    limit: number
  }
}) {
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
    <div className="grid gap-4 sm:px-4">
      <h1 className="font-bold text-xl">{event.title}</h1>
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
