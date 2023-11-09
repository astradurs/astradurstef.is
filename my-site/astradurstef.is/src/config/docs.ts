import { MainNavItem, SidebarNavItem } from "@/types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/app",
    },
    {
      title: "Posts",
      href: "/app/posts",
    },
    {
      title: "Games",
      href: "/app/games",
    },
    {
      title: "GitHub",
      href: "https://github.com/astradurs",
      external: true,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/stradistef",
      external: true,
    },
  ],
  sidebarNav: [],
}
