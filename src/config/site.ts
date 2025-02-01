export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "AI Resume Helper",
  description: "Tailor your resume to each job with ease!",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Search Jobs",
      href: "/search",
    },
    {
      label: "Resume Editor",
      href: "/resume",
    },
    {
      label: "Favourites",
      href: "/saved",
    },
    {
      label: "Settings",
      href: "/settings",
    },
  ],
  links: {
    github: "https://github.com/frontio-ai/heroui",
  },
};
