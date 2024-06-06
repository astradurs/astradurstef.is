import { DateTime, Interval } from "luxon"

async function fetchPrimaveraLineup() {
  const { data } = await fetch(process.env.GRAPHQL_PRIMAVERA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          query Get {
            getLineupEvent(name: "primavera-sound-2024-porto") {
              artists {
                artistSlugName
                artistName
                artistReadableName {
                  en
                }
                duration
                venues {
                  duration
                  venueSlugName
                  artistSetReadableName {
                    en
                  }
                  dateTimeStartReal
                  dateTimeStartHuman
                }
              }
              venues
              showDate
              showDateTime
              showVenue
              showTicket
              timezone
            }
          }
          `,
    }),
    next: { revalidate: 10 },
  }).then((res) => res.json())

  const lineupEvent = data.getLineupEvent

  const { artists, venues: venuesString, timezone } = lineupEvent

  const venuesParsed = JSON.parse(venuesString)
  const venues = Object.keys(venuesParsed).map((key) => {
    return {
      venueName: venuesParsed[key].venueReadableName.en,
      venueKey: key,
    }
  })

  const artistsByDays = {} as Record<string, Record<string, any[]>>
  for (let artist of artists) {
    const { artistName, artistSlugName, venues } = artist
    for (let venue of venues) {
      const { venueSlugName, duration, dateTimeStartReal, dateTimeStartHuman } =
        venue as {
          venueSlugName: string
          duration: number
          dateTimeStartReal: string
          dateTimeStartHuman: string
        }
      if (!artistsByDays[dateTimeStartHuman]) {
        artistsByDays[dateTimeStartHuman] = {
          [venueSlugName]: [],
        }
      }
      if (!artistsByDays[dateTimeStartHuman][venueSlugName]) {
        artistsByDays[dateTimeStartHuman][venueSlugName] = []
      }
      artistsByDays[dateTimeStartHuman][venueSlugName].push({
        artistName,
        artistSlugName,
        duration,
        dateTimeStartReal,
        dateTimeStartHuman,
      })
    }
  }

  const artistsByVenues = {} as Record<string, any[]>
  for (let artist of artists) {
    const { artistName, artistSlugName, venues } = artist
    for (let venue of venues) {
      const { venueSlugName, duration, dateTimeStartReal, dateTimeStartHuman } =
        venue as {
          venueSlugName: string
          duration: number
          dateTimeStartReal: string
          dateTimeStartHuman: string
        }
      if (!artistsByVenues[venueSlugName]) {
        artistsByVenues[venueSlugName] = []
      }
      artistsByVenues[venueSlugName].push({
        artistName,
        artistSlugName,
        duration,
        dateTimeStartReal,
        dateTimeStartHuman,
      })
    }
  }

  const days = Object.keys(artistsByDays)

  return {
    artists,
    venues,
    timezone,
    artistsByVenues,
    artistsByDays,
    days,
  }
}

function getVenueArtists(
  venueKey: string,
  artistsByVenues: Record<string, any[]>
) {
  return artistsByVenues[venueKey].sort((a, b) => {
    return a.dateTimeStartReal.localeCompare(b.dateTimeStartReal)
  })
}

async function ArtistCell({
  artist,
  startTime,
}: {
  artist: any | null
  startTime: string | null
}) {
  if (!artist) {
    return (
      <div>
        <p>
          <span className="text-gray-300">No artist</span>
        </p>
      </div>
    )
  }

  return (
    <div>
      <p>{artist.artistName}</p>
      <p>{startTime}</p>
    </div>
  )
}

async function Cell({ dtTime, artists }: { dtTime: DateTime; artists: any[] }) {
  const dtdtTime = DateTime.fromMillis(parseInt(dtTime))
  const artistPlaying = artists.find((artist) => {
    const { dateTimeStartReal } = artist
    const dt = DateTime.fromMillis(parseInt(dateTimeStartReal))
    if (dt.equals(dtdtTime)) {
      return "start"
    }

    const artistEndPlaying = dt.plus({ minutes: artist.duration })
    const diff = dtdtTime.diff(dt).as("minutes")
    if (
      (diff >= 0 && diff < artist.duration) ||
      dtdtTime.equals(artistEndPlaying)
    ) {
      return "middle"
    }

    return null
  })

  if (!artistPlaying) {
    return null
  }

  if (artistPlaying === "start") {
    return (
      <ArtistCell
        artist={artistPlaying}
        startTime={dtdtTime.toLocaleString(DateTime.TIME_SIMPLE)}
      />
    )
  }

  if (artistPlaying === "middle") {
    return <ArtistCell artist={null} startTime={null} />
  }

  return (
    <div>
      <p>Unknown</p>
      <pre>{JSON.stringify(dtdtTime, null, 2)}</pre>
    </div>
  )
}

async function PrimaTable({
  dayDt,
  venues,
  artistsByVenues,
  timezone,
  cols,
}: {
  dayDt: any
  venues: any[]
  artistsByVenues: Record<string, any[]>
  timezone: string
  cols: number
}) {
  const dayISOString = dayDt.toISODate()
  const dayStart = DateTime.fromISO(`${dayISOString}T16:00:00.000Z`)
  const dayEnd = DateTime.fromISO(`${dayISOString}T04:00:00.000Z`).plus({
    days: 1,
  })

  const intervals = Interval.fromDateTimes(dayStart, dayEnd).splitBy({
    minutes: 5,
  })

  return (
    <div>
      <h2>{dayISOString}</h2>
      <div className={`grid grid-cols-${cols}`}>
        {intervals.map((dt: DateTime) => {
          const dtTime = dt.start
          const time = dtTime
            .setZone(timezone)
            .toLocaleString(DateTime.TIME_SIMPLE)
          const cells = venues.map((venue) => {
            const artists = getVenueArtists(venue.venueKey, artistsByVenues)
            return (
              <Cell key={venue.venueKey} dtTime={dtTime} artists={artists} />
            )
          })

          return (
            <div key={dtTime.toISO()}>
              <p>{time}</p>
              <div className="grid grid-cols-1 gap-4">{cells}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default async function PrimaSchedulePage() {
  const lineup = await fetchPrimaveraLineup()

  const { artists, venues, timezone, artistsByVenues, artistsByDays, days } =
    lineup

  const cols = venues.length

  const tables = days.map((day) => {
    const artistsByVenues = artistsByDays[day]
    const dayDt = DateTime.fromMillis(parseInt(day)).setZone(timezone)
    return (
      <PrimaTable
        key={day}
        dayDt={dayDt}
        venues={venues}
        artistsByVenues={artistsByVenues}
        timezone={timezone}
        cols={cols}
      />
    )
  })

  return <div className="flex flex-col gap-4">{tables}</div>
}
