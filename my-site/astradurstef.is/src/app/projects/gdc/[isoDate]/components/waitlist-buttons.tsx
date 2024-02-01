"use client"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"

export function CreateNewWaitListEntryButton({
  isoDate,
  email,
  name,
  isRegistered,
}: {
  isoDate: string
  email: string
  name: string
  isRegistered: boolean
}) {
  const router = useRouter()

  const create = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await fetch(`/api/gdc/waitlist/${isoDate}`, {
      method: "POST",
      body: JSON.stringify({ email, name }),
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
