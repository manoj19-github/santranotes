import React, { FC } from "react";
import Image from "next/image";
type HeroesProps = {};
const Heroes: FC<HeroesProps> = (): JSX.Element => {
  return (
    <div className="flex items-center flex-col justify-center max-w-5xl">
      <div className="flex items-center justify-center  lg:ml-16">
        <div className="relative h-[300px] w-[50vw] sm:w-[270px] sm:h-[270px] md:h-[300px] ">
          <Image
            src="/1358533.png"
            fill
            className="object-fit md:object-contain mx-auto aspect-square dark:hidden"
            alt="logo"
          />
          <Image
            src="/fileherodark.png"
            fill
            className="object-fit md:object-contain mx-auto aspect-square hidden dark:block"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
