"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import SecurityIcon from "@mui/icons-material/Security";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export function Navigation() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleMenuClose();
    signOut();
  };
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Box
          component={Link}
          href="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            mr: 2,
            "&:hover": {
              opacity: 0.8,
            },
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              mr: 2,
            }}
          >
            <SecurityIcon />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.25rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Share a Secret
          </Typography>
        </Box>{" "}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {session ? (
            <>
              {" "}
              <Tooltip title="Dashboard">
                <Button
                  component={Link}
                  href="/dashboard"
                  startIcon={<DashboardIcon />}
                  sx={{
                    color: "text.secondary",
                    borderRadius: "8px",
                    px: 3,
                    py: 1,
                    fontWeight: 500,
                    "&:hover": {
                      bgcolor: "#f4f4f5",
                      color: "text.primary",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  Dashboard
                </Button>
              </Tooltip>
              <Tooltip title="Profile menu">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  sx={{
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                    transition: "transform 0.2s ease-in-out",
                  }}
                >
                  <Avatar
                    src={session.user?.image || undefined}
                    alt={session.user?.name || "User"}
                    sx={{
                      width: 36,
                      height: 36,
                      border: "2px solid transparent",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                    {session.user?.name?.[0] || session.user?.email?.[0] || "U"}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: "12px",
                    border: "1px solid #e4e4e7",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                    mt: 1,
                    minWidth: 180,
                  },
                }}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  href="/dashboard"
                  sx={{
                    py: 1.5,
                    px: 2,
                    "&:hover": {
                      bgcolor: "#f4f4f5",
                    },
                    borderRadius: "8px",
                    mx: 1,
                    my: 0.5,
                  }}
                >
                  <DashboardIcon sx={{ mr: 2, fontSize: 20 }} />
                  Dashboard
                </MenuItem>
                <MenuItem
                  onClick={handleSignOut}
                  sx={{
                    py: 1.5,
                    px: 2,
                    color: "#ef4444",
                    "&:hover": {
                      bgcolor: "#fef2f2",
                    },
                    borderRadius: "8px",
                    mx: 1,
                    my: 0.5,
                  }}
                >
                  <ExitToAppIcon sx={{ mr: 2, fontSize: 20 }} />
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              href="/auth/signin"
              startIcon={<LoginIcon />}
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: "8px",
                px: 3,
                py: 1,
                fontWeight: 600,
                boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
