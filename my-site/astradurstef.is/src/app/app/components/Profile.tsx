"use client"
import Image from "next/image"

export default function Profile() {
  return (
    <>
      <Image
        alt="A picture of me, Ástráður. In case they are not enough.."
        src="https://avatars.githubusercontent.com/u/50924263?v=4"
        className="object-cover rounded-full"
        width={120}
        height={120}
      />
    </>
  )
}
