import { Flex, Link, Spinner, Text } from "@radix-ui/themes"
import Image from "next/image"
import useSWR from "swr"

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
    <Flex align="end" justify="end" direction="row" gap="2">
      <Flex
        direction="column"
        gap="1"
        align="end"
        display={{ initial: "none", sm: "flex" }}
      >
        <Text weight="bold">{artist.toUpperCase()}</Text>
        <Link href={songUrl} weight="bold">
          {title.toUpperCase()}
        </Link>
      </Flex>
      <Image
        alt={`Album art for the album ${album} by ${artist}`}
        priority={false}
        className="object-cover rounded-xl"
        src={albumImageUrl}
        width={60}
        height={60}
      />
    </Flex>
  )
}

function SpotifyCardLoading() {
  return <Spinner />
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
