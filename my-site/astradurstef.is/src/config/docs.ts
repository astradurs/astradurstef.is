import { MainNavItem, SidebarNavItem } from "@/types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  projects: {
    games: {
      title: string
      id: string
      description: string
      longDescription?: string
      href: string
    }[]
    tools: {
      title: string
      id: string
      description: string
      longDescription?: string
      href: string
    }[]
    other: {
      title: string
      id: string
      description: string
      longDescription?: string
      href: string
      children?: {
        title: string
        id: string
        description: string
        longDescription?: string
        href: string
      }[]
    }[]
  }
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
  projects: {
    games: [
      {
        title: "Adventure",
        description: "A text-based adventure game",
        longDescription:
          "For now it has a simple inventory and combat system. In the future I would like to add more features to it and even make a new game that has a map and is a bit more interactive.",
        id: "adventure",
        href: "/projects/games/adventure",
      },
    ],
    tools: [],
    other: [
      {
        title: "GDC",
        id: "gdc",
        description:
          "A site to create events and keep track of visits and head-count",
        longDescription:
          "GDC (Gentlemen's Dining Club). School buddies meet up to go to dinner. This tool is to help us decide where to go and keep track of our visits. You need to authenticate to access this tool for now.",
        href: "/projects/gdc",
        children: [
          {
            title: "Restaurants",
            id: "restaurants",
            description: "List of restaurants",
            href: "/projects/gdc/restaurants",
          },
          {
            title: "User profile",
            id: "profile",
            description: "User profile",
            href: "/projects/gdc/profile",
          },
        ],
      },
    ],
  },
}
