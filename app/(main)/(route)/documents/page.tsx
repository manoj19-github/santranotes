import Image from "next/image";
import React, { FC } from "react";

type DocumentsPageProps = {};
const DocumentsPage: FC<DocumentsPageProps> = (): JSX.Element => {
  return (
    <div className="w-[100%] h-full flex items-center  justify-center space-y-4 flex-col">
      <Image
        src={"/documentsblack.png"}
        alt="empty"
        height="300"
        width="300"
        className="dark:hidden"
      />
      <Image
        src={"/documentsemptyBlack.png"}
        alt="empty"
        height="300"
        width="300"
        className="dark:block hidden"
      />
    </div>
  );
};

export default DocumentsPage;
