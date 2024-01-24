"use client"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { deleteWaitlistEntry } from "@/app/api/gdc/waitlist/[isoDate]/[email]/lib"

export default function RemoveFromWaitlistButton({
  isoDate,
  email,
}: {
  isoDate: string
  email: string
}) {
  return (
    <Button
      onClick={() =>
        deleteWaitlistEntry({
          isoDate,
          email,
        })
      }
      variant="destructive"
    >
      <TrashIcon />
    </Button>
  )
}
