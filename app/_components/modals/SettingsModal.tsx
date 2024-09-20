"use client";
import React, { FC } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useSearch } from "@/hooks/useSearch";
import { Label } from "@/components/ui/label";
import ThemeToggler from "@/components/ui/ThemeToggler";
import useSettingsHandler from "@/hooks/useSettings";
type SettingsModalProps = {};
const SettingsModal: FC<SettingsModalProps> = () => {
  const settings = useSettingsHandler();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader>
          <h3 className="text-lg font-medium leading-none">My Settings</h3>
        </DialogHeader>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-1">
            <Label>Apperance</Label>
            <span className={`text-[0.8rem] text-muted-foreground`}>
              Customize how SantraNotes looks on your device
            </span>
          </div>
          <ThemeToggler />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
