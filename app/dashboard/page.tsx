"use client";

import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  CircularProgress,
  TextField,
  InputAdornment,
  Fade,
  Slide,
  Avatar,
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { api } from "@/utils/api";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SecurityIcon from "@mui/icons-material/Security";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TimerIcon from "@mui/icons-material/Timer";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LockIcon from "@mui/icons-material/Lock";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: secrets,
    isLoading,
    refetch,
  } = api.secret.getMySecrets.useQuery(undefined, { enabled: !!session });

  const deleteSecretMutation = api.secret.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this secret?")) {
      deleteSecretMutation.mutate({ id });
    }
  };

  const handleCopyUrl = async (token: string) => {
    const url = `${window.location.origin}/secret/${token}`;
    await navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const getStatusChip = (secret: {
    status: string;
    isExpired: boolean;
    isOneTimeView: boolean;
  }) => {
    if (secret.status === "DELETED") {
      return (
        <Chip
          label="Deleted"
          size="small"
          sx={{
            bgcolor: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
            fontWeight: 600,
          }}
        />
      );
    }
    if (secret.status === "EXPIRED" || secret.isExpired) {
      return (
        <Chip
          label="Expired"
          size="small"
          sx={{
            bgcolor: "#fef3c7",
            color: "#d97706",
            border: "1px solid #fed7aa",
            fontWeight: 600,
          }}
        />
      );
    }
    if (secret.status === "VIEWED" && secret.isOneTimeView) {
      return (
        <Chip
          label="Viewed"
          size="small"
          sx={{
            bgcolor: "#f0f9ff",
            color: "#0369a1",
            border: "1px solid #bae6fd",
            fontWeight: 600,
          }}
        />
      );
    }
    return (
      <Chip
        label="Active"
        size="small"
        sx={{
          bgcolor: "#f0fdf4",
          color: "#15803d",
          border: "1px solid #bbf7d0",
          fontWeight: 600,
        }}
      />
    );
  };

  const filteredSecrets =
    secrets?.filter(
      (secret: { token: string; status: string }) =>
        secret.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
        secret.status.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Stats calculations
  const totalSecrets = secrets?.length || 0;
  const activeSecrets =
    secrets?.filter((s) => s.status === "ACTIVE" && !s.isExpired).length || 0;
  const viewedSecrets =
    secrets?.filter((s) => s.status === "VIEWED").length || 0;
  const expiredSecrets =
    secrets?.filter((s) => s.status === "EXPIRED" || s.isExpired).length || 0;
  if (status === "loading") {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
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
              Loading your dashboard...
            </Typography>
          </Box>
        </Fade>
      </Container>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Fade in={true} timeout={600}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "white",
              textAlign: "center",
            }}
          >
            <CardContent sx={{ p: 6 }}>
              <LockIcon sx={{ fontSize: 64, mb: 3, opacity: 0.9 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Authentication Required
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Please sign in to access your dashboard and manage your secrets.
              </Typography>
              <Button
                component={Link}
                href="/auth/signin"
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "#d97706",
                  "&:hover": {
                    bgcolor: "#f9fafb",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                }}
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Fade in={mounted} timeout={800}>
        <Card
          sx={{
            mb: 6,
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
          <CardContent sx={{ p: 6, position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Avatar
                  src={session?.user?.image || undefined}
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: "rgba(255,255,255,0.2)",
                    fontSize: "1.5rem",
                    border: "3px solid rgba(255,255,255,0.3)",
                  }}
                >
                  {session?.user?.name?.[0] || session?.user?.email?.[0] || "U"}
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    Welcome back!
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ opacity: 0.9, fontWeight: 400 }}
                  >
                    {session?.user?.name || session?.user?.email}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Tooltip title="Create new secret">
                  <Button
                    component={Link}
                    href="/"
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.3)",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.3)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      fontWeight: 600,
                    }}
                  >
                    Create Secret
                  </Button>
                </Tooltip>
                <Tooltip title="Sign out">
                  <Button
                    variant="outlined"
                    startIcon={<ExitToAppIcon />}
                    onClick={() => signOut()}
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
                    }}
                  >
                    Sign Out
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Fade>
      {/* Stats */}
      {secrets && (
        <Slide direction="up" in={mounted} timeout={1000}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 3,
              mb: 6,
            }}
          >
            {[
              {
                label: "Total Secrets",
                value: totalSecrets,
                icon: <SecurityIcon />,
                color: "#6366f1",
                bg: "#f0f9ff",
              },
              {
                label: "Active",
                value: activeSecrets,
                icon: <VisibilityIcon />,
                color: "#10b981",
                bg: "#f0fdf4",
              },
              {
                label: "Viewed",
                value: viewedSecrets,
                icon: <CheckIcon />,
                color: "#0369a1",
                bg: "#f0f9ff",
              },
              {
                label: "Expired",
                value: expiredSecrets,
                icon: <TimerIcon />,
                color: "#d97706",
                bg: "#fef3c7",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        bgcolor: stat.bg,
                        color: stat.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <TrendingUpIcon sx={{ color: "#a1a1aa", fontSize: 20 }} />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, mb: 1, color: "#09090b" }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#71717a", fontWeight: 500 }}
                  >
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Slide>
      )}{" "}
      {/* Search */}
      <Slide direction="up" in={mounted} timeout={1200}>
        <Card
          sx={{
            mb: 4,
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
              <SecurityIcon sx={{ color: "primary.main", fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Your Secrets
              </Typography>
            </Box>

            <TextField
              fullWidth
              placeholder="Search secrets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#71717a" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "rgba(255,255,255,0.8)",
                },
              }}
            />
          </CardContent>
        </Card>
      </Slide>
      {/* Secrets Table */}{" "}
      <Fade in={mounted} timeout={1400}>
        <Card
          sx={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {isLoading ? (
              <Box sx={{ p: 8, textAlign: "center" }}>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  Loading secrets...
                </Typography>
              </Box>
            ) : filteredSecrets.length === 0 ? (
              <Box sx={{ p: 8, textAlign: "center" }}>
                {secrets?.length === 0 ? (
                  <>
                    <SecurityIcon
                      sx={{ fontSize: 64, color: "#d1d5db", mb: 3 }}
                    />
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#6b7280" }}
                    >
                      No secrets yet
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#9ca3af", mb: 4 }}
                    >
                      Create your first secret to get started with secure
                      sharing.
                    </Typography>
                    <Button
                      component={Link}
                      href="/"
                      variant="contained"
                      startIcon={<AddIcon />}
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
                      Create Your First Secret
                    </Button>
                  </>
                ) : (
                  <>
                    <SearchIcon
                      sx={{ fontSize: 64, color: "#d1d5db", mb: 3 }}
                    />
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#6b7280" }}
                    >
                      No secrets match your search
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#9ca3af" }}>
                      Try adjusting your search terms or create a new secret.
                    </Typography>
                  </>
                )}
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: "#374151",
                          borderBottom: "2px solid #f3f4f6",
                        }}
                      >
                        Token
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: "#374151",
                          borderBottom: "2px solid #f3f4f6",
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: "#374151",
                          borderBottom: "2px solid #f3f4f6",
                        }}
                      >
                        Created
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: "#374151",
                          borderBottom: "2px solid #f3f4f6",
                        }}
                      >
                        Expires
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: "#374151",
                          borderBottom: "2px solid #f3f4f6",
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {" "}
                    {filteredSecrets.map(
                      (secret: {
                        id: string;
                        token: string;
                        status: string;
                        isExpired: boolean;
                        isOneTimeView: boolean;
                        createdAt: Date;
                        expiresAt: Date | null;
                        hasPassword: boolean;
                        isViewed: boolean;
                        viewedAt: Date | null;
                        url: string;
                      }) => (
                        <TableRow
                          key={secret.id}
                          sx={{
                            "&:hover": {
                              bgcolor: "#f9fafb",
                            },
                            transition: "background-color 0.2s ease-in-out",
                          }}
                        >
                          <TableCell
                            sx={{
                              fontFamily: "var(--font-geist-mono)",
                              fontSize: "0.875rem",
                            }}
                          >
                            {secret.token.substring(0, 8)}...
                          </TableCell>
                          <TableCell>{getStatusChip(secret)}</TableCell>
                          <TableCell sx={{ color: "#6b7280" }}>
                            {new Date(secret.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell sx={{ color: "#6b7280" }}>
                            {secret.expiresAt
                              ? new Date(secret.expiresAt).toLocaleDateString()
                              : "Never"}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Tooltip
                                title={
                                  copiedToken === secret.token
                                    ? "Copied!"
                                    : "Copy link"
                                }
                              >
                                <IconButton
                                  size="small"
                                  onClick={() => handleCopyUrl(secret.token)}
                                  sx={{
                                    color:
                                      copiedToken === secret.token
                                        ? "#10b981"
                                        : "#6b7280",
                                    "&:hover": {
                                      bgcolor: "#f3f4f6",
                                      transform: "scale(1.1)",
                                    },
                                    transition: "all 0.2s ease-in-out",
                                  }}
                                >
                                  {copiedToken === secret.token ? (
                                    <CheckIcon />
                                  ) : (
                                    <ContentCopyIcon />
                                  )}
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete secret">
                                <IconButton
                                  size="small"
                                  onClick={() => handleDelete(secret.id)}
                                  sx={{
                                    color: "#ef4444",
                                    "&:hover": {
                                      bgcolor: "#fef2f2",
                                      transform: "scale(1.1)",
                                    },
                                    transition: "all 0.2s ease-in-out",
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Fade>
    </Container>
  );
}
