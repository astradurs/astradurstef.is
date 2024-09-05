"use client"

import dynamic from "next/dynamic"
import * as React from "react"
import { suspend } from "suspend-react"

// 1. import `NextUIProvider` component
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ExtraProviders({ children }: { children: React.ReactNode }) {
  // 2. Wrap NextUIProvider at the root of your app
  let defaultTheme = "dark"
  if (typeof window !== "undefined") {
    defaultTheme = localStorage?.getItem("theme") || defaultTheme
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme={defaultTheme}>
      {children}
    </NextThemesProvider>
  )
}

const LiveQueryProvider = dynamic(() => import("next-sanity/preview"))

// suspend-react cache is global, so we use a unique key to avoid collisions
const UniqueKey = Symbol("../../sanity/lib/client")

export function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode
  token: string
}) {
  const { client } = suspend(
    () => import("@/lib/sanity/lib/client"),
    [UniqueKey],
  )
  if (!token) {
    throw new TypeError("Missing token")
  }
  return (
    <LiveQueryProvider
      client={client}
      token={token}
      // Uncomment below to see debug reports
      // logger={console}
    >
      {children}
    </LiveQueryProvider>
  )
}
