"use client"

import * as React from "react"

// 1. import `NextUIProvider` component
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ExtraProviders({ children }: { children: React.ReactNode }) {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      {children}
    </NextThemesProvider>
  )
}
