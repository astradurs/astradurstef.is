import { redirect } from "next/navigation"
import { getAuthorizationUrl, getUser } from "@/app/auth"
import { CreateBingoCardButton } from "./components/create-bingo-card-button"
import BingoCard from "./components/bingo-card"

async function Tile({
  children,
  isSet,
}: {
  children: React.ReactNode
  isSet: boolean
}) {
  const tileStyle = isSet
    ? "flex justify-center items-center p-2.5 font-semibold border-2 border-gray-500 border-dashed bg-green-500"
    : "flex justify-center items-center p-2.5 font-semibold border-2 border-gray-500 border-dashed"

  return <div className={tileStyle}>{children}</div>
}

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

  const bingocard = user.bingocards.find((bingocard: any) => {
    return bingocard.eventslug === "primavera-2024"
  })

  if (!bingocard) {
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

  const { fields, solves } = bingocard

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <BingoCard
        fields={fields}
        solves={solves}
        email={authUser.email}
        eventSlug="primavera-2024"
      />
    </div>
  )
}
