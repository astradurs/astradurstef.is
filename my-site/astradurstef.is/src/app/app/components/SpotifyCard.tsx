"use client"
import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react"

export function SpotifyCard() {
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

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  const { title, album, artist, albumImageUrl } = data

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{title}</p>
        <small className="text-default-500">{album}</small>
        <h4 className="font-bold text-large">{artist}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={albumImageUrl}
          width={270}
        />
      </CardBody>
    </Card>
  )
}
