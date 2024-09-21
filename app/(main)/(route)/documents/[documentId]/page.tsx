"use client";
import DocumentCover from "@/app/_components/DocumentCover";
import Toolbar from "@/app/_components/Toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React, { FC } from "react";

type DocumentIdMainProps = {
  params: {
    documentId: Id<"documents">;
  };
};
const DocumentIdMain: FC<DocumentIdMainProps> = ({ params }): JSX.Element => {
  const selectedDocuments = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });
  if (selectedDocuments === undefined) {
    return <div>loading ........</div>;
  }
  if (selectedDocuments === null) {
    return <div>not found</div>;
  }
  return (
    <div className=" pb-40 w-[100%]">
      <div className="md:max-w-3xl lg:max-w-[1600px] mx-auto mt-12">
        <DocumentCover
          coverUrl={selectedDocuments.coverImage}
          preview={selectedDocuments.isPublished}
        />
        <div className="mt-2" />
        <Toolbar initialData={selectedDocuments} />
      </div>
    </div>
  );
};

export default DocumentIdMain;
