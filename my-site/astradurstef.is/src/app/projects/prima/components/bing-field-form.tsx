"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const bingoFieldFormSchema = z.object({
  fieldvalue: z.string().min(2, {
    message: "Value must be at least 2 characters.",
  }),
})

export default function PrimaBingoFieldForm({ email }: { email: string }) {
  const router = useRouter()
  const form = useForm<z.infer<typeof bingoFieldFormSchema>>({
    resolver: zodResolver(bingoFieldFormSchema),
    defaultValues: {
      fieldvalue: "",
    },
  })

  async function onSubmit(values: z.infer<typeof bingoFieldFormSchema>) {
    console.log(values)

    const res = await fetch(`/api/bingo/primavera-2024`, {
      method: "POST",
      body: JSON.stringify({ ...values, email }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      console.error("Failed to submit field value")
      return
    } else {
      console.log("Field value submitted")
      router.refresh()
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fieldvalue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How would you score this field</FormLabel>
              <FormControl>
                <Input placeholder="fieldvalue" {...field} />
              </FormControl>
              <FormDescription>
                For example: You see a dog or Someone buys a round
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
