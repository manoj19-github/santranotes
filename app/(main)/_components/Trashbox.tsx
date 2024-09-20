"use client";
import ConfirmModal from "@/app/_components/modals/ConfirmModal";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "sonner";

type TrashBoxProps = {};

const Trashbox: FC<TrashBoxProps> = (): JSX.Element => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrashNotes);
  const restore = useMutation(api.documents.restoreNotes);
  const deleteForever = useMutation(api.documents.removeNotes);
  const [search, setSearch] = useState<string>("");
  const filterDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });
  const onClickHandler = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };
  const onRestoreHandler = async (event: any, documentId: Id<"documents">) => {
    event.preventDefault();
    event.stopPropagation();
    const promise = restore({ documentId });
    toast.promise(promise, {
      loading: "Restoring notes...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };
  const onRemoveHandler = async (event: any, documentId: Id<"documents">) => {
    event.stopPropagation();
    const promise = deleteForever({ documentId });
    toast.promise(promise, {
      loading: "Deleting notes...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });
    if (params.documentId === documentId) router.push("/documents");
  };

  if (documents === undefined)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner size={"lg"} />
      </div>
    );

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes here..."
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary "
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-center text-xs text-muted-foreground pb-2">
          No documents found.
        </p>
        {!!filterDocuments &&
          filterDocuments.map((self, index) => (
            <div
              key={index}
              onClick={() => onClickHandler(self._id)}
              className="text-sm rounded-sm cursor-pointer w-full hover:bg-primary/5  text-primary flex items-center justify-between p-2 gap-x-2"
            >
              <span>{self.title}</span>
              <div className="flex items-center">
                <div
                  onClick={(event) => onRestoreHandler(event, self._id)}
                  role="button"
                  className="cursor-pointer rounded-full p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Undo className="w-4 h-4 text-muted-foreground" />
                </div>
                <ConfirmModal
                  onConfirm={(event: any) => onRemoveHandler(event, self._id)}
                >
                  <div
                    role="button"
                    className="cursor-pointer rounded-full p-2 hover:bg-neutral-200 ml-1"
                  >
                    <Trash className="w-4 h-4 text-muted-foreground text-rose-600" />
                  </div>
                </ConfirmModal>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Trashbox;
