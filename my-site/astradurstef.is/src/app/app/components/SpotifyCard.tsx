"use client"
import React from "react"
import {
  Card,
  CardBody,
  Tooltip,
  Image,
  Link,
  Spinner,
} from "@nextui-org/react"
import useSWR from "swr"

function SpotifyCardSkeleton({
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
            isExternal
            href={songUrl}
            className="text-default-400 text-md font-bold underline hover:text-primary"
          >
            {title}
          </Link>
        </div>
        <Tooltip color="primary" content={album}>
          <Image
            alt={`Album art for the album ${album} by ${artist}`}
            className="object-cover rounded-xl"
            src={albumImageUrl}
            width={60}
          />
        </Tooltip>
      </div>
    </div>
  )
}

export function Loading() {
  return (
    <Card shadow="none" radius="none" className="bg-background rounded-lg">
      <CardBody>
        <div className="h-2" />
        <Spinner className="p-2" />
        <div className="h-1" />
      </CardBody>
    </Card>
  )
}

export function SpotifyCard() {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json())

  // const {
  //   data: currentLyPlayingData,
  //   isLoading: currentLyPlayingDataIsLoading,
  // } = useSWR("/api/spotify/me/current", fetcher, {
  //   refreshInterval: 10000,
  // })
  //
  // if (currentLyPlayingDataIsLoading) {
  //   return <Loading />
  // }
  //
  // if (!currentLyPlayingDataIsLoading && currentLyPlayingData?.data) {
  //   return <CurrentlyPlayingSpotifyCard data={currentLyPlayingData.data} />
  // }

  const { data: recentlyPlayedData, isLoading: recentlyPlayedDataIsLoading } =
    useSWR("/api/spotify/me/recent", fetcher, {
      refreshInterval: 10000,
    })

  if (recentlyPlayedDataIsLoading) {
    return <Loading />
  }

  if (!recentlyPlayedDataIsLoading && recentlyPlayedData?.data) {
    return (
      <SpotifyCardSkeleton
        {...(recentlyPlayedData.data as any)}
        current={false}
      />
    )
  }

  return null
}
