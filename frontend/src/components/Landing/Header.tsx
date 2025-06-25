import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon, Close, Dashboard } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Handle scroll effect for dynamic transparency
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Features", action: () => scrollToSection("features") },
    { label: "Contact", action: () => scrollToSection("contact") },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleDashboardClick = () => {
    // Redirect based on user role
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.8)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(10px)",
          borderBottom: scrolled
            ? "1px solid rgba(255, 255, 255, 0.2)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 4px 30px rgba(0,0,0,0.1)"
            : "0 2px 20px rgba(0,0,0,0.05)",
          color: "text.primary",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: scrolled
                ? "linear-gradient(45deg, #667eea, #764ba2)"
                : "linear-gradient(45deg, #667eea, #764ba2)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Coligo
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  onClick={item.action}
                  sx={{
                    color: "text.primary",
                    fontWeight: 500,
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(102, 126, 234, 0.1)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Auth Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!isMobile && (
              <>
                {isAuthenticated ? (
                  <Button
                    variant="contained"
                    onClick={handleDashboardClick}
                    startIcon={<Dashboard />}
                    sx={{
                      background: "linear-gradient(45deg, #667eea, #764ba2)",
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(45deg, #5a6fd8, #6a4190)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 8px 30px rgba(102, 126, 234, 0.4)",
                      },
                    }}
                  >
                    {user?.role === "admin" ? "Admin Panel" : "Dashboard"}
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/register")}
                      sx={{
                        background: "linear-gradient(45deg, #667eea, #764ba2)",
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        borderRadius: 3,
                        boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #5a6fd8, #6a4190)",
                          transform: "translateY(-3px)",
                          boxShadow: "0 8px 30px rgba(102, 126, 234, 0.4)",
                        },
                      }}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                onClick={handleMobileMenuToggle}
                sx={{ color: "text.primary" }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Menu
          </Typography>
          <IconButton onClick={handleMobileMenuToggle} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              onClick={item.action}
              sx={{ cursor: "pointer" }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          {isAuthenticated ? (
            <ListItem onClick={handleDashboardClick} sx={{ cursor: "pointer" }}>
              <ListItemText
                primary={user?.role === "admin" ? "Admin Panel" : "Dashboard"}
              />
            </ListItem>
          ) : (
            <>
              <ListItem
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                sx={{ cursor: "pointer" }}
              >
                <ListItemText primary="Sign In" />
              </ListItem>
              <ListItem
                onClick={() => {
                  navigate("/register");
                  setMobileMenuOpen(false);
                }}
                sx={{ cursor: "pointer" }}
              >
                <ListItemText primary="Get Started" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
