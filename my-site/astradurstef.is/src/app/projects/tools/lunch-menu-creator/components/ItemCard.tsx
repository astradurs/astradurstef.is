"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetClose,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
} from "@/components/ui/sheet"

type menuItem = {
  menuItemId: string
  shortDescription: {
    en: string
    is: string
  }
  description: {
    en: string
    is: string
  }
}

export function ItemCard({
  menuItem,
  setIsEditing,
  isEditing,
  handleMenuItemSubmit,
}: {
  menuItem: menuItem | null
  setIsEditing: Function
  isEditing: boolean
  handleMenuItemSubmit: Function
}) {
  const [isHovering, setIsHovering] = useState(false)

  const isNull = menuItem === null

  if (isNull && !isEditing) {
    return (
      <ItemEditor
        setIsEditing={setIsEditing}
        menuItem={null}
        handleMenuItemSubmit={handleMenuItemSubmit}
      />
    )
  }

  return (
    <ItemEditor
      setIsEditing={setIsEditing}
      menuItem={menuItem}
      handleMenuItemSubmit={handleMenuItemSubmit}
    />
  )
}

const formSchema = z.object({
  menuItemId: z.string(),
  shortDescription: z.object({
    en: z.string(),
    is: z.string(),
  }),
  description: z.object({
    en: z.string(),
    is: z.string(),
  }),
})

function ItemEditor({
  menuItem,
  setIsEditing,
  handleMenuItemSubmit,
}: {
  menuItem: menuItem | null
  setIsEditing: Function
  handleMenuItemSubmit: Function
}) {
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuItemId: menuItem?.menuItemId ?? "",
      shortDescription: menuItem?.shortDescription ?? {},
      description: menuItem?.description ?? {},
    },
    mode: "onChange",
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsOpen(false)
    console.log(values)
    handleMenuItemSubmit(values, menuItem !== null)
  }

  return (
    <Sheet
      onOpenChange={(open) => {
        setIsOpen(open)
        setIsEditing(open)
      }}
      open={isOpen}
    >
      <SheetTrigger asChild>
        {menuItem !== null ? (
          <Card
            onClick={() => {
              setIsOpen(true)
              setIsEditing(true)
            }}
          >
            <CardHeader>
              <CardTitle className="text-xl">
                {menuItem?.shortDescription.en}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              {menuItem?.description.en}
            </CardContent>
            <CardFooter className="text-xs">{menuItem?.menuItemId}</CardFooter>
          </Card>
        ) : (
          <Button
            onClick={() => {
              setIsOpen(true)
              setIsEditing(true)
            }}
            className="text-2xl h-20 w-20"
            variant="outline"
          >
            +
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Edit menu item</SheetTitle>
          <SheetDescription>
            Make changes to the menu item and click submit to save
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form {...form}>
            <div className="flex flex-col gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="menuItemId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Menuitem ID</FormLabel>
                      <FormControl>
                        <Input placeholder="#menuitem-id" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <div>
                <FormLabel>Short Description</FormLabel>
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="shortDescription.en"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>English</FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shortDescription.is"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icelandic</FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Separator />
              <div>
                <FormLabel>Description</FormLabel>
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="description.en"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>English</FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description.is"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icelandic</FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </SheetClose>

                  <Button type="submit">Submit</Button>
                </SheetFooter>
              </div>
            </div>
          </Form>
        </form>
      </SheetContent>
    </Sheet>
  )
}
