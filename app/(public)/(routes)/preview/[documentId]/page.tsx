"use client";
import dynamic from "next/dynamic";
import DocumentCover from "@/app/_components/DocumentCover";
import Editor from "@/app/_components/Editor";
import Toolbar from "@/app/_components/Toolbar";
import { CoverSkeleton } from "@/components/modals/CoverImageModal";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import React, { FC, useEffect, useState, useMemo } from "react";

type DocumentIdMainProps = {
  params: {
    documentId: Id<"documents">;
  };
};
const DocumentIdMain: FC<DocumentIdMainProps> = ({ params }): JSX.Element => {
  const MemoizedEditor = useMemo(
    () => dynamic(() => import("@/app/_components/Editor"), { ssr: false }),
    []
  );
  const [updatedDocumentContent, setUpdatedDocumentContent] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectedDocuments = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (selectedDocuments === undefined) {
    return (
      <div className="relative w-[100%] ">
        <CoverSkeleton />
        <div className="md:max-w-3xl lg:max-w-[1600px] mx-auto mt-10 ">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-4 w-[50%]  " />
            <Skeleton className="h-4 w-[80%]  " />
            <Skeleton className="h-4 w-[40%]  " />
            <Skeleton className="h-4 w-[60%]  " />
          </div>
        </div>
      </div>
    );
  }
  if (selectedDocuments === null) {
    return <div>not found</div>;
  }
  return (
    <div className=" pb-40 w-[100%] relative border border-transparent">
      {isLoading ? (
        <div className="absolute top-[0%]  w-full left-[0%] px-6  text-xs py-[1px] text-blue-800 text-center">
          Document Saving ....
        </div>
      ) : (
        <></>
      )}

      <div className="md:max-w-3xl lg:max-w-[1600px] mx-auto mt-12">
        <DocumentCover coverUrl={selectedDocuments.coverImage} preview />
        <div className="mt-2" />
        <Toolbar initialData={selectedDocuments} />
        <MemoizedEditor
          editable={false}
          onChangeHandler={(value: any) => {
            setUpdatedDocumentContent(JSON.stringify(value));
          }}
          initialContent={selectedDocuments.content}
        />
      </div>
    </div>
  );
};

export default DocumentIdMain;
