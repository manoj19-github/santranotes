import React, { FC } from "react";

type DocumentIdMainProps = {
  params: {
    documentId: string;
  };
};
const DocumentIdMain: FC<DocumentIdMainProps> = ({ params }): JSX.Element => {
  console.log("documentId >>>>>>>>>>>> ", params.documentId);

  return <div className=" ">DocumentMainSDSDSDS</div>;
};

export default DocumentIdMain;
