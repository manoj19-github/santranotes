import React, { FC, ReactNode } from "react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemeProvider } from "next-themes";
const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  ...props
}): JSX.Element => {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
};

export default ThemeProvider;
