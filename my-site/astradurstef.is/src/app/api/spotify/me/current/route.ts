// ./nextjs-app/app/api/preview/route.ts

import { NextResponse } from "next/server"
import { currentlyPlayingSong } from "../../lib"

type Song = {
  item: {
    album: {
      images: {
        url: string
      }[]
      name: string
    }
    artists: {
      name: string
    }[]
    external_urls: {
      spotify: string
    }
    name: string
  }
  is_playing: boolean
}

export async function GET() {
  const response = await currentlyPlayingSong()

  console.log("response", response)
  // Here we handle the request from the API
  if (response.status === 204 || response.status > 400) {
    return new Response("OOPS", {
      status: response.status,
      headers: response.headers,
    })
  }

  const song: Song = await response.json()
  // console.log('song', song)

  if (song.item === null) {
    return new Response("", {
      status: 204,
      headers: response.headers,
    })
  }

  const isPlaying: boolean = song.is_playing
  const title: string = song.item.name
  const artist: string = song.item.artists
    .map((_artist: { name: string }) => _artist.name)
    .join(", ")
  const album: string = song.item.album.name
  const albumImageUrl: string = song.item.album.images[0].url
  const songUrl: string = song.item.external_urls.spotify

  // We return an obejct containing the information about the currently playing song
  return new Response(
    JSON.stringify({
      album,
      artist,
      albumImageUrl,
      isPlaying,
      songUrl,
      title,
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    }
  )
}
