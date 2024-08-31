"use client";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { FC, Fragment, useState, MouseEvent } from "react";
import Items from "./Items";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
type DocumentListProps = {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
};
const DocumentList: FC<DocumentListProps> = ({
  level,
  parentDocumentId,
  data,
}): JSX.Element => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const onExpand = (documentId: string) => {
    setExpanded((prev) => ({ ...prev, [documentId]: !prev[documentId] }));
  };
  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });
  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined)
    return (
      <Fragment>
        <Items.Skeleton level={level} />
        {level === 0 ? (
          <Fragment>
            <Items.Skeleton level={level} />
            <Items.Skeleton level={level} />
          </Fragment>
        ) : (
          <></>
        )}
      </Fragment>
    );
  return (
    <Fragment>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : "" }}
        className={cn(
          `hidden text-sm font-medium text-muted-foreground/80 ml-4 `,
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents.map((self) => (
        <Fragment key={self._id}>
          <Items
            id={self._id}
            onClick={() => onRedirect(self._id)}
            Icon={FileIcon}
            label={self.title}
            documentIcon={self.icon}
            onExpand={() => onExpand(self._id)}
            expanded={expanded[self._id]}
            level={level}
          />
          {expanded[self._id] ? (
            <>
              <DocumentList
                parentDocumentId={self._id}
                level={typeof level === "undefined" ? 1 : Number(level) + 1}
              />
            </>
          ) : (
            <></>
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default DocumentList;
