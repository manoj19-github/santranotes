"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { FC } from "react";
type DocumentCoverProps = {
  coverUrl?: string;
  preview: boolean;
};
const DocumentCover: FC<DocumentCoverProps> = ({
  coverUrl,
  preview,
}): JSX.Element => {
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const params = useParams();
  const removeCoverImageHandler = useMutation(api.documents.removeCoverImage);
  const onRemoveHandler = () => {
    if (coverUrl)
      edgestore.publicFiles.delete({ url: coverUrl as string }).then(() => {
        removeCoverImageHandler({
          documentId: params?.documentId as Id<"documents">,
        });
      });
  };
  return (
    <div
      className={cn(
        "relative w-full h-[40vh] group ",
        !coverUrl && "h-[12vh]",
        coverUrl && "bg-muted"
      )}
    >
      {!!coverUrl && (
        <Image src={coverUrl} alt="cover" fill className="object-fill" />
      )}
      {!!coverUrl && !preview && (
        <div className="absolute bottom-3 right-5 items-center gap-x-2 flex   text-muted opacity-0 group-hover:opacity-100 ">
          <Button
            className="text-muted-foreground text-xs gap-x-2 "
            variant={"outline"}
            size={"sm"}
            onClick={() => coverImage.onReplace(coverUrl as string)}
          >
            <ImageIcon className="h-4 w-4" />
            Change Cover
          </Button>
          <Button
            className="text-muted-foreground text-xs gap-x-2 "
            variant={"outline"}
            size={"sm"}
            onClick={onRemoveHandler}
          >
            <X className="h-4 w-4" />
            Remove Cover
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentCover;
