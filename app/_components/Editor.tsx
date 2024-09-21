"use client";
import { FC, useState } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
// import {
//     BlockNoteView,
//     useBlockNote
// } from "@blocknote/react"
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
type EditorProps = {
  onChangeHandler: (value: any) => void;
  initialContent?: any;
  editable?: boolean;
};
const Editor: FC<EditorProps> = ({
  onChangeHandler,
  initialContent,
  editable,
}): JSX.Element => {
  console.log("initialContent >>>>>>>>> 4343", initialContent);
  const { edgestore } = useEdgeStore();
  const { resolvedTheme } = useTheme();
  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };
  const editor = useCreateBlockNote({
    initialContent: !!initialContent
      ? (JSON.parse(initialContent) as any)
      : [{ type: "paragraph", content: [] }],
    uploadFile: handleUpload,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      editable={editable}
      onChange={() => {
        onChangeHandler(editor.document);
      }}
      shadCNComponents={
        {
          // Pass modified ShadCN components from your project here.
          // Otherwise, the default ShadCN components will be used.
        }
      }
    />
  );
};

export default Editor;
