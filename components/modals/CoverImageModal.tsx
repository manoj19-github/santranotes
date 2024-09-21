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
    if (file) {
      setIsSubmitting(true);
      setCoverFile(file);
      const response = await edgestore.publicFiles.upload({
        file,
      });
      await updateDocuments({
        id: params?.documentId as Id<"documents">,
        coverImage: response?.url,
      });
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

export default CoverImageModal;
