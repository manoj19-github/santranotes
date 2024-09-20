"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { log } from "console";
import { useMutation } from "convex/react";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, MouseEvent } from "react";
import { toast } from "sonner";

type ItemsProps = {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  Icon: LucideIcon;
  Skeleton?: any;
};
const Items = ({
  label,
  onClick,
  Icon,
  onExpand,
  level = 0,
  active,
  isSearch,
  documentIcon,
  expanded,
  id,
}: ItemsProps): JSX.Element => {
  const { user } = useUser();
  const router = useRouter();
  const createDocument = useMutation(api.documents.createDocument);
  const archiveDocument = useMutation(api.documents.archiveDocument);
  const handleExpand = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    onExpand?.();
  };
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const onCreateAction = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (!id) return;
    const promise = createDocument({
      parentDocument: id,
      title: "Untitled",
    }).then((documentId) => {
      if (!expanded) onExpand?.();
      // router.push(`/documents/${documentId}`);
    });
    toast.promise(promise, {
      loading: "Creating Document...",
      success: "Document Created",
      error: "Error in  Creating Document",
    });
  };
  const onArchiveAction = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (!id) return;

    const promise = archiveDocument({
      documentId: id,
    }).catch((error) => {});
    toast.promise(promise, {
      loading: "Moving to Trash...",
      success: "Note moved to Trash",
      error: "Error in  moving to Trash",
    });
  };
  return (
    <div
      onClick={() => onClick?.()}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        `group min-h-[27px]  text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium cursor-pointer `,
        active && `bg-primary/5 text-primary`
      )}
    >
      {!!id ? (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      ) : (
        <></>
      )}

      {!!documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px] text-muted-foreground">
          {documentIcon}
        </div>
      ) : (
        <></>
      )}

      <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      <span className="truncate">{label}</span>
      {isSearch ? (
        <kbd
          className={`ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100`}
        >
          <span className="text-xs">CTRL</span>K
        </kbd>
      ) : (
        <></>
      )}
      {!!id ? (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={(event: any) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              asChild
            >
              <div role="button">
                <MoreHorizontal className="h-4 w-4 opacity-0 group-hover:opacity-100 h-full ml-auto rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-600  " />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60 bg-white shadow-lg"
              side="right"
              align="start"
            >
              <DropdownMenuItem
                onClick={onArchiveAction}
                className="cursor-pointer text-rose-500 group-hover:text-rose-700"
              >
                <Trash className="w-4 h-4 mr-2 text-rose-500" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last edited by {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className="opacity-0 group-hover:opacity-100 h-full p-1  ml-auto rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-600"
            role="button"
          >
            <Plus
              className="h-4 w-4 shrink-0  text-muted-foreground/50"
              onClick={onCreateAction}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

Items.Skeleton = function ItemsSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
      className="flex gap-x-2 py-[3px] w-full"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[100%]" />
    </div>
  );
};

export default Items;
