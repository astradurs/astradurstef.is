import { getUser } from "@/app/auth"
import EditProfileForm from "./components/edit-profile-form"

export default async function GDCProfileEdit() {
  const { isAuthenticated, user: authUser } = await getUser()

  if (!isAuthenticated || !authUser) {
    return <div>Not authenticated</div>
  }

  const dbUserResult = await fetch(
    `${process.env.HOST}/api/gdc/user/${authUser.email}`,
    {
      method: "GET",
      cache: "no-store",
    }
  ).then((res) => res.json())

  const error = dbUserResult.error
  if (error) {
    return <div>Villa: {error}</div>
  }

  return <EditProfileForm user={dbUserResult} />
}
