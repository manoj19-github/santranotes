"use client";
import React, { FC, ReactNode } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
// import "emoji-picker-react/dist/index.css";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { twMerge } from "tailwind-merge";
import useIsMounted from "@/hooks/useIsMounted";
type IconPickerProps = {
  onEmojiChange: (icon: string) => void;
  children: ReactNode;
  asChild?: boolean;
  className?: string;
};
const IconPicker: FC<IconPickerProps> = ({
  onEmojiChange,
  children,
  asChild,
  className,
}): JSX.Element => {
  const { resolvedTheme } = useTheme();
  const themeMap = { light: Theme.LIGHT, dark: Theme.DARK };
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;
  const theme = themeMap[currentTheme];
  const isMounted = useIsMounted();
  if (!isMounted) return <></>;
  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent
        className={twMerge("p-0 w-full border-none shadow-none", className)}
      >
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={(e) => {
            onEmojiChange(e.emoji);
            console.log("icon select >>>>>>>>>>>>> ", e);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
