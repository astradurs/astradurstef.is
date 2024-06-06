import { redirect } from "next/navigation"
import { getAuthorizationUrl, getUser } from "@/app/auth"
import { CreateBingoCardButton } from "./components/create-bingo-card-button"

export default async function PrimaBingoPage() {
  const { isAuthenticated: userAuthenticated, user: authUser } = await getUser()

  if (!userAuthenticated || !authUser) {
    const authKitUrl = getAuthorizationUrl("projects/prima/bingo")

    return redirect(authKitUrl)
  }

  const user = await fetch(`${process.env.HOST}/api/user/${authUser.email}`, {
    method: "GET",
    cache: "no-store",
  }).then((res) => res.json())

  const bingocards = user.bingocards.find((bingocard: any) => {
    return bingocard.eventslug === "primavera-2024"
  })

  if (!bingocards) {
    return (
      <div>
        <div>No bingo cards found</div>
        <CreateBingoCardButton
          email={authUser.email}
          eventSlug="primavera-2024"
        />
      </div>
    )
  }

  return (
    <div className="max-w-lg grid grid-cols-5">
      {JSON.stringify(bingocards)}
    </div>
  )
}
