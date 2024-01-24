export const deleteWaitlistEntry = async ({
  isoDate,
  email,
}: {
  isoDate: string
  email: string
}) => {
  const url = `/api/gdc/waitlist/${isoDate}/${email}`
  await fetch(url, {
    method: "DELETE",
  })
}
