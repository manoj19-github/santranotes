"use client";
import { Button } from "@/components/ui/button";
import React, { FC } from "react";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";
import Spinner from "@/components/ui/Spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";
type HeadingProps = {};
const Heading: FC<HeadingProps> = (): JSX.Element => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="md:max-w-3xl space-y-4 w-[100%] mt-10">
      <h1 className="text-2xl sm:text-5xl md:text-5xl font-bold w-[100%] break-words">
        Your Ideas, Documents & Plans. Unified. Welcome to{" "}
        <span className="underline underline-offset-2">Santra Notes</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Santra Notes is the connected workspace where <br />
        better, faster work happens
      </h3>
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <></>
      )}
      {isAuthenticated && !isLoading ? (
        <Button className="gap-x-4 moveAnimContainer" asChild>
          <Link href="/documents">
            Enter Santra Notes
            <ArrowRight className="moveAnim" />
          </Link>
        </Button>
      ) : (
        <></>
      )}
      {!isAuthenticated && !isLoading ? (
        <SignInButton mode="modal">
          <Button className="gap-x-4 moveAnimContainer">
            Get Santra Notes Free
            <ArrowRight className="moveAnim" />
          </Button>
        </SignInButton>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Heading;
