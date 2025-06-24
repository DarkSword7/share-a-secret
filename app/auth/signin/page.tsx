"use client";

import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Divider,
  Fade,
  Zoom,
} from "@mui/material";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import SecurityIcon from "@mui/icons-material/Security";

export default function SignInPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard" });
  };
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Fade in={mounted} timeout={800}>
        <Card
          sx={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
          }}
        >
          <CardContent sx={{ p: 6, textAlign: "center" }}>
            <Zoom in={mounted} timeout={1000}>
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "20px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "2rem",
                    mx: "auto",
                    mb: 3,
                    boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)",
                  }}
                >
                  <SecurityIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ mb: 4, lineHeight: 1.6 }}
                >
                  Sign in to manage your secrets and access your secure
                  dashboard
                </Typography>
              </Box>
            </Zoom>

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}
            >
              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<GoogleIcon />}
                onClick={() => handleSignIn("google")}
                sx={{
                  py: 1.5,
                  borderRadius: "12px",
                  borderColor: "#e5e7eb",
                  color: "#374151",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#d1d5db",
                    bgcolor: "#f9fafb",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Continue with Google
              </Button>

              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<GitHubIcon />}
                onClick={() => handleSignIn("github")}
                sx={{
                  py: 1.5,
                  borderRadius: "12px",
                  borderColor: "#e5e7eb",
                  color: "#374151",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#d1d5db",
                    bgcolor: "#f9fafb",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Continue with GitHub
              </Button>
            </Box>

            <Box sx={{ position: "relative", my: 4 }}>
              <Divider sx={{ borderColor: "#e5e7eb" }} />
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "white",
                  px: 2,
                  color: "#9ca3af",
                  fontWeight: 500,
                }}
              >
                OR
              </Typography>
            </Box>

            <Box
              sx={{
                p: 3,
                borderRadius: "12px",
                bgcolor: "#f9fafb",
                border: "1px solid #e5e7eb",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#6b7280", lineHeight: 1.6 }}
              >
                You can also{" "}
                <Typography
                  component="span"
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  create secrets without signing in
                </Typography>
                , but you won&apos;t be able to manage them later or access the
                dashboard.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Container>
  );
}
