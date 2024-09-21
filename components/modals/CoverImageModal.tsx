"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import { SingleImageDropzone } from "../SingleImageUploader";
import { Skeleton } from "../ui/skeleton";

type CoverImageSkeletonProps = {};
type CoverImageModalProps = {};
const CoverImageModal: FC<CoverImageModalProps> = (): JSX.Element => {
  const params = useParams();
  const coverImageState = useCoverImage();
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { edgestore } = useEdgeStore();
  const updateDocuments = useMutation(api.documents.updateDocuments);
  const onCloseHandler = () => {
    coverImageState.onClose();
    setCoverFile(null);
    setIsSubmitting(false);
  };
  const onChangeHandler = async (file?: File) => {
    try {
      setIsSubmitting(true);
      if (file) {
        setCoverFile(file);
        let fileResponse: any;
        if (coverImageState?.url) {
          fileResponse = await edgestore.publicFiles.upload({
            file,
            options: {
              replaceTargetUrl: coverImageState.url,
            },
          });
        } else {
          fileResponse = await edgestore.publicFiles.upload({
            file,
          });
        }

        await updateDocuments({
          id: params?.documentId as Id<"documents">,
          coverImage: fileResponse?.url,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      onCloseHandler();
    }
  };

  return (
    <Dialog
      open={coverImageState.isOpen}
      onOpenChange={coverImageState.onClose}
    >
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold text-center">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          value={coverFile}
          className="w-full outline-none "
          disabled={isSubmitting}
          onChange={onChangeHandler}
        />
      </DialogContent>
    </Dialog>
  );
};

export const CoverSkeleton: FC<CoverImageSkeletonProps> = (): JSX.Element => {
  return <Skeleton className="w-full h-[38vh] rounded-lg bg-gray-100" />;
};

export default CoverImageModal;


