import { lastPlayedSong } from "../../lib"
import { type Song, Tracks, Track } from "../../types"

export async function GET(request: Request) {
  const response = await lastPlayedSong(request)

  // Here we handle the request from the API
  if (response.status === 204) {
    return new Response(null, {
      status: 404,
      headers: response.headers,
    })
  }

  if (response.status > 400) {
    return new Response(null, {
      status: response.status,
      headers: response.headers,
    })
  }

  const tracks: Tracks = await response.json()
  const track: Track = tracks.items[0].track

  if (track === null) {
    return new Response(null, {
      status: 404,
      headers: response.headers,
    })
  }

  const isPlaying: boolean = false
  const title: string = track?.name ?? "No song playing"
  const artist: string = (track?.artists ?? ["No artist"])
    .map((_artist: { name: string }) => _artist.name)
    .join(", ")
  const album: string = track?.album?.name ?? "No album"
  const albumUrl: string =
    track?.album?.external_urls?.spotify ?? "No album url"
  const albumImageUrl: string =
    track?.album?.images[0]?.url ?? "No album image url"
  const songUrl: string = track?.external_urls?.spotify ?? "No song url"

  if (title === "No song playing") {
    return new Response(null, {
      status: 404,
      headers: response.headers,
    })
  }

  // We return an obejct containing the information about the currently playing song
  return Response.json(
    {
      album,
      albumUrl,
      artist,
      albumImageUrl,
      isPlaying,
      songUrl,
      title,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    }
  )
}
