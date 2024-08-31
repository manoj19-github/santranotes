"use client";
import React, { FC, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
type ConfirmModalProps = {
  children: ReactNode;

  onConfirm: (param?: any) => void;
};
const ConfirmModal: FC<ConfirmModalProps> = ({
  children,

  onConfirm,
}): JSX.Element => {
  const handleConfirm = (event: any) => {
    event.stopPropagation();
    onConfirm(event);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={(e) => {
          e.stopPropagation();
        }}
        asChild
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>Are you absolutely sure?</AlertDialogHeader>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete everything.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
