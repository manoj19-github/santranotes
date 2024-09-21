"use client";
import { Doc } from "@/convex/_generated/dataModel";
import React, { FC, Fragment, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/useOrigin";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";
type DocumentPublishProps = {
  initialDoc: Doc<"documents">;
};
const Publish: FC<DocumentPublishProps> = ({ initialDoc }): JSX.Element => {
  const origin = useOrigin();
  const [copied, setCopied] = useState<boolean>();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const updateHandler = useMutation(api.documents.updateDocuments);
  const documentURL: string = `${origin}/documents/${initialDoc._id}`;
  const docURL = `${origin}/preview/${initialDoc._id}`;
  const onPublish = async () => {
    setSubmitting(true);
    const promise = updateHandler({
      id: initialDoc._id,
      isPublished: true,
    }).finally(() => {
      setSubmitting(false);
    });

    toast.promise(promise, {
      success: "Document published!",
      error: "Error publishing document",
      loading: "Please wait ...",
    });
  };
  const onUnPublish = async () => {
    setSubmitting(true);
    const promise = updateHandler({
      id: initialDoc._id,
      isPublished: false,
    }).finally(() => {
      setSubmitting(false);
    });

    toast.promise(promise, {
      success: "Document unpublished!",
      error: "Error unpublishing document",
      loading: "Please wait ...",
    });
  };
  const onCopyHandler = () => {
    navigator.clipboard.writeText(docURL);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          size="sm"
          asChild
          variant={"ghost"}
          className="mt-2 w-full flex gap-x-2"
        >
          <Fragment>
            <p>Publish</p>
            {/* {initialDoc.isPublished ? <Globe className="ml-2 h-4 w-4" /> : null} */}
          </Fragment>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialDoc.isPublished ? (
          <div className="swpace-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="h-4 w-4 text-sky-500" />
              <p className="text-xs font-semibold text-sky-500">
                This Document is live on web
              </p>
            </div>
            <div className="flex items-center ">
              <input
                disabled
                type="text"
                value={docURL}
                className="flex-1 px-2 bg-muted truncate text-gray-500  text-xs border rounded-l-md h-8"
              />
              <Button
                onClick={onCopyHandler}
                size="sm"
                variant="ghost"
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              className="mt-2"
              size={"sm"}
              variant={"ghost"}
              disabled={isSubmitting}
              onClick={onUnPublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-xs text-muted-foreground">
              Share your work with others
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              size="sm"
              className="mt-2"
            >
              publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
