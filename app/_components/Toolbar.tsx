"use client";
import { Doc } from "@/convex/_generated/dataModel";
import React, { ElementRef, FC, useRef, useState } from "react";
import IconPicker from "./IconPicker";
import { Button } from "@/components/ui/button";
import { ImageIcon, Smile, X } from "lucide-react";

type ToolbarProps = {
  initialData: Doc<"documents">;
  preview?: boolean;
};
const Toolbar: FC<ToolbarProps> = ({ initialData, preview }): JSX.Element => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(initialData?.title || "");
  return (
    <div className="pl-[30px] group relative">
      <>
        {!!initialData && !preview && (
          <div className="flex items-center gap-x-2 group/icon pt-1 ">
            <IconPicker onChange={() => {}}>
              <p className="text-6xl hover:opacity-75 transition-all duration-200 ease-in-out">
                {initialData?.icon}
              </p>
            </IconPicker>
            <Button
              variant={"outline"}
              size="icon"
              onClick={() => {}}
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
          <IconPicker asChild onChange={() => {}}>
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
            onClick={() => {}}
            className="text-muted-foreground text-xs "
            variant="outline"
            size="sm"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
