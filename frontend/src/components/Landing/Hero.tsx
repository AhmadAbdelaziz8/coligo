import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { School, Quiz, Announcement } from "@mui/icons-material";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          display: { xs: "none", md: "block" },
        }}
      />

      <Container maxWidth="lg">
        <Box textAlign="center" position="relative" zIndex={1}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
              fontWeight: 700,
              mb: 2,
              background: "linear-gradient(45deg, #fff 30%, #f0f0f0 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome to Coligo
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              mb: 4,
              opacity: 0.9,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Your Ultimate Student Dashboard for Quizzes, Announcements, and
            Academic Success
          </Typography>

          {/* Feature icons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={4}
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 6 }}
          >
            <Box textAlign="center">
              <School sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="body2">Smart Learning</Typography>
            </Box>
            <Box textAlign="center">
              <Quiz sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="body2">Interactive Quizzes</Typography>
            </Box>
            <Box textAlign="center">
              <Announcement sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="body2">Real-time Updates</Typography>
            </Box>
          </Stack>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/register")}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                background: "white",
                color: "primary.main",
                "&:hover": {
                  background: "rgba(255,255,255,0.9)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  background: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
