import { Flex, Grid, Table, Text } from "@radix-ui/themes"
import _ from "lodash"
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
  registrationStart,
}: {
  email: string
  isoDate: string
  limit: number
  name: string
  registrationStatus: string
  registrationStart: string
}) {
  const data = await fetch(`${host}/api/gdc/waitlist/${isoDate}`, {
    method: "GET",
    cache: "no-store",
  }).then((res) => res.json())

  console.log(data)

  if (!data) {
    return <Text>No data</Text>
  }

  const sortedByDate = _.sortBy(data, (row) => row.createtime)

  const isRegistered = sortedByDate.some(
    (row: {
      user: {
        firstname: string
        lastname: string
      }
      email: string
      isodate: string
    }) => row.email === email,
  )

  return (
    <Grid className="grid content-start">
      <CreateNewWaitListEntryButton
        isoDate={isoDate}
        email={email}
        isRegistered={isRegistered}
        registrationStatus={registrationStatus}
        registrationStart={registrationStart}
      />
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Nafn</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Sæti</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedByDate.map(
            (
              row: {
                user: { firstname: string; lastname: string }
                email: string
                isodate: string
              },
              index,
            ) => {
              return (
                <Table.Row key={row.isodate + "#" + row.email}>
                  <Table.Cell>
                    <Flex align="center">
                      {row.user.firstname} {row.user.lastname}
                    </Flex>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex align="center" justify="between">
                      <Text>{index + 1}</Text>
                      {row.email === email && (
                        <RemoveFromWaitlistButton
                          email={email}
                          isoDate={isoDate}
                        />
                      )}
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              )
            },
          )}
        </Table.Body>
      </Table.Root>
    </Grid>
  )
}
