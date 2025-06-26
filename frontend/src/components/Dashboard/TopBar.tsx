import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Search,
  Logout,
  KeyboardArrowDown,
  Menu as MenuIcon,
  Home,
} from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { logoutUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { LanguageSwitcher } from "../LanguageSwitcher";

interface TopBarProps {
  handleDrawerToggle?: () => void;
  isMobile?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  handleDrawerToggle,
  isMobile = false,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    handleClose();
  };

  return (
    <Box
      sx={{
        height: 70,
        background: "white",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 3 },
      }}
    >
      {/* Left Section: Mobile Menu + Welcome Message */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              color: "#2d5a87",
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Welcome Message */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#2d5a87",
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          Welcome {user?.name || "Student"},
        </Typography>
      </Box>

      {/* Right Section: Search, Notifications, Profile */}
      <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
        {/* Search Bar - Hidden on very small screens */}
        <TextField
          placeholder="Search"
          size="small"
          sx={{
            width: { xs: 0, sm: 200, md: 250 },
            display: { xs: "none", sm: "block" },
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "#f5f5f5",
              border: "none",
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "1px solid #4fc3f7",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#9e9e9e" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Search Icon for mobile */}
        <IconButton
          sx={{
            display: { xs: "flex", sm: "none" },
            color: "#9e9e9e",
          }}
        >
          <Search />
        </IconButton>

        {/* Language Switcher */}
        <LanguageSwitcher size="small" />

        {/* User Profile with Dropdown */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: { xs: "6px 8px", sm: "8px 12px" },
            borderRadius: 3,
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
          onClick={handleProfileClick}
        >
          <Avatar
            sx={{
              width: { xs: 35, sm: 45 },
              height: { xs: 35, sm: 45 },
              border: "2px solid #4fc3f7",
              mr: { xs: 0.5, sm: 1 },
            }}
            src="/api/placeholder/45/45" // Placeholder for user image
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
          </Avatar>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: "#2d5a87",
                fontSize: "14px",
              }}
            >
              {user?.name || "Student"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#9e9e9e",
                fontSize: "12px",
              }}
            >
              {user?.role || "Student"}
            </Typography>
          </Box>
          <KeyboardArrowDown
            sx={{
              color: "#9e9e9e",
              ml: { xs: 0.5, sm: 1 },
              transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
              display: { xs: "none", sm: "block" },
            }}
          />
        </Box>

        {/* Profile Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 2,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
              border: "1px solid #e0e0e0",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              navigate("/");
              handleClose();
            }}
          >
            <ListItemIcon>
              <Home sx={{ color: "#2d5a87" }} />
            </ListItemIcon>
            <ListItemText primary="Back to Home" />
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout sx={{ color: "#ff5252" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: "#ff5252" }} />
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
};

export default TopBar;
