"use client";

import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Chip,
  Paper,
  Fade,
  Slide,
  Zoom,
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import Link from "next/link";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import SecurityIcon from "@mui/icons-material/Security";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";

export default function Home() {
  const { data: session } = useSession();
  const [secret, setSecret] = useState("");
  const [isOneTimeView, setIsOneTimeView] = useState(true);
  const [expiryOption, setExpiryOption] = useState("1h");
  const [customExpiry, setCustomExpiry] = useState("");
  const [hasPassword, setHasPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [createdSecret, setCreatedSecret] = useState<{
    id: string;
    token: string;
    url: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createSecretMutation = api.secret.create.useMutation({
    onSuccess: (data) => {
      setCreatedSecret(data);
      // Reset form
      setSecret("");
      setPassword("");
      setHasPassword(false);
    },
  });

  const getExpiryInMs = () => {
    switch (expiryOption) {
      case "1h":
        return 60 * 60 * 1000;
      case "24h":
        return 24 * 60 * 60 * 1000;
      case "7d":
        return 7 * 24 * 60 * 60 * 1000;
      case "custom":
        return customExpiry
          ? parseInt(customExpiry) * 60 * 60 * 1000
          : undefined;
      case "never":
        return undefined;
      default:
        return 60 * 60 * 1000;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret.trim()) return;

    const expiresIn = getExpiryInMs();

    createSecretMutation.mutate({
      content: secret,
      isOneTimeView,
      expiresIn,
      password: hasPassword ? password : undefined,
    });
  };

  const handleCopyUrl = async () => {
    if (createdSecret) {
      const fullUrl = `${window.location.origin}${createdSecret.url}`;
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (createdSecret) {
    const fullUrl = `${window.location.origin}${createdSecret.url}`;

    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Fade in={true} timeout={600}>
          <Card
            sx={{
              mb: 4,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
              },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                p: 6,
                position: "relative",
                zIndex: 1,
              }}
            >
              <Zoom in={true} timeout={800}>
                <Box>
                  <CheckIcon sx={{ fontSize: 64, mb: 3, color: "#4ade80" }} />
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ fontWeight: 700, mb: 2 }}
                  >
                    Secret Created!
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                    Your secret is secure and ready to share
                  </Typography>
                </Box>
              </Zoom>

              <Slide direction="up" in={true} timeout={1000}>
                <Paper
                  sx={{
                    p: 3,
                    bgcolor: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    mb: 4,
                    borderRadius: 3,
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      wordBreak: "break-all",
                      fontFamily: "var(--font-geist-mono)",
                      color: "#374151",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {fullUrl}
                  </Typography>
                </Paper>
              </Slide>

              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Tooltip title={copied ? "Copied!" : "Copy link"}>
                  <Button
                    variant="contained"
                    onClick={handleCopyUrl}
                    startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                    sx={{
                      bgcolor: copied ? "#10b981" : "#ffffff",
                      color: copied ? "#ffffff" : "#374151",
                      "&:hover": {
                        bgcolor: copied ? "#059669" : "#f3f4f6",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    {copied ? "Copied!" : "Copy Link"}
                  </Button>
                </Tooltip>

                <Button
                  variant="outlined"
                  onClick={() => setCreatedSecret(null)}
                  sx={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "black",
                    "&:hover": {
                      color: "white",
                      borderColor: "rgba(255,255,255,0.5)",
                      bgcolor: "rgba(255,255,255,0.1)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Create Another
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Fade in={mounted} timeout={1000}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Zoom in={mounted} timeout={1200}>
            <Box sx={{ mb: 4 }}>
              <SecurityIcon
                sx={{
                  fontSize: 80,
                  color: "primary.main",
                  mb: 3,
                  filter: "drop-shadow(0 4px 8px rgba(99, 102, 241, 0.3))",
                }}
              />
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                Share a Secret
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  mb: 6,
                  maxWidth: "600px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Securely share sensitive information with military-grade
                encryption, automatic expiration, and one-time viewing
              </Typography>
            </Box>
          </Zoom>

          <Slide direction="up" in={mounted} timeout={1400}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                flexWrap: "wrap",
                mb: 6,
              }}
            >
              <Chip
                icon={<LockIcon />}
                label="AES-256 Encrypted"
                sx={{
                  bgcolor: "#f0f9ff",
                  color: "#0369a1",
                  border: "1px solid #bae6fd",
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  fontSize: "0.875rem",
                }}
              />
              <Chip
                icon={<AutoDeleteIcon />}
                label="Auto-Expire"
                sx={{
                  bgcolor: "#fef3c7",
                  color: "#d97706",
                  border: "1px solid #fed7aa",
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  fontSize: "0.875rem",
                }}
              />
              <Chip
                icon={<VisibilityOffIcon />}
                label="One-Time View"
                sx={{
                  bgcolor: "#f0fdf4",
                  color: "#15803d",
                  border: "1px solid #bbf7d0",
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  fontSize: "0.875rem",
                }}
              />
            </Box>
          </Slide>
        </Box>
      </Fade>

      {/* Create Secret Form */}
      <Slide direction="up" in={mounted} timeout={1600}>
        <Card
          sx={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent sx={{ p: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <LockIcon sx={{ mr: 2, color: "primary.main", fontSize: 28 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Create a Secret
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Your Secret Message"
                placeholder="Enter the sensitive information you want to share..."
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                required
                sx={{
                  mb: 4,
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1rem",
                    lineHeight: 1.6,
                  },
                }}
              />

              {/* Options */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Security Options
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={isOneTimeView}
                      onChange={(e) => setIsOneTimeView(e.target.checked)}
                    />
                  }
                  label="Delete after first view"
                  sx={{ mb: 2, display: "block" }}
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Expiry Time</InputLabel>
                  <Select
                    value={expiryOption}
                    label="Expiry Time"
                    onChange={(e) => setExpiryOption(e.target.value)}
                  >
                    <MenuItem value="1h">1 Hour</MenuItem>
                    <MenuItem value="24h">24 Hours</MenuItem>
                    <MenuItem value="7d">7 Days</MenuItem>
                    <MenuItem value="custom">Custom (hours)</MenuItem>
                    <MenuItem value="never">Never expire</MenuItem>
                  </Select>
                </FormControl>

                {expiryOption === "custom" && (
                  <TextField
                    fullWidth
                    type="number"
                    label="Custom hours"
                    placeholder="Enter hours (1-168)"
                    value={customExpiry}
                    onChange={(e) => setCustomExpiry(e.target.value)}
                    inputProps={{ min: 1, max: 168 }}
                    sx={{ mb: 2 }}
                  />
                )}

                <FormControlLabel
                  control={
                    <Switch
                      checked={hasPassword}
                      onChange={(e) => setHasPassword(e.target.checked)}
                    />
                  }
                  label="Password protect"
                  sx={{ mb: 2, display: "block" }}
                />

                {hasPassword && (
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    placeholder="Enter a password for this secret"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                  />
                )}
              </Box>

              {createSecretMutation.error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {createSecretMutation.error.message}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={!secret.trim() || createSecretMutation.isPending}
                startIcon={<LockIcon />}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  py: 2,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.6)",
                    transform: "translateY(-2px)",
                  },
                  "&:disabled": {
                    background: "#e5e7eb",
                    color: "#9ca3af",
                    boxShadow: "none",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {createSecretMutation.isPending
                  ? "Creating..."
                  : "Create Secret"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Slide>

      {/* Features */}
      <Fade in={mounted} timeout={2000}>
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            How it works
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
              gap: 3,
              mb: 6,
            }}
          >
            {[
              {
                number: "1",
                text: "Enter your secret message",
                icon: <LockIcon />,
              },
              {
                number: "2",
                text: "Configure security settings",
                icon: <SecurityIcon />,
              },
              {
                number: "3",
                text: "Share the generated link",
                icon: <ContentCopyIcon />,
              },
              {
                number: "4",
                text: "Auto-deletes after viewing",
                icon: <AutoDeleteIcon />,
              },
            ].map((step, index) => (
              <Card
                key={index}
                sx={{
                  p: 3,
                  textAlign: "center",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  "&:hover": {
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    transform: "translateY(-4px)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                    fontSize: "1.25rem",
                    fontWeight: 700,
                  }}
                >
                  {step.number}
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, color: "#374151" }}
                >
                  {step.text}
                </Typography>
              </Card>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              flexWrap: "wrap",
            }}
          >
            {!session ? (
              <Button
                component={Link}
                href="/auth/signin"
                variant="outlined"
                sx={{
                  borderColor: "#d1d5db",
                  color: "#374151",
                  "&:hover": {
                    borderColor: "#9ca3af",
                    bgcolor: "#f9fafb",
                  },
                }}
              >
                Sign In
              </Button>
            ) : (
              <Button
                component={Link}
                href="/dashboard"
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  fontWeight: 600,
                }}
              >
                Go to Dashboard
              </Button>
            )}
          </Box>
        </Box>
      </Fade>
    </Container>
  );
}
