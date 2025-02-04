import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import LocationPopup from "./Components/LocationPopup";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import debounce from "lodash.debounce";
export const Navbar = () => {
  const navigate = useNavigate();
  let location = useLocation();
  return (
    <HeroUINavbar
    maxWidth="full"
      position="sticky"
      isBordered
      className=" px-0"
      style={{margin:"0",padding:"0"}}
    >
      <NavbarContent
        className="flex-auto flex justify-items-stretch bg-default-0 gap-0 w-full"
        justify="center"
      >
        {siteConfig.navItems.map((item) => (
          <NavbarItem
            key={item.href}
            className="bg-default-0 h-full flex-auto flex justify-center items-center"
          >
            <Button
              variant="flat"
              startContent={<item.icon className="w-7 h-7" />}
              onPress={debounce(() => navigate(item.href), 100)}
              className="bg-0"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "0px",
                borderBottom:
                  location.pathname === item.href ? "3px solid" : "0px",
              }}
            >
              <pre style={{ fontSize: "1.6em" }}>{item.label}</pre>
            </Button>
          </NavbarItem>
        ))}

        <NavbarItem className="bg-default-0 h-full flex-auto flex justify-evenly items-center">
          <LocationPopup />
          <Link isExternal href={siteConfig.links.github}>
            <GithubIcon className="text-default-500 w-10 h-10" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
