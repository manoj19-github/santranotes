"use client";
import { Doc } from "@/convex/_generated/dataModel";
import React, { ElementRef, FC, useRef, useState, KeyboardEvent } from "react";
import IconPicker from "./IconPicker";
import { Button } from "@/components/ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import TextareaAutosize from "react-textarea-autosize";
import useIsMounted from "@/hooks/useIsMounted";
import { useCoverImage } from "@/hooks/useCoverImage";

type ToolbarProps = {
  initialData: Doc<"documents">;
  preview?: boolean;
};
const Toolbar: FC<ToolbarProps> = ({ initialData, preview }): JSX.Element => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(initialData.title);
  const documentUpdateHandler = useMutation(api.documents.updateDocuments);
  const removeIconHandler = useMutation(api.documents.removeIcon);
  const coverImageState = useCoverImage();
  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      setValue(initialData.title);
    }, 0);
  };
  const disableInput = async () => {
    setIsEditing(false);
  };
  const onInput = (currVal: string) => {
    if (preview) return;
    // console.log(value);
    // console.log(initialData.id);
    setValue(currVal);
    documentUpdateHandler({
      id: initialData._id,
      title: currVal || "Untitled",
    });
  };
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    console.log("onIconSelect >>>>>>>>>>>>>>>>>> ", icon);
    documentUpdateHandler({
      id: initialData._id,
      icon: icon,
    });
  };
  const onRemoveIcon = () => {
    removeIconHandler({
      documentId: initialData._id,
    });
  };
  const isMounted = useIsMounted();
  if (!isMounted) return <></>;
  return (
    <div className="pl-[30px] group relative ">
      <>
        {!!initialData.icon && !preview && (
          <div className="flex items-center gap-x-2 group/icon pt-1 ">
            <IconPicker asChild onEmojiChange={onIconSelect}>
              <p className="text-6xl hover:opacity-75 transition-all duration-200 ease-in-out">
                {initialData?.icon}
              </p>
            </IconPicker>
            <Button
              variant={"outline"}
              size="icon"
              onClick={onRemoveIcon}
              className="rounded-full opacity-0 group-hover/icon:opacity-100 transition-all text-muted-foreground text-xs"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </>
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-5">{initialData?.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1   ">
        {!initialData.icon && !preview && (
          <IconPicker asChild onEmojiChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant={"outline"}
              size="sm"
            >
              <Smile className="w-4 h-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImageState.onOpen}
            className="text-muted-foreground text-xs "
            variant="outline"
            size="sm"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {initialData.coverImage && !preview ? (
        <Button
          onClick={coverImageState.onOpen}
          className="text-muted-foreground text-xs "
          variant="outline"
          size="sm"
        >
          <ImageIcon className="w-4 h-4 mr-2" />
        </Button>
      ) : (
        <></>
      )}
      {!isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          onChange={(e) => onInput(e.target.value)}
          value={value}
          className="text-5xl font-bold outline-none font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[13px] text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none "
        ></div>
      )}
    </div>
  );
};

export default Toolbar;
