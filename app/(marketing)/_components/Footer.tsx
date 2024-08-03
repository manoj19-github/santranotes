import React, { FC } from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
type FooterProps = {};
const Footer: FC<FooterProps> = (): JSX.Element => {
  return (
    <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#f1f1f1">
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground ">
        <Button variant="ghost">Privacy Policy</Button>
        <Button variant="ghost">Terms & Conditions</Button>
      </div>
    </div>
  );
};

export default Footer;
