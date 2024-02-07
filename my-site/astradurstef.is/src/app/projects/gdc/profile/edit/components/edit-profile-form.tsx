"use client"
import { MyLink } from "@/components/link"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

export default function EditProfileForm({
  user,
}: {
  user: {
    firstname: string | null
    lastname: string | null
    email: string
  }
}) {
  const router = useRouter()
  const formSchema = z.object({
    firstname: z.string().max(255),
    lastname: z.string().max(255),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: user.firstname ?? "",
      lastname: user.lastname ?? "",
    },
    mode: "onChange",
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await fetch(`/api/gdc/user/${user.email}`, {
      method: "POST",
      body: JSON.stringify(values),
    })

    router.refresh()
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-md w-full border border-secondary rounded-md px-2.5 py-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form {...form}>
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fornafn</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eftirnafn</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-4" />
            <div className="flex justify-between">
              <Button asChild variant="outline">
                <MyLink to="./">Til baka</MyLink>
              </Button>
              <Button type="submit">Uppfæra</Button>
            </div>
          </Form>
        </form>
      </div>
    </div>
  )
}
