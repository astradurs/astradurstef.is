// app/components/ThemeSwitcher.tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Switch } from "@nextui-org/react"
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
      defaultSelected={theme === "light"}
      size="lg"
      color="secondary"
      onValueChange={(isSelected) => {
        setTheme(isSelected ? "light" : "dark")
      }}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    />
  )
}
