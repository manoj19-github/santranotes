import React, { FC } from "react";
import Heading from "../_components/Heading";
import Heroes from "../_components/Heroes";
import Footer from "../_components/Footer";

type MarketingPageProps = {};
const MarketingPage: FC<MarketingPageProps> = (): JSX.Element => {
  return (
    <div className="min-h-full flex-col overflow-x-hidden ">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-5 pb-10  min-h-[88vh] md:min-h-auto  ">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
