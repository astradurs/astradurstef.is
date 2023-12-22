import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export function ToolCard({
  title,
  description,
  id,
  children,
}: {
  title: string
  description: string
  id: string
  children: React.ReactNode
}) {
  return (
    <Card className="flex flex-col justify-between">
      <div>
        <CardHeader className="flex justify-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">{children}</CardContent>
      </div>
      <CardFooter className="flex justify-center">
        <Button asChild color="primary" className="w-full">
          <Link href={`/projects/tools/${id}`}>Open</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
