import React from "react"
import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"
import { Skeleton } from "@/components/ui/skeleton"

function SpotifyCardLoaded({
  title,
  album,
  artist,
  albumImageUrl,
  songUrl,
  current,
}: {
  title: string
  album: string
  artist: string
  albumImageUrl: string
  songUrl: string
  current: boolean
}) {
  return (
    <div className="p-5">
      <div className="flex flex-col items-end sm:justify-end sm:flex-row gap-2">
        <div className="hidden sm:flex sm:flex-col sm:uppercase sm:items-end">
          <h4 className="font-bold text-sm">{artist}</h4>
          <Link
            href={songUrl}
            className="text-default-400 text-md font-bold underline hover:text-primary"
          >
            {title}
          </Link>
        </div>
        <Image
          alt={`Album art for the album ${album} by ${artist}`}
          className="object-cover rounded-xl"
          src={albumImageUrl}
          width={60}
          height={60}
        />
      </div>
    </div>
  )
}

function SpotifyCardLoading() {
  return (
    <div className="p-5">
      <div className="flex flex-col items-end sm:justify-end sm:flex-row gap-2">
        <div className="hidden sm:flex sm:flex-col gap-2 sm:uppercase sm:items-end">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-40 h-6" />
        </div>
        <Skeleton className="w-16 h-16 rounded-xl" />
      </div>
    </div>
  )
}

export function SpotifyCard() {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json())

  const { data: recentlyPlayedData, isLoading: recentlyPlayedDataIsLoading } =
    useSWR("/api/spotify/me/recent", fetcher, {
      refreshInterval: 10000,
    })

  if (recentlyPlayedDataIsLoading) {
    return <SpotifyCardLoading />
  }

  if (!recentlyPlayedDataIsLoading && recentlyPlayedData?.data) {
    return (
      <SpotifyCardLoaded
        {...(recentlyPlayedData.data as any)}
        current={false}
      />
    )
  }

  return null
}
