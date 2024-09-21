"use client";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import React, { FC, Fragment } from "react";
import Logo from "./Logo";
import ThemeToggler from "@/components/ui/ThemeToggler";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import Link from "next/link";

type NavbarProps = {};

const Navbar: FC<NavbarProps> = (): JSX.Element => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <nav
      className={cn(
        "z-[99] bg-background fixed top-0   flex items-center w-full p-5",
        scrolled ? "border-b shadow-md" : ""
      )}
    >
      <div className="md:w-1/2">
        <Logo />
      </div>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 ">
        {isLoading ? <Spinner /> : <></>}
        {!isAuthenticated && !isLoading ? (
          <Fragment>
            <SignInButton>
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </SignInButton>

            <SignInButton>
              <Button variant="ghost" size="sm">
                Get Santra Notes Free
              </Button>
            </SignInButton>
          </Fragment>
        ) : (
          <></>
        )}
        {isAuthenticated && !isLoading ? (
          <Fragment>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Santra Notes</Link>
            </Button>
            <UserButton afterSwitchSessionUrl="/" />
          </Fragment>
        ) : (
          <></>
        )}

        <ThemeToggler />
      </div>
    </nav>
  );
};

export default Navbar;
