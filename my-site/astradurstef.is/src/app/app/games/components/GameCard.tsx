"use client"
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Link,
  Button,
} from "@nextui-org/react"
import React from "react"

export function GameCard({
  title,
  id,
  children,
}: {
  title: string
  id: string
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex justify-center">
        <h3>{title}</h3>
      </CardHeader>
      <CardBody className="flex flex-col gap-2">{children}</CardBody>
      <CardFooter className="flex justify-center">
        <Button color="success">
          <Link href={`games/${id}`}>Play</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
