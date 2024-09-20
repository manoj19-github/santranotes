"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "sonner";

type BannerProps = {
  documentId: Id<"documents">;
};
const Banner: FC<BannerProps> = ({ documentId }): JSX.Element => {
  const router = useRouter();
  const remove = useMutation(api.documents.removeNotes);
  const restore = useMutation(api.documents.restoreNotes);
  const onRemoveHandler = () => {
    const promise = remove({ documentId }).then(() => {
      router.push("/documents");
    });
    toast.promise(promise, {
      loading: "Removing notes...",
      success: "Notes removed",
      error: "Error removing notes",
    });
  };
  const onRestoreHandler = () => {
    const promise = restore({ documentId });
    toast.promise(promise, {
      loading: "Restoring notes...",
      success: "Notes restored",
      error: "Error restoring notes",
    });
  };
  return (
    <div className="w-full bg-rose-500 text-center text-white text-sm p-2 items-center flex justify-center gap-x-3">
      <p>This page is in the Trash</p>
      <Button
        size="sm"
        onClick={onRestoreHandler}
        variant="outline"
        className="border-white bg-trannsparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>
      <Button
        size="sm"
        onClick={onRemoveHandler}
        variant="outline"
        className="border-white bg-trannsparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Delete forever
      </Button>
    </div>
  );
};

export default Banner;
