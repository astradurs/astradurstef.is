import { getAuthorizationUrl, getUser } from "@/app/auth"
import PrimaBingoFieldForm from "@/app/projects/prima/components/bing-field-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function PrimaPage() {
  const { isAuthenticated: userAuthenticated, user: authUser } = await getUser()

  if (!userAuthenticated || !authUser) {
    const authKitUrl = getAuthorizationUrl("projects/prima")

    return redirect(authKitUrl)
  }

  const bingoEvent = await fetch(
    `${process.env.HOST}/api/bingo/primavera-2024`,
    {
      method: "GET",
      cache: "no-store",
    },
  ).then((res) => res.json())

  const bingoFields = bingoEvent.fields
  return (
    <div className="grid gap-4">
      <PrimaHeader email={authUser.email} userName={authUser.firstName} />
      <PrimaBingoFieldForm email={authUser.email} />

      <div className="grid gap-2">
        <h2 className="text-xl font-bold">Fields</h2>
        <div className="grid gap-2">
          {bingoFields.map((field: any) => {
            return (
              <div key={field.id} className="">
                <div className="text-lg font-bold">{field.fieldvalue}</div>
                <div className="text-sm">submitted by: {field.email}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

async function PrimaHeader({
  email,
  userName,
}: {
  email: string
  userName: string | null
}) {
  const welcomeString = userName ? `Welcome, ${userName}` : "Welcome"
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Prima</h1>
        <div className="text-sm">{welcomeString}</div>
      </div>
      <div>
        <Button asChild>
          <Link href={`/projects/prima/bingo`}>Go to Bingo</Link>
        </Button>
      </div>
    </div>
  )
}
