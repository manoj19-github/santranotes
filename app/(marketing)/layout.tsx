"use client";
import React, { FC, ReactNode } from "react";
import Navbar from "./_components/Navbar";

type MarketingLayoutProps = {
  children: ReactNode;
};
const MarketingLayout: FC<MarketingLayoutProps> = ({
  children,
}): JSX.Element => {
  return (
    <div className="h-full">
      <Navbar />
      {/* <main className="h-full pt-10 overflow-x-hidden">{children}</main> */}
    </div>
  );
};

export default MarketingLayout;
