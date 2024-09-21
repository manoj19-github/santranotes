"use client";
import useIsMounted from "@/hooks/useIsMounted";
import React, { FC, Fragment } from "react";
import SettingsModal from "./SettingsModal";
import CoverImageModal from "@/components/modals/CoverImageModal";

type ModalProviderProps = {};
const ModalProvider: FC<ModalProviderProps> = () => {
  const isMounted = useIsMounted();
  if (!isMounted) return <></>;
  return (
    <Fragment>
      <SettingsModal />
      <CoverImageModal />
    </Fragment>
  );
};

export default ModalProvider;
