import React, { FC } from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
type LogoProps = {};
const Logo: FC<LogoProps> = (): JSX.Element => {
  return (
    <div className="hidden  md:flex items-center gap-x-2 z-[50]">
      <Image
        src="/my-notes.png"
        height="40"
        width="40"
        alt="logo"
        className="dark:hidden"
      />
      <Image
        src="/my-notesDark.png"
        height="40"
        width="40"
        alt="logo"
        className="dark:block hidden"
      />
      <p className={cn("font-semibold", font.className)}>Santra Notes</p>
    </div>
  );
};

export default Logo;
