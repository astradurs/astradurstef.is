"use client"
import React, { useState, useEffect } from "react"
import { Card, CardBody, Image, Link, Spinner } from "@nextui-org/react"

function CurrentlyPlayingSpotifyCard({
  data,
}: {
  data: {
    title: string
    album: string
    albumUrl: string
    artist: string
    albumImageUrl: string
    songUrl: string
    current: boolean
  }
}) {
  const { title, album, albumUrl, artist, albumImageUrl, songUrl } = data

  return (
    <SpotifyCardSkeleton
      {...{
        title,
        album,
        albumUrl,
        artist,
        albumImageUrl,
        songUrl,
        current: true,
      }}
    />
  )
}

function RecentlyPlayedSpotifyCard({
  data,
}: {
  data: {
    title: string
    album: string
    albumUrl: string
    artist: string
    albumImageUrl: string
    songUrl: string
    current: boolean
  }
}) {
  const { title, album, albumUrl, artist, albumImageUrl, songUrl } = data

  return (
    <SpotifyCardSkeleton
      {...{
        title,
        album,
        albumUrl,
        artist,
        albumImageUrl,
        songUrl,
        current: false,
      }}
    />
  )
}

function SpotifyCardSkeleton({
  title,
  album,
  albumUrl,
  artist,
  albumImageUrl,
  songUrl,
  current,
}: {
  title: string
  album: string
  albumUrl: string
  artist: string
  albumImageUrl: string
  songUrl: string
  current: boolean
}) {
  const displayText = current ? "Currently Playing" : "Recently Played"
  return (
    <Card
      shadow="none"
      radius="none"
      className="bg-background rounded-lg"
      disableAnimation
      disableRipple
    >
      <CardBody className="flex flex-row gap-2">
        <Image
          alt={`Album art for the album ${album} by ${artist}`}
          className="object-cover rounded-xl"
          src={albumImageUrl}
          width={60}
        />
        <div className="flex flex-col">
          <h4 className="font-bold text-sm">{displayText}</h4>
          <Link
            isExternal
            href={songUrl}
            className="text-default-400 text-md uppercase font-bold underline hover:text-primary"
          >
            {title}
          </Link>
          <span className="text-xs">{`Album: ${album}`}</span>
        </div>
      </CardBody>
    </Card>
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

export function NotFound() {
  return (
    <Card shadow="none" radius="none" className="bg-background rounded-lg">
      <CardBody>
        <div className="h-2" />
        <h4 className="text-center">Could not find spotify data</h4>
        <div className="h-1" />
      </CardBody>
    </Card>
  )
}

export function SpotifyCard() {
  const [recentlyPlayedData, setRecentlyPlayedData] = useState(null)
  const [recentlyPlayedIsLoading, setRecentlyPlayedLoading] = useState(true)

  useEffect(() => {
    fetch("/api/spotify/me/recent", { next: { revalidate: 10 } })
      .then((res) => res.json())
      .then((data) => {
        setRecentlyPlayedData(data)
        setRecentlyPlayedLoading(false)
      })
  }, [])

  const [currentLyPlayingData, setCurrentlyPlayingData] = useState(null)
  const [currentLyPlayingDataIsLoading, setCurrentLyPlayingLoading] =
    useState(true)

  useEffect(() => {
    fetch("/api/spotify/me/current", { next: { revalidate: 10 } })
      .then((res) => {
        return res.status === 404 ? null : res.json()
      })
      .then((data) => {
        setCurrentlyPlayingData(data)
        setCurrentLyPlayingLoading(false)
      })
  }, [])

  if (currentLyPlayingDataIsLoading && recentlyPlayedIsLoading) {
    return <Loading />
  }

  if (!currentLyPlayingDataIsLoading && currentLyPlayingData !== null) {
    return <CurrentlyPlayingSpotifyCard data={currentLyPlayingData} />
  }

  if (!recentlyPlayedIsLoading && recentlyPlayedData !== null) {
    return <RecentlyPlayedSpotifyCard data={recentlyPlayedData} />
  }

  return <NotFound />
}
