"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#09090b",
      light: "#18181b",
      dark: "#000000",
      contrastText: "#fafafa",
    },
    secondary: {
      main: "#6366f1",
      light: "#8b5cf6",
      dark: "#4f46e5",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#09090b",
      secondary: "#71717a",
    },
    grey: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
    },
    divider: "#e4e4e7",
  },
  typography: {
    fontFamily: [
      "var(--font-geist-sans)",
      "system-ui",
      "-apple-system",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "3rem",
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontSize: "1.875rem",
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
      color: "#71717a",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      color: "#71717a",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.5,
      color: "#a1a1aa",
    },
  },
  shape: {
    borderRadius: 12,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        "html, body": {
          margin: 0,
          padding: 0,
          fontFeatureSettings: '"cv11", "ss01"',
          fontVariationSettings: '"opsz" 32',
        },
        "*::-webkit-scrollbar": {
          width: "8px",
        },
        "*::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "4px",
        },
        "*::-webkit-scrollbar-thumb": {
          background: "#c1c1c1",
          borderRadius: "4px",
          "&:hover": {
            background: "#a1a1a1",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: "8px",
          fontSize: "0.875rem",
          padding: "10px 16px",
          border: "1px solid transparent",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        contained: {
          backgroundColor: "#09090b",
          color: "#fafafa",
          "&:hover": {
            backgroundColor: "#18181b",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
          "&:disabled": {
            backgroundColor: "#f4f4f5",
            color: "#a1a1aa",
          },
        },
        outlined: {
          borderColor: "#e4e4e7",
          color: "#09090b",
          backgroundColor: "#ffffff",
          "&:hover": {
            backgroundColor: "#f4f4f5",
            borderColor: "#d4d4d8",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          },
        },
        text: {
          color: "#71717a",
          "&:hover": {
            backgroundColor: "#f4f4f5",
          },
        },
        sizeLarge: {
          padding: "12px 24px",
          fontSize: "1rem",
          borderRadius: "10px",
        },
        sizeSmall: {
          padding: "6px 12px",
          fontSize: "0.75rem",
          borderRadius: "6px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e4e4e7",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
          "&:last-child": {
            paddingBottom: "24px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            border: "1px solid #e4e4e7",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              borderColor: "#d4d4d8",
            },
            "&.Mui-focused": {
              borderColor: "#6366f1",
              boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
            },
            "& fieldset": {
              border: "none",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#71717a",
            fontSize: "0.875rem",
            fontWeight: 500,
            "&.Mui-focused": {
              color: "#6366f1",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "12px 14px",
            fontSize: "0.875rem",
            "&::placeholder": {
              color: "#a1a1aa",
              opacity: 1,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          fontSize: "0.75rem",
          fontWeight: 500,
          height: "28px",
          border: "1px solid transparent",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        colorPrimary: {
          backgroundColor: "#f1f5f9",
          color: "#0f172a",
          border: "1px solid #e2e8f0",
        },
        colorSecondary: {
          backgroundColor: "#f3f4f6",
          color: "#6366f1",
          border: "1px solid #e5e7eb",
        },
        colorSuccess: {
          backgroundColor: "#f0fdf4",
          color: "#15803d",
          border: "1px solid #bbf7d0",
        },
        colorWarning: {
          backgroundColor: "#fffbeb",
          color: "#d97706",
          border: "1px solid #fed7aa",
        },
        colorError: {
          backgroundColor: "#fef2f2",
          color: "#dc2626",
          border: "1px solid #fecaca",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#09090b",
          borderBottom: "1px solid #e4e4e7",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(8px)",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: "0 24px",
          minHeight: "64px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e4e4e7",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        },
        elevation1: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        },
        elevation2: {
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)",
        },
        elevation3: {
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          border: "1px solid",
          fontSize: "0.875rem",
          fontWeight: 500,
        },
        standardSuccess: {
          backgroundColor: "#f0fdf4",
          color: "#15803d",
          borderColor: "#bbf7d0",
        },
        standardError: {
          backgroundColor: "#fef2f2",
          color: "#dc2626",
          borderColor: "#fecaca",
        },
        standardWarning: {
          backgroundColor: "#fffbeb",
          color: "#d97706",
          borderColor: "#fed7aa",
        },
        standardInfo: {
          backgroundColor: "#eff6ff",
          color: "#2563eb",
          borderColor: "#bfdbfe",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #e4e4e7",
          padding: "12px 16px",
          fontSize: "0.875rem",
        },
        head: {
          backgroundColor: "#f8fafc",
          fontWeight: 600,
          color: "#374151",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "8px",
          boxShadow:
            "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e4e4e7",
          marginTop: "4px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          padding: "8px 12px",
          borderRadius: "4px",
          margin: "2px 4px",
          transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            backgroundColor: "#f4f4f5",
          },
        },
      },
    },
  },
});
