import { redirect } from "next/navigation"
import { getAuthorizationUrl, getUser } from "@/app/auth"
import BingoCard from "./components/bingo-card"
import BingoHeader from "./components/bingo-header"
import {
  UpdateBingoCardButton,
  DeleteBingoCardButton,
} from "./components/bingo-card-buttons"

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

  const { fields, solves } = bingocard ?? { fields: [], solves: [] }

  return (
    <div className="flex w-full flex-1 flex-col gap-4 items-center justify-center text-center">
      <BingoHeader email={authUser.email} bingocard={bingocard ?? null} />
      {bingocard ? (
        <BingoCard
          fields={fields}
          solves={solves}
          email={authUser.email}
          eventSlug="primavera-2024"
        />
      ) : null}
      <div className="grid w-full gap-2">
        {bingocard ? <UpdateBingoCardButton email={authUser.email} /> : null}
        {bingocard ? <DeleteBingoCardButton email={authUser.email} /> : null}
      </div>
    </div>
  )
}
