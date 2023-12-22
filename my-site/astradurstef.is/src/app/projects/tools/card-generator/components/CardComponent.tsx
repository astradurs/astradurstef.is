"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { useState } from "react"

type CardHeaderProps = {
  title: string
  description: string
}

interface CardProps {
  id: string
  title: string
  description: string
  children?: React.ReactNode
  footer?: React.ReactNode
}

export function CardComponent({
  id,
  title,
  description,
  footer,
  children,
}: CardProps) {
  const [x, setX]: [number | null, Function] = useState(null)
  const [y, setY]: [number | null, Function] = useState(null)

  return (
    <div>
      <div>
        {x && y && (
          <div>
            <p>
              x: {x} y: {y}
            </p>
          </div>
        )}
      </div>
      <Card
        key={id}
        onDragStart={(e) => {
          console.log({ x: e.screenX, y: e.screenY })
        }}
        onDragEnd={(e) => {
          setX(e.screenX)
          setY(e.screenY)
        }}
        draggable
      >
        <Header title={title} description={description} />
        <Content>{children}</Content>
        <Footer>{footer}</Footer>
      </Card>
    </div>
  )
}

function Header({ title, description }: CardHeaderProps) {
  return (
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return <CardContent>{children}</CardContent>
}

function Footer({ children }: { children: React.ReactNode }) {
  return <CardFooter>{children}</CardFooter>
}
