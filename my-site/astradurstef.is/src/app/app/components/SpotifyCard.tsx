"use client"
import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardBody, Image, Link } from "@nextui-org/react"
import { RedirectType, redirect } from "next/navigation"

function CurrentlyPlayingSpotifyCard() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/spotify/me/current")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return null
  if (!data) return null

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

function RecentlyPlayedSpotifyCard() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/spotify/me/recent")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return null
  if (!data) return null

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
    <Card>
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

export function SpotifyCard() {
  return <CurrentlyPlayingSpotifyCard /> || <RecentlyPlayedSpotifyCard />
}
