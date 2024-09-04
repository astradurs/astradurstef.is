import { getAuthorizationUrl, getUser } from "@/app/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"
import BingoCard from "./components/bingo-card"
import {
  DeleteBingoCardButton,
  UpdateBingoCardButton,
} from "./components/bingo-card-buttons"
import BingoHeader from "./components/bingo-header"
import Counters from "./components/counters"

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

  const counters = await fetch(`${process.env.HOST}/api/counters`, {
    method: "GET",
    cache: "no-store",
  }).then((res) => res.json())

  const { fields, solves } = bingocard ?? { fields: [], solves: [] }

  return (
    <div className="flex w-full flex-1 flex-col gap-4 items-center justify-center text-center">
      <BingoHeader email={authUser.email} bingocard={bingocard ?? null} />
      <Counters
        counters={counters.sort((a: any, b: any) => a.id.localeCompare(b.id))}
      />
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
        <Button asChild>
          <Link href="/projects/prima">Back</Link>
        </Button>
      </div>
    </div>
  )
}
