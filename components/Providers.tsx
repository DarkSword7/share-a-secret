"use client";

import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "@/utils/api";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CustomThemeProvider } from "@/contexts/ThemeContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <CustomThemeProvider>
        <SessionProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </SessionProvider>
      </CustomThemeProvider>
    </AppRouterCacheProvider>
  );
}
