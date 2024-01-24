"use client"
import { Button } from "@/components/ui/button"
import { createWaitlistEntry } from "@/app/api/gdc/waitlist/[isoDate]/lib"

export default function CreateNewWaitListEntryButton({
  isoDate,
  email,
  name,
}: {
  isoDate: string
  email: string
  name: string
}) {
  return (
    <Button
      onClick={() =>
        createWaitlistEntry({
          isoDate,
          email,
          name,
        })
      }
    >
      Skrá mig
    </Button>
  )
}
