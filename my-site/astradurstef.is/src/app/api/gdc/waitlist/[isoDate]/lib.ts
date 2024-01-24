export const createWaitlistEntry = async ({
  isoDate,
  email,
  name,
}: {
  isoDate: string
  email: string
  name: string
}) => {
  const url = `/api/gdc/waitlist/${isoDate}`
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email,
      name,
    }),
  })
}

export const getWaitlistEntries = async ({ isoDate }: { isoDate: string }) => {
  const host = process.env.HOST
  const url = `${host}/api/gdc/waitlist/${isoDate}`
  const data = await fetch(url, {
    method: "GET",
  })

  const json = await data.json()

  return json
}
