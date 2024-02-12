"use client"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"

export function CreateNewWaitListEntryButton({
  isoDate,
  email,
  isRegistered,
  registrationStatus,
  registrationStart,
}: {
  isoDate: string
  email: string
  isRegistered: boolean
  registrationStatus: string
  registrationStart: string
}) {
  const router = useRouter()

  const create = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await fetch(`/api/gdc/waitlist/${isoDate}`, {
      method: "POST",
      body: JSON.stringify({ email }),
    })

    router.refresh()
  }

  if (isRegistered) {
    return (
      <Button disabled className="w-full" variant="outline">
        Þú ert skráður
      </Button>
    )
  }

  if (registrationStatus === "CLOSED") {
    const regStartDate = new Date(registrationStart)
    const month = regStartDate.getMonth() + 1
    const day = regStartDate.getDate()
    const hour = regStartDate.getHours()
    const minute = regStartDate.getMinutes()

    const monthString = month < 10 ? `0${month}` : month
    const dayString = day < 10 ? `0${day}` : day
    const hourString = hour < 10 ? `0${hour}` : hour
    const minuteString = minute < 10 ? `0${minute}` : minute

    const dateString = `${monthString}/${dayString} kl ${hourString}:${minuteString}`
    return (
      <Button disabled className="w-full" variant="outline">
        Skráning opnar {dateString}
      </Button>
    )
  }

  return (
    <Button type="button" onClick={create} className="w-full">
      Skrá mig
    </Button>
  )
}

export function RemoveFromWaitlistButton({
  isoDate,
  email,
}: {
  isoDate: string
  email: string
}) {
  const router = useRouter()

  const remove = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await fetch(`/api/gdc/waitlist/${isoDate}/${email}`, {
      method: "DELETE",
    })

    router.refresh()
  }

  return (
    <Button
      type="button"
      onClick={remove}
      variant="destructive"
      className="px-2"
    >
      <TrashIcon className="h-6 w-6 text-default" />
    </Button>
  )
}
