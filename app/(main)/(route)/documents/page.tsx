"use client";
import Image from "next/image";
import React, { FC } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type DocumentsPageProps = {};
const DocumentsPage: FC<DocumentsPageProps> = (): JSX.Element => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const createDocument = useMutation(api.documents.createDocument);
  const onCreateNewNotes = () => {
    const promise = createDocument({
      title: "Untitled",
    }).then((docId) => {
      // redirect to the new document
      router.push(`/documents/${docId}`);
    });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created successfully!",
      error: "Failed to create a new note",
    });
  };

  return (
    <div className="w-[100%] h-full flex items-center  justify-center space-y-4 flex-col">
      <Image
        src={"/documentsblack.png"}
        alt="empty"
        height="300"
        width="300"
        className="dark:hidden"
      />
      <Image
        src={"/documentsemptyBlack.png"}
        alt="empty"
        height="300"
        width="300"
        className="dark:block hidden"
      />
      <h2>Welcome to {user?.firstName}&apos;s SantraNotes</h2>
      <Button onClick={onCreateNewNotes}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
