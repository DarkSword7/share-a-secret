"use client";

import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Paper,
  Chip,
  Divider,
  CircularProgress,
  Fade,
  Zoom,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/utils/api";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TimerIcon from "@mui/icons-material/Timer";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SecretViewPage() {
  const params = useParams();
  const token = params.token as string;

  const [password, setPassword] = useState("");
  const [secretContent, setSecretContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get secret info first
  const {
    data: secretInfo,
    isLoading: isLoadingInfo,
    error: infoError,
  } = api.secret.getInfo.useQuery({ token }, { enabled: !!token });

  const getSecretMutation = api.secret.getByToken.useMutation({
    onSuccess: (data: { content: string }) => {
      setSecretContent(data.content);
      setError(null);
    },
    onError: (err: { message: string }) => {
      if (err.message === "Password required") {
        setShowPasswordInput(true);
      } else {
        setError(err.message);
      }
    },
  });

  useEffect(() => {
    if (secretInfo && !secretInfo.hasPassword && secretInfo.isAvailable) {
      // Auto-fetch if no password required
      getSecretMutation.mutate({ token });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secretInfo, token]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    getSecretMutation.mutate({ token, password });
  };

  const handleViewSecret = () => {
    getSecretMutation.mutate({ token });
  };

  const handleCopySecret = async () => {
    if (secretContent) {
      await navigator.clipboard.writeText(secretContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  if (isLoadingInfo) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Fade in={true} timeout={800}>
          <Box>
            <CircularProgress
              size={60}
              sx={{
                color: "primary.main",
                mb: 3,
              }}
            />
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              Loading secret...
            </Typography>
          </Box>
        </Fade>
      </Container>
    );
  }

  if (infoError || !secretInfo) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Fade in={mounted} timeout={600}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "white",
              textAlign: "center",
            }}
          >
            <CardContent sx={{ p: 6 }}>
              <Zoom in={mounted} timeout={1000}>
                <Box>
                  <ErrorIcon sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    Secret Not Found
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
                    This secret doesn&apos;t exist or has been deleted.
                  </Typography>
                </Box>
              </Zoom>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    );
  }

  if (!secretInfo.isAvailable) {
    let message = "This secret is no longer available.";
    let icon = <ErrorIcon sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />;

    if (secretInfo.isExpired) {
      message = "This secret has expired and is no longer accessible.";
      icon = <TimerIcon sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />;
    } else if (secretInfo.isOneTimeView) {
      message =
        "This secret has already been viewed and automatically deleted for security.";
      icon = <VisibilityIcon sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />;
    }

    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Fade in={mounted} timeout={600}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "white",
              textAlign: "center",
            }}
          >
            <CardContent sx={{ p: 6 }}>
              <Zoom in={mounted} timeout={1000}>
                <Box>
                  {icon}
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    Secret Unavailable
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ opacity: 0.9, lineHeight: 1.6 }}
                  >
                    {message}
                  </Typography>
                </Box>
              </Zoom>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    );
  }

  if (secretContent) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <CheckCircleIcon
                sx={{ fontSize: 48, color: "success.main", mb: 2 }}
              />
              <Typography variant="h4" gutterBottom color="success.main">
                Secret Retrieved
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  mb: 3,
                  flexWrap: "wrap",
                }}
              >
                {secretInfo.isOneTimeView && (
                  <Chip
                    label="One-time view (now deleted)"
                    color="warning"
                    size="small"
                  />
                )}
                {secretInfo.hasPassword && (
                  <Chip
                    label="Password protected"
                    color="secondary"
                    size="small"
                  />
                )}
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="h6" gutterBottom>
              Secret Message:
            </Typography>

            <Paper sx={{ p: 3, bgcolor: "grey.50", mb: 3 }}>
              <Typography
                variant="body1"
                sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
              >
                {secretContent}
              </Typography>
            </Paper>

            <Box
              sx={{
                display: "flex",
                justify: "space-between",
                alignItems: "center",
                fontSize: "0.875rem",
                color: "text.secondary",
              }}
            >
              <span>
                Created: {new Date(secretInfo.createdAt).toLocaleString()}
              </span>
              <span>By: {secretInfo.createdBy}</span>
            </Box>

            {secretInfo.isOneTimeView && (
              <Alert severity="warning" sx={{ mt: 3 }}>
                This was a one-time secret and has been permanently deleted
                after viewing.
              </Alert>
            )}
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <LockIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Secret Ready to View
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Someone has shared a secret with you. Click below to reveal it.
            </Typography>
          </Box>

          {/* Secret Info */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Secret Information:
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
              {secretInfo.isOneTimeView && (
                <Chip
                  icon={<VisibilityIcon />}
                  label="One-time view"
                  color="warning"
                  size="small"
                />
              )}
              {secretInfo.hasPassword && (
                <Chip
                  icon={<LockIcon />}
                  label="Password protected"
                  color="secondary"
                  size="small"
                />
              )}
              {secretInfo.expiresAt && (
                <Chip
                  icon={<TimerIcon />}
                  label={`Expires ${new Date(
                    secretInfo.expiresAt
                  ).toLocaleString()}`}
                  color="info"
                  size="small"
                />
              )}
            </Box>

            <Typography variant="body2" color="text.secondary">
              Created: {new Date(secretInfo.createdAt).toLocaleString()} • By:{" "}
              {secretInfo.createdBy}
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Password Input */}
          {showPasswordInput ? (
            <Box component="form" onSubmit={handlePasswordSubmit}>
              <TextField
                fullWidth
                type="password"
                label="Enter Password"
                placeholder="This secret is password protected"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={!password.trim() || getSecretMutation.isPending}
                startIcon={<VisibilityIcon />}
              >
                {getSecretMutation.isPending ? "Revealing..." : "Reveal Secret"}
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleViewSecret}
              disabled={getSecretMutation.isPending}
              startIcon={<VisibilityIcon />}
            >
              {getSecretMutation.isPending ? "Revealing..." : "Reveal Secret"}
            </Button>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}

          {secretInfo.isOneTimeView && (
            <Alert severity="warning" sx={{ mt: 3 }}>
              <strong>Warning:</strong> This is a one-time secret. It will be
              permanently deleted after viewing.
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
