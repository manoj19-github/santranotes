"use client";
import { SantraDebounce } from "@/app/_utils";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, { FC, useRef, useState } from "react";

type TitleProps = {
  initialData: any;
};

const Title: FC<TitleProps> = ({ initialData }): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>(initialData.title || "Untitled");
  const updateDocs = useMutation(api.documents.updateDocuments);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current?.value.length);
    }, 0);
  };
  const disableInput = () => {
    setIsEditing(false);
  };
  const onChange = (event: any) => {
    setTitle(event.target.value);
    updateDocs({
      id: initialData._id,
      title: event.target.value || "Untitled",
    });
    //
  };

  const onKeyDown = (event: any) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={disableInput}
          type="text"
          defaultValue={initialData.title}
          className="h-7 focus-visible:ring-transparent px-2"
        />
      ) : (
        <p onClick={enableInput} className="cursor-pointer">
          {initialData.title}
        </p>
      )}
    </div>
  );
};

export const TitleSkeleton = function TitleSkeleton() {
  return <Skeleton className="h-3 w-20 rounded-md" />;
};
export default Title;
