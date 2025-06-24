"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "@/utils/theme";

interface CustomThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
