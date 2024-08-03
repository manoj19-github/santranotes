import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import React, { FC } from "react";
import Logo from "./Logo";
import ThemeToggler from "@/components/ui/ThemeToggler";

type NavbarProps = {};

const Navbar: FC<NavbarProps> = (): JSX.Element => {
  const scrolled = useScrollTop();

  return (
    <nav
      className={cn(
        "z-[999] bg-background fixed top-0   flex items-center w-full p-5",
        scrolled ? "border-b shadow-md" : ""
      )}
    >
      <div className="md:w-1/2">
        <Logo />
      </div>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 ">
        <ThemeToggler />
      </div>
    </nav>
  );
};

export default Navbar;
