"use client";

import { Id } from "@/convex/_generated/dataModel";
import React, { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
type DocumentMenuProps = {
  documentId: Id<"documents">;
};
const DocumentMenu: FC<DocumentMenuProps> = ({ documentId }): JSX.Element => {
  const router = useRouter();
  const loggedInUser = useUser();
  const archievedMutation = useMutation(api.documents.archiveDocument);
  const onArchieve = () => {
    const promise = archievedMutation({ documentId });
    toast.promise(promise, {
      loading: "Archieving...",
      success: "Document Archieved",
      error: "Error archieving document",
    });
    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchieve}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by : {`  ${loggedInUser?.user?.fullName}`}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const DropdownMenuSkeleton = () => {
  return <Skeleton className="h-10 w-10" />;
};

export default DocumentMenu;
