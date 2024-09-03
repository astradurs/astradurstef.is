"use client"
import { Flex } from "@radix-ui/themes"
import Image from "next/image"

export default function HomePostBodyImage({
  src,
  alt,
  height,
  width,
}: {
  src: string
  alt: string
  height: number
  width: number
}) {
  return (
    <Flex justify="center">
      <Image src={src} width={width} height={height} alt={alt} />
    </Flex>
  )
}
