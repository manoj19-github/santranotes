"use client";
import Spinner from "@/components/ui/Spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React, { FC, ReactNode } from "react";
import Navigation from "./_components/Navigation";
import SearchComponent from "@/components/SearchComponent";

type MainLayoutProps = {
  children: ReactNode;
};
const MainLayout: FC<MainLayoutProps> = ({ children }): JSX.Element => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  if (!isAuthenticated) return redirect("/");
  return (
    <div className="min-h-screen w-full flex dark:bg-[#1f1f1f] ">
      <Navigation />
      <div>
        {" "}
        <SearchComponent />
      </div>

      <main className="  w-full flex-1 overflow-y-auto lg:ml-[14vw]">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
