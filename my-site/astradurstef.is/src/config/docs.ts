import { MainNavItem, SidebarNavItem } from "@/types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
      external: false,
    },
    // {
    //   title: "Posts",
    //   href: "/posts",
    //   external: false,
    // },
    {
      title: "Projects",
      href: "/projects",
      external: false,
    },
    {
      title: "Studio",
      href: "/studio",
      external: false,
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
