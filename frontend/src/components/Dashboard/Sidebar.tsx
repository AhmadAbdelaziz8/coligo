import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
} from "@mui/material";
import {
  Dashboard,
  Schedule,
  MenuBook,
  Grade,
  TrendingUp,
  Campaign,
  Home,
  School,
  Quiz as QuizIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    text: "Home",
    icon: Home,
    path: "/",
  },
  {
    text: "Dashboard",
    icon: Dashboard,
    path: "/dashboard",
  },
  {
    text: "Schedule",
    icon: Schedule,
    path: "/dashboard/schedule",
  },
  {
    text: "Courses",
    icon: MenuBook,
    path: "/dashboard/courses",
  },
  {
    text: "Gradebook",
    icon: Grade,
    path: "/dashboard/gradebook",
  },
  {
    text: "Performance",
    icon: TrendingUp,
    path: "/dashboard/performance",
  },
  {
    text: "Announcements",
    icon: Campaign,
    path: "/dashboard/announcements",
  },
  {
    text: "Exams",
    icon: School,
    path: "/dashboard/exams",
  },
  {
    text: "Quizzes",
    icon: QuizIcon,
    path: "/dashboard/quizzes",
  },
];

interface SidebarProps {
  mobileOpen?: boolean;
  handleDrawerToggle?: () => void;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen = false,
  handleDrawerToggle,
  isMobile = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    // Close mobile drawer when navigating
    if (isMobile && handleDrawerToggle) {
      handleDrawerToggle();
    }
  };

  const sidebarContent = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        background: "linear-gradient(180deg, #1e4d72 0%, #2d5a87 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "white",
            letterSpacing: 1,
          }}
        >
          Coligo
        </Typography>
      </Box>

      {/* Menu Items */}
      <List sx={{ pt: 2, px: 1, flex: 1 }}>
        {menuItems.map((item, index) => {
          // Fix active state logic to prevent multiple items appearing active
          const isActive = (() => {
            // Exact match for home page
            if (item.path === "/" && location.pathname === "/") {
              return true;
            }
            // For dashboard routes, use exact matching or check if it's the most specific match
            if (item.path !== "/" && location.pathname !== "/") {
              // If it's the dashboard base route, only active when exactly on dashboard
              if (item.path === "/dashboard") {
                return location.pathname === "/dashboard";
              }
              // For other routes, check if pathname matches exactly
              return location.pathname === item.path;
            }
            return false;
          })();

          return (
            <ListItem
              key={index}
              onClick={() => handleNavigation(item.path)}
              sx={{
                mb: 0.5,
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.3s ease",
                backgroundColor: isActive
                  ? "rgba(255,255,255,0.15)"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(255,255,255,0.1)",
                },
                mx: 1,
                px: 2,
                py: 1.5,
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 40,
                  opacity: isActive ? 1 : 0.8,
                }}
              >
                <item.icon />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "16px",
                    fontWeight: isActive ? 600 : 400,
                    opacity: isActive ? 1 : 0.9,
                  },
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  if (isMobile) {
    // Mobile: Use Drawer
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            border: "none",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  // Desktop: Fixed sidebar
  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000,
      }}
    >
      {sidebarContent}
    </Box>
  );
};

export default Sidebar;
