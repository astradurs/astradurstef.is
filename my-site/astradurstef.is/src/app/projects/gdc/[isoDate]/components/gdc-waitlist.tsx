import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import _ from "lodash"
import useSWR from "swr"
import {
  CreateNewWaitListEntryButton,
  RemoveFromWaitlistButton,
} from "./waitlist-buttons"

const host = process.env.HOST

export default async function GDCWaitlist({
  email,
  isoDate,
  limit,
  name,
  registrationStatus,
}: {
  email: string
  isoDate: string
  limit: number
  name: string
  registrationStatus: string
}) {
  const data = await fetch(`${host}/api/gdc/waitlist/${isoDate}`, {
    method: "GET",
    cache: "no-store",
  }).then((res) => res.json())

  console.log(data)

  if (!data) {
    return <p>No data</p>
  }

  const sortedByDate = _.sortBy(data, (row) => row.createtime)

  const isRegistered = sortedByDate.some(
    (row: { name: string; email: string; isodate: string }) =>
      row.email === email
  )

  return (
    <div className="grid content-start">
      <CreateNewWaitListEntryButton
        isoDate={isoDate}
        email={email}
        name={name}
        isRegistered={isRegistered}
        registrationStatus={registrationStatus}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Nafn</TableCell>
            <TableCell>Sæti</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedByDate.map(
            (
              row: {
                name: string
                email: string
                isodate: string
              },
              index
            ) => {
              const isFull = index + 1 > limit
              const rowClassName = isFull
                ? "text-md bg-amber-700/20 hover:bg-amber-700/30"
                : "text-md"
              return (
                <TableRow
                  key={row.isodate + "#" + row.email}
                  className={rowClassName}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell className="flex justify-between items-center">
                    {index + 1}
                    {row.email === email && (
                      <RemoveFromWaitlistButton
                        email={email}
                        isoDate={isoDate}
                      />
                    )}
                  </TableCell>
                </TableRow>
              )
            }
          )}
        </TableBody>
      </Table>
    </div>
  )
}
