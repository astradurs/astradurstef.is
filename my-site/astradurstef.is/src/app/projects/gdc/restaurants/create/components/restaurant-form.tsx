"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { MyLink } from "@/components/link"
import { revalidateTag } from "next/cache"

const createIdFromName = (name: string) => {
  const specialIcelandicAlphabet = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    ý: "y",
    þ: "th",
    æ: "ae",
    ö: "o",
  }

  // replace all whitespaces or multiple whitespaces with -
  // then replace all special characters with their non-special equivalent
  let id = name.toLowerCase().replace(/\s+/g, "-")
  for (const [key, value] of Object.entries(specialIcelandicAlphabet)) {
    id = id.replaceAll(key, value)
  }
  return id
}

export function RestaurantForm({
  restaurants,
  restaurant,
}: {
  restaurants: {
    id: string
    name: string
    address: string
    city: string
    zip: string
    websiteurl: string
    googlemapsurl: string
  }[]
  restaurant: {
    id: string
    name: string
    address: string
    city: string
    zip: string
    websiteurl: string
    googlemapsurl: string
  } | null
}) {
  const router = useRouter()
  const formSchema = z.object({
    name: z.string().refine((name) => name.length > 0, {
      message: "Name is required",
    }),
    address: z.string().refine((address) => address.length > 0, {
      message: "Address is required",
    }),
    city: z.string().refine((city) => city.length > 0, {
      message: "City is required",
    }),
    zip: z
      .string()
      .refine((zip) => zip.length === 3, {
        message: "Zip code must be 3 characters",
      })
      .refine((zip) => zip.match(/^\d+$/), {
        message: "Zip code must be a number",
      }),
    googlemapsurl: z
      .union([
        z.string().length(0, {
          message: "Website URL must be a valid URL",
        }),
        z.string().url({
          message: "Website URL must be a valid URL",
        }),
      ])
      .optional()
      .optional()
      .transform((url) => (url === "" ? null : url)),
    websiteurl: z
      .union([
        z.string().length(0, {
          message: "Website URL must be a valid URL",
        }),
        z.string().url({
          message: "Website URL must be a valid URL",
        }),
      ])
      .optional()
      .transform((url) => (url === "" ? null : url)),
  })

  const defaultValues = restaurant || {
    name: "",
    address: "",
    city: "",
    zip: "",
    googlemapsurl: "",
    websiteurl: "",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,

    mode: "onSubmit",
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    let id = createIdFromName(values.name)
    const restaurantIdExists = restaurants.some(
      (restaurant) => restaurant.id === id
    )

    if (restaurantIdExists) {
      id = `${id}-${restaurants.length.toString().padStart(2, "0")}`
    }

    const response = await fetch(`/api/gdc/restaurant`, {
      method: "POST",
      body: JSON.stringify({ ...values, id }),
    })

    if (response.ok) {
      form.reset()

      router.push("/projects/gdc/restaurants")
    }
  }

  return (
    <form
      className="grid gap-3 sm:max-w-2xl mx-auto my-auto"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Reykjavík">Reykjavík</SelectItem>
                      <SelectItem value="Kópavogur">Kópavogur</SelectItem>
                      <SelectItem value="Hafnarfjörður">
                        Hafnarfjörður
                      </SelectItem>
                      <SelectItem value="Mosfellsbær">Mosfellsbær</SelectItem>
                      <SelectItem value="Seltjarnarnes">
                        Seltjarnarnes
                      </SelectItem>
                      <SelectItem value="Garðabær">Garðabær</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="googlemapsurl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google maps URL</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ? field.value : ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="websiteurl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ? field.value : ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-3">
          <Button
            asChild
            type="button"
            variant="outline"
            className="col-start-1 order-first"
          >
            <MyLink to="/projects/gdc/restaurants">Cancel</MyLink>
          </Button>
          <Button className="col-start-3 order-last" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </form>
  )
}
