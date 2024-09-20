"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { FC, Fragment } from "react";
import Title, { TitleSkeleton } from "./Title";
import Banner from "./Banner";
import DocumentMenu, { DropdownMenuSkeleton } from "./DocumentMenu";

type NavbarProps = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};
const Navbar: FC<NavbarProps> = ({
  isCollapsed,
  onResetWidth,
}): JSX.Element => {
  const params = useParams();
  const documents = useQuery(api.documents.getById, {
    documentId: params?.documentId as Id<"documents">,
  });

  if (documents === undefined)
    return (
      <nav className="bg-background dark:bg-[#f1f1f1] px-3 py-2 w-full flex items-center gap-x-3 justify-between">
        <TitleSkeleton />
        <div className="flex items-center gap-x-2">
          <DropdownMenuSkeleton />
        </div>
      </nav>
    );
  if (documents === null) return <div>Document not found</div>;

  return (
    <Fragment>
      <nav className="bg-background dark:bg-[#f1f1f1] px-3 py-2 w-full flex items-center gap-x-3">
        {isCollapsed ? (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-5 w-5 text-muted-foreground"
          />
        ) : (
          <></>
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={documents} />
          <div className="flex items-center gap-x-2">
            <DocumentMenu documentId={documents._id} />
          </div>
        </div>
      </nav>
      {documents.isArchived && (
        <Banner documentId={documents?._id as Id<"documents">} />
      )}
    </Fragment>
  );
};

export default Navbar;
