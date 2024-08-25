"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import React, { FC, MouseEvent } from "react";

type ItemsProps = {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick: () => void;
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
  const handleExpand = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    onExpand?.();
  };
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  return (
    <div
      onClick={onClick}
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
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
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
    </div>
  );
};

Items.Skeleton = function ItemsSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Items;
