"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AttributesEditor } from "./components/attributes-editor"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { baseCharacter, characterSchema } from "@/projects/tools/swn/character"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import React, { useState } from "react"
import { BackgroundEditor } from "./components/background-editor"
import { ClassEditor } from "./components/class-editor"
import { FocusEditor } from "./components/focus-editor"
import { SkillsEditor } from "./components/skill-editor"

const formSchema = characterSchema

export default function CharacterCreatorPageSWN() {
  const [showDevTools, setShowDevTools] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: baseCharacter,
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <CollapsibleContainer title="Basic information">
            <BasicInfoEditor form={form} />
          </CollapsibleContainer>
          <Separator />
          <CollapsibleContainer title="Attributes">
            <AttributesEditor form={form} />
          </CollapsibleContainer>
          <Separator />
          <CollapsibleContainer title="Background">
            <BackgroundEditor form={form} />
          </CollapsibleContainer>
          <Separator />
          <CollapsibleContainer title="Class">
            <ClassEditor form={form} />
          </CollapsibleContainer>
          <Separator />
          <CollapsibleContainer title="Focus">
            <FocusEditor form={form} />
          </CollapsibleContainer>
          <Separator />
          <CollapsibleContainer title="Skills">
            <SkillsEditor form={form} />
          </CollapsibleContainer>
          <Separator />
          <div className="flex gap-2 px-4">
            <Button className="w-1/2" type="submit">
              Save
            </Button>
            <Button
              className="w-1/2"
              type="button"
              onClick={(event) => {
                // log out any errors
                console.log(form.formState.errors)
              }}
            >
              LOG
            </Button>
          </div>
        </form>
      </Form>

      <div className="max-w-5xl">
        <div className="px-4 flex gap-2">
          <Button
            variant={showDevTools ? "default" : "secondary"}
            onClick={() => setShowDevTools(true)}
          >
            Show DEV
          </Button>
          <Button
            variant={!showDevTools ? "default" : "secondary"}
            onClick={() => setShowDevTools(false)}
          >
            Hide DEV
          </Button>
        </div>
        {showDevTools && (
          <div>
            <LogContainer object={form.watch()} />
          </div>
        )}
      </div>
    </div>
  )
}

function CollapsibleContainer({
  closedOnMount = false,
  title,
  children,
}: {
  closedOnMount?: boolean
  title: string
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(!closedOnMount)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          <span>{title}</span>
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            {isOpen ? (
              <ChevronUpIcon className="w-6 h-6" />
            ) : (
              <ChevronDownIcon className="w-6 h-6" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="px-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function BasicInfoEditor({ form }: { form: any }) {
  return (
    <div>
      <FormField
        control={form.control}
        name="basic"
        render={() => {
          return (
            <FormItem>
              <FormLabel className="sr-only">Basic information</FormLabel>
              <FormField
                control={form.control}
                name="basic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        onChange={(e) =>
                          field.onChange({
                            ...field.value,
                            name: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="basic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal</FormLabel>
                    <FormControl>
                      <Input
                        onChange={(e) =>
                          field.onChange({
                            ...field.value,
                            goal: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormItem>
          )
        }}
      />
    </div>
  )
}

function LogContainer({ object }: { object: any }) {
  const objKeys = Object.keys(object)

  return (
    <div>
      <h4 className="text-sm font-semibold">
        <span>LOG</span>
      </h4>

      {objKeys.map((key, index) => {
        return (
          <CollapsibleContainer
            closedOnMount
            key={`log-${key}-${index}`}
            title={key}
          >
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(object[key], null, 2)}
            </pre>
          </CollapsibleContainer>
        )
      })}
    </div>
  )
}
