import { redirect } from "next/navigation"
import { getAuthorizationUrl, getUser } from "@/app/auth"
import PrimaBingoFieldForm from "@/app/projects/prima/components/bing-field-form"

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
    }
  ).then((res) => res.json())

  const bingoFields = bingoEvent.fields
  return (
    <div className="grid gap-4">
      <PrimaBingoFieldForm />

      <div className="grid gap-2">
        <h2 className="text-xl font-bold">Fields</h2>
        <div className="grid gap-2">
          {bingoFields.map((field: any) => {
            return (
              <div key={field.id} className="">
                {field.fieldvalue}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
