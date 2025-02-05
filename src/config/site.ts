import { EditIcon, HeartFilledIcon, HomeIcon, SearchIcon, SettingIcon } from "@/components/icons";


export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "AI Resume Helper",
  description: "Tailor your resume to each job with ease!",
  navItems: [
    {
      label: "Home",
      href: "/home",
      icon:HomeIcon
    },
    {
      label: "Search Jobs",
      href: "/search",
      icon:SearchIcon
    },
    {
      label: "Resume Editor",
      href: "/resume",
      icon:EditIcon
    },
    {
      label: "Saved Jobs/Resumes",
      href: "/saved",
      icon:HeartFilledIcon
    },
    {
      label: "Settings",
      href: "/settings",
      icon:SettingIcon
    },
  ],
  links: {
    github: "https://github.com/manxzo/Project-2-AI-Resume-Tool",
  },
};
