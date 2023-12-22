// app/components/ThemeSwitcher.tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Switch
      checked={theme === "light"}
      onCheckedChange={(isSelected) => {
        setTheme(isSelected ? "light" : "dark")
      }}
    >
      {theme === "light" ? (
        <>
          <span className="sr-only">Use dark theme</span>
          <SunIcon className="h-5 w-5 text-primary" />
        </>
      ) : (
        <>
          <span className="sr-only">Use light theme</span>
          <MoonIcon className="h-5 w-5 text-primary" />
        </>
      )}
    </Switch>
  )
}
